import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const Avatar = () => {
  const { avatarImage } = useStaticQuery(graphql`
    {
      avatarImage: file(relativePath: { eq: "profile-photo.jpg" }) {
        childImageSharp {
          fluid(maxWidth: 250) {
            ...GatsbyImageSharpFluid_tracedSVG
          }
        }
      }
    }
  `)

  return <S.AvatarWrapper fluid={avatarImage.childImageSharp.fluid} />
}

export default Avatar
