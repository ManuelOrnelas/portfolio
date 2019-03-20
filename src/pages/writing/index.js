import React from 'react'

import Layout from '../../components/Layout'
import WritingRoll from '../../components/WritingRoll'

const WritingPage = ({data}) => {
  let color
  if (data.allMarkdownRemark.edges[0].node) color = data.allMarkdownRemark.edges[0].node.frontmatter.pageColor.replace('\\', '');

  return (
    <Layout primaryColor={color}>
      <div className='full-page flex justifycontent-center alignitems-center bcg yellow white-text'>
        <h1 id='page-title' className='huge-text text-center'>Writing.</h1>
      </div>
      <div className='full-page'>
        <div className='lateral-space'>
          <h1 className='projects'>Projects.</h1>
          <WritingRoll />
        </div>
      </div>
    </Layout>
  )
}

export const query = graphql`
  query WritingQuery {
    allMarkdownRemark(filter: { frontmatter : { templateKey: { eq: "writing-post"}}}) {
      edges {
        node {
          frontmatter {
            pageColor
          }
        }
      }
    }
  }
`


export default WritingPage;
