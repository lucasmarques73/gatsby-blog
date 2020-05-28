const path = require("path")
const { createFilePath } = require(`gatsby-source-filesystem`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions

  if (node.internal.type === "MarkdownRemark") {
    const slug = createFilePath({
      node,
      getNode,
      basePath: "pages",
    })

    const pathWihtOutDate = slug.slice(12)

    createNodeField({
      node,
      name: "slug",
      value: `/${pathWihtOutDate}`,
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return graphql(`
    {
      allMarkdownRemark(sort: { fields: frontmatter___date, order: DESC }) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
              image
            }
            timeToRead
          }
          next {
            frontmatter {
              title
            }
            fields {
              slug
            }
          }
          previous {
            fields {
              slug
            }
            frontmatter {
              title
            }
          }
        }
      }
      site {
        siteMetadata {
          postsConfig {
            postsPerPage
            postsBasePath
          }
        }
      }
    }
  `).then(result => {
    const allPages = result.data.allMarkdownRemark.edges

    const notPostCategory = category => ["projects", "about"].includes(category)

    const pages = allPages.filter(({ node }) =>
      notPostCategory(node.frontmatter.category)
    )

    // Create pages by slug
    pages.forEach(({ node }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-page.js"),
        context: {
          slug: node.fields.slug,
        },
      })
    })

    const posts = allPages.filter(
      ({ node }) => !notPostCategory(node.frontmatter.category)
    )

    // Fix Linked List
    posts.forEach((item, index, arr) => {
      if (arr[index + 1] === undefined) item.next = null
      if (arr[index - 1] === undefined) item.previous = null

      if (
        item.next &&
        arr[index + 1] &&
        item.next.fields.slug !== arr[index + 1].node.fields.slug
      )
        item.next = arr[index + 1].node

      if (
        item.previous &&
        arr[index - 1] &&
        item.previous.fields.slug !== arr[index - 1].node.fields.slug
      )
        item.previous = arr[index - 1].node
    })

    // Create post page by slug
    posts.forEach(({ node, next, previous }) => {
      createPage({
        path: node.fields.slug,
        component: path.resolve("./src/templates/blog-post.js"),
        context: {
          slug: node.fields.slug,
          previousPost: next,
          nextPost: previous,
        },
      })
    })

    // Create pagination to post list
    const postsBasePath =
      result.data.site.siteMetadata.postsConfig.postsBasePath
    const initialPath = postsBasePath === "/" ? "" : postsBasePath

    const postsPerPage = result.data.site.siteMetadata.postsConfig.postsPerPage
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, index) => {
      const currentPage = index + 1
      const pagePath = `${initialPath}/page/${currentPage}`
      const prevPagePath = `${initialPath}/page/${currentPage - 1}`
      const nextPagePath = `${initialPath}/page/${currentPage + 1}`

      createPage({
        path: index === 0 ? postsBasePath : pagePath,
        component: path.resolve("./src/templates/blog-list.js"),
        context: {
          limit: postsPerPage,
          skip: index * postsPerPage,
          numPages,
          currentPage: currentPage,
          isFirst: currentPage === 1,
          isLast: currentPage === numPages,
          prevPage: currentPage - 1 === 1 ? initialPath : prevPagePath,
          nextPage: nextPagePath,
        },
      })
    })
  })
}
