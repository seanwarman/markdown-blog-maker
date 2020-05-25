import thunkMiddleware from 'redux-thunk'
import { createStore, applyMiddleware } from 'redux'
import { apiPath } from '../credentials.js'

const initialState = {
  apiPath,
  posts: undefined,
  status: '',
  reason: '',
  errorResult: undefined,
}

function bucketRequest(state, action) {
  if(typeof state === 'undefined') {
    return initialState
  }

  switch(action.type) {

    case 'REQUEST_BUCKET_CONTENTS':
      return Object.assign({}, state, {
        status: 'Fetching posts...'
      })

    case 'RECIEVE_BUCKET_CONTENTS':
      return Object.assign({}, state, {
        status: 'Success',
        posts: action.posts
      })

    case 'REQUEST_FAILED':
      return Object.assign({}, state, {
        status: 'Failed',
        reason: action.reason,
        errorResult: action.errorResult,
        posts: [],
      })

    default:
      return state

  }

}

export default createStore(
  bucketRequest,
  applyMiddleware(
    thunkMiddleware
  )
)

