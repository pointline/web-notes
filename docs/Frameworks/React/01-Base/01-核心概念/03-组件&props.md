# 组件 & Props

组件允许你将 UI 拆分为独立可复用的代码片段，并对每个片段进行独立构思

组件，从概念上类似于 JavaScript 函数。它接受任意的入参（即 “props”），并返回用于描述页面展示内容的 React 元素

## 函数组件与 class 组件

该函数是一个有效的 React 组件，因为它接收唯一带有数据的“props”（代表属性）对象与并返回一个 React 元素。这类组件被称为“函数组件”，因为它本质上就是 JavaScript 函数

```javascript
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}
```

ES6 的 class 来定义组件

```javascript
class Welcome extends React.Component {
  render() {
    return <h1>Hello, {this.props.name}</h1>;
  }
}
```

## 渲染组件

注意：组件名称必须以大写字母开头。

React 会将以小写字母开头的组件视为原生 DO 标签。例如，`<div />` 代表 HTML 的 div 标签，而 `<Welcome />` 则代表一个组件，并且需在作用域内使用 Welcome。

## 组合组件

组件可以在其输出中引用其他组件。这就可以让我们用同一组件来抽象出任意层次的细节

## 提取组件

将组件拆分为更小的组件

## Props 的只读性

`组件无论是使用函数声明还是通过class声明，都决不能修改自身的props`

来看下这个 sum 函数：

```javascript
function sum(a, b) {
  return a + b;
}
```

`这样的函数被称为“纯函数”，因为该函数不会尝试更改入参，且多次调用下相同的入参始终返回相同的结果。`

相反，下面这个函数则不是纯函数，因为它更改了自己的入参

```javascript
function withdraw(account, amount) {
  account.total -= amount;
}
```

React 非常灵活，但它也有一个严格的规则：

`所有React组件都必须像纯函数一样保护它们的props不被更改。`
