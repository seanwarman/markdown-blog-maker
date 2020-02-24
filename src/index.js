import marked from 'marked'
import hljs from 'highlight.js'
import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css';
import homepage from './homepage.js'

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

async function renderPost(text, posts) {

  const div = document.createElement('div');


  const datePosts = []
  const designPosts = []

  posts.forEach(postObj => {
    if(postObj.category !== 'design-patterns') datePosts.push(postObj)
    else designPosts.push(postObj)
  })

  datePosts.reverse()

  div.innerHTML = `

    ${
      window.location.pathname != '/' ?
      `<a 
        class="back"
        href="${window.location.origin}"
      >Home</a>`
      :
      ''
    }

    <div class="sider">

      <ul>
        <h3>Archive</h3>
        ${datePosts.map(postObj => `
          <li>
            <a href="${window.location.origin + '/archive/' + postObj.title}">
              ${postObj.title}
            </a>
          </li>
        `).join('')}
      </ul>

      <ul>
        <h3>Design Patterns</h3>
        ${designPosts.map(postObj => `
          <li>
            <a href="${window.location.origin + '/design-patterns/' + postObj.title}">
              ${postObj.title}
            </a>
          </li>
        `).join('')}
      </ul>

    </div>
    ${marked(text, {
      renderer: new marked.Renderer(),
      highlight: function(code, language) {
        const validLang = hljs.getLanguage(language) ? language : 'plaintext'
        return hljs.highlight(validLang, code).value
      }
    })}

  `

  document.body.appendChild(div);
}

async function renderPostFromMd(basePath, filename, posts) {
  const res = await fetch(basePath + '/' + filename)
  const text = await res.text()
  renderPost(text, posts)
}

if(window.location.pathname === '/') {
  // A hardcoded homepage
  renderPost(homepage, posts)
} else {
  for(let postObj of posts) {
    if(window.location.pathname === '/archive/' + postObj.title) {
      renderPostFromMd(__webpack_public_path__ + '/posts/archive', postObj.filename, posts)
      break
    }
    if(window.location.pathname === '/design-patterns/' + postObj.title) {
      renderPostFromMd(__webpack_public_path__ + '/posts/design-patterns', postObj.filename, posts)
      break
    }
  }

}

