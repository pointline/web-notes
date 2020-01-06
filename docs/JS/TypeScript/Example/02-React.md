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
