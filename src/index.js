import React from 'react'
import { render } from 'react-dom'
import store from './store.js'
import Root from './components/Root.js'

render(<Root store={store} />, document.getElementById('root'))
