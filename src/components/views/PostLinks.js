import React from 'react'
import { connect } from 'react-redux'
import { getMarkdown } from '../../actions/markdown.js'
import { Link, withRouter } from 'react-router-dom'

function sortPosts(posts, category) {

  let sortBy = ''

  // NOTE this only works because 'updated' is a Date object.
  if(category === 'archive') {

    sortBy = 'updated'
    return posts[category].sort((a,b) => b[sortBy] - a[sortBy])

  }

  return posts[category]

}

function PostLinks({
  posts,
  category,
  getMarkdown,
  s3Url
}) {
    return sortPosts(posts, category).map((postsObj, i) => (
      postsObj.filename.length > 0 &&

      <li key={i}>
        <Link
          to={`/${category}/${postsObj.uri}`} 
          onClick={() => getMarkdown(s3Url, `/${category}/${postsObj.uri}`)}
        >
          {postsObj.title}
        </Link>
      </li>
    ))
  }

export default connect(
  state => ({
    s3Url: state.s3Url,
    posts: state.posts
  }),
  {
    getMarkdown
  }
)(PostLinks)
