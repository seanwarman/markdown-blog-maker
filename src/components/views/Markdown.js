import React from 'react'
import { withRouter } from 'react-router-dom'
import marked from 'marked'
import hljs from 'highlight.js'
import Interweave from 'interweave'

const renderMarkDownToHTMLString = markdown => (

  marked(markdown, {
    renderer: new marked.Renderer(),
    highlight: function(code, language) {
      const validLang = hljs.getLanguage(language) ? language : 'plaintext'
      return hljs.highlight(validLang, code).value
    }
  })

)

function Markdown({ children: md }) {

  return <Interweave
    content={renderMarkDownToHTMLString(md)}
  ></Interweave>

}

export default Markdown
