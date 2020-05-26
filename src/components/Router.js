import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMarkdown, setMarkdownToHome } from '../actions/markdown.js'
import Layout from './views/Layout.js'

class Router extends React.Component {

  componentDidMount() {

    if(this.props.location.pathname === '/') {

      this.props.setMarkdownToHome()

    } else {

      this.props.getMarkdown(this.props.s3Url, this.props.location.pathname)

    }

  }

  render = () => (

    <Layout>{this.props.markdown}</Layout>

  )
}

export default withRouter(connect(
  state => {
    return {
      markdown: state.markdown,
      s3Url:    state.s3Url
    }
  },
  {
    getMarkdown,
    setMarkdownToHome
  }
)(Router))
