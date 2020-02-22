import './style.css';
import showdown from 'showdown';
import homepage from './homepage.md'

console.log(this)

const importAll = (r) => r.keys().map(r)
const posts = importAll(require.context('./posts', false, /\.md$/))
  .sort().reverse()

async function renderPost(md, paths) {
  const res = await fetch(md)
  const text = await res.text()
  const converter = new showdown.Converter();

  const div = document.createElement('div');

  div.innerHTML = `

    ${
      window.location.pathname != '/' ?
        `<a 
        class="back"
        href="${window.location.origin}"
      >back</a>`
        :
      ''
    }

    <div class="sider">

      <ul>
        <h3>Posts</h3>
        ${paths.map(path => `
          <li>
            <a href="${window.location.origin + '/' + path}">
              ${path}
            </a>
          </li>
        `).join('')}
      </ul>

    </div>

    ${converter.makeHtml(text)}

  `

  document.body.appendChild(div);
}

let index = 0
let paths = []
let fileNames = []

for (let file of posts) {
  paths.push(file.default.slice(0, file.default.indexOf('.md')))
}

if(window.location.pathname === '/') {
  // A hardcoded homepage
  renderPost(homepage, paths)
} else {
  for(let path of paths) {
    if(window.location.pathname === '/' + path) {
      renderPost(path+'.md', paths)
      break
    }
  }

}

