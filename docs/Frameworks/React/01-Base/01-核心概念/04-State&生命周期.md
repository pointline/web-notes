# State & 生命周期

State 与 props 类似，但是 state 是私有的，并且完全受控于当前组件

## 将函数组件转换成 class 组件

- 创建一个同名的 ES6class，并且继承于 React.Component。
- 添加一个空的 render()方法。
- 将函数体移动到 render()方法之中。
- 在 render()方法中使用 this.props 替换 props。
- 删除剩余的空函数声明。

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.props.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

每次组件更新时 render 方法都会被调用

## 向 class 组件中添加局部的 state

- 把 render()方法中的 this.props.date 替换成 this.state.date

```javascript
class Clock extends React.Component {
  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

- 添加一个 class 构造函数，然后在该函数中为 this.state 赋初值

```javascript
class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = { date: new Date() };
  }

  render() {
    return (
      <div>
        <h1>Hello, world!</h1>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}
```

## 将生命周期方法添加到 Class 中

## 正确地使用 State

### 不要直接修改 State

```javascript
// Wrong
this.state.comment = "Hello";
// Correct
this.setState({ comment: "Hello" });
```

### State 的更新可能是异步的

`出于性能考虑，React可能会把多个setState()调用合并成一个调用`

`因为this.props和this.state可能会异步更新，所以你不要依赖他们的值来更新下一个状态`

此代码可能会无法更新计数器：

```javascript
// Wrong
this.setState({
  counter: this.state.counter + this.props.increment,
});
```

`要解决这个问题，可以让setState()接收一个函数而不是一个对象。这个函数用上一个state作为第一个参数，将此次更新被应用时的props做为第二个参数`

上面使用了箭头函数，不过使用普通的函数也同样可以

```javascript
// Correct
this.setState(function (state, props) {
  return {
    counter: state.counter + props.increment,
  };
});
```

### State 的更新会被合并

`当你调用setState()的时候，React会把你提供的对象合并到当前的state`

例如，你的 state 包含几个独立的变量：

```javascript
constructor(props) {
  super(props);
  this.state = {
    posts: [],
    comments: []
  };
}
```

然后你可以分别调用 setState() 来单独地更新它们：

```javascript
  componentDidMount() {
    fetchPosts().then(response => {
      this.setState({
        posts: response.posts
      });
    });

    fetchComments().then(response => {
      this.setState({
        comments: response.comments
      });
    });
  }
```

`这里的合并是浅合并，所以this.setState({comments})完整保留了 this.state.posts，但是完全替换了this.state.comments。`

## 数据是向下流动的

`不管是父组件或是子组件都无法知道某个组件是有状态的还是无状态的，并且它们也并不关心它是函数组件还是class组件。`

`这就是为什么称state为局部的或是封装的的原因。除了拥有并设置了它的组件，其他组件都无法访问。`

组件可以选择把它的 state 作为 props 向下传递到它的子组件中：

```javascript
<FormattedDate date={this.state.date} />
```

FormattedDate 组件会在其 props 中接收参数 date，但是组件本身无法知道它是来自于 Clock 的 state，或是 Clock 的 props，还是手动输入的：

```javascript
function FormattedDate(props) {
  return <h2>It is {props.date.toLocaleTimeString()}.</h2>;
}
```

`这通常会被叫做“自上而下”或是“单向”的数据流。任何的state总是所属于特定的组件，而且从该state派生的任何数据或UI只能影响树中“低于”它们的组件。`
