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
              background
              category
              date(locale: "pt-br", formatString: "DD [de] MMMM [de] YYYY")
              description
              title
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
    }
  `).then(result => {
    const posts = result.data.allMarkdownRemark.edges

    // Create pages by slug
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
    const postsPerPage = 6
    const numPages = Math.ceil(posts.length / postsPerPage)

    Array.from({ length: numPages }).forEach((_, index) => {
      const currentPage = index + 1
      const initialPath = "/posts"
      const pagePath = `${initialPath}/page/${currentPage}`
      const prevPagePath = `${initialPath}/page/${currentPage - 1}`
      const nextPagePath = `${initialPath}/page/${currentPage + 1}`

      createPage({
        path: index === 0 ? initialPath : pagePath,
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
