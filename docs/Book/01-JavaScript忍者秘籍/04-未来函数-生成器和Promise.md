# 第 6 章-未来函数-生成器（generator）和 Promise【ES6】

生成器是一种特殊的函数。当从头到尾运行标准函数时，它最多只生成一个值。然而生成器函数会在几次运行请求中暂停，因此每次运行都可能会生成一个值。

## 使用生成器函数

每当生成器函数生成了一个值，它都不会像普通函数一样停止执行。相反，生成器几乎从不挂起。随后，当对另一个值的请求到来后，生成器就会从上次离开的位置恢复执行。

```javascript
function* WeaponGenerator() {
  yield "Katana";
  yield "Wakizashi";
  yield "Kusarigama";
}

for (const weapon of WeaponGenerator()) {
  assert(weapon !== undefined, weapon);
}
```

> 生成器函数需要在关键字 function 后面加上一个星号（\*），这样一来生成器函数体内就能够使用新关键字 yield，从而生成独立的值。
