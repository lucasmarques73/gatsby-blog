import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import * as S from "../components/Post/styled"

const AboutPage = ({ data }) => {
  const html = data.markdownRemark.html
  const page = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={page.title} image={page.image} />
      <S.PostHeader>
        <S.PostTitle>{page.title}</S.PostTitle>
      </S.PostHeader>
      <S.MainContent>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </S.MainContent>
    </Layout>
  )
}

export const query = graphql`
  query AboutPage {
    markdownRemark(frontmatter: { category: { eq: "sobre" } }) {
      frontmatter {
        title
        category
      }
      html
    }
  }
`

export default AboutPage
