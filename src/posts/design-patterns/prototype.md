# Prototype
Make an exact copy of an object. This actually happens whenever you make an object in Javascript so it's not really relevent to use this pattern.

It's interesting to know though that JS does this whenever you assign an object from one to another. Every object has a prototype parameter that contains a set of functions that are available to all objects of the same type.

## Code

```js
const Animal = {
  _type: null,
  init: function(type) {
    if(this._type) {
      console.log(this._type + ' is already initialised');
      return;
    }
    this._type = type;
  },
  makeCopy() {
    console.log(this._type + ' is made');
    return Object.create(this);
  }
}

const Sheep = Object.create(Animal);
Sheep.init('Sheep');

const Sheep2 = Sheep.makeCopy();
```
