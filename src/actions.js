import { parseString } from 'xml2js'
import axios from 'axios'

export function listPosts(path) {

  return async function(dispatch) {


    dispatch(requestBucketContents())

    let posts = []
    let result

    try {
      result = await axios.get(path)
    } catch (err) {
      return dispatch(requestFailed('There was an error getting the posts', err))
    }




    // TODO: this shouild be split out into a reducer type like bucketPosts.js 
    // or something.

    let dataString = ''

    if(result.data) dataString = result.data
    else return dispatch(requestFailed('No data param on the fetched result', result))

    let error

    // Convert the string into an array using xml2js
    parseString(dataString, (err, res) => {

      if(err) error = err 
      else posts = res.ListBucketResult.Contents
        .filter(obj => /posts/.test(obj.Key))
        .map(obj => ( 
          {
            filename: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1),
            title: obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md')),
            uri: encodeURIComponent(obj.Key[0].slice(obj.Key[0].lastIndexOf('/') + 1, obj.Key[0].indexOf('.md'))),
            category: obj.Key[0].slice(obj.Key[0].indexOf('/') + 1, obj.Key[0].lastIndexOf('/')),
            updated: new Date(obj.LastModified[0]),
          }
        )
      )
    })

    if(error) return dispatch(requestFailed(
      'Error parsing the bucket API result with xml2js',
      error
    ))

    let postsByCat = {}

    posts.forEach(postObj => {
      if(!postsByCat[postObj.category]) postsByCat[postObj.category] = []
      postsByCat[postObj.category].push(postObj)
    })


    if(postsByCat.archive) {
      postsByCat.archive.sort((a,b) => b.updated - a.updated)
    }
 

    return dispatch(recieveBucketContents(postsByCat))

  }
}


export function requestFailed(reason, errorResult) {
  return {
    type: 'REQUEST_FAILED',
    reason,
    errorResult
  }
}

export function requestBucketContents() {
  return {
    type: 'REQUEST_BUCKET_CONTENTS'
  }
}

export function recieveBucketContents(posts) {
  return {
    type: 'RECIEVE_BUCKET_CONTENTS',
    posts
  }
}

