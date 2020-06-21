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

    console.log( "tweening" );
    controller.tween({
        update ( value ) {
            console.log( "tween value", value );
        },
        complete ( value ) {
            console.log( "tween done", value );
        },
    });

}, 1000 );
