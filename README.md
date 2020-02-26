# Seanblog

This is a webpage that acts like a CMS of sorts. When you build it with
webpack it will carry over a `posts` directory that will then map all
it's contents onto the webpage as blog posts.

Each folder in `posts` get's a title on the right-hand side of the page
with it's contents listed as links to each post.

All I have to do at this point is make a folder anywhere on my computer
with the name `posts` then any markdown file I put in there will appear
on the website when I upload the folder using `s3 sync`.

The webpage will pick up on any new folder/file in `posts` in my s3 bucket.

You can find the project hosted at:

[Seanblog](http://seanblog.com.s3-website.eu-west-2.amazonaws.com/)
