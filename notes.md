Here's how you might create some html using showdown.
```js
  const div = document.createElement('div');
  const conv = new showdown.Converter();
  const text = '# Some words';
  div.innerHTML = conv.makeHtml(text);
  return div;
```

Here's how we could use this alongside my custom fn
code to make markdown files that work alongside javascript.

First we'd have a special markdown js file. 

It would have a mixture of markdown and javascript, much
like jsx mixes xml with js. Then we pass that file through
our own converter to make it plain markdown then we pass the
markdown to showdown.

Our special file might look like.

```jsm
return (
  # {myTitle}

  {
    this.state.posts(post => (
      {post}
    ))
  }
)
```
