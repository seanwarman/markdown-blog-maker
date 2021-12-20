import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMarkdown, setMarkdownToHome } from '../actions/markdown.js'
import Layout from './views/Layout.js'
import { Helmet } from 'react-helmet'

const description = `
What are our stories trying to tell us?  After recently reading the Bible and
not (yet) a Christian, I'm rediscovering many of my favourite movies and
stories. This is a place where I write about them.
`

function Router({
  s3Url,
  getMarkdown,
  setMarkdownToHome,
  location,
  match
}) {

  useEffect(() => {

    if(location.pathname === '/') {

      setMarkdownToHome()

    } else {

      getMarkdown(s3Url, location.pathname)

    }

  }, [location])


  const { title = 'Window on the Wheel' } = match.params


  return <>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description.replace(/\n/g, ' ')} />
    </Helmet>

    <Layout />
  </>
}

export default withRouter(connect(
  state => {
    return {
      s3Url: state.s3Url
    }
  },
  {
    getMarkdown,
    setMarkdownToHome
  }
)(Router))
