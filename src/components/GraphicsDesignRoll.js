import React from 'react'
import PropTypes from 'prop-types'
import { Link, graphql, StaticQuery } from 'gatsby'

class GraphicsDesignRoll extends React.Component {

  render() {
    const { data } = this.props
    const { edges: posts } = data.allMarkdownRemark

    return (
      <div className="columns is-multiline">
        {posts && (posts.map(({ node: post }) => (
          <div className="is-parent column is-6" key={post.id}>
            <Link className="title has-text-primary is-size-4" to={post.fields.slug}>
              <img src={post.frontmatter.thumbnail.childImageSharp.fluid.src}/>
            </Link>
          </div>
        )))}
      </div>
    );
  }
}

GraphicsDesignRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

export default () => (
  <StaticQuery
    query={graphql`
    query GraphicsDesignRollQuery {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] },
        filter: { frontmatter: { templateKey: { eq: "graphics-design-post" } }}
      ) {
        edges {
          node {
            excerpt(pruneLength: 400)
            id
            fields {
              slug
            }
            frontmatter {
              thumbnail {
                childImageSharp {
                  fluid(maxWidth: 400, maxHeight: 250) {
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
      <GraphicsDesignRoll data={data} count={count} />
    )}
  />
)
