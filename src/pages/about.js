import React from "react"
import {useStaticQuery, graphql} from "gatsby"

import Layout from "../components/Layout"
import SEO from "../components/seo"

const AboutPage = () => {

  const { personalApi : { posts } } = useStaticQuery(graphql`
    {
      personalApi {
          posts {
            id title
          }
      }
    }
  `)

  return (
  <Layout>
    <SEO title="Sobre" />
    <h1> Sobre mim</h1>
    <ul>
    {posts.map((post, i) => (
        <li key ={i}>{post.title}</li>
    ))}
    </ul>
  </Layout>
)}

export default AboutPage
