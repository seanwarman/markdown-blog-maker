import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import { apiPath, s3Url } from './library/endpoints.js'
import homepage from './library/homepage.js'
import errorpage from './library/errorpage.js'

const initialState = {
  apiPath,
  s3Url,
  posts: undefined,
  status: '',
  reason: '',
  errorResult: undefined,
  loading: true,
  markdown: homepage,
}

function enhancer(state, action) {
  if(typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {

    case 'REQUEST_BUCKET_CONTENTS':
      return Object.assign({}, state, {
        status: 'Fetching posts...',
        loading: true,
      })

    case 'RECIEVE_BUCKET_CONTENTS':
      return Object.assign({}, state, {
        status: 'Success',
        posts: action.posts,
        loading: false,
      })

    case 'REQUEST_MARKDOWN':
      return Object.assign({}, state, {
        status: 'Fetching markdown',
        loading: true,
      })

    case 'SET_MARKDOWN_TO_HOME':
      return Object.assign({}, state, {
        markdown: homepage,
        loading: false,
      })

    case 'SET_MARKDOWN':
      return Object.assign({}, state, {
        status:  'Success',
        markdown: action.markdown,
        loading: false,
      })


      // TODO extract some of these cases into a more general reducer
      // this one will be used all over the place.
    case 'REQUEST_FAILED':
      return Object.assign({}, state, {
        status: 'Failed',
        reason: action.reason,
        errorResult: action.errorResult,
        posts: [],
        loading: false,
        markdown: errorpage,
      })

    default:
      return state

  }

}


export default createStore(
  enhancer,
  applyMiddleware(
    thunkMiddleware
  )
)

