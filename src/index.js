import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css'
import homepage from './homepage.js'
import { post, postFromMd } from './components/posts.js'
import { parseString } from 'xml2js'
import { url, apiPath } from '../credentials.js'

// Now i'm fetching the folder structure from the s3 bucket
// webpack doesn't build the posts so I'm cheating here 
// by reading the posts folder so it does.
require.context('./posts', true, /\.md$/)

const path = apiPath

async function getPosts(path) {
  let posts = []
  let res = await fetch(path)

  let text = await res.text()

  parseString(text, function (err, result) {

    posts = result.ListBucketResult.Contents
      .filter(obj => /posts/.test(obj.Key))
      .map(obj => ( 
        {
          filename: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1),
          title: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md')),
          uri: encodeURIComponent(obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md'))),
          category: obj.Key[0].slice(obj.Key[0].indexOf('/') + 1, obj.Key[0].lastIndexOf('/')),
          updated: obj.LastModified[0],
        }
      ))
  })

  return posts

}

function renderLoading() {
  const loading = document.createElement('div')

  loading.innerHTML = `
    <h1 id="loading-text">loading...</h1>
  `

  document.body.appendChild(loading)
  return loading
}

async function renderFromText(text, posts, loadingElement) {

  if(loadingElement) document.body.removeChild(loadingElement)

  const div = document.createElement('div');
  div.innerHTML = post(text, posts)
  document.body.appendChild(div);
  return div
}

async function renderFromMd(basePath, filename, posts, loadingElement) {

  const text = await postFromMd(basePath, filename)

  if(loadingElement) document.body.removeChild(loadingElement)

  const div = document.createElement('div');
  div.innerHTML = post(text, posts)
  document.body.appendChild(div);
  return div
}


async function render(loading) {

  const posts = await getPosts(path)

  console.log(posts)

  if(window.location.pathname === '/') {
    // A hardcoded homepage
    renderFromText(homepage, posts, loading)
  } else {
    for(let postObj of posts) {

      if(window.location.pathname === `/${postObj.category}/` + postObj.uri) {
        console.log(postObj)
        renderFromMd(__webpack_public_path__ + `/posts/${postObj.category}`, postObj.filename, posts, loading)
        break
      }
    }

  }

}

const loading = renderLoading()
render(loading)
