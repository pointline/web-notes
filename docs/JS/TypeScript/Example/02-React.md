# React

## Readonly

ReactJS 是一个喜欢用不变数据的库，你可以标记你的 Props 和 State 为不可变数据

```typescript
interface Props {
  readonly foo: number;
}

interface State {
  readonly bar: number;
}

export class Something extends React.Component<Props, State> {
  someMethod() {
    // 你可以放心，没有人会像下面这么做
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

然而，你并没有必要这么做，React 的声明文件已经标记这些为 readonly（通过传入泛型参数至一个内部包装，来把每个属性标记为 readonly，如上例子所示）

```typescript
export class Something extends React.Component<
  { foo: number },
  { baz: number }
> {
  someMethod() {
    this.props.foo = 123; // Error: props 是不可变的
    this.state.baz = 456; // Error: 你应该使用 this.setState()
  }
}
```

## Redux（辨析联合类型）

```typescript
import { createStore } from "redux";

type Action =
  | {
      type: "INCREMENT";
    }
  | {
      type: "DECREMENT";
    };

/**
 * This is a reducer, a pure function with (state, action) => state signature.
 * It describes how an action transforms the state into the next state.
 *
 * The shape of the state is up to you: it can be a primitive, an array, an object,
 * or even an Immutable.js data structure. The only important part is that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * In this example, we use a `switch` statement and strings, but you can use a helper that
 * follows a different convention (such as function maps) if it makes sense for your
 * project.
 */
function counter(state = 0, action: Action) {
  switch (action.type) {
    case "INCREMENT":
      return state + 1;
    case "DECREMENT":
      return state - 1;
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
let store = createStore(counter);

// You can use subscribe() to update the UI in response to state changes.
// Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// However it can also be handy to persist the current state in the localStorage.

store.subscribe(() => console.log(store.getState()));

// The only way to mutate the internal state is to dispatch an action.
// The actions can be serialized, logged or stored and later replayed.
store.dispatch({ type: "INCREMENT" });
// 1
store.dispatch({ type: "INCREMENT" });
// 2
store.dispatch({ type: "DECREMENT" });
// 1
```

与 TypeScript 一起使用可以有效的防止拼写错误，并且能提高重构和书写文档化代码的能力

## 默认 Props

在有状态组件中使用默认的 Props：你可以通过 null 操作符（这不是一个理想的方式，但是这是我能想到的最简单的最小代码解决方案）告诉 TypeScript 一个属性将会被外部提供（React）

```typescript
class Hello extends React.Component<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string;
  framework: string;
}> {
  static defaultProps = {
    compiler: "TypeScript"
  };
  render() {
    const compiler = this.props.compiler!;
    return (
      <div>
        <div>{compiler}</div>
        <div>{this.props.framework}</div>
      </div>
    );
  }
}

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```

在 SFC 中使用默认的 Props：推荐使用简单的 JavaScript 参数，因为同样适用于 TypeScript 类型系统

```typescript
const Hello: React.SFC<{
  /**
   * @default 'TypeScript'
   */
  compiler?: string;
  framework: string;
}> = ({
  compiler = "TypeScript", // Default prop
  framework
}) => {
  return (
    <div>
      <div>{compiler}</div>
      <div>{framework}</div>
    </div>
  );
};

ReactDOM.render(
  <Hello framework="React" />, // TypeScript React
  document.getElementById("root")
);
```
