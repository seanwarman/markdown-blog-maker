# Factory

A way to generate objects that share common properties and methods but have different types.

This pattern allows you to create a program that can use objects without specifying *exactly* which objects they will be at run time.

For example, if you think of a computer game that randomly generates orcs as enemies. Every orc could have a different name, voice, skin tone, height and strength but the cut scenes will have the orc interacting in the same way and saying the same lines irrespective of all these properties.

Our program will need to be able to allow for different properties of the orc type that are only generated at run time. The factory pattern allows us to treat every orc object as an Orc, whether it's a BigOrc or a SquatOrc doesn't matter.

So we initially create an Orc **super-class**:

```js
const Orc = {
    _name: '',
    _amtDamage: 0,
    setDamage: function() {},
    getDamage: function() {}
    // etc...
}
```

This defines every Orc as having a *name* and a *amtDamage*. These are the two properties that every Orc will have in the game.

Next are the subclasses, meaning what type of orc we're creating. These will set the values of the keys we defined in the **super-class**.

```js
const BigOrc = function() {
    let NewShip = Object.create(Orc);
    NewShip.setName('The Gurk');
    NewShip.setDamage(90);
    return NewShip;
}
const SquatOrc = function() {
    // etc...
}
```

Finally our factory method will be the interface we use to generate an Orc.

```js
const OrcFactory = function() {
    // generate random orc
    // or create orc by type.
}
```

We could have a few different orc factories that use the same classes to generate orcs in as many different ways as we want.

## Code

```js
// Class:
// Here we can define the methods and properties shared by all the orcs
const Orc = {
    _name: '',
    _amtDamage: 0,
    setDamage: function(damage) {
        this._amtDamage = damage;
    },
    getDamage: function(){
        return this._amtDamage;
    },
    setName: function(name) {
        this._name = name;
    },
    getName: function() {
        return this._name;
    },
    followHero: function() {
        console.log(this.getName() + ' is following the Hero.');
    },
    displayOrc: function() {
        console.log(this.getName() + ' is on the screen.');
    },
    orcAttacks: function() {
        console.log(this.getName() + ' attacks and does ' + this.getDamage() + ' to the Hero.');
    },
};

// Subclasses:
// Here's where we can solidify exactly what type of orc we want to create.
const BigOrc = function() {
    let NewORc = Object.create(Orc);
    NewORc.setName('The Gurk');
    NewORc.setDamage(90);
    return NewORc;
}
const SquatOrc = function() {
    let NewORc = Object.create(Orc);
    NewORc.setName('Podgeface');
    NewORc.setDamage(30);
    return NewORc;
}

// Interface:
// This is where all the interaction logic can go.
// We could build another factory interface that, for example, chooses an orc
// at random.
function OrcFactory(orcType) {
    if(orcType === 'A') {
        return BigOrc()
    } else 
    if(orcType === 'B') {
        return SquatOrc();
    }
    return null;
}

// Here's how we might use it...
let randomOrc = OrcFactory('A');
randomOrc.orcAttacks();
```
