# rafQueue
Library for stretching heavy js operations in time using request Animation Frame

Presentation: http://nerevar.github.io/rafQueue/

Example:

```html
<script type="text/javascript" src="rafqueue.js"></script>
```

```js
var queue = new window.rafQueue();

queue
    .add(function() {
    	loadFirst();
    })
    .add(function() {
        // add steps in other functions
    	queue
	    	.add(function() {
	    		animateSecond();
	    	})
	    	.add(function() {
	    		animateSecondAgain();
	    	});
    })
    .add(function() {
    	reloadThird();
    })
    .add(function() {
    	this.runFourthInCtx();
    }, this);

queue.run();
```
