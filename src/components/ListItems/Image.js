import React from "react"
import { StaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const Image = props => (
  <StaticQuery
    query={graphql`
      query {
        images: allFile(
          filter: { absolutePath: { regex: "/static/assets/img/" } }
        ) {
          edges {
            node {
              relativePath
              name
              childImageSharp {
                sizes(maxWidth: 240) {
                  ...GatsbyImageSharpSizes
                }
              }
            }
          }
        }
      }
    `}
    render={data => {
      const image = data.images.edges.find(n => {
        return props.filename.includes(n.node.name)
      })
      if (!image) {
        return null
      }

      const imageSizes = image.node.childImageSharp.sizes
      return <S.ImageWrapper alt={props.alt} sizes={imageSizes} />
    }}
  />
)

export default Image
