$(function () {

    var circle = $('.circle'),
        fpsMeter = new FpsMeter(),
        rafQ = new window.rafQueue(),
        left = 0,
        scrollKind = 'default',
        intervalId;

    $('.scrollKind').on('change', function() {
        scrollKind = this.value;
    });

    var onScroll = function() {
        console.info('scroll');

        if (scrollKind === 'default') {
            for (var i = 0; i < 10; i++) {
                act();
            }
        } else {
            for (var i = 0; i < 10; i++) {
                rafQ.add(function() {
                    act();
                });
            }

            rafQ.run();
        }

    };

    $(window).on('scroll', $.throttle(150, onScroll));

    window.act = function() {
        var k;
        for (var i = 0; i < 100; i++) {
            k = Math.pow(i, 10);
            console.log(i, k);
        }
    };

    $('.button__serial').click(function() {
        var left = +circle.css('left').replace('px','');

        intervalId = setInterval(function() {
            left += 2;
            circle.css('left', left);
            fpsMeter.tick();
        }, 1000/60);
    });

    $('.button__raf').click(function() {
        var rafQ = new window.rafQueue();

        for (var i = 0; i < 10; i++) {
            rafQ.add(act);
        }

        rafQ.run();
    });

    $('.button__stop').click(function() {
        clearInterval(intervalId);
    });

    var rateElem = document.getElementById('rate');
    fpsMeter.start(function(fps) {
        rateElem.innerHTML = fps + ' FPS';
    });

});