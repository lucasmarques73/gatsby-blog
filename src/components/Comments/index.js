import React from "react"
import PropTypes from "prop-types"
import ReactDisqusComments from "react-disqus-comments"
import { useStaticQuery, graphql } from "gatsby"

import * as S from "./styled"

const Comments = ({ url, title }) => {
  const {
    site: {
      siteMetadata: { siteUrl, disqusShortName },
    },
  } = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          siteUrl
          disqusShortName
        }
      }
    }
  `)

  const completeURL = `${siteUrl}${url}`

  return (
    <S.CommentsWrapper>
      <S.CommentsTitle>Comentários</S.CommentsTitle>
      <ReactDisqusComments
        shortname={disqusShortName}
        identifier={completeURL}
        title={title}
        url={completeURL}
      />
    </S.CommentsWrapper>
  )
}

Comments.propTypes = {
  url: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
}

export default Comments
