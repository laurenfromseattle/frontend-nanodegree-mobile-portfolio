# Udacity Front-End Nanodegree Project Five: Website Performance Optimization

##Instructions

[Test the PageSpeed Insights score for index.html](https://laurenfromseattle.github.io/frontend-nanodegree-mobile-portfolio/dist/index.html) by copying and pasting the URL into the [PageSpeedsInsights page](https://developers.google.com/speed/pagespeed/insights/).

[Check out the 60FPS action here](https://laurenfromseattle.github.io/frontend-nanodegree-mobile-portfolio/dist/views/pizza.html) by running a timelin in DevTools

##Part 1: Optimize PageSpeed Insights Score for index.html

###Before: Pre-Optimization Measurements

**Speed Scores**

* Mobile: 27 / 100
* Desktop: 88 / 100
* Goal: 90+ / 100 for both Desktop and Mobile

**Mobile Optimization List**

  1. Optimize images
  2. Eliminate render-blocking JS and CSS in above-the-fold content
  3. Leverage browser caching
  4. Enable compression
  5. Minify HTML

**Desktop Optimization List**

  1. Eliminate render-blocking JS and CSS in above-the-fold content
  2. Leverage browser caching
  3. Optimize images
  4. Enable compression
  5. Minify HTML

###Optimizations

####Image Optimization
First on our list is *image optimization*. I used the build tool Gulp to automate this. Briefly, setting up Gulp in the project space involved these steps:

  1. Initialize `package.json` in project directory
    ```npm init```
  2. Install gulp locally in project directory
    ```npm install --save-dev gulp```
  3. Install required plugins
  4. Create `gulpfile.js`
  5. Add tasks to `gulpfile.js`

Here is a great article that covers [How to Get Started with Gulp](https://travismaynard.com/writing/getting-started-with-gulp)

To resize and optimize images, I used the `gulp-image-resize`, `gulp-rename`, `gulp-imagemin`, and `imagemin-pngquant` plugins.

As a result:

* pizzeria.jpg went from 2.25 MB to 2.94 KB (100px thumbnail).
* profilepic.jpg went from 14 KB to 1.73 KB.

####Minify HTML, CSS and JS
Second on our list is to *minify the HTML*. I used the `gulp-htmlmin` plugin for this. I also went ahead and minified CSS and JS, using the `gulp-clean-css` and `gulp-uglify` plugins, respectively.

As a result:

* HTML: index.html shrunk from 2.81 KB to 2.15 KB.
* CSS: style.css shrunk from 1.51 KB to 1.16 KB.
* JS: perfmatters.js shrunk from 527 B to 262 B.

####Render-blocking JS and CSS
Next up, *minimize render-blocking JS and CSS*. Looking at our index.html, perfmatters.js is already async, so we don't have to worry about that. I made analytics.js async as well.

For CSS, I used a media query for print.css to reduce the number of render-blocking CSS files. I also ditched the webfonts, further reducing render-blocking CSS.

We're still only at 87 for Mobile PageSpeed, so I'm going to inline all the CSS, though I *really* don't like the idea of this. I used the `gulp-inline-css` plugin to do this. I ended up having to move the print media query css file into index.html manually between `<script>` tags in order for it to be preserved.

###After: Post-Optimization Measurements

**Speed Scores**

* Mobile: 96 / 100
* Desktop: 97 / 100
* Goal: Passed

**Remaining Optimizations**

  1. Leverage browser caching
  2. Enable compression

##Part 2: Optimize Frames per Second in pizza.html

### Issue 1: Forced Reflow with Background Pizzas

Average Time to Generate Last 10 Frames (before): between 30 and 45ms

Solution: optimization of updatePositions()

Evil code:

```javascript
  var items = document.querySelectorAll('.mover');
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((document.body.scrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

`document.body.scrollTop` returns the number of pixels the body content is scrolled vertically. It is calculated every time the loop runs, which forces layout. Better to set that in a variable outside the loop.

Less-evil code:

```javascript
  var items = document.querySelectorAll('.mover');
  var cachedScrollTop = document.body.scrollTop;
  for (var i = 0; i < items.length; i++) {
    var phase = Math.sin((cachedScrollTop / 1250) + (i % 5));
    items[i].style.left = items[i].basicLeft + 100 * phase + 'px';
  }
```

Average Time to Generate Last 10 Frames (after): around 1ms

###Issue 2: Forced Reflow with Pizza Resizing

Time to Resize Pizzas (Before): between 150 and 200 ms

Solution: Simplification of resizePizzas()

Time to Resize Pizzas (After): between 0.5 and 1ms

###Issue 3: Too Much Painting

The entire screen is being repainted every time we scroll. That's a lot of paint.

Solution: Remove background-color from `.container` and `body` and add this to CSS:

```css
body::before {
  background: black;
  content: ' ';
  width: 100%;
  height: 100%;
  position: fixed;
  will-change: transform;
  z-index: -2;
}
```

```css
.container::before {
  background-color: rgba(240, 60, 60, 0.8);
  content: ' ';
  position: fixed;
  width: 100%;
  height: 100%;
  margin-left: -15px;
  will-change: transform;
}

@media (min-width: 768px) {
  .container::before {
    width: 750px;
  }
}

@media (min-width: 768px) {
  .container::before {
    width: 750px;
  }
}

@media (min-width: 992px) {
  .container::before {
    width: 970px;
  }
}

@media (min-width: 1200px) {
  .container::before {
    width: 1170px;
  }
}
```
###Issue 4: Recalculating Styles

We are recalculating styles on 200 elements every time we scroll, but don't need 200 background pizzas.

Solution: Cut number of background pizzas to 48.

###Issue 5: requestAnimationFrame()

Solution I followed Paul's example here to add rAF on the scroll event:

[Debouncing Scroll Events](http://www.html5rocks.com/en/tutorials/speed/animations/#an-example)

###Issue 6: Layout time on pizza resizing (unresolved)

Haven't figured out a solution here. Layout is taking around 20ms when pizzas are resized. I tried changing the CSS to utilize flexbox as suggested here:

[Avoid Large, Complex Layouts](https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing?hl=en)

Not a big help. I also tried limiting the layout scope to #pizzaGenerator. This did not cut down time, either.

