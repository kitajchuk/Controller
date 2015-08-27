Controller
==========

> A very useful, arbitrary event and animation frame cycle class.



## Installation

```shell
npm install properjs-controller --save-dev
```


## Usage
```javascript
var Controller = require( "properjs-controller" ),
    controller = new Controller();

// Bind event
controller.on( "my-event", function () {
    // Handle event here
});

// Fire event
controller.fire( "my-event", [...pass arguments here] );

// Cycle the animation frame
controller.go(function () {
    // Handle frames here
});
```
