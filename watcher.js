const fs = require('fs')
const { exec } = require('child_process')

let timeOutId

fs.watch('./dist', { encoding: 'buffer'}, (eventType, fileName) => {

  // Put the command on a gate timer so we don't sync every single build change
  clearTimeout(timeOutId)

  if(fileName) {

    timeOutId = setTimeout(() => {

      console.log('Syncing...')

      // Call aws sync in the command line once webpack has finished building.
      exec('aws s3 sync ./dist s3://seanblog.com --acl public-read', (e, stdout, stderr) => {
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
