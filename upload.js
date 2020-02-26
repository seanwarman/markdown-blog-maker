const { AWS_ACCESS_KEY_ID, AWS_SECRET_ACCESS_KEY } = require('./credentials.js')
const { exec } = require('child_process')

exec(`export AWS_ACCESS_KEY_ID="${AWS_ACCESS_KEY_ID}"; export AWS_SECRET_ACCESS_KEY="${AWS_SECRET_ACCESS_KEY}"; aws s3 sync ./dist s3://seanblog.com --acl public-read`, (e, stdout, stderr) => {
  if(e) {
    console.log('There was an error syncing with the s3')
    console.log(stderr)
    return
  }

  console.log(stdout)
  console.log('Done!')

})
