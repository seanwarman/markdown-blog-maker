import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { connect } from 'react-redux'
import { getMarkdown, setMarkdownToHome } from '../actions/markdown.js'
import Layout from './views/Layout.js'
import { Helmet } from 'react-helmet'

const description = `
My name's Sean Warman and I've been a developer since 2018.
Here's some tips and tricks I've learned, partly so I
don't forget them myself.
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


  const { title = 'Stuff That\'s Tough' } = match.params


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
