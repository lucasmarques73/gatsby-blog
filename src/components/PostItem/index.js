import React from "react"
import PropTypes from "prop-types"
import getThemeColor from "../../utils/getThemeColor"

import * as S from "./styled"
import mapCategoryToColors from "./mapCategoryToColors"

const PostItem = ({ slug, category, date, timeToRead, title, description }) => (
  <S.PostItemLink
    to={slug}
    cover
    direction="down"
    bg={getThemeColor()}
    duration={0.6}
  >
    <S.PostItemWrapper>
      <S.PostItemTag
        background={mapCategoryToColors[category].background}
        color={mapCategoryToColors[category].color}
      >
        {category}
      </S.PostItemTag>
      <S.PostItemInfo>
        <S.PostItemDate>
          {date} • {timeToRead && ` • ${timeToRead} min de leitura`}
        </S.PostItemDate>
        <S.PostItemTitle>{title}</S.PostItemTitle>
        <S.PostItemDescription>{description}</S.PostItemDescription>
      </S.PostItemInfo>
    </S.PostItemWrapper>
  </S.PostItemLink>
)

PostItem.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  timeToRead: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default PostItem
