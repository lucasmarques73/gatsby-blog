import React from "react"
import PropTypes from "prop-types"
import getThemeColor from "../../utils/getThemeColor"

import Image from "./Image"
import * as S from "./styled"
import mapCategoryToColors from "../../styles/mapCategoryToColors"

const ProjectItem = ({ slug, category, title, description, image }) => (
  <S.ProjectItemLink
    to={slug}
    cover
    direction="down"
    bg={getThemeColor()}
    duration={0.6}
  >
    <S.ProjectItemWrapper>
      {image ? (
        <Image filename={image} alt={title} />
      ) : (
        <S.ProjectItemTag
          background={mapCategoryToColors[category].background}
          color={mapCategoryToColors[category].color}
        >
          {category}
        </S.ProjectItemTag>
      )}
      <S.ProjectItemInfo>
        <S.ProjectItemTitle>{title}</S.ProjectItemTitle>
        <S.ProjectItemDescription>{description}</S.ProjectItemDescription>
      </S.ProjectItemInfo>
    </S.ProjectItemWrapper>
  </S.ProjectItemLink>
)

ProjectItem.propTypes = {
  slug: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string,
}

export default ProjectItem
