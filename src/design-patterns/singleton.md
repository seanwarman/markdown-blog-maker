# Singleton

Creating a class that will only ever make one instance of an object.

The Singleton pattern allows us to create a class that creates an object
the first time we access it and then only returns that object from then
on.

In Javascript there's no in-built way to make properties 'private' or 
unaccessable like in many other *obejct oriented* languages but we can 
*act* as though properties are private (this is usually denoted with the
_underscore).

Singleton is just a single class object, it's very simple.

```js
const Singleton = {
  _firstInstance: null,
  _singleton: {
    stuff: 1
  },
  getInstance: function () {
    if (this._firstInstance === null) {
      this._firstInstance = Object.create(this._singleton)
    }

    return this._firstInstance;
  },
}
```

The getInstance method will only ever return the same instance of the 
_singleton parameter.

So if I create two objects using this class.

```js
let firstObject = Singleton.getInstance();
let secondObject = Singleton.getInstance();
```

Both of these will have the `stuff` param, and if I add 1 to `firstObject.stuff`.

```js
firstObject.stuff++;
```

It'll definitely add 1 to `secondObject.stuff` as well.

```js
console.log(firstObject.stuff);  // 2
console.log(secondObject.stuff); // 2
```

## Code

```js
const Singleton = {
  _firstInstance: null,
  _singleton: {
    stuff: 1
  },
  getInstance: function () {
    if (this._firstInstance === null) {
      this._firstInstance = Object.create(this._singleton)
    }

    return this._firstInstance;
  },
}

const thing1 = Singleton.getInstance();
const thing2 = Singleton.getInstance();
console.log('thing1.stuff :', thing1.stuff);
console.log('thing2.stuff :', thing2.stuff);
thing1.stuff = 2;
console.log('thing1.stuff :', thing1.stuff);
console.log('thing2.stuff :', thing2.stuff);
```
