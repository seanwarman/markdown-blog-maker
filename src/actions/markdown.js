import axios from 'axios'

export function getMarkdown(s3Url, path) {

  return async function(dispatch) {

    dispatch(requestMarkdown())

    let markdown = ''
    let result

    try {
      result = await axios.get(convertPathNameToS3Url(s3Url, path))
    } catch (err) {
      return dispatch(requestFailed('No post', err))
    }


    window.scrollTo({top: 0})

    return dispatch(setMarkdown(result.data))

  }
}

function convertPathNameToS3Url(s3Url, path) {
  return `${s3Url}/posts${path.replace(/\s/g, '+')}.md`
}

export function setMarkdownToHome() {
  return {
    type: 'SET_MARKDOWN_TO_HOME'
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
