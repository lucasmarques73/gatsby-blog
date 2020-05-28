import styled from "styled-components"
import Img from "gatsby-image"
import media from "styled-media-query"
import AniLink from "gatsby-plugin-transition-link/AniLink"

export const ProjectGridWrapper = styled.section`
  background-color: var(--background);
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
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

export const ProjectItemWrapper = styled.section`
  align-items: center;
  border: 1px solid var(--borders);
  display: flex;
  width: 100%;
  padding: 2rem 1rem;
  flex-direction: column;
  justify-content: center;
`

export const ProjectItemLink = styled(AniLink)`
  color: var(--texts);
  display: flex;
  text-decoration: none;
  background-color: var(--background);

  &:hover {
    color: var(--highlight);
  }
`

export const ProjectItemTag = styled.div`
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
  margin-bottom: 1.5rem;
`

export const ProjectItemInfo = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 1.5rem;
`

export const ProjectItemTitle = styled.h1`
  font-size: 1.6rem;
  font-weight: 700;
  line-height: 1.1;
  margin: 0.8rem 0;
`

export const ProjectItemDescription = styled.p`
  font-size: 1.2rem;
  font-weight: 300;
  line-height: 1.2;
`
