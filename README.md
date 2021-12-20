# Markdown Blog Maker

This is a super-simple CMS of sorts. It works by using markdown files and an S3
bucket structure to list and show content through a react and webpack browser
app.

You can find my version of the project hosted at:

[stuffthatstough.com](https://www.stuffthatstough.com)

## Dev Environment and Scripts

To run dev environment on localhost:3000 (doesn't build anything into *dist/*):

```sh
npm start
```

To build the project into the *dist/* dir with webpack:

```sh
npm run build
```

## How To

It shouldn't take too much coding to have this project re-purposed for
any kind of blog or docs website.

Create a bucket in S3 named after the hostname of your site. For example I own
the host "stuffthatstough" so I'll make a bucket called
"www.stuffthatstough.com".

Go to the **Static Website Hosting** option and add "index.html" as the index
document *and* the error document.

This allows the bucket to serve the index file you give it once the app has
been built.

## Bucket Policy

The Bucket Policy json should look like...

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": [
        "s3:GetObject",
        "s3:ListBucket"
      ],
      "Resource": [
        "arn:aws:s3:::www.stuffthatstough.com/*",
        "arn:aws:s3:::www.mybucket.com"
      ]
    }
  ]
}
```

## CORS Setting

Make the bucket publicly accessable and also give it a CORS setting as follows:

```json
[
    {
        "AllowedHeaders": [
            "*"
        ],
        "AllowedMethods": [
            "GET",
            "HEAD"
        ],
        "AllowedOrigins": [
            "*"
        ],
        "ExposeHeaders": []
    }
]
```

## Credentials

You'll use a few different endpoints related to the bucket. Make a file called
*crendentials.js* and add this to it:

```js
module.exports = {
  AWS_ACCESS_KEY_ID: '<my-aws-access-key-id>',
  AWS_SECRET_ACCESS_KEY: '<my-aws-secret-access-key>',
  BUCKET: 'www.stuffthatstough.com',
  API_PATH: 'http://www.stuffthatstough.com.s3.eu-west-2.amazonaws.com/',
  S3_URL: 'http://s3.eu-west-2.amazonaws.com/www.stuffthatstough.com'
}
```

**[Note the trailing "/" on the API_PATH value]**

The first three values here are for deploying the app to S3 when you build. You don't need these to have the app running
so if you can't add them, make sure to go into *webpack.config.js* and comment out the S3 plugin block:

```js
    //...

    new S3Plugin({
      s3Options: {
        accessKeyId: AWS_ACCESS_KEY_ID,
        secretAccessKey: AWS_SECRET_ACCESS_KEY,
        region: 'eu-west-1'
      },
      s3UploadOptions: {
        Bucket: BUCKET,
        ContentType(fileName) {
          if(/\.css/.test(fileName)) {
            return 'text/css'
          }
          if(/\.js/.test(fileName)) {
            return 'text/javascript'
          }
        }
      },
      directory: 'dist'
    })

    // ...
```

## Deployment

Run `npm run build` which will build the app to the *dist* folder.

If you've commented out the S3 plugin you'll then have to go into your s3
bucket and upload the contents of *dist* into the bucket. If it's worked you'll
be able to see the homepage when you go to the bucket address.

## Adding Blog Posts

Make some folders in your bucket: *bucket/posts*.

Now any folder you make in *posts* will be listed as a title in the sidebar of
the webpage. Any markdown file you put into that folder will be listed as a
link under it's title.

## Posts During Development

The dev project will look to the hosted bucket for it's content so anything
already in there will show on your local version, not ideal but there you go.

## Uploading Blog Posts

Install `awscli`. 

for MacOS you can use `brew`:

```posix
brew install awscli
```

For other distros see [the AWS instructions](https://docs.aws.amazon.com/cli/latest/userguide/getting-started-install.html)

Once that's installed, make a directory for your blog with a `bucket` and a
`posts` directory anywhere on your computer.

```bash
mkdir my-blog/bucket/posts
```

Any file inside `posts` will be uploaded to the blog with a listed 
heading named after the folder it's in. For example to make a list of posts
called Archive:

### Archive

- 2020-02-01
- 2020-01-01
- 2019-12-31

The posts folder would look like:

```
my-blog
  \
   bucket
    \
     posts
      \
       archive
        \
         2020-02-01.md
         2020-01-01.md
         2019-12-31.md
```

Put a file into `my-blog` called `credentials.js` with your AWS Credentials and
the S3 url of your bucket.

```js
module.exports = {
  AWS_ACCESS_KEY_ID: '123456789', 
  AWS_SECRET_ACCESS_KEY: '12456789', 
  BUCKET: 'www.stuffthatstough.com'
}
```

Copy `uploadblog` from the root of this project into
`my-bucket` then run it from your terminal:

```posix
./uploadblog
```

**Note**: if you get a 'Permission denied' error after trying
to run `uploadblog`, do this to make it an executable file:

```posix
chmod +x uploadblog
```

## Pictures

Add a new dir to the bucket called pictures.
Now you can add any picture to that folder and access it from your
blog post.

To get to a picture from the post add it's relative path into the 
markdown.

```md
![Avatar](../../pictures/avatar.png)
```
