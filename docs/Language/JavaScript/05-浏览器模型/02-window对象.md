# window 对象

## 概述

浏览器里面，window对象（注意，w为小写）指当前的浏览器窗口。它也是当前页面的顶层对象，即最高一层的对象，所有其他对象都是它的下属。一个变量如果未声明，那么默认就是顶层对象的属性。

`window有自己的实体含义，其实不适合当作最高一层的顶层对象，这是一个语言的设计失误。最早，设计这门语言的时候，原始设想是语言内置的对象越少越好，这样可以提高浏览器的性能。因此，语言设计者 Brendan Eich 就把window对象当作顶层对象，所有未声明就赋值的变量都自动变成window对象的属性。这种设计使得编译阶段无法检测出未声明变量，但到了今天已经没有办法纠正了。`

## window 对象的属性

### window.name

window.name属性是一个字符串，表示当前浏览器窗口的名字。窗口不一定需要名字，这个属性主要配合超链接和表单的target属性使用。

```javascript
window.name = 'Hello World!';
console.log(window.name)
// "Hello World!"
```

该属性只能保存字符串，如果写入的值不是字符串，会自动转成字符串。各个浏览器对这个值的储存容量有所不同，但是一般来说，可以高达几MB。

只要浏览器窗口不关闭，这个属性是不会消失的。举例来说，访问a.com时，该页面的脚本设置了window.name，接下来在同一个窗口里面载入了b.com，新页面的脚本可以读到上一个网页设置的window.name。页面刷新也是这种情况。一旦浏览器窗口关闭后，该属性保存的值就会消失，因为这时窗口已经不存在了。

### window.closed，window.opener

window.closed属性返回一个布尔值，表示窗口是否关闭。

```javascript
window.closed // false
```

上面代码检查当前窗口是否关闭。这种检查意义不大，因为只要能运行代码，当前窗口肯定没有关闭。这个属性一般用来检查，使用脚本打开的新窗口是否关闭。

```javascript
var popup = window.open();

if ((popup !== null) && !popup.closed) {
  // 窗口仍然打开着
}
```

`window.opener属性表示打开当前窗口的父窗口。如果当前窗口没有父窗口（即直接在地址栏输入打开），则返回null。`

```javascript
window.open().opener === window // true
```

`上面表达式会打开一个新窗口，然后返回true。`

`如果两个窗口之间不需要通信，建议将子窗口的opener属性显式设为null，这样可以减少一些安全隐患。`

```javascript
var newWin = window.open('example.html', 'newWindow', 'height=400,width=400');
newWin.opener = null;
```

`上面代码中，子窗口的opener属性设为null，两个窗口之间就没办法再联系了。`

> 通过opener属性，可以获得父窗口的全局属性和方法，但只限于两个窗口同源的情况，且其中一个窗口由另一个打开。`a元素添加rel="noopener"属性，可以防止新打开的窗口获取父窗口，减轻被恶意网站修改父窗口 URL 的风险。`

```javascript
<a href="https://an.evil.site" target="_blank" rel="noopener">
恶意网站
</a>
```

### window.self，window.window

window.self和window.window属性都指向窗口本身。这两个属性只读。

```javascript
window.self === window // true
window.window === window // true
```

### window.frames，window.length

`window.frames属性返回一个类似数组的对象，成员为页面内所有框架窗口，包括frame元素和iframe元素。window.frames[0]表示页面中第一个框架窗口。`

`如果iframe元素设置了id或name属性，那么就可以用属性值，引用这个iframe窗口。比如<iframe name="myIFrame">可以用frames['myIFrame']或者frames.myIFrame来引用。`

`frames属性实际上是window对象的别名。`

```javascript
frames === window // true
```

`因此，frames[0]也可以用window[0]表示。但是，从语义上看，frames更清晰，而且考虑到window还是全局对象，因此推荐表示多窗口时，总是使用frames[0]的写法。`

window.length属性返回当前网页包含的框架总数。如果当前网页不包含frame和iframe元素，那么window.length就返回0。

```javascript
window.frames.length === window.length // true
```

上面代码表示，window.frames.length与window.length应该是相等的。

### window.frameElement

`window.frameElement属性主要用于当前窗口嵌在另一个网页的情况（嵌入<object>、<iframe>或<embed>元素），返回当前窗口所在的那个元素节点。如果当前窗口是顶层窗口，或者所嵌入的那个网页不是同源的，该属性返回null。`

