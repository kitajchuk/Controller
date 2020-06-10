ProperJS // Controller
======================

> A very useful, arbitrary event emitter and raf manager.



### Installation

```shell
npm i properjs-controller --save-dev
```


### Usage
```javascript
// Import
import Controller from "properjs-controller";

// Create instance
const controller = new Controller();

// Bind event
controller.on( "my-event", ( data ) => {
    // Handle event here
    console.log( data );
});

// Unbind event
controller.off( "my-event" );

// Fire event
controller.fire( "my-event", [...pass arguments here] );

// RAF
controller.go(() => {
    // Handle frames here
});

// Manage RAF
controller.stop();
controller.pause();
controller.play();

// Useful to extend Controller...
class MyClass extends Controller {
    constructor () {
        super();
        // MyClass has all of Controller's methods
    }
}
```
