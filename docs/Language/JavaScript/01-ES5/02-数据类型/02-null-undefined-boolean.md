# null, undefined, boolean

## null和undefined

null与undefined都可以表示“没有”，含义非常相似。将一个变量赋值为undefined或null，老实说，语法效果几乎没区别

```javascript
var a = undefined;
// 或者
var a = null;
```

在if语句中，它们都会被自动转为false，相等运算符（==）甚至直接报告两者相等

```javascript
if (!undefined) {
  console.log('undefined is false');
}
// undefined is false

if (!null) {
  console.log('null is false');
}
// null is false

undefined == null
// true
```

从上面代码可见，两者的行为是何等相似！谷歌公司开发的 JavaScript 语言的替代品 Dart 语言，就明确规定只有null，没有undefined

1995年 JavaScript 诞生时，最初像 Java 一样，只设置了null表示"无"。根据 C 语言的传统，`null可以自动转为0`

```javascript
Number(null) // 0
5 + null // 5
```

undefined是一个表示"此处无定义"的原始值，转为数值时为NaN

```javascript
Number(undefined) // NaN
5 + undefined // NaN
```

## 布尔值

布尔值代表“真”和“假”两个状态。“真”用关键字true表示，“假”用关键字false表示。布尔值只有这两个值。

下列运算符会返回布尔值
+ 前置逻辑运算符： ! (Not)
+ 相等运算符：===，!==，==，!=
+ 比较运算符：>，>=，<，<=

如果 JavaScript 预期某个位置应该是布尔值，会将该位置上现有的值自动转为布尔值。`转换规则是除了下面六个值被转为false，其他值都视为true`

+ `undefined`
+ `null`
+ `false`
+ `0`
+ `NaN`
+ `""`和`''` （空字符串）

> 注意，空数组（[]）和空对象（{}）对应的布尔值，都是true

```javascript
if ([]) {
  console.log('true');
}
// true

if ({}) {
  console.log('true');
}
// true
```
