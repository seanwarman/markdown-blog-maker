import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css'
import homepage from './homepage.js'
import { post, postFromMd } from './components/posts.js'
import { parseString } from 'xml2js'

// Now i'm fetching the folder structure from the s3 bucket
// webpack doesn't build the posts so I'm cheating here 
// by reading the posts folder so it does.
require.context('./posts', true, /\.md$/)

const path = 'http://seanblog.com.s3.eu-west-2.amazonaws.com/?list-type=2'

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
          category: obj.Key[0].slice(obj.Key[0].indexOf('/') + 1, obj.Key[0].lastIndexOf('/'))
        }
      ))
  })

  return posts

}


async function renderFromText(text, posts) {

  const div = document.createElement('div');
  div.innerHTML = post(text, posts)
  document.body.appendChild(div);
}

async function renderFromMd(basePath, filename, posts) {

  const text = await postFromMd(basePath, filename)

  const div = document.createElement('div');
  div.innerHTML = post(text, posts)
  document.body.appendChild(div);
}


async function render() {

  const posts = await getPosts(path)

  if(window.location.pathname === '/') {
    // A hardcoded homepage
    renderFromText(homepage, posts)
  } else {
    for(let postObj of posts) {

      if(window.location.pathname === `/${postObj.category}/` + postObj.title) {
        renderFromMd(__webpack_public_path__ + `/posts/${postObj.category}`, postObj.filename, posts)
        break
      }
    }

  }

}

render()
