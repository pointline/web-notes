# Optional Chining

Optional Chining 的核心是允许我们写下如果碰到 null 或者 undefined，TypeScript 能立即停止运行的代码。Optional chaning 耀眼的部分是使用 `?`. 运算符来访问一个可选属性的运算符。当我们写下如下所示代码：

```typescript
let x = foo?.bar.baz();
```

这种方式告诉我们，当 foo 被定义了，foo.bar.baz() 将会完成；`但是当 foo 是 null 或者 undefined 时，TypeScript 会停止我们正在做的事`，并且仅仅是返回 `undefined`

也就是说，上文的代码等效于如下代码：

```typescript
let x = foo === null || foo === undefined ? undefined : foo.bar.baz();
```

注意，如果 bar 是 null 或者 undefined，在访问 bar 时，我们的代码仍然会抛出一个错误

与此相似，如果 baz 是 null 或者 undefined，在调用时，它也会抛出一个错误。`?`. `只会检查它左边的值是 undefined 还是 null - 并不会检查后面的任何属性`

你可能已经发现你可以使用 `?`. 来替代很多使用 `&&` 执行空检查的代码

```typescript
// Before
if (foo && foo.bar && foo.bar.baz) {
  // ...
}

// After-ish
if (foo?.bar?.baz) {
  // ...
}
```

> 注意：`?`. 运算符的行为与 `&&` 运算符并不相同，因为 && 运算符的行为是专门用于 "falsy" 的值（如：空字符串、0、NaN、和 false），但在此种结构中，这是被故意设计成这样的。`?`. `在验证数据如 0 或者空字符串时，它并没有使用短路验证的方式`

`Optional Chining 还包含另外两个运算符，首先是可选元素的访问，它的行为类似于可选属性的访问，但是它允许我们访问非标志符属性（例如：任意的字符串、数字和 symbols）`

```typescript
/**
 * Get the first element of the array if we have an array.
 * Otherwise return undefined.
 */
function tryGetFirstElement<T>(arr?: T[]) {
  return arr?.[0];
  // equivalent to
  //   return (arr === null || arr === undefined) ?
  //       undefined :
  //       arr[0];
}
```

另外一个是可选调用，它能让我们有条件的调用表达式：

```typescript
async function makeRequest(url: string, log?: (msg: string) => void) {
  log?.(`Request started at ${new Date().toISOString()}`);
  // roughly equivalent to
  //   if (log != null) {
  //       log(`Request started at ${new Date().toISOString()}`);
  //   }

  const result = (await fetch(url)).json();

  log?.(`Request finished at at ${new Date().toISOString()}`);

  return result;
}
```

`Optional Chining 的「短路运算」行为被局限在属性的访问、调用以及元素的访问` --- 它不会从这些表达式中进一步扩展，也就是说：

```typescript
let result = foo?.bar / someComputation();
```

Optional Chining 不会阻止除法运算或者 someComputation() 调用，它等价于：

```typescript
let temp = foo === null || foo === undefined ? undefined : foo.bar;

let result = temp / someComputation();
```

它可能会导致除法运算的结果是 undefined，这就是为什么在 strictNullChecks 选项下，会抛出一个错误

```typescript
function barPercentage(foo?: { bar: number }) {
  return foo?.bar / 100;
  //     ~~~~~~~~
  // Error: Object is possibly undefined.
}
```
