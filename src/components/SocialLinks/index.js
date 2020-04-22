import React from "react"
import { useStaticQuery, graphql } from "gatsby"

import Icons from "./Icons"

import * as S from "./styled"

const SocialLinks = () => {
  const {
    site: {
      siteMetadata: { socialLinks },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          socialLinks {
            label
            url
          }
        }
      }
    }
  `)

  return (
    <S.SocialLinksWrapper>
      <S.SocialLinksList>
        {socialLinks.map((link, i) => {
          const Icon = Icons[link.label]

          return (
            <S.SocialLinksItem key={i}>
              <S.SocialLinksLink
                href={link.url}
                title={link.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <S.IconWrapper>
                  <Icon />
                </S.IconWrapper>
              </S.SocialLinksLink>
            </S.SocialLinksItem>
          )
        })}
      </S.SocialLinksList>
    </S.SocialLinksWrapper>
  )
}

export default SocialLinks
