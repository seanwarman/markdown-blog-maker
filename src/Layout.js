import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css'
import homepage from './homepage.js'
import { post, postFromMd } from './posts.js'
import { parseString } from 'xml2js'
import { apiPath } from '../credentials.js'

import React from 'react'
import { connect } from 'react-redux'
import './style.css'
import axios from 'axios'

// Because i'm fetching the folder structure from the s3 bucket
// webpack doesn't build the posts so I'm cheating here 
// by reading the posts folder so it does.
require.context('./posts', true, /\.md$/)

class Layout extends React.Component {

  componentDidMount = async () => {

    console.log('apiPath: ', apiPath)

    let res

    try {
      res = await axios.get(apiPath)
    } catch (err) {
      console.log(err)
    }

    console.log('res: ', res)

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

        THE MARKDOWN GOES HERE

        <div className="sider">
          <ul>
            <h3>Category Text</h3>
            <li><a href="#">One link</a></li>
            <li><a href="#">Second Link</a></li>
            <li><a href="#">Another link</a></li>
          </ul>

        </div>



      </div>

    )
  }
}

export default connect(
  state => ({}),
  {}
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
