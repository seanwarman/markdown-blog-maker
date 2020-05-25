import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import Layout from './views/Layout.js'

import homepage from '../library/homepage.js'

const Router = () => (
  <BrowserRouter>

    <Route path="/:filter?">
      <Layout>{homepage}</Layout>
    </Route>

  </BrowserRouter>
)

export default Router
