import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import getThemeColor from "../../utils/getThemeColor"

import * as S from "./styled"

const MenuLinks = () => {
  const {
    site: {
      siteMetadata: { pages },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          pages {
            label
            url
          }
        }
      }
    }
  `)

  return (
    <S.MenuLinksWrapper>
      <S.MenuLinksList>
        {pages.map((link, i) => (
          <S.MenuLinksItem key={i}>
            <S.MenuLinksLink
              cover
              direction="left"
              bg={getThemeColor()}
              duration={0.6}
              to={link.url}
              activeClassName="active"
            >
              {link.label}
            </S.MenuLinksLink>
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  )
}

export default MenuLinks
