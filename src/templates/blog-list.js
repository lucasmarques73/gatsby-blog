import React from "react"
import { graphql } from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/Seo"
import PostItem from "../components/PostItem"
import Pagination from "../components/Pagination"

const BlogList = ({ data, pageContext }) => {
  const postList = data.allMarkdownRemark.edges

  const {
    isFirst,
    isLast,
    currentPage,
    numPages,
    prevPage,
    nextPage,
  } = pageContext

  return (
    <Layout>
      <SEO title="Home" />
      {postList.map(
        (
          {
            node: {
              frontmatter: { category, date, description, title },
              timeToRead,
              fields: { slug },
            },
          },
          key
        ) => (
          <PostItem
            key={key}
            slug={slug}
            category={category}
            date={date}
            timeToRead={timeToRead}
            title={title}
            description={description}
          />
        )
      )}
      <Pagination
        isFirst={isFirst}
        isLast={isLast}
        currentPage={currentPage}
        numPages={numPages}
        prevPage={prevPage}
        nextPage={nextPage}
      />
    </Layout>
  )
}

export const query = graphql`
  query PostList($skip: Int!, $limit: Int!) {
    allMarkdownRemark(
      filter: { frontmatter: { type: { eq: "post" } } }
      sort: { fields: frontmatter___date, order: DESC }
      limit: $limit
      skip: $skip
    ) {
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
          }
          timeToRead
        }
      }
    }
  }
`
export default BlogList
