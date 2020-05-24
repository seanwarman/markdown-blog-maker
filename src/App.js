import React from 'react'
import ReactDOM from 'react-dom'
import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import './style.css'



// █▀▀█ █▀▀ █▀▀▄ █░░█ █▀▀ █▀▀ █▀▀█ █▀▀
// █▄▄▀ █▀▀ █░░█ █░░█ █░░ █▀▀ █▄▄▀ ▀▀█
// ▀░▀▀ ▀▀▀ ▀▀▀░ ░▀▀▀ ▀▀▀ ▀▀▀ ▀░▀▀ ▀▀▀

import crimeGraph from './reducers'



// █▀▀ █▀▀█ █▀▄▀█ █▀▀█ █▀▀█ █▀▀▄ █▀▀ █▀▀▄ ▀▀█▀▀ █▀▀
// █░░ █░░█ █░▀░█ █░░█ █░░█ █░░█ █▀▀ █░░█ ░░█░░ ▀▀█
// ▀▀▀ ▀▀▀▀ ▀░░░▀ █▀▀▀ ▀▀▀▀ ▀░░▀ ▀▀▀ ▀░░▀ ░░▀░░ ▀▀▀

import Layout from './Layout.js'



const store = createStore(
  crimeGraph,
  applyMiddleware(
    thunkMiddleware
  )
)


export default class App extends React.Component {

  render() {
    return (
      <Provider store={store}>
        <Layout />
      </Provider>
    )
  }
}

ReactDOM.render(<App />, document.getElementById('root'))
