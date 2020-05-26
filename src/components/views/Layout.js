import React from 'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { listPosts } from '../../actions/bucketRequest.js'
import axios from 'axios'

import Markdown from './Markdown.js'


class Layout extends React.Component {

  componentDidMount = async () => {

    this.props.listPosts(this.props.apiPath)

  }

  render = () => {

    return (
      typeof this.props.posts !== 'object' ?
      <h1 id="loading-text">loading...</h1>
      :
      <div>
        {
          window.location.pathname != '/' &&
          <a 
            className="back"
            href={window.location.origin}
          >Home</a>
        }

        <Markdown>
          {this.props.children}
        </Markdown>

        <div className="sider">
          {
            typeof this.props.posts === 'object' &&

              Object.keys(this.props.posts).map(category => (

              <ul key={category}>
                <h3>
                  {category.slice(0,1).toUpperCase() + category.slice(1, category.length)}
                </h3>

                {
                  this.props.posts[category].map((postsObj, i) => (
                    <li key={i}>
                      <a href={window.location.origin + `/${category}/` + postsObj.uri}>
                        {postsObj.title}
                      </a>
                    </li>
                  ))
                }

              </ul>


              ))
          }

        </div>

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
      reason:  state.reason
    }
  },
  {
    listPosts
  }
)(Layout))
