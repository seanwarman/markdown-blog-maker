import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store.js'

import 'highlight.js/styles/atelier-estuary-dark.css'
import './style.css'

// Because i'm fetching the folder structure from the s3 bucket
// webpack doesn't build the posts so I'm cheating here 
// by reading the posts folder so it does.
require.context('./posts', true, /\.md$/)


// █▀▀ █▀▀█ █▀▄▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
// █░░ █░░█ █░▀░█ █░░█ █░░█ █░░█ █▀▀ █░░█ ░░█░░ ▀▀█
// ▀▀▀ ▀▀▀▀ ▀░░░▀ █▀▀▀ ▀▀▀▀ ▀░░▀ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀

import Layout from './components/Layout.js'


class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Layout>
        </Layout>
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
