export function getMarkdown(path) {
  return async function(dispatch) {

    console.log('path: ', path)

    dispatch(requestMarkdown())

    let markdown = ''
    let result

    try {
      result = await axios.get(path)
    } catch (err) {
      return dispatch(requestFailed('There was an error getting the posts', err))
    }

    console.log('result: ', result)


  }
}

export function requestMarkdown() {
  return {
    type: 'REQUEST_MARKDOWN',
  }
}

export function setMarkdown(markdown) {
  return {
    type: 'SET_MARKDOWN',
    markdown
  }
}

export function requestFailed(reason, errorResult) {
  return {
    type: 'REQUEST_FAILED',
    reason,
    errorResult
  }
}
