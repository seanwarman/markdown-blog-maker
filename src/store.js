import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import homepage from './markdown/homepage.js'
import errorpage from './markdown/errorpage.js'
import { API_PATH, S3_URL } from '../credentials.js'
import { loggerMiddleware } from './middleware.js'

const initialState = {
  apiPath: API_PATH,
  s3Url: S3_URL,
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
        posts: state.posts,
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
    thunkMiddleware,
    loggerMiddleware,
  )
)

