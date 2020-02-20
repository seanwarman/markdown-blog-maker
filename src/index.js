import './style.css';
import showdown from 'showdown';

const importAll = (r) => r.keys().map(r)
const mdFiles = importAll(require.context('./posts', false, /\.md$/))
  .sort().reverse()

async function component(md) {
  const res = await fetch(md)
  const text = await res.text()
  const converter = new showdown.Converter();

  const div = document.createElement('div');
  div.innerHTML = converter.makeHtml(text);
  document.body.appendChild(div);
}

function routes(paths) {
  const ul = document.createElement('ul');
  ul.innerHTML = `
    ${paths.map(path => `<li><a href="${window.location.href + path}">${path}</a></li>`).join('')}
  `

  document.body.appendChild(ul);

}

let index = 0
let paths = []
let fileNames = []

for (let file of mdFiles) {
  paths.push(file.default.slice(0, file.default.indexOf('.md')))
}

if(window.location.pathname === '/') {
  // A hardcoded homepage
  routes(paths)
} else {
  for(let path of paths) {
    if(window.location.pathname === '/' + path) {
      component(path+'.md')
      break
    }
  }
}




