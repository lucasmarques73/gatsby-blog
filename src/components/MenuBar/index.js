import React from "react"

import getThemeColor from "../../utils/getThemeColor"

import Icons from "./Icons"

import * as S from "./styled"
import {
  homeClickTrack,
  searchClickTrack,
  topClickTrack,
} from "../../analytics"

const MenuBar = () => (
  <S.MenuBarWrapper>
    <S.MenuBarGroup>
      <S.MenuBarLink
        to="/"
        cover
        direction="right"
        bg={getThemeColor()}
        duration={0.6}
        title="Voltar para Home"
        onClick={() => homeClickTrack()}
      >
        <S.MenuBarItem>
          <Icons.Home />
        </S.MenuBarItem>
      </S.MenuBarLink>
      <S.MenuBarLink
        to="/search/"
        cover
        direction="right"
        bg={getThemeColor()}
        duration={0.6}
        title="Pesquisar"
        onClick={() => searchClickTrack()}
      >
        <S.MenuBarItem>
          <Icons.Search />
        </S.MenuBarItem>
      </S.MenuBarLink>
    </S.MenuBarGroup>
    <S.MenuBarGroup>
      <S.MenuBarItem
        title="Ir para o topo"
        onClick={() => {
          topClickTrack()
          window.scroll({ top: 0, behavior: "smooth" })
        }}
      >
        <Icons.Arrow />
      </S.MenuBarItem>
    </S.MenuBarGroup>
  </S.MenuBarWrapper>
)

export default MenuBar
