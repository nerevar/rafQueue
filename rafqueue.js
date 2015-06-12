/**
 * requestAnimationFrame polyfill from Paul Irish
 * http://paulirish.com/2011/requestanimationframe-for-smart-animating/
 * MIT license
 */
(function() {

    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];

    for (var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x] + 'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x] + 'CancelAnimationFrame'] || window[vendors[x] + 'CancelRequestAnimationFrame'];
    }

    if (!window.requestAnimationFrame) {
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
     *  Обёртка для последовательного выполнения функций по очереди
     *  в разных кадрах отрисовки с помощью requestAnimationFrame
     *
     *  Пример использования:
     *  <script>
     *      var rafQ = new window.rafQueue();
     *      rafQ
     *          .add(function() { console.log('i'll execute in next frame'); })
     *          .add(function() { console.log('i'll execute in frame after next frame with ctx:', this); }, this)
     *          .run();
     *  </script>>
     */
    window.rafQueue = function() {
        var stack = [];

        /**
         * Добавляет шаг в очередной requestAnimationFrame
         * @param {Function} fn - функция, которую нужно вызвать
         * @param {Object} [ctx] - контекст выполнения функции
         * @returns {Object} *
         */
        this.add = function(fn, ctx) {
            stack.push({ fn: fn, ctx: ctx });
            return this;
        };

        /**
         * Последовательно запускает функции через raf
         */
        this.run = function() {

            var raf = window.requestAnimationFrame,
                runner,
                // рекурсивно вызывает сама себя + создаёт новый frame
                onNextFrame = function() {
                    if (stack.length === 0) {
                        // выполнили всё что можно
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

            // первый запуск. Запускаем "через один" raf
            raf(function() { raf(onNextFrame); });

        };
    };

}());
