/*!
 *
 * Event / Animation cycle manager
 *
 * @Controller
 * @author: kitajchuk
 *
 *
 */
(function ( factory ) {
    
    if ( typeof exports === "object" && typeof module !== "undefined" ) {
        module.exports = factory();

    } else if ( typeof window !== "undefined" ) {
        window.Controller = factory();
    }
    
})(function () {
    // Private animation functions
    var raf = window.requestAnimationFrame,
        caf = window.cancelAnimationFrame,
    
    
    /**
     *
     * Event / Animation cycle manager
     * @constructor Controller
     * @requires raf
     * @memberof! <global>
     *
     */
    Controller = function () {
        return this.init.apply( this, arguments );
    };
    
    Controller.prototype = {
        constructor: Controller,
    
        /**
         *
         * Controller constructor method
         * @memberof Controller
         * @method Controller.init
         *
         */
        init: function () {
            /**
             *
             * Controller event handlers object
             * @memberof Controller
             * @member _handlers
             * @private
             *
             */
            this._handlers = {};
    
            /**
             *
             * Controller unique ID
             * @memberof Controller
             * @member _uid
             * @private
             *
             */
            this._uid = 0;
    
            /**
             *
             * Started iteration flag
             * @memberof Controller
             * @member _started
             * @private
             *
             */
            this._started = false;
    
            /**
             *
             * Paused flag
             * @memberof Controller
             * @member _paused
             * @private
             *
             */
            this._paused = false;
    
            /**
             *
             * Timeout reference
             * @memberof Controller
             * @member _cycle
             * @private
             *
             */
            this._cycle = null;
        },
    
        /**
         *
         * Controller go method to start frames
         * @memberof Controller
         * @method go
         *
         */
        go: function ( fn ) {
            if ( this._started && this._cycle ) {
                return this;
            }
    
            this._started = true;
    
            var self = this,
                anim = function () {
                    self._cycle = raf( anim );
    
                    if ( self._started ) {
                        if ( typeof fn === "function" ) {
                            fn();
                        }
                    }
                };
    
            anim();
        },
    
        /**
         *
         * Pause the cycle
         * @memberof Controller
         * @method pause
         *
         */
        pause: function () {
            this._paused = true;
    
            return this;
        },
    
        /**
         *
         * Play the cycle
         * @memberof Controller
         * @method play
         *
         */
        play: function () {
            this._paused = false;
    
            return this;
        },
    
        /**
         *
         * Stop the cycle
         * @memberof Controller
         * @method stop
         *
         */
        stop: function () {
            caf( this._cycle );
    
            this._paused = false;
            this._started = false;
            this._cycle = null;
    
            return this;
        },
    
        /**
         *
         * Controller add event handler
         * @memberof Controller
         * @method on
         * @param {string} event the event to listen for
         * @param {function} handler the handler to call
         *
         */
        on: function ( event, handler ) {
            var events = event.split( " " );
    
            // One unique ID per handler
            handler._jsControllerID = this.getUID();
    
            for ( var i = events.length; i--; ) {
                if ( typeof handler === "function" ) {
                    if ( !this._handlers[ events[ i ] ] ) {
                        this._handlers[ events[ i ] ] = [];
                    }
    
                    // Handler can be stored with multiple events
                    this._handlers[ events[ i ] ].push( handler );
                }
            }
    
            return this;
        },
    
        /**
         *
         * Controller remove event handler
         * @memberof Controller
         * @method off
         * @param {string} event the event to remove handler for
         * @param {function} handler the handler to remove
         *
         */
        off: function ( event, handler ) {
            if ( !this._handlers[ event ] ) {
                return this;
            }
    
            // Remove a single handler
            if ( handler ) {
                this._off( event, handler );
    
            // Remove all handlers for event
            } else {
                this._offed( event );
            }
    
            return this;
        },
    
        /**
         *
         * Controller fire an event
         * @memberof Controller
         * @method fire
         * @param {string} event the event to fire
         *
         */
        fire: function ( event ) {
            if ( !this._handlers[ event ] ) {
                return this;
            }
    
            var args = [].slice.call( arguments, 1 );
    
            for ( var i = this._handlers[ event ].length; i--; ) {
                this._handlers[ event ][ i ].apply( this, args );
            }
    
            return this;
        },
    
        /**
         *
         * Get a unique ID
         * @memberof Controller
         * @method getUID
         * @returns number
         *
         */
        getUID: function () {
            this._uid = (this._uid + 1);
    
            return this._uid;
        },
    
        /**
         *
         * Controller internal off method assumes event AND handler are good
         * @memberof Controller
         * @method _off
         * @param {string} event the event to remove handler for
         * @param {function} handler the handler to remove
         * @private
         *
         */
        _off: function ( event, handler ) {
            for ( var i = 0, len = this._handlers[ event ].length; i < len; i++ ) {
                if ( handler._jsControllerID === this._handlers[ event ][ i ]._jsControllerID ) {
                    this._handlers[ event ].splice( i, 1 );
    
                    break;
                }
            }
        },
    
        /**
         *
         * Controller completely remove all handlers and an event type
         * @memberof Controller
         * @method _offed
         * @param {string} event the event to remove handler for
         * @private
         *
         */
        _offed: function ( event ) {
            for ( var i = this._handlers[ event ].length; i--; ) {
                this._handlers[ event ][ i ] = null;
            }
    
            delete this._handlers[ event ];
        }
    };

    return Controller;
});