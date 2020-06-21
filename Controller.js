const raf = window.requestAnimationFrame;
const caf = window.cancelAnimationFrame;



/**
 *
 * Easing functions
 * @namespace Easing
 * @memberof! <global>
 *
 */
const ease = {
    /**
     *
     * Produce a linear ease
     * @method linear
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    linear ( t ) { return t; },

    /**
     *
     * Produce a swing ease like in jQuery
     * @method swing
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    swing ( t ) { return (1-Math.cos( t*Math.PI ))/2; },

    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuad
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInQuad ( t ) { return t*t; },

    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuad
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeOutQuad ( t ) { return t*(2-t); },

    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuad
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInOutQuad ( t ) { return t<0.5 ? 2*t*t : -1+(4-2*t)*t; },

    /**
     *
     * Accelerating from zero velocity
     * @method easeInCubic
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInCubic ( t ) { return t*t*t; },

    /**
     *
     * Decelerating to zero velocity
     * @method easeOutCubic
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeOutCubic ( t ) { return (--t)*t*t+1; },

    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutCubic
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInOutCubic ( t ) { return t<0.5 ? 4*t*t*t : (t-1)*(2*t-2)*(2*t-2)+1; },

    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuart
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInQuart ( t ) { return t*t*t*t; },

    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuart
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeOutQuart ( t ) { return 1-(--t)*t*t*t; },

    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuart
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInOutQuart ( t ) { return t<0.5 ? 8*t*t*t*t : 1-8*(--t)*t*t*t; },

    /**
     *
     * Accelerating from zero velocity
     * @method easeInQuint
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInQuint ( t ) { return t*t*t*t*t; },

    /**
     *
     * Decelerating to zero velocity
     * @method easeOutQuint
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeOutQuint ( t ) { return 1+(--t)*t*t*t*t; },

    /**
     *
     * Acceleration until halfway, then deceleration
     * @method easeInOutQuint
     * @param {number} t Difference in time
     * @returns a new t value
     *
     */
    easeInOutQuint ( t ) { return t<0.5 ? 16*t*t*t*t*t : 1+16*(--t)*t*t*t*t; }
};



const defs = {
    ease: ease.swing,
    duration: 500,
    from: 0,
    to: 500,
    update: () => {},
    complete: () => {},
};



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


    tween ( opts ) {
        for ( let i in defs ) {
            if ( opts[ i ] === undefined ) {
                opts[ i ] = defs[ i ];
            }
        }

        let startTime = null;
        const tweenDiff = (opts.to - opts.from);

        this.stop().go(( elapsed ) => {
            if ( startTime === null ) {
                startTime = elapsed;
            }

            const diff = elapsed - startTime;
            const tweenTo = (tweenDiff * opts.ease( diff / opts.duration )) + opts.from;

            opts.update( tweenTo );

            if ( diff > opts.duration ) {
                opts.complete( opts.to );

                this.stop();
            }
        });
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
