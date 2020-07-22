import React from 'react'
import { connect } from 'react-redux'
import PostLinks from './PostLinks.js'

function Sider({
  posts,
  status
}) {
  return (
  <div className="sider">
    { 
      typeof posts === 'object' &&

        Object.keys(posts).map(category => (

        <ul key={category}>
          <h3>
            {category.slice(0,1).toUpperCase() + category.slice(1, category.length)}
          </h3>

          <PostLinks category={category} />

        </ul>

        ))

    }
  </div>
  )
}

export default connect(
  state => ({
    posts:   state.posts,
    status:  state.status,
  })
)(Sider)
