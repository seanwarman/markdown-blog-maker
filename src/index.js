import './style.css';
import showdown from 'showdown';

const importAll = (r) => r.keys().map(r)
const mdFiles = importAll(require.context('./posts', false, /\.md$/))
  .sort().reverse()



async function component(md) {

  for await (let file of mdFiles) {
    const res = await fetch(file.default)
    const text = await res.text()
    console.log('text :', text);
    const converter = new showdown.Converter();
    const div = document.createElement('div');
    div.innerHTML = converter.makeHtml(text);
    document.body.appendChild(div);
  }

}

console.log('window.location :', window.location);

if(window.location.pathname === '/') {
  component();
} 
if(window.location.pathname === '/cool') {
  component();
}
if(window.location.pathname === '/coolthings') {
  component()
}
