# GlobalEventHandlers 接口

## GlobalEventHandlers.onerror

`error事件发生时，就会调用onerror属性指定的回调函数`

`error事件分成两种`

`一种是 JavaScript 的运行时错误，这会传到window对象，导致window.onerror()。`

```javascript
window.onerror = function (message, source, lineno, colno, error) {
  // ...
}
```

window.onerror的处理函数共接受五个参数，含义如下

+ `message：错误信息字符串`
+ `source：报错脚本的 URL`
+ `lineno：报错的行号，是一个整数`
+ `colno：报错的列号，是一个整数`
+ `error： 错误对象`

`另一种是资源加载错误，比如<img>或<script>加载的资源出现加载错误。这时，Error 对象会传到对应的元素，导致该元素的onerror属性开始执行。`

```javascript
element.onerror = function (event) {
  // ...
}
```

注意，一般来说，资源的加载错误不会触发window.onerror。
