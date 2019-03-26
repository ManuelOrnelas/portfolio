import React from 'react'
import PropTypes from 'prop-types'
import Helmet from 'react-helmet'
import { graphql } from 'gatsby'
import Layout from '../components/Layout'

export const WritingPostTemplate = ({
  description,
  image,
  details,
  title,
  helmet,
}) => {

  return (
    <section className="section">
      {helmet || ''}
      <div className="left">
        <div className="flex justifycontent-center aligncontent-center slight-left">
        <div>
          <h1 className="title is-size-2 has-text-weight-bold is-bold-light"
            data-aos='fade-up' data-aos-delay='0'>
            {title}
          </h1>
          <p>{description}</p>
          <p>{details}</p>
        </div>
        </div>
      </div>
      <div className="right"> 
        <div className="flex justifycontent-center aligncontent-center slight-right" >
          <img src={image.childImageSharp.fluid.src} alt="Hello" />
        </div>
      </div>
    </section>
  )
}

WritingPostTemplate.propTypes = {
  description: PropTypes.string,
  title: PropTypes.string,
  helmet: PropTypes.object,
}

const WritingPost = ({ data }) => {
  // get graphql data
  let colors = data.colorsQuery.frontmatter.colors
  let post = data.pageQuery.frontmatter

  // if this color (index) exists use it,
  // otherwise, use the first color
  let pageColor = ''
  if (post.color && colors[post.color - 1]) pageColor = colors[post.color - 1].replace('\\', '')
  else pageColor = colors[0].replace('\\', '')

  return (
    <Layout primaryColor={pageColor}>
      <WritingPostTemplate
        description={post.description}
        helmet={
          <Helmet titleTemplate="%s">
            <title>{`${post.title}`}</title>
            <meta
              name="description"
              content={`${post.description}`}
            />
          </Helmet>
        }
        title={post.title}
        image={post.image}
        details={post.details}
      />
    </Layout>
  )
}

WritingPost.propTypes = {
  data: PropTypes.shape({
    markdownRemark: PropTypes.object,
  }),
}

export default WritingPost

export const pageQuery = graphql`
  query WritingPost($id: String!, $pageKey: String!) {
    pageQuery: markdownRemark(id: { eq: $id }, frontmatter: { templateKey: { eq: $pageKey } }) {
      id
      frontmatter {
        color
        date(formatString: "MMMM DD, YYYY")
        title
        description
        image {
          childImageSharp {
            fluid(maxWidth: 400, maxHeight: 400) {
              src
            }
          }
        }
        details
      }
    }

    colorsQuery: markdownRemark(frontmatter: { fileID: { eq: "colors" } }) {
      frontmatter {
        colors
      }
    }
  }
`
