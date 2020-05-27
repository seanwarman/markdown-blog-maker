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
            {this.props.children}
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
                        this.props.posts[category].map((postsObj, i) => (
                          <li key={i}>
                            <Link
                              to={`/${category}/${postsObj.uri}`} 
                              onClick={() => this.props.getMarkdown(this.props.s3Url, `/${category}/${postsObj.uri}`)}
                            >
                              {postsObj.title}
                            </Link>
                          </li>
                        ))
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
    }
  },
  {
    listPosts,
    getMarkdown,
    setMarkdownToHome,
  }
)(Layout))
