# CSS 操作

## window.getComputedStyle()

`行内样式（inline style）具有最高的优先级，改变行内样式，通常会立即反映出来。但是，网页元素最终的样式是综合各种规则计算出来的。因此，如果想得到元素实际的样式，只读取行内样式是不够的，需要得到浏览器最终计算出来的样式规则`

`window.getComputedStyle方法，就用来返回浏览器计算后得到的最终规则。它接受一个节点对象作为参数，返回一个 CSSStyleDeclaration 实例，包含了指定节点的最终样式信息。所谓“最终样式信息”，指的是各种 CSS 规则叠加后的结果`

```javascript
var div = document.querySelector('div');
var styleObj = window.getComputedStyle(div);
styleObj.backgroundColor
```

上面代码中，得到的背景色就是div元素真正的背景色

`注意，CSSStyleDeclaration 实例是一个活的对象，任何对于样式的修改，会实时反映到这个实例上面。另外，这个实例是只读的`

`getComputedStyle方法还可以接受第二个参数，表示当前元素的伪元素（比如:before、:after、:first-line、:first-letter等）`

```javascript
var result = window.getComputedStyle(div, ':before');
```

下面的例子是如何获取元素的高度

```javascript
var elem = document.getElementById('elem-container');
var styleObj = window.getComputedStyle(elem, null)
var height = styleObj.height;
// 等同于
var height = styleObj['height'];
var height = styleObj.getPropertyValue('height');
```

`上面代码得到的height属性，是浏览器最终渲染出来的高度，比其他方法得到的高度更可靠。由于styleObj是 CSSStyleDeclaration 实例，所以可以使用各种 CSSStyleDeclaration 的实例属性和方法`

有几点需要注意

+ `CSSStyleDeclaration 实例返回的 CSS 值都是绝对单位。比如，长度都是像素单位（返回值包括px后缀），颜色是rgb(#, #, #)或rgba(#, #, #, #)格式`
+ `CSS 规则的简写形式无效。比如，想读取margin属性的值，不能直接读，只能读marginLeft、marginTop等属性；再比如，font属性也是不能直接读的，只能读font-size等单个属性`
+ `如果读取 CSS 原始的属性名，要用方括号运算符，比如styleObj['z-index']；如果读取骆驼拼写法的 CSS 属性名，可以直接读取styleObj.zIndex`
+ `该方法返回的 CSSStyleDeclaration 实例的cssText属性无效，返回undefined`

## CSS 伪元素

`CSS 伪元素是通过 CSS 向 DOM 添加的元素，主要是通过:before和:after选择器生成，然后用content属性指定伪元素的内容`

```html
<div id="test">Test content</div>
```

CSS 添加伪元素:before的写法如下

```css
#test:before {
  content: 'Before ';
  color: #FF0;
}
```

`节点元素的style对象无法读写伪元素的样式，这时就要用到window.getComputedStyle()。JavaScript 获取伪元素，可以使用下面的方法`

```javascript
var test = document.querySelector('#test');

var result = window.getComputedStyle(test, ':before').content;
var color = window.getComputedStyle(test, ':before').color;
```

此外，也可以使用 CSSStyleDeclaration 实例的getPropertyValue方法，获取伪元素的属性

```javascript
var result = window.getComputedStyle(test, ':before')
  .getPropertyValue('content');
var color = window.getComputedStyle(test, ':before')
  .getPropertyValue('color');
```

## window.matchMedia()

### 基本用法

window.matchMedia方法用来将 CSS 的MediaQuery条件语句，转换成一个 MediaQueryList 实例

```javascript
var mdl = window.matchMedia('(min-width: 400px)');
mdl instanceof MediaQueryList // true
```

上面代码中，变量mdl就是 mediaQueryList 的实例

`注意，如果参数不是有效的MediaQuery条件语句，window.matchMedia不会报错，依然返回一个 MediaQueryList 实例`

```javascript
window.matchMedia('bad string') instanceof MediaQueryList // true
```

### MediaQueryList 接口的实例属性

MediaQueryList 实例有三个属性

#### MediaQueryList.media

`MediaQueryList.media属性返回一个字符串，表示对应的 MediaQuery 条件语句`

```javascript
var mql = window.matchMedia('(min-width: 400px)');
mql.media // "(min-width: 400px)"
```

#### MediaQueryList.matches

`MediaQueryList.matches属性返回一个布尔值，表示当前页面是否符合指定的 MediaQuery 条件语句`

```javascript
if (window.matchMedia('(min-width: 400px)').matches) {
  /* 当前视口不小于 400 像素 */
} else {
  /* 当前视口小于 400 像素 */
}
```

`下面的例子根据mediaQuery是否匹配当前环境，加载相应的 CSS 样式表`

```javascript
var result = window.matchMedia("(max-width: 700px)");

if (result.matches){
  var linkElm = document.createElement('link');
  linkElm.setAttribute('rel', 'stylesheet');
  linkElm.setAttribute('type', 'text/css');
  linkElm.setAttribute('href', 'small.css');

  document.head.appendChild(linkElm);
}
```

#### MediaQueryList.onchange

`如果 MediaQuery 条件语句的适配环境发生变化，会触发change事件。MediaQueryList.onchange属性用来指定change事件的监听函数。该函数的参数是change事件对象（MediaQueryListEvent 实例），该对象与 MediaQueryList 实例类似，也有media和matches属性`

```javascript
var mql = window.matchMedia('(max-width: 600px)');

mql.onchange = function(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

上面代码中，change事件发生后，存在两种可能。一种是显示宽度从700像素以上变为以下，另一种是从700像素以下变为以上，所以在监听函数内部要判断一下当前是哪一种情况

### MediaQueryList 接口的实例方法 

`MediaQueryList 实例有两个方法MediaQueryList.addListener()和MediaQueryList.removeListener()，用来为change事件添加或撤销监听函数`

```javascript
var mql = window.matchMedia('(max-width: 600px)');

// 指定监听函数
mql.addListener(mqCallback);

// 撤销监听函数
mql.removeListener(mqCallback);

function mqCallback(e) {
  if (e.matches) {
    /* 视口不超过 600 像素 */
  } else {
    /* 视口超过 600 像素 */
  }
}
```

注意，MediaQueryList.removeListener()方法不能撤销MediaQueryList.onchange属性指定的监听函数
