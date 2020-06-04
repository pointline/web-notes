# 列表 & key

## 渲染多个组件

你可以通过使用{}在 JSX 内构建一个元素集合

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => <li>{number}</li>);
```

## 基础列表组件

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => <li>{number}</li>);
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

当我们运行这段代码，将会看到一个警告 a key should be provided for list items，意思是当你创建一个元素时，必须包括一个特殊的 key 属性

给每个列表元素分配一个 key 属性来解决上面的那个警告

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <li key={number.toString()}>{number}</li>
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

## key

key 帮助 React 识别哪些元素改变了，比如被添加或删除。因此你应当给数组中的每一个元素赋予一个确定的标识

```javascript
const numbers = [1, 2, 3, 4, 5];
const listItems = numbers.map((number) => (
  <li key={number.toString()}>{number}</li>
));
```

一个元素的 key 最好是这个元素在列表中拥有的一个独一无二的字符串。通常，我们使用数据中的 id 来作为元素的 key

```javascript
const todoItems = todos.map((todo) => <li key={todo.id}>{todo.text}</li>);
```

`当元素没有确定id的时候，万不得已你可以使用元素索引index作为key`

```javascript
const todoItems = todos.map((todo, index) => (
  // Only do this if items have no stable IDs
  <li key={index}>{todo.text}</li>
));
```

`如果列表项目的顺序可能会变化，我们不建议使用索引来用作key值，因为这样做会导致性能变差，还可能引起组件状态的问题`

## 用 key 提取组件

元素的 key 只有放在就近的数组上下文中才有意义

比方说，如果你提取出一个 ListItem 组件，你应该把 key 保留在数组中的这个 ListItem 元素上，而不是放在 ListItem 组件中的 li 元素上

```javascript
// 不正确的使用 key 的方式
function ListItem(props) {
  const value = props.value;
  return (
    // 错误！你不需要在这里指定 key：
    <li key={value.toString()}>{value}</li>
  );
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 错误！元素的 key 应该在这里指定：
    <ListItem value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);

// 正确的使用 key 的方式
function ListItem(props) {
  // 正确！这里不需要指定 key：
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    // 正确！key 应该在数组的上下文中被指定
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

const numbers = [1, 2, 3, 4, 5];
ReactDOM.render(
  <NumberList numbers={numbers} />,
  document.getElementById("root")
);
```

## key 只是在兄弟节点之间必须唯一

数组元素中使用的 key 在其兄弟节点之间应该是独一无二的。然而，它们不需要是全局唯一的。当我们生成两个不同的数组时，我们可以使用相同的 key 值

`key会传递信息给React，但不会传递给你的组件。如果你的组件中需要使用key属性的值，请用其他属性名显式传递这个值`

## 在 JSX 中嵌入 map()

```javascript
function NumberList(props) {
  const numbers = props.numbers;
  const listItems = numbers.map((number) => (
    <ListItem key={number.toString()} value={number} />
  ));
  return <ul>{listItems}</ul>;
}

// JSX 允许在大括号中嵌入任何表达式，所以我们可以内联 map() 返回的结果

function NumberList(props) {
  const numbers = props.numbers;
  return (
    <ul>
      {numbers.map((number) => (
        <ListItem key={number.toString()} value={number} />
      ))}
    </ul>
  );
}
```
