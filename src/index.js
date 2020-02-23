import marked from 'marked'
import hljs from 'highlight.js'
import homepage from './homepage.md'
import './style.css'
import 'highlight.js/styles/atelier-estuary-dark.css';

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

importPostPaths(require.context('./posts', false, /\.md$/), 'posts', posts)
importPostPaths(require.context('./design-patterns', false, /\.md$/), 'design-patterns', posts)

posts.sort((a,b) => {
  if(a.title < b.title) {
    return -1
  }
  if(a.title > b.title) {
    return 1
  }
  return 0
})

async function renderPost(filename, posts) {

  const res = await fetch(filename)
  const text = await res.text()
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
        <h3>Posts</h3>
        ${datePosts.map(postObj => `
          <li>
            <a href="${window.location.origin + '/posts/' + postObj.title}">
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


if(window.location.pathname === '/') {
  // A hardcoded homepage
  renderPost(homepage, posts)
} else {
  for(let postObj of posts) {
    if(window.location.pathname === '/posts/' + postObj.title) {
      renderPost(postObj.filename, posts)
      break
    }
    if(window.location.pathname === '/design-patterns/' + postObj.title) {
      renderPost(postObj.filename, posts)
      break
    }
  }

}

