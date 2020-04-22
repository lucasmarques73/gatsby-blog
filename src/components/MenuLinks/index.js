import React from "react"
import { useStaticQuery, graphql } from "gatsby"

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
            <S.MenuLinksLink to={link.url} activeClassName="active">
              {link.label}
            </S.MenuLinksLink>
          </S.MenuLinksItem>
        ))}
      </S.MenuLinksList>
    </S.MenuLinksWrapper>
  )
}

export default MenuLinks
