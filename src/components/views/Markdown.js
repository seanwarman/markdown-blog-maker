import React from 'react'
import marked from 'marked'
import hljs from 'highlight.js'

export default function Markdown({ children: md }) {

  const renderMarkDownToHTMLString = markdown => (
  {
    __html: marked(markdown, {
      renderer: new marked.Renderer(),
      highlight: function(code, language) {
        console.log('language: ', language)
        const validLang = hljs.getLanguage(language) ? language : 'plaintext'
        return hljs.highlight(validLang, code).value
      }
    })
  }
  )

  return (
    <div
      dangerouslySetInnerHTML={renderMarkDownToHTMLString(md)}
    ></div>
  )
}
