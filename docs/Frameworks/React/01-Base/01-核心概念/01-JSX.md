# JSX 简介

## 什么是 JSX

JSX 是一个 JavaScript 的语法扩展

## 为什么使用 JSX

React 认为渲染逻辑本质上与其他 UI 逻辑内在耦合，比如，在 UI 中需要绑定处理事件、在某些时刻状态发生变化时需要通知到 UI，以及需要在 UI 中展示准备好的数据

## 特点

### 在 JSX 中嵌入表达式

在 JSX 语法中，可以在大括号内放置任何有效的 JavaScript 表达式

### JSX 也是一个表达式

可以在 if 语句和 for 循环的代码块中使用 JSX，将 JSX 赋值给变量，把 JSX 当作参数传入，以及从函数中返回 JSX

### JSX 特定属性

- 可以通过使用引号，来将属性值指定为字符串字面量
- 可以使用大括号，来在属性值中插入一个 JavaScript 表达式
- 因为 JSX 语法上更接近 JavaScript 而不是 HTML，所以 React DOM 使用 camelCase（小驼峰命名）来定义属性的名称，而不使用 HTML 属性名称的命名约定

### 使用 JSX 指定子元素

- JSX 标签里能够包含很多子元素

### JSX 防止注入攻击

- 可以安全地在 JSX 当中插入用户输入内容

```javascript
const title = response.potentiallyMaliciousInput;
// 直接使用是安全的：
const element = <h1>{title}</h1>;
```

React DOM 在渲染所有输入内容之前，默认会进行转义。它可以确保在你的应用中，永远不会注入那些并非自己明确编写的内容。所有的内容在渲染之前都被转换成了字符串。这样可以有效地防止 XSS（cross-site-scripting, 跨站脚本）攻击
