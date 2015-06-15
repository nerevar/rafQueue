(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(factory);
    } else if (typeof exports === 'object') {
        // Node, CommonJS-like
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.rafQueue = factory();
    }
}(this, function () {

    /**
     * requestAnimationFrame polyfill from Paul Irish
     * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
     * MIT license
     */
    var lastTime = 0,
        vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame']
            || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
        // Polyfill for IE8-9, Android <= 4.3
        window.requestAnimationFrame = function(fn) {

            var currTime = +(new Date()),
                timeToCall = Math.max(0, 16 - (currTime - lastTime)),
                id = setTimeout(function() {
                    fn(currTime + timeToCall);
                }, timeToCall);

            lastTime = currTime + timeToCall;

            return id;

        };
    }

    if (!window.cancelAnimationFrame) {
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
    }

    /**
     * A wrapper for the consequentially execution heavy js functions using requestAnimationFrame
     */
    var rafQueue = function() {

        /**
         * Container for callbacks with their's context
         * @type {Array}
         */
        var stack = [];

        /**
         * Add callback with ctx to stack
         * @param {Function} fn - callback
         * @param {Object} [ctx] - context
         * @returns {Object} *
         */
        this.add = function(fn, ctx) {
            stack.push({ fn: fn, ctx: ctx });
            return this;
        };

        /**
         * Consequentially runs all callbacks from stack
         */
        this.run = function() {

            var raf = window.requestAnimationFrame,
                runner,
                // runs callback + recursively calls itself in next frame
                onNextFrame = function() {

                    if (stack.length === 0) {
                        return;
                    }

                    runner = stack.shift();
                    if (runner.ctx) {
                        runner.fn.call(runner.ctx);
                    } else {
                        runner.fn();
                    }

                    raf(onNextFrame);

                };

            // first run. Run through one frame
            raf(function() {
                raf(onNextFrame);
            });

        };

    };

    return rafQueue;

}));
