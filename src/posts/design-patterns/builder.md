# Builder

A **Builder** is a blueprint for creating objects that have the same properties but different values.

A *Robot* builder would need an object to initially hold the properties similar to all robot types. We know all robots will have a head, torso, arms and legs.

```js
const Robot = {
  _robotHead: '',
  _robotTorso: '',
  _robotArms: '',
  _robotLegs: '',
  // then a lot of getters and setters for these properties
};
```

Then we make the blueprint that specifies all the values that will be assigned to those properties if that blueprint is used. This is the part we call the **Builder**. We can have any number of different **Builder**s for the **Robot** object. 

```js
const OldRobotBuilder = {
  // ...
  buildRobotHead: function () {
    this._robot.setRobotHead('Tin Head');
  },
  buildRobotTorso: function () {
    this._robot.setRobotTorso('Tin Torso');
  },
  buildRobotArms: function () {
    this._robot.setRobotArms('Blowtorch Arms');
  },
  buildRobotLegs: function () {
    this._robot.setRobotLegs('Roller Skates');
  },
  // ...
};
```

Now we create an *engineer* that's resposible for putting all the pieces together. Like the *Robot* object, the *RobotEngineer* will be unique.

```js
const RobotEngineer = {
  // ...
  makeRobot: function () {
    this._robotBuilder.init();
    this._robotBuilder.buildRobotHead();
    this._robotBuilder.buildRobotTorso();
    this._robotBuilder.buildRobotArms();
    this._robotBuilder.buildRobotLegs();
  }
  // ...
};
```

All three of these objects are responsible for there own roles when creating the new *Robot*. We can specify a different **Builder** object for any different type of *Robot* we want to make.

## Code

```js

const Robot = {
  _robotHead: '',
  _robotTorso: '',
  _robotArms: '',
  _robotLegs: '',
  setRobotHead: function (head) {
    this._robotHead = head;
  },
  getRobotHead: function () {
    return this._robotHead;
  },
  setRobotTorso: function (torso) {
    this._robotTorso = torso;
  },
  getRobotTorso: function () {
    return this._robotTorso;
  },
  setRobotArms: function (arms) {
    this._robotArms = arms;
  },
  getRobotArms: function () {
    return this._robotArms;
  },
  setRobotLegs: function (legs) {
    this._robotLegs = legs;
  },
  getRobotLegs: function () {
    return this._robotLegs;
  },
};

const OldRobotBuilder = {
  _robot: {},
  init: function () {
    // In most languages this would be the constructor, which we don't have
    // for Object.create so instead a common pattern is to call it init()
    this._robot = Object.create(Robot);
  },

  buildRobotHead: function () {
    this._robot.setRobotHead('Tin Head');
  },
  buildRobotTorso: function () {
    this._robot.setRobotTorso('Tin Torso');
  },
  buildRobotArms: function () {
    this._robot.setRobotArms('Blowtorch Arms');
  },
  buildRobotLegs: function () {
    this._robot.setRobotLegs('Roller Skates');
  },
  getRobot: function () {
    return this._robot;
  }
};

const RobotEngineer = {
  _robotBuilder: {},
  init: function (robotBuilder) {
    this._robotBuilder = robotBuilder
  },
  getRobot: function () {
    return this._robotBuilder.getRobot()
  },
  makeRobot: function () {
    this._robotBuilder.init();
    this._robotBuilder.buildRobotHead();
    this._robotBuilder.buildRobotTorso();
    this._robotBuilder.buildRobotArms();
    this._robotBuilder.buildRobotLegs();
  }
};

const oldStyleRobot = Object.create(OldRobotBuilder);
const robotEngineer = Object.create(RobotEngineer);
robotEngineer.init(oldStyleRobot);
robotEngineer.makeRobot();
const firstRobot = robotEngineer.getRobot();
console.log('firstRobot.getRobotHead() :', firstRobot.getRobotHead());
```
