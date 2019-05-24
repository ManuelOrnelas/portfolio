import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class ProductDesignRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className='post-list'>
        {posts && (posts.map(({ node: post }, index) => (
          <Link title={post.frontmatter.title} className="post title has-text-primary is-size-4"
            to={post.fields.slug} key={index}>
            <img alt={post.frontmatter.title} className="thumbnail" src={post.frontmatter.image.childImageSharp.fluid.src}/>
          </Link>
          )))}
      </div>
    );
  }
}

ProductDesignRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query ProductDesignRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "product-design-post" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              title
              image {
                childImageSharp {
                  fluid(maxWidth: 150, maxHeight: 150) {
                    src
                  }
                }
              }
            }
          }
        }
      }
    }
    `}
    render={(data, count) => (
      <ProductDesignRoll data={data} count={count} />
    )}
  />
)
