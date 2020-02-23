# Adapter

The adapter allows us to use to incompatible interfaces together.

We have to objects with different but similar methods:

```javascript
const EnemyTank = {
  fireWeapon() { 
    const attackDamage = randomNumber(10);
    console.log('Enemy tank does ' + attackDamage);
  },
}

const EnemyRobot = {
  smashWithHands() {
    const attackDamage = randomNumber(10);
    console.log('Enemy robot causes ' + attackDamage + ' damage with his hands');
  },
}
```

What if we needed to call `EnemyRobot.smashWithHands()` using the
same interface available on the *EnemyTank* object?

We create an **Adapter** interface that mediates between the two
objects. It has the same methods as the *EnemyTank* but inside 
them it actually calls the *EnemyRobot*'s methods...

```javascript
const EnemyRobotAdapter = {
  _robot: null,
  init(newRobot) {
    this._robot = newRobot;
  },
  fireWeapon() { 
    this._robot.smashWithHands();
  },
}
```

## Code

```javascript

function randomNumber(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

const EnemyTank = {
  fireWeapon() { 
    const attackDamage = randomNumber(10);
    console.log('Enemy tank does ' + attackDamage);
  },
}

const EnemyRobot = {
  smashWithHands() {
    const attackDamage = randomNumber(10);
    console.log('Enemy robot causes ' + attackDamage + ' damage with his hands');
  },
}

const EnemyRobotAdapter = {
  _robot: null,
  init(newRobot) {
    this._robot = newRobot;
  },
  fireWeapon() { 
    this._robot.smashWithHands();
  },
}

// Create a new instance of each object type.
const enemyTank = Object.create(EnemyTank);
const robotTank = Object.create(EnemyRobot);

// Call the fireWeapon method on enemy tank...
enemyTank.fireWeapon();
try {
  // Obvs we cant call it on the robot as well!
  robotTank.fireWeapon();
} catch (err) {
  console.log('The fireWeapon method doesn\'t exist on robotTank!');
}

// So we use an adapter...
const robotAdapter = Object.create(EnemyRobotAdapter);
robotAdapter.init(robotTank);

// Now we can call the same methods on the robot that we
// use on the normal enemy tank...
robotAdapter.fireWeapon();
```
