# Decorator

The Decorator allows you to add functionality to an object at run-time. 

If we where to create a pizza order, we might want to be able to add 
different toppings on the pizza depending on a customer's order.

Using inheritance would quickly create a lot of work for us. Say we made
a Pizza class and then created a sub-class called Hawian that has all the
toppings that go on a hawian pizza; we'd have to then make a nearly 
infinate amount of sub-classes to implement all the different variations 
of pizza toppings for all the different types of pizza topping 
combinations.

Decorator is a great example of *composition over inheritance*.

It works by creating an object that can be infinitely extended to give 
it's methods extra capabilities.

We start of with a decorator object:

```js
const ToppingDecorator = {
  _newPizza: null,
  init(newPizza) {
    this._newPizza = Object.create(newPizza);
  },
  getIngredients() {
    return this._newPizza.getIngredients();
  },
  getCost() {
    return this._newPizza.getCost();
  }
}
```

Then we create any number of objects that basically copy the decorator's 
structure while adding on extra data to it's methods:

```js
const Mozzarella = {
  _newPizza: null,
  init(newPizza) {
    this._newPizza = Object.create(newPizza);
    console.log('Adding Moz for 50p extra.');
  },
  getIngredients() {
    return this._newPizza.getIngredients() + ', Mozzarella';
  },
  getCost() {
    return this._newPizza.getCost() + .50;
  }
}
```

Now we can create pizzas by topping rather than type. We can also control 
the price of the pizza with more granularity.

## Code

```js
const PlainPizza = {
  getIngredients() {
    return 'Thin dough';
  },
  getCost() {
    return 4.00;
  }
}

const ToppingDecorator = {
  _newPizza: null,
  init(newPizza) {
    this._newPizza = Object.create(newPizza);
  },
  getIngredients() {
    return this._newPizza.getIngredients();
  },
  getCost() {
    return this._newPizza.getCost();
  }
}

const Mozzarella = {
  _newPizza: null,
  init(newPizza) {
    this._newPizza = Object.create(newPizza);
    console.log('Adding dough');
    console.log('Adding Moz');
  },
  getIngredients() {
    return this._newPizza.getIngredients() + ', Mozzarella';
  },
  getCost() {
    return this._newPizza.getCost() + .50;
  }
}

const TomatoSauce = {
  _newPizza: null,
  init(newPizza) {
    this._newPizza = Object.create(newPizza);
    console.log('Adding dough');
    console.log('Adding Sauce');
  },
  getIngredients() {
    return this._newPizza.getIngredients() + ', Tomato Sauce';
  },
  getCost() {
    return this._newPizza.getCost() + .35;
  }
}

let basicPizza = Object.create(ToppingDecorator);
basicPizza.init(PlainPizza);
mozzarellaPizza = Object.create(Mozzarella);
mozzarellaPizza.init(basicPizza);
tomatoAndMozzarella = Object.create(TomatoSauce);
tomatoAndMozzarella.init(mozzarellaPizza);
console.log(tomatoAndMozzarella.getIngredients());
console.log(tomatoAndMozzarella.getCost());
```
