import Img from "gatsby-image"
import styled from "styled-components"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const ListItemsLink = styled(AniLink)`
  color: var(--texts);
  display: flex;
  text-decoration: none;

  &:hover {
    color: var(--highlight);
  }
`

export const ImageWrapper = styled(Img)`
  border-radius: 50%;
  display: flex;
  min-width: 120px;
  min-height: 120px;

  ${media.lessThan("large")`
    margin-bottom: 5px;
  `}
`

export const ListItemsWrapper = styled.section`
  align-items: center;
  border-bottom: 1px solid var(--borders);
  display: flex;
  padding: 2rem 3rem;
  width: 100%;
`

export const ListItemsTag = styled.div`
  align-items: center;
  background: ${props =>
    props.background ? props.background : "var(--highlight)"};
  border-radius: 50%;
  color: ${props => (props.color ? props.color : "var(--postColor)")};
  display: flex;
  font-size: 1.3rem;
  font-weight: 700;
  justify-content: center;
  min-height: 90px;
  min-width: 90px;
  text-transform: uppercase;
`

export const ListItemsInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`

export const ListItemsDate = styled.time`
  font-size: 0.9rem;
`

export const ListItemsTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  margin: 0.2rem 0 0.5rem;
`

export const ListItemsDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
`
