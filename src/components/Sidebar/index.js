import React from "react"

import Profile from "../Profile"
import SocialLinks from "../SocialLinks"

import * as S from "./styled"
import MenuLinks from "../MenuLinks"

const Sidebar = ({ setIsMenuOpen, isMenuOpen }) => (
  <S.SidebarWrapper isMenuOpen={isMenuOpen}>
    <Profile isMobileHeader={false} />
    <S.SidebarLinksWrapper>
      <SocialLinks />
      <MenuLinks setIsMenuOpen={setIsMenuOpen} isMenuOpen={isMenuOpen} />
    </S.SidebarLinksWrapper>
  </S.SidebarWrapper>
)

export default Sidebar
