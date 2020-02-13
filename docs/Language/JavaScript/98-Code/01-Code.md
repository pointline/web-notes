# Code

## 判断某个值是否为对象

如果 Object 方法的参数是一个对象，它总是返回该对象，即不用转换

利用这一点，可以写一个判断变量是否为对象的函数

```javascript
function isObject(value) {
  return value === Object(value);
}

isObject([]); // true
isObject(true); // false
```

## 判断类型

利用 Object.prototype.toString.call 得到类型字符串

```javascript
var type = function(o) {
  var s = Object.prototype.toString.call(o);
  return s.match(/\[object (.*?)\]/)[1].toLowerCase();
};

[
  "Null",
  "Undefined",
  "Object",
  "Array",
  "String",
  "Number",
  "Boolean",
  "Function",
  "RegExp"
].forEach(function(t) {
  type["is" + t] = function(o) {
    return type(o) === t.toLowerCase();
  };
});

type.isObject({}); // true
type.isNumber(NaN); // true
type.isRegExp(/abc/); // true
```
