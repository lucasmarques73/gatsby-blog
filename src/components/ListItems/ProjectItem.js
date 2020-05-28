import React from "react"
import PropTypes from "prop-types"
import getThemeColor from "../../utils/getThemeColor"

import Image from "./Image"
import * as S from "./styled"
import mapCategoryToColors from "./mapCategoryToColors"

const ProjectItem = ({ slug, category, title, description, image }) => (
  <S.ListItemsLink
    to={slug}
    cover
    direction="down"
    bg={getThemeColor()}
    duration={0.6}
  >
    <S.ListItemsWrapper>
      {image ? (
        <Image filename={image} alt={title} />
      ) : (
        <S.ListItemsTag
          background={mapCategoryToColors[category].background}
          color={mapCategoryToColors[category].color}
        >
          {category}
        </S.ListItemsTag>
      )}
      <S.ListItemsInfo>
        <S.ListItemsTitle>{title}</S.ListItemsTitle>
        <S.ListItemsDescription>{description}</S.ListItemsDescription>
      </S.ListItemsInfo>
    </S.ListItemsWrapper>
  </S.ListItemsLink>
)

ProjectItem.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default ProjectItem
