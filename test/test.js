import Controller from "../Controller";
const controller = new Controller();


controller.on( "foo", ( data ) => {
    console.log( "foo fired", data );
});


controller.fire( "foo", { data: "stuff" } );


controller.go(( elapsed ) => {
    console.log( elapsed );
});


setTimeout(() => {
    console.log( "stopping raf" );
    controller.stop();

}, 5000 );
