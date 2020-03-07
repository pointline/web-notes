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

## 根据对象某个属性排序

正负负正，正序排列，返回负数；倒序排列，返回正数

```javascript
[
  { name: "张三", age: 30 },
  { name: "李四", age: 24 },
  { name: "王五", age: 28 }
].sort(function(o1, o2) {
  return o1.age - o2.age;
});
// [
//   { name: "李四", age: 24 },
//   { name: "王五", age: 28  },
//   { name: "张三", age: 30 }
// ]
```

## 总是返回数值的整数部分的函数

```javascript
function ToInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

ToInteger(3.2); // 3
ToInteger(3.5); // 3
ToInteger(3.8); // 3
ToInteger(-3.2); // -3
ToInteger(-3.5); // -3
ToInteger(-3.8); // -3
```

## 随机数

### 任意范围的随机数生成函数如下

```javascript
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

getRandomArbitrary(1.5, 6.5);
// 2.4942810038223864
```

### 任意范围的随机整数生成函数如下

```javascript
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

getRandomInt(1, 6); // 5
```

### 返回随机字符的例子如下

```javascript
function random_str(length) {
  var ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  ALPHABET += "abcdefghijklmnopqrstuvwxyz";
  ALPHABET += "0123456789-_";
  var str = "";
  for (var i = 0; i < length; ++i) {
    var rand = Math.floor(Math.random() * ALPHABET.length);
    str += ALPHABET.substring(rand, rand + 1);
  }
  return str;
}

random_str(6); // "NdQKOr"
```

## 将数组的空元素变为 undefined

```javascript
Array.apply(null, ["a", , "b"]);
// [ 'a', undefined, 'b' ]

Array.apply(null, a).forEach(print);
// a
// undefined
// b
```
