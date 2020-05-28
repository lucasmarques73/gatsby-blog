import React from "react"
import styled from "styled-components"
import media from "styled-media-query"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import * as S from "../components/Post/styled"

const NotFoundPage = ({ data }) => {
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
  query NotFound {
    markdownRemark(frontmatter: { category: { eq: "notFound" } }) {
      frontmatter {
        title
        image
      }
      html
    }
  }
`

export default NotFoundPage
