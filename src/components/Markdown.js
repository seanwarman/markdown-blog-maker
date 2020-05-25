import React, { Component } from 'react'
import marked from 'marked'
import hljs from 'highlight.js'

export default class Markdown extends Component {

  renderMarkDownToHTMLString = markdown => {
    return {
      __html: marked(markdown, {
        renderer: new marked.Renderer(),
        highlight: function(code, language) {
          const validLang = hljs.getLanguage(language) ? language : 'plaintext'
          return hljs.highlight(validLang, code).value
        }
      })
    }
  }

  render() {

    return <div
      dangerouslySetInnerHTML={this.renderMarkDownToHTMLString(this.props.children)}
    ></div>
  }

}

