import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"

import * as S from "../components/Post/styled"

const AboutPage = ({ data }) => {
  const html = data.markdownRemark.html
  const page = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO title={page.title} />
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
      }
      html
    }
  }
`

export default AboutPage