```javascript
// HTML 代码如下
// <iframe src="about.html"></iframe>

// 下面的脚本在 about.html 里面
var frameEl = window.frameElement;
if (frameEl) {
  frameEl.src = 'other.html';
}
```

### window.top，window.parent

`window.top属性指向最顶层窗口，主要用于在框架窗口（frame）里面获取顶层窗口。`

`window.parent属性指向父窗口。如果当前窗口没有父窗口，window.parent指向自身。`

```javascript
if (window.parent !== window.top) {
  // 表明当前窗口嵌入不止一层
}
```

### window.status

window.status属性用于读写浏览器状态栏的文本。但是，现在很多浏览器都不允许改写状态栏文本，所以使用这个方法不一定有效。

### window.devicePixelRatio

`window.devicePixelRatio属性返回一个数值，表示一个 CSS 像素的大小与一个物理像素的大小之间的比率。也就是说，它表示一个 CSS 像素由多少个物理像素组成。它可以用于判断用户的显示环境，如果这个比率较大，就表示用户正在使用高清屏幕，因此可以显示较大像素的图片。`

### 位置大小属性

以下属性返回window对象的位置信息和大小信息。

#### window.screenX，window.screenY

window.screenX和window.screenY属性，返回浏览器窗口左上角相对于当前屏幕左上角的水平距离和垂直距离（单位像素）。这两个属性只读。

####  window.innerHeight，window.innerWidth

`window.innerHeight和window.innerWidth属性，返回网页在当前窗口中可见部分的高度和宽度，即“视口”（viewport）的大小（单位像素）。这两个属性只读。`

`用户放大网页的时候（比如将网页从100%的大小放大为200%），这两个属性会变小。因为这时网页的像素大小不变（比如宽度还是960像素），只是每个像素占据的屏幕空间变大了，因为可见部分（视口）就变小了。`

`注意，这两个属性值包括滚动条的高度和宽度。`

#### window.outerHeight，window.outerWidth

window.outerHeight和window.outerWidth属性返回浏览器窗口的高度和宽度，包括浏览器菜单和边框（单位像素）。这两个属性只读。

#### window.scrollX，window.scrollY

`window.scrollX属性返回页面的水平滚动距离，window.scrollY属性返回页面的垂直滚动距离，单位都为像素。这两个属性只读。`

`注意，这两个属性的返回值不是整数，而是双精度浮点数。如果页面没有滚动，它们的值就是0。`

`举例来说，如果用户向下拉动了垂直滚动条75像素，那么window.scrollY就是75左右。用户水平向右拉动水平滚动条200像素，window.scrollX就是200左右。`

```javascript
if (window.scrollY < 75) {
  window.scroll(0, 75);
}
```

#### window.pageXOffset，window.pageYOffset

window.pageXOffset属性和window.pageYOffset属性，是window.scrollX和window.scrollY别名。

### 组件属性

组件属性返回浏览器的组件对象。这样的属性有下面几个。

+ window.locationbar：地址栏对象
+ window.menubar：菜单栏对象
+ window.scrollbars：窗口的滚动条对象
+ window.toolbar：工具栏对象
+ window.statusbar：状态栏对象
+ window.personalbar：用户安装的个人工具栏对象

这些对象的visible属性是一个布尔值，表示这些组件是否可见。这些属性只读。

```javascript
window.locationbar.visible
window.menubar.visible
window.scrollbars.visible
window.toolbar.visible
window.statusbar.visible
window.personalbar.visible
```

### 全局对象属性

全局对象属性指向一些浏览器原生的全局对象。

+ `window.document：指向document对象，注意，这个属性有同源限制。只有来自同源的脚本才能读取这个属性。`
+ `window.location：指向Location对象，用于获取当前窗口的 URL 信息。`
+ `window.navigator：指向Navigator对象，用于获取环境信息。`
+ `window.history：指向History对象，表示浏览器的浏览历史。`
+ `window.localStorage：指向本地储存的 localStorage 数据。`
+ `window.sessionStorage：指向本地储存的 sessionStorage 数据。`
+ `window.console：指向console对象，用于操作控制台。`
+ `window.screen：指向Screen对象，表示屏幕信息。`

