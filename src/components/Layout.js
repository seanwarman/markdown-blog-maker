// import { post, postFromMd } from './posts.js'


import homepage from '../homepage'


import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { listPosts } from '../actions/bucketRequest.js'
import { apiPath } from '../../credentials.js'

import Markdown from './Markdown.js'

class Layout extends React.Component {

  componentDidMount = async () => {

    this.props.listPosts(apiPath)



  }

  render = () => {

    return (
      <div>
        {
          window.location.origin != '/' &&
          <a 
            className="back"
            href={window.location.origin}
          >Home</a>
        }

        <Markdown>
          {homepage}
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

export default connect(
  state => ({
    posts:  state.posts,
    status: state.status,
    reason: state.reason
  }),
  {
    listPosts
  }
)(Layout)

// const path = apiPath

// async function getPosts(path) {
//   let posts = []

//   let res

//   try {
//     res = await fetch(path)

//   } catch (err) {
//     console.log('There was an error fetching the path: ', err)
//   }


//   let text = await res.text()

//   parseString(text, function (err, result) {

//     if(err) {
//       posts = null
//       return
//     }

//     posts = result.ListBucketResult.Contents
//       .filter(obj => /posts/.test(obj.Key))
//       .map(obj => ( 
//         {
//           filename: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1),
//           title: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md')),
//           uri: encodeURIComponent(obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md'))),
//           category: obj.Key[0].slice(obj.Key[0].indexOf('/') + 1, obj.Key[0].lastIndexOf('/')),
//           updated: new Date(obj.LastModified[0]),
//         }
//       ))
//   })

//   return posts

// }

// function renderLoading() {
//   const loading = document.createElement('div')

//   loading.innerHTML = `
//     <h1 id="loading-text">loading...</h1>
//   `

//   document.body.appendChild(loading)
//   return loading
// }

// async function renderFromText(text, posts, loadingElement) {

//   if(loadingElement) document.body.removeChild(loadingElement)

//   const div = document.createElement('div');

//   if(posts) div.innerHTML = post(text, posts)

//   document.body.appendChild(div);
//   return div
// }

// async function renderFromMd(basePath, filename, posts, loadingElement) {

//   const text = await postFromMd(basePath, filename)

//   if(loadingElement) document.body.removeChild(loadingElement)

//   const div = document.createElement('div');
//   div.innerHTML = post(text, posts)
//   document.body.appendChild(div);
//   return div
// }


// async function render(loading) {


//   const posts = await getPosts(path)

//   if(window.location.pathname === '/') {

//     // A hardcoded homepage
//     renderFromText(homepage, posts, loading)

//   } else {
//     for(let postObj of posts) {

//       if(window.location.pathname === `/${postObj.category}/` + postObj.uri) {
//         renderFromMd(__webpack_public_path__ + `/posts/${postObj.category}`, postObj.filename, posts, loading)
//         break
//       }
//     }

//   }

// }

// const loading = renderLoading()
// render(loading)
