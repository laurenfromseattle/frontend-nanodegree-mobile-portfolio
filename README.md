# Udacity Front-End Nanodegree Project Five: Website Performance Optimization

##Part 1: Optimize PageSpeed Insights score for index.html

###Before: Pre-Optimization Measurements

"First measure, then optimize. To measure, go here:
[Google PageSpeed Insights](https://developers.google.com/speed/pagespeed/insights/)

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

To optimize views/pizza.html, you will need to modify views/js/main.js until your frames per second rate is 60 fps or higher. You will find instructive comments in main.js.

You might find the FPS Counter/HUD Display useful in Chrome developer tools described here: [Chrome Dev Tools tips-and-tricks](https://developer.chrome.com/devtools/docs/tips-and-tricks).

### Optimization Tips and Tricks
* [Optimizing Performance](https://developers.google.com/web/fundamentals/performance/ "web performance")
* [Analyzing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/analyzing-crp.html "analyzing crp")
* [Optimizing the Critical Rendering Path](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/optimizing-critical-rendering-path.html "optimize the crp!")
* [Avoiding Rendering Blocking CSS](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/render-blocking-css.html "render blocking css")
* [Optimizing JavaScript](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/adding-interactivity-with-javascript.html "javascript")
* [Measuring with Navigation Timing](https://developers.google.com/web/fundamentals/performance/critical-rendering-path/measure-crp.html "nav timing api"). We didn't cover the Navigation Timing API in the first two lessons but it's an incredibly useful tool for automated page profiling. I highly recommend reading.
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/eliminate-downloads.html">The fewer the downloads, the better</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/optimize-encoding-and-transfer.html">Reduce the size of text</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/image-optimization.html">Optimize images</a>
* <a href="https://developers.google.com/web/fundamentals/performance/optimizing-content-efficiency/http-caching.html">HTTP caching</a>

### Customization with Bootstrap
The portfolio was built on Twitter's <a href="http://getbootstrap.com/">Bootstrap</a> framework. All custom styles are in `dist/css/portfolio.css` in the portfolio repo.

* <a href="http://getbootstrap.com/css/">Bootstrap's CSS Classes</a>
* <a href="http://getbootstrap.com/components/">Bootstrap's Components</a>

### Sample Portfolios

Feeling uninspired by the portfolio? Here's a list of cool portfolios I found after a few minutes of Googling.

* <a href="http://www.reddit.com/r/webdev/comments/280qkr/would_anybody_like_to_post_their_portfolio_site/">A great discussion about portfolios on reddit</a>
* <a href="http://ianlunn.co.uk/">http://ianlunn.co.uk/</a>
* <a href="http://www.adhamdannaway.com/portfolio">http://www.adhamdannaway.com/portfolio</a>
* <a href="http://www.timboelaars.nl/">http://www.timboelaars.nl/</a>
* <a href="http://futoryan.prosite.com/">http://futoryan.prosite.com/</a>
* <a href="http://playonpixels.prosite.com/21591/projects">http://playonpixels.prosite.com/21591/projects</a>
* <a href="http://colintrenter.prosite.com/">http://colintrenter.prosite.com/</a>
* <a href="http://calebmorris.prosite.com/">http://calebmorris.prosite.com/</a>
* <a href="http://www.cullywright.com/">http://www.cullywright.com/</a>
* <a href="http://yourjustlucky.com/">http://yourjustlucky.com/</a>
* <a href="http://nicoledominguez.com/portfolio/">http://nicoledominguez.com/portfolio/</a>
* <a href="http://www.roxannecook.com/">http://www.roxannecook.com/</a>
* <a href="http://www.84colors.com/portfolio.html">http://www.84colors.com/portfolio.html</a>
