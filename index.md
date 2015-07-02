---

layout: default

title: rafQueue — stretch heavy js operations in time

---

# Яндекс

## **{{ page.title }}** {#cover}

<div class="s">
    <div class="service">Картинки</div>
</div>

<div class="info">
	<p class="author">{{ site.author.name }}</p>
</div>

## ![](pictures/yandex-images.png)
{:.cover .h}

## ![](pictures/rosie.png)
{:.cover .h}

## ![](pictures/rosie2.png)
{:.cover .h}

## ![](pictures/rosie3.png)
{:.cover .h}

## ![](pictures/rosie4.png)
{:.cover .h}

## ![](pictures/rosie5.png)
{:.cover .h}

## ![](pictures/rosie6.png)
{:.cover .h}

## ![](pictures/rosie7.png)
{:.cover .h}

## ![](pictures/rosie.png)
{:.cover .h}

## Анимация с setTimeout/setInterval
![](pictures/frames1.png)
{:.h140}

~~~ javascript
function step() {
    // alter dom, change styles
    // ...
    
    // schedule next frame
    setTimeout(step, 16.667);
}
step();
~~~

## Анимация с setTimeout/setInterval
![](pictures/frames2.png)
{:.h140}

~~~ javascript
function step() {
    // alter dom, change styles
    // ...
    
    // schedule next frame
    setTimeout(step, 16.667);
}
step();
~~~

## Синхронизация анимации с кадрами
![](pictures/frames3.png)
{:.h140}

~~~ javascript
function step() {
    // alter dom, change styles
    // ...
    
    // schedule next frame
    requestAnimationFrame(step);
}
step();
~~~

## Синхронизация анимации с кадрами
![](pictures/frames4.png)
{:.h140}

~~~ javascript
function step() {
    // alter dom, change styles
    // ...
    
    // schedule next frame
    requestAnimationFrame(step);
}
step();
~~~

## requestAnimationFrame
* работает с частотой развёртки монитора 
  * позволяет избежать выпавших кадров
* браузер может оптимизировать анимацию
  * анимация более плавная
* анимация в неактивной вкладке будет приостановлена
  * снижает нагрузку в фоне

## rafQueue
{:.raf-code .low}
~~~ javascript
var queue = new window.rafQueue();

queue
    .add(function() { loadFirst(); })
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
    .add(function() { this.runFourthInCtx(); }, this);

queue.run();
~~~

## ![](pictures/rosie.png)
{:.cover .h}


## Загрузка картинки последовательная
{:.low}

~~~ javascript
function load(item) {
    this
        .updatePreview(item.image)
        .selectGalleryItem(item.id)
        .updateSnippet(item.snippet)
        .updateDirect(item.snippet.text)
        .loadRelated(item.relatedUrl)
        .updateButtons(item.links);
}
~~~
{:.tall}

## Загрузка картинки через rafQueue
{:.raf-code .low}

~~~ javascript
var queue = new window.rafQueue();

function load(item) {
    var _this = this;

    queue
        .add(function() {
            _this.updatePreview(item.image);
        })
        .add(function() {
            _this.selectGalleryItem(item.id);
        })
        .add(function() {
            _this.updateSnippet(queue, item.snippet);
        })
        ...

    queue.run();
}
~~~


## ![](pictures/timeline1-1.png)
{:.cover .h}

## ![](pictures/timeline1-2.png)
{:.cover .h}

## ![](pictures/timeline2-1.png)
{:.cover .h}

## ![](pictures/timeline2-2.png)
{:.cover .h}

## [https://github.com/nerevar/rafQueue](https://github.com/nerevar/rafQueue)
{:.center .low .image-center}

![](pictures/github.png)

## Вопросы ?
{:.middle}

## **Контакты** {#contacts}

<div class="info">
<p class="author">{{ site.author.name }}</p>
    <p class="position">{{ site.author.position }}</p>

    <div class="contacts">
        <!-- <p class="contacts-left contacts-top phone">+7 (000) 000-00-00</p> -->
        <p class="contacts-left mail">nerevar@yandex-team.ru</p>
        <p class="contacts-right twitter">@nerevar1n</p>
        <!-- <p class="contacts-right contacts-bottom vk">vk</p> -->
        <!-- <p class="contacts-right facebook">facebook</p> -->
    </div>
</div>
