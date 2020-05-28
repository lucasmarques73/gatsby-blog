import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"

import * as S from "../components/Post/styled"

const BlogPage = ({ data }) => {
  const html = data.markdownRemark.html
  const page = data.markdownRemark.frontmatter

  return (
    <Layout>
      <SEO
        title={page.title}
        description={page.description}
        image={page.image}
      />
      <S.PostHeader>
        <S.PostTitle>{page.title}</S.PostTitle>
        <S.PostDescription>{page.description}</S.PostDescription>
      </S.PostHeader>
      <S.MainContent>
        <div dangerouslySetInnerHTML={{ __html: html }}></div>
      </S.MainContent>
    </Layout>
  )
}

export const query = graphql`
  query Page($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      frontmatter {
        title
        description
        image
      }
      html
    }
  }
`

export default BlogPage
