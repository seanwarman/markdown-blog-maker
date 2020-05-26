import React from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'

import { getMarkdown } from '../actions/routing.js'
import Layout from './views/Layout.js'
import homepage from '../library/homepage.js'

class Router extends React.Component {
  componentDidMount() {
    console.log('this.props: ', this.props)
    this.props.getMarkdown(
      `${this.props.s3Url}${this.props.location.pathname}`
    )
  }
  render= () => (

    this.props.location.pathname === '/' ?
    <Layout>{homepage}</Layout>
    :
    <Layout>'# big header!'</Layout>



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
    getMarkdown
  }
)(Router))
