# Seanblog

I've written a script that runs alongside webpack
build that uploads all changes to my s3 bucket using
the command

```
npm run sync
```

To do the routing just add index.html to the Error Document in
's3>seanblog.com>Properties>Static website hosting' 

Then you can render different functions depending on `window.location.pathname`
