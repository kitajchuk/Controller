var Controller = require( "../Controller" );
var controller = new Controller();


controller.on( "foo", function ( data ) {
    console.log( "foo fired", data );
});


controller.fire( "foo", {data: "stuff"} );