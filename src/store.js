import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'

import { apiPath, s3Url } from './library/credentials.js'
import homepage from './library/homepage.js'

const initialState = {
  apiPath,
  s3Url,
  posts: undefined,
  status: '',
  reason: '',
  errorResult: undefined,
  pending: true,
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
        pending: true,
      })

    case 'RECIEVE_BUCKET_CONTENTS':
      return Object.assign({}, state, {
        status: 'Success',
        posts: action.posts,
        pending: false,
      })

    case 'REQUEST_MARKDOWN':
      return Object.assign({}, state, {
        status: 'Fetching markdown',
        pending: true,
      })

    case 'SET_MARKDOWN_TO_HOME':
      return Object.assign({}, state, {
        markdown: homepage
      })

    case 'SET_MARKDOWN':
      return Object.assign({}, state, {
        status:  'Success',
        markdown: action.markdown,
        pending: false,
      })


      // TODO extract some of these cases into a more general reducer
      // this one will be used all over the place.
    case 'REQUEST_FAILED':
      return Object.assign({}, state, {
        status: 'Failed',
        reason: action.reason,
        errorResult: action.errorResult,
        posts: [],
        pending: false,
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

