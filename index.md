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
{:.m0}
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
{:.m0}
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

## Анимация с requestAnimationFrame
{:.m0}
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

## Анимация с requestAnimationFrame
{:.m0}
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
{:.bigger .m30}
* работает с частотой обновления экрана
  * позволяет избежать выпавших кадров
* браузер может оптимизировать анимацию
  * анимация более плавная
* анимация в неактивной вкладке браузера будет приостановлена
  * снижает нагрузку CPU в фоне

## rafQueue
{:.code-36 .low}
~~~ javascript
var queue = new window.rafQueue();

queue
    .add(function() { loadFirst(); })
    .add(function() { animateSecond(); })
    .add(function() {
        this.runThirdInCtx();
    }, this);

queue.run();
~~~

## ![](pictures/rosie.png)
{:.cover .h}

## Загрузка картинки последовательная
{:.code-30 .m30}

~~~ javascript
function load(item) {
    this
        .updatePreview(item.image)
        .selectGalleryItem(item.id)
        .updateLinks(item.snippet)
        .loadDirect(item.snippet.text)
        ...
}
~~~
{:.tall}

## Загрузка картинки через rafQueue
{:.raf-code .m30}

~~~ javascript
var queue = new window.rafQueue();

function load(item) {
 var _this = this;
 queue
  .add(function() { _this.updatePreview(item); })
  .add(function() { _this.selectGalleryItem(item); })
  .add(function() { _this.updateLinks(item); })
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
{:.center .bigger .image-center}

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
