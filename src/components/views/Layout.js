import React from 'react'
import { connect } from 'react-redux'
import { Link, withRouter } from 'react-router-dom'
import { listPosts } from '../../actions/s3bucket.js'
import { setMarkdownToHome } from '../../actions/markdown.js'
import axios from 'axios'

import Markdown from './Markdown.js'
import Sider from './Sider.js'

import 'highlight.js/styles/atelier-estuary-dark.css';


class Layout extends React.Component {

  componentDidMount = async () => {

    this.props.listPosts(this.props.apiPath)

  }

  render = () => {

    return (
      <div>
        {
          this.props.location.pathname !== '/' ?
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

        <Sider />


      </div>

    )
  }
}

export default withRouter(connect(
  state => {

    return {
      apiPath: state.apiPath,
      loading: state.loading,
      markdown:state.markdown,
    }
  },
  {
    listPosts,
    setMarkdownToHome,
  }
)(Layout))
