import marked from 'marked'
import hljs from 'highlight.js'

export async function postFromMd(basePath, filename) {
  const res = await fetch(basePath + '/' + filename)
  const text = await res.text()
  return text
  // renderPost(text, posts)
}

export async function post(text, posts) {

  const datePosts = []
  const designPosts = []

  posts.forEach(postObj => {
    if(postObj.category !== 'design-patterns') datePosts.push(postObj)
    else designPosts.push(postObj)
  })

  datePosts.reverse()

  return `

    ${window.location.pathname != '/' ?
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

}
