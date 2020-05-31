import styled from "styled-components"
import media from "styled-media-query"

export const SidebarWrapper = styled.aside`
  align-items: center;
  border-right: 1px solid var(--borders);
  background: var(--mediumBackground);
  display: flex;
  flex-direction: column;
  height: 100vh;
  position: fixed;
  padding: 2rem;
  text-align: center;
  width: 20rem;
  transition: 0.5s ease;

  ${media.lessThan("large")`
    align-items: flex-start;
    border: 0;
    height: calc(100% - 50px);
    padding: 0;
    position: inherit;
    width: 100%;
    transform: ${props =>
      props.isMenuOpen ? "translateX(0)" : "translateX(-100vw)"};
  `}
`

export const SidebarLinksWrapper = styled.section`
  width: 100%;
  height: calc(100% - 140px);
  display: flex;
  flex-direction: column;
`
