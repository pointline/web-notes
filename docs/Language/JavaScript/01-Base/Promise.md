# Promise

## Promise 简介

Promise 是抽象异步处理对象以及对其进行各种操作的组件。

Promise 最初被提出是在 E 语言中，它是基于并列/并行处理设计的一种编程语言

在 ES6 Promises 标准中定义的 API 还不是很多

目前大致有下面三种类型

### Constructor

Promise 类似于 XMLHttpRequest，从`构造函数Promise`来创建一个 Promise 对象作为接口

要想创建一个 promise 对象、可以使用`new来调用Promise的构造器来进行实例化`

```javascript
var promise = new Promise(function(resolve, reject) {
  // 异步处理
  // 处理结束后、调用resolve 或 reject
});
```

### Instance Method

对通过 new 生成的 promise 对象为了设置其值在 `resolve(成功) / reject(失败)`时调用的回调函数可以使用`promise.then()` 实例方法

```javascript
promise.then(onFulfilled, onRejected);
```

- `resolve(成功)`
  - onFulfilled 会被调用
- `reject(失败)`
  - onRejected 会被调用

> onFulfilled、onRejected 两个都为可选参数

`promise.then` 成功和失败时都可以使用。另外在只想对异常进行处理时可以采用 promise.then(undefined, onRejected) 这种方式，只指定 reject 时的回调函数即可。不过这种情况下 `promise.catch(onRejected)`应该是个更好的选择

```javascript
promise.catch(onRejected);
```

## Static Method

像 Promise 这样的全局对象还拥有一些静态方法

包括 `Promise.all()` 还有 `Promise.resolve()` 等在内，主要都是一些对 Promise 进行操作的辅助方法

### Promise workflow

实例代码

```javascript
function asyncFunction() {
  // 1
  return new Promise(function(resolve, reject) {
    setTimeout(function() {
      resolve("Async Hello world");
    }, 16);
  });
}
// 2
asyncFunction()
  .then(function(value) {
    console.log(value); // => 'Async Hello world'
  })
  .catch(function(error) {
    console.log(error);
  });
```

- 1. new Promise 构造器之后，会返回一个 Promise 对象
- 2. Promise 对象用设置 then 调用返回值时的回调函数

asyncFunction 这个函数会返回 promise 对象，对于这个 promise 对象，我们调用它的 then 方法来设置 resolve 后的回调函数，catch 方法来设置发生错误时的回调函数

该 promise 对象会在 setTimeout 之后的 16ms 时被 resolve, 这时 then 的回调函数会被调用，并输出 'Async Hello world'

在这种情况下 catch 的回调函数并不会被执行（因为 promise 返回了 resolve），不过如果运行环境没有提供 setTimeout 函数的话，那么上面代码在执行中就会产生异常，在 catch 中设置的回调函数就会被执行

当然，像 promise.then(onFulfilled, onRejected) 的方法声明一样，如果不使用 catch 方法只使用 then 方法的话，如下所示的代码也能完成相同的工作

```javascript
asyncFunction().then(
  function(value) {
    console.log(value);
  },
  function(error) {
    console.log(error);
  }
);
```
