const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;



export default class Controller {
    constructor () {
        // Unique event IDs
        this._uid = 0;
        this._uprop = "properjsUID";

        // Store for event handlers
        this._handlers = {};

        // RAF manager props
        this._started = false;
        this._paused = false;
        this._cycle = null;
    }


    uid () {
        this._uid = (this._uid + 1);

        return this._uid;
    }


    go ( callback ) {
        if ( this._started ) {
            return this;
        }

        this._started = true;
        this._anim = ( elapsed ) => {
            this._cycle = raf( this._anim );

            if ( typeof callback === "function" ) {
                callback( elapsed );
            }
        };
        this._cycle = raf( this._anim );
    }


    pause () {
        this._paused = true;

        return this;
    }


    play () {
        this._paused = false;

        return this;
    }


    stop () {
        caf( this._cycle );

        this._paused = false;
        this._started = false;
        this._cycle = null;

        return this;
    }


    on ( event, handler ) {
        const events = event.split( " " );

        handler[ this._uprop ] = this.uid();

        for ( let i = events.length; i--; ) {
            if ( typeof handler === "function" ) {
                if ( !this._handlers[ events[ i ] ] ) {
                    this._handlers[ events[ i ] ] = [];
                }

                this._handlers[ events[ i ] ].push( handler );
            }
        }

        return this;
    }


    off ( event, handler ) {
        if ( !this._handlers[ event ] ) {
            return this;
        }

        if ( handler ) {
            this._offOne( event, handler );

        } else {
            this._offAll( event );
        }

        return this;
    }


    fire ( event, ...args ) {
        if ( !this._handlers[ event ] ) {
            return this;
        }

        for ( let i = this._handlers[ event ].length; i--; ) {
            this._handlers[ event ][ i ].apply( this, args );
        }

        return this;
    }


    _offOne ( event, handler ) {
        for ( let i = 0, len = this._handlers[ event ].length; i < len; i++ ) {
            if ( handler[ this._uprop ] === this._handlers[ event ][ i ][ this._uprop ] ) {
                this._handlers[ event ].splice( i, 1 );

                break;
            }
        }
    }


    _offAll ( event ) {
        for ( let i = this._handlers[ event ].length; i--; ) {
            this._handlers[ event ][ i ] = null;
        }

        delete this._handlers[ event ];
    }
}