### window.isSecureContext

`window.isSecureContext属性返回一个布尔值，表示当前窗口是否处在加密环境。如果是 HTTPS 协议，就是true，否则就是false。`

## window 对象的方法

### window.scrollTo()，window.scroll()，window.scrollBy()

`window.scrollTo方法用于将文档滚动到指定位置。它接受两个参数，表示滚动后位于窗口左上角的页面坐标。`

```javascript
window.scrollTo(x-coord, y-coord)
```

它也可以接受一个配置对象作为参数。

```javascript
window.scrollTo(options)
```

配置对象options有三个属性。

+ top：滚动后页面左上角的垂直坐标，即 y 坐标。
+ left：滚动后页面左上角的水平坐标，即 x 坐标。
+ behavior：字符串，表示滚动的方式，有三个可能值（smooth、instant、auto），默认值为auto。

```javascript
window.scrollTo({
  top: 1000,
  behavior: 'smooth'
});
```

window.scroll()方法是window.scrollTo()方法的别名。

`window.scrollBy()方法用于将网页滚动指定距离（单位像素）。它接受两个参数：水平向右滚动的像素，垂直向下滚动的像素。`

```javascript
window.scrollBy(0, window.innerHeight)
```

上面代码用于将网页向下滚动一屏。

`如果不是要滚动整个文档，而是要滚动某个元素，可以使用下面三个属性和方法。`

+ Element.scrollTop
+ Element.scrollLeft
+ Element.scrollIntoView()

### window.print()

window.print方法会跳出打印对话框，与用户点击菜单里面的“打印”命令效果相同。

常见的打印按钮代码如下。

```javascript
document.getElementById('printLink').onclick = function () {
  window.print();
}
```

非桌面设备（比如手机）可能没有打印功能，这时可以这样判断。

```javascript
if (typeof window.print === 'function') {
  // 支持打印功能
}
```

### window.getSelection()

`window.getSelection方法返回一个Selection对象，表示用户现在选中的文本。`

```javascript
var selObj = window.getSelection();
```

`使用Selection对象的toString方法可以得到选中的文本。`

```javascript
var selectedText = selObj.toString();
```

### window.getComputedStyle()，window.matchMedia()

window.getComputedStyle()方法接受一个元素节点作为参数，返回一个包含该元素的最终样式信息的对象

window.matchMedia()方法用来检查 CSS 的mediaQuery语句

### window.requestAnimationFrame()

`window.requestAnimationFrame()方法跟setTimeout类似，都是推迟某个函数的执行。不同之处在于，setTimeout必须指定推迟的时间，window.requestAnimationFrame()则是推迟到浏览器下一次重流时执行，执行完才会进行下一次重绘。重绘通常是 16ms 执行一次，不过浏览器会自动调节这个速率，比如网页切换到后台 Tab 页时，requestAnimationFrame()会暂停执行。`

`如果某个函数会改变网页的布局，一般就放在window.requestAnimationFrame()里面执行，这样可以节省系统资源，使得网页效果更加平滑。因为慢速设备会用较慢的速率重流和重绘，而速度更快的设备会有更快的速率。`

该方法接受一个回调函数作为参数。

```javascript
window.requestAnimationFrame(callback)
```

`上面代码中，callback是一个回调函数。callback执行时，它的参数就是系统传入的一个高精度时间戳（performance.now()的返回值），单位是毫秒，表示距离网页加载的时间。`

`window.requestAnimationFrame()的返回值是一个整数，这个整数可以传入window.cancelAnimationFrame()，用来取消回调函数的执行。`

下面是一个window.requestAnimationFrame()执行网页动画的例子。

```javascript
var element = document.getElementById('animate');
element.style.position = 'absolute';

var start = null;

function step(timestamp) {
  if (!start) start = timestamp;
  var progress = timestamp - start;
  // 元素不断向左移，最大不超过200像素
  element.style.left = Math.min(progress / 10, 200) + 'px';
  // 如果距离第一次执行不超过 2000 毫秒，
  // 就继续执行动画
  if (progress < 2000) {
    window.requestAnimationFrame(step);
  }
}

window.requestAnimationFrame(step);
```

上面代码定义了一个网页动画，持续时间是2秒，会让元素向右移动。

### window.requestIdleCallback()

