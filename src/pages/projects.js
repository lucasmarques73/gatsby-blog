import React from "react"

import Layout from "../components/Layout"
import SEO from "../components/seo"
import ProjectItem from "../components/ListItems/ProjectItem"

const ProjectsPage = ({ data }) => {
  const projectsList = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Projetos" />
      {projectsList.map(
        (
          {
            node: {
              frontmatter: { category, description, title, image },
              fields: { slug },
            },
          },
          key
        ) => (
          <ProjectItem
            key={key}
            slug={slug}
            category={category}
            title={title}
            description={description}
            image={image}
          />
        )
      )}
    </Layout>
  )
}

export const query = graphql`
  query ProjectsList {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "projects" } } }
    ) {
      edges {
        node {
          frontmatter {
            category
            title
            description
            image
          }
          fields {
            slug
          }
        }
      }
    }
  }
`

export default ProjectsPage
