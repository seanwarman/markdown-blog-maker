import { parseString } from 'xml2js'
import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css';
import homepage from './homepage.js'
import { post, postFromMd } from './components/posts.js'



// parseString(xml, function (err, result) {
//       console.dir(result);
// });


const path = 'http://seanblog.com.s3.eu-west-2.amazonaws.com/?list-type=2'




let posts = []

const importPostPaths = (context, category, array) => { 

  const paths = context.keys().map(path => path)

  if(paths.length > 0) {
    for(let path of paths) {
      array.push({ 
        filename: path.slice(2),
        title: path.slice(2, path.indexOf('.md')),
        category: category
      })
    }
  }
}

importPostPaths(require.context('./posts/archive', false, /\.md$/), 'archive', posts)
importPostPaths(require.context('./posts/design-patterns', false, /\.md$/), 'design-patterns', posts)

posts.sort((a,b) => {
  if(a.title < b.title) {
    return -1
  }
  if(a.title > b.title) {
    return 1
  }
  return 0
})

function renderFromText(text, posts) {

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


if(window.location.pathname === '/') {
  // A hardcoded homepage
  renderFromText(homepage, posts)
} else {
  for(let postObj of posts) {
    if(window.location.pathname === '/archive/' + postObj.title) {
      renderFromMd(__webpack_public_path__ + '/posts/archive', postObj.filename, posts)
      break
    }
    if(window.location.pathname === '/design-patterns/' + postObj.title) {
      renderFromMd(__webpack_public_path__ + '/posts/design-patterns', postObj.filename, posts)
      break
    }
  }

}

