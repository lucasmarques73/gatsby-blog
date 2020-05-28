import React from "react"
import PropTypes from "prop-types"
import getThemeColor from "../../utils/getThemeColor"

import * as S from "./styled"
import mapCategoryToColors from "./mapCategoryToColors"

const PostItem = ({ slug, category, date, timeToRead, title, description }) => (
  <S.ListItemsLink
    to={slug}
    cover
    direction="down"
    bg={getThemeColor()}
    duration={0.6}
  >
    <S.ListItemsWrapper>
      <S.ListItemsTag
        background={mapCategoryToColors[category].background}
        color={mapCategoryToColors[category].color}
      >
        {category}
      </S.ListItemsTag>
      <S.ListItemsInfo>
        <S.ListItemsDate>
          {date} {timeToRead && ` • ${timeToRead} min de leitura`}
        </S.ListItemsDate>
        <S.ListItemsTitle>{title}</S.ListItemsTitle>
        <S.ListItemsDescription>{description}</S.ListItemsDescription>
      </S.ListItemsInfo>
    </S.ListItemsWrapper>
  </S.ListItemsLink>
)

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PostItem
