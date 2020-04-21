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
