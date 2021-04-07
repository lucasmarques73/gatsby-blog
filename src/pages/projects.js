import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import ProjectItem from "../components/Projects/ProjectItem"
import * as S from "../components/Projects/styled"

const ProjectsPage = ({ data }) => {
  const projectsList = data.allMarkdownRemark.edges

  return (
    <Layout>
      <SEO title="Projetos" />
      <S.ProjectGridWrapper>
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
      </S.ProjectGridWrapper>
    </Layout>
  )
}

export const query = graphql`
  query ProjectsList {
    allMarkdownRemark(
      filter: { frontmatter: { category: { eq: "projetos" } } }
      sort: { fields: frontmatter___date, order: DESC }
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
