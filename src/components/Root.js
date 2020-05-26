import React from 'react'
import PropTypes from 'prop-types'
import { Provider } from 'react-redux'
import Router from './Router.js'
import { withRouter, BrowserRouter, Route } from 'react-router-dom'

import './Root.css'

const Root = ({ store }) => (
  <Provider store={store}>
    <BrowserRouter>

      <Route path="/:path?">
        <Router />
      </Route>

    </BrowserRouter>
  </Provider>
)

Root.propTypes = {
  store: PropTypes.object.isRequired
}

export default Root
