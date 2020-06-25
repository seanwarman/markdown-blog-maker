# Markdown Blog Maker

This is a webpage that acts like a CMS of sorts. When you build it with
webpack it will carry over a `bucket/posts` directory that will then map all
it's contents onto the webpage as blog posts.

Each folder in `bucket/posts` get's a title on the right-hand side of the page
with it's contents listed as links to each post.

All you have to do at this point is make a folder anywhere on your computer
with the name `bucket/posts` then any markdown file you put in there will appear
on the website when you upload the folder using `s3 sync`.

The webpage will pick up on any new folder/file in `bucket/posts` in it's s3 bucket.

You can find my version of the project hosted at:

[stuffthatstough.com](https://www.stuffthatstough.com)

## How To

It shouldn't take too much coding to have this project re-purposed for
any kind of blog or docs website.

All the styling is done from `src/components/Root.css` and you can add 
your own banner image to the class `.banner`.

Then add a favicon file to `public/favicon.ico`.

Add a file in `src/library/endpoints.js` that
has the name of the s3Url and an apiPath for the S3 Bucket's API.

```js
module.exports = {
  apiPath: 'https://d206587hfph0mw.cloudfront.net/',
  s3Url:   'https://s3.eu-west-2.amazonaws.com/www.mybucket.com'
}
```

The S3 Bucket configuration needs to be set to public with the following
access origin xml in the CORS configuration...

```xml
<?xml version="1.0" encoding="UTF-8"?>
<CORSConfiguration xmlns="http://s3.amazonaws.com/doc/2006-03-01/">
<CORSRule>
    <AllowedOrigin>*</AllowedOrigin>
    <AllowedMethod>GET</AllowedMethod>
    <AllowedHeader>*</AllowedHeader>
</CORSRule>
</CORSConfiguration>
```

...and the Bucket Policy json should look like...

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
      "Action": "s3:GetObject",
      "Resource": "arn:aws:s3:::www.mybucket.com/*"
    },
    {
      "Sid": "PublicReadGetObject",
      "Effect": "Allow",
      "Principal": {
        "AWS": "*"
      },
      "Action": "s3:ListBucket",
      "Resource": "arn:aws:s3:::www.mybucket.com"
    }
  ]
}
```

## Uploading

Make a directory for your blog with a `bucket` and a `posts` directory.

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
  S3_URL: 's3://mybucket'
}
```

Copy `uploadblog` from the root of this project into
`my-bucket` then run it from your terminal:

```posix
./uploadposts
```

**Note**: if you get a 'Permission denied' error after trying
to run `uploadposts`, do this to make it an executable file:

```posix
chmod +x uploadposts
```

## Pictures

Add a new dir to the bucket called pictures `my-blog/bucket/pictures`.
Now you can add any picture to that folder and access it from your
blog post.

To get to a picture from the post add it's relative path into the 
markdown.

```md
![Avatar](../../pictures/avatar.png)
```
