# Markdown Blog Maker

This is a webpage that acts like a CMS of sorts. When you build it with
webpack it will carry over a `posts` directory that will then map all
it's contents onto the webpage as blog posts.

Each folder in `posts` get's a title on the right-hand side of the page
with it's contents listed as links to each post.

All you have to do at this point is make a folder anywhere on your computer
with the name `posts` then any markdown file you put in there will appear
on the website when you upload the folder using `s3 sync`.

The webpage will pick up on any new folder/file in `posts` in it's s3 bucket.

You can find my version the project hosted at:

[stuffthatstough.com](https://www.stuffthatstough.com)

This project requires a file in `src/library/endpoints.js` that
has the name of the s3Url and an apiPath for the S3 Bucket's API.

```js
module.exports = {
  apiPath: `http://www.mybucket.com.s3.eu-west-2.amazonaws.com/?list-type=2`,
  s3Url: 'https://s3.eu-west-2.amazonaws.com/www.mybucket.com'
}
```
