# Nullish Coalescing

nullish coalescing 运算符是另一个即将推出的 ECMAScript 功能，它与 Optional chaining 一同被推出

你可以这么想它的功能 - `?? 运算符` - 当处理 null 或者 undefined 时，它可以作为一种「倒退」到默认值的方式，当我们写下如下代码：

```typescript
let x = foo ?? bar();
```

这种方式来表示当 foo 值存在时，foo 会被使用，但是当它是 null 或 undefined，它会计算 bar()

它等价于如下代码：

```typescript
let x = foo !== null && foo !== undefined ? foo : bar();
```

`当尝试使用一个默认值时，?? 运算符可以被 || 替代`。例如，在下面的代码片段中，当尝试获取最后一次储存在 localStorage 中的 volume 时（如果它存在）；但是当使用 ||，这会有个 bug

```typescript
function initializeAudio() {
  let volume = localStorage.volume || 0.5;

  // ...
}
```

当 localStore.volume 的值是 0 时，在这段代码里，将会把 volume 的值设置为 0.5。?? 运算符能避免一些从 0、NaN 以及'' 这些被认为是 falsy 值的意外行为
