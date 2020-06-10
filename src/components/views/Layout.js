import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { listPosts } from '../../actions/s3bucket.js'
import { getMarkdown, setMarkdownToHome } from '../../actions/markdown.js'
import axios from 'axios'

import Markdown from './Markdown.js'
import 'highlight.js/styles/atelier-estuary-dark.css';



class Layout extends React.Component {

  componentDidMount = async () => {

    this.props.listPosts(this.props.apiPath)

  }

  handleLink = (category, uri) => {
    this.props.getMarkdown(this.props.s3Url, `/${category}/${uri}`)
  }

  sortPosts = (posts, category) => {

    let sortBy = ''

    // NOTE this only works because 'updated' is a Date object.
    if(category === 'archive') {

      sortBy = 'updated'
      return posts[category].sort((a,b) => b[sortBy] - a[sortBy])

    }

    return posts[category]

  }


  renderPostLinksByCategory = (posts, category) => {
    return this.sortPosts(posts, category).map((postsObj, i) => (
      <li key={i}>
        <Link
          to={`/${category}/${postsObj.uri}`} 
          onClick={() => this.handleLink(category, postsObj.uri)}
        >
          {postsObj.title}
        </Link>
      </li>
    ))
  }

  render = () => {

    return (
      <div>
        {
          window.location.pathname !== '/' ?
            <Link 
              className="back"
              to="/"
              onClick={() => this.props.setMarkdownToHome()}
            >Home</Link>
            :
            <div className="banner"></div>
        }

        {
          this.props.loading ||
          <Markdown>
            {this.props.markdown}
          </Markdown>
        }



          {
            <div className="sider">
              { 
                typeof this.props.posts === 'object' && this.props.status !== 'Failed' &&

                  Object.keys(this.props.posts).map(category => (

                    <ul key={category}>
                      <h3>
                        {category.slice(0,1).toUpperCase() + category.slice(1, category.length)}
                      </h3>

                      {
                        this.renderPostLinksByCategory(this.props.posts, category)
                      }

                    </ul>

                  ))

              }
            </div>
          }


      </div>

    )
  }
}

export default withRouter(connect(
  state => {

    return {
      s3Url:   state.s3Url,
      apiPath: state.apiPath,
      posts:   state.posts,
      status:  state.status,
      reason:  state.reason,
      loading: state.loading,
      markdown:state.markdown,
    }
  },
  {
    listPosts,
    getMarkdown,
    setMarkdownToHome,
  }
)(Layout))
