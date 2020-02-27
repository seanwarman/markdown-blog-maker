const fs = require('fs')
const { exec } = require('child_process')
const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY, url } = require('./credentials.js')

let timeOutId

fs.watch('./dist', { encoding: 'buffer'}, (eventType, fileName) => {

  // Put the command on a gate timer so we don't sync every single build change
  clearTimeout(timeOutId)

  if(fileName) {

    timeOutId = setTimeout(() => {

      console.log('Syncing...')

      // Call aws sync in the command line once webpack has finished building.
      exec(`export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}"; export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"; aws s3 sync ./dist ${url} --acl public-read`, (e, stdout, stderr) => {
        if(e) {
          console.log('There was an error syncing with the s3')
          console.log(stderr)
          return
        }

        console.log(stdout)
        console.log('Done!')

      })

    }, 200)
  }
})

exec('npm run watch', (e, stdout, stderr) => {
  if(e) {
    console.log('There was an error running watch')
    console.log(stderr)
    return
  }

  console.log(stdout)

})
