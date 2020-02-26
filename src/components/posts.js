import marked from 'marked'
import hljs from 'highlight.js'

export async function postFromMd(basePath, filename) {
  const res = await fetch(basePath + '/' + filename)
  return await res.text()
}

export function post(text, posts) {

  // const datePosts = []
  // const designPosts = []

  // posts.forEach(postObj => {
  //   if(postObj.category !== 'design-patterns') datePosts.push(postObj)
  //   else designPosts.push(postObj)
  // })

  // datePosts.reverse()

  const postsByCat = {}

  posts.forEach(postObj => {
    if(!postsByCat[postObj.category]) postsByCat[postObj.category] = []
    postsByCat[postObj.category].push(postObj)
  })


  if(postsByCat.archive) {
    postsByCat.archive.reverse()
  }


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

      ${Object.keys(postsByCat).map(category => (`
          
        <ul>
          <h3>${category.slice(0,1).toUpperCase() + category.slice(1, category.length)}</h3>
          ${postsByCat[category].map(postObj => (`
            
            <li>
              <a href="${window.location.origin + `/${category}/` + postObj.title}">
                ${postObj.title}
              </a>
            </li>


          `)).join('')}
        </ul>

      `)).join('')}


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
