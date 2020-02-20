import './style.css';
import showdown from 'showdown';
import blog from './blog.md';

async function component() {

  const res = await fetch(blog);
  const text = await res.text();

  const converter = new showdown.Converter();
  const div = document.createElement('div');
  div.innerHTML = converter.makeHtml(text);

  document.body.appendChild(div);

}

console.log('window.location :', window.location);

if(window.location.pathname === '/') {
  component();
} 
if(window.location.pathname === '/cool') {
  component();
}
