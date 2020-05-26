import styled from "styled-components"
import media from "styled-media-query"
import Img from "gatsby-image"

export const AvatarWrapper = styled(Img)`
  border-radius: 50%;
  height: 15.625rem;
  margin: auto;
  width: 15.625rem;

  ${media.lessThan("large")`
    height: 5.875rem;
    width: 5.875rem;
  `}
`