`window.requestIdleCallback()跟setTimeout类似，也是将某个函数推迟执行，但是它保证将回调函数推迟到系统资源空闲时执行。也就是说，如果某个任务不是很关键，就可以使用window.requestIdleCallback()将其推迟执行，以保证网页性能。`

`它跟window.requestAnimationFrame()的区别在于，后者指定回调函数在下一次浏览器重排时执行，问题在于下一次重排时，系统资源未必空闲，不一定能保证在16毫秒之内完成；window.requestIdleCallback()可以保证回调函数在系统资源空闲时执行。`

`该方法接受一个回调函数和一个配置对象作为参数。配置对象可以指定一个推迟执行的最长时间，如果过了这个时间，回调函数不管系统资源有无空虚，都会执行。`

```javascript
window.requestIdleCallback(callback[, options])
```

`callback参数是一个回调函数。该回调函数执行时，系统会传入一个IdleDeadline对象作为参数。IdleDeadline对象有一个didTimeout属性（布尔值，表示是否为超时调用）和一个timeRemaining()方法（返回该空闲时段剩余的毫秒数）。`

`options参数是一个配置对象，目前只有timeout一个属性，用来指定回调函数推迟执行的最大毫秒数。该参数可选。`

`window.requestIdleCallback()方法返回一个整数。该整数可以传入window.cancelIdleCallback()取消回调函数。`

下面是一个例子。

```javascript
requestIdleCallback(myNonEssentialWork);

function myNonEssentialWork(deadline) {
  while (deadline.timeRemaining() > 0) {
    doWorkIfNeeded();
  }
}
```

`上面代码中，requestIdleCallback()用来执行非关键任务myNonEssentialWork。该任务先确认本次空闲时段有剩余时间，然后才真正开始执行任务。`

下面是指定timeout的例子。

```javascript
requestIdleCallback(processPendingAnalyticsEvents, { timeout: 2000 });
```

上面代码指定，processPendingAnalyticsEvents必须在未来2秒之内执行。

`如果由于超时导致回调函数执行，则deadline.timeRemaining()返回0，deadline.didTimeout返回true。`

`如果多次执行window.requestIdleCallback()，指定多个回调函数，那么这些回调函数将排成一个队列，按照先进先出的顺序执行。`

## 事件

### error 事件和 onerror 属性

`浏览器脚本发生错误时，会触发window对象的error事件。我们可以通过window.onerror属性对该事件指定回调函数。`

```javascript
window.onerror = function (message, filename, lineno, colno, error) {
  console.log("出错了！--> %s", error.stack);
};
```

由于历史原因，window的error事件的回调函数不接受错误对象作为参数，而是一共可以接受五个参数，它们的含义依次如下。

+ 出错信息
+ 出错脚本的网址
+ 行号
+ 列号
+ 错误对象

老式浏览器只支持前三个参数。

`并不是所有的错误，都会触发 JavaScript 的error事件（即让 JavaScript 报错）。一般来说，只有 JavaScript 脚本的错误，才会触发这个事件，而像资源文件不存在之类的错误，都不会触发。`

下面是一个例子，如果整个页面未捕获错误超过3个，就显示警告。

```javascript
window.onerror = function(msg, url, line) {
  if (onerror.num++ > onerror.max) {
    alert('ERROR: ' + msg + '\n' + url + ':' + line);
    return true;
  }
}
onerror.max = 3;
onerror.num = 0;
```

`需要注意的是，如果脚本网址与网页网址不在同一个域（比如使用了 CDN），浏览器根本不会提供详细的出错信息，只会提示出错，错误类型是“Script error.”，行号为0，其他信息都没有。这是浏览器防止向外部脚本泄漏信息。一个解决方法是在脚本所在的服务器，设置Access-Control-Allow-Origin的 HTTP 头信息。`

```
Access-Control-Allow-Origin: *
```

然后，在网页的script标签中设置crossorigin属性。

```javascript
<script crossorigin="anonymous" src="//example.com/file.js"></script>
```

`上面代码的crossorigin="anonymous"表示，读取文件不需要身份信息，即不需要 cookie 和 HTTP 认证信息。如果设为crossorigin="use-credentials"，就表示浏览器会上传 cookie 和 HTTP 认证信息，同时还需要服务器端打开 HTTP 头信息Access-Control-Allow-Credentials。`
