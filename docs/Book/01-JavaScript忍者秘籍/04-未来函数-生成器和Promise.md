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

作为取出武器数据序列值的方法之一，for-of 是一种用于循环结构新类型

```javascript
for (let weapon of WeaponGenerator()) {
  assert(weapon, weapon);
}
```

## 通过迭代器对象控制生成器

调用生成器函数不一定会执行生成器函数体。通过创建迭代器对象，可以与生成器通信。

```javascript
function* WeaponGenerator() {
  yield "Katana";
  yield "Wakizashi";
  yield "Kusarigama";
}

const weaponsIterator = WeaponGenerator();

const result1 = weaponsIterator.next();
const result2 = weaponsIterator.next();
const result3 = weaponsIterator.next();
```

`调用生成器后，就会创建一个迭代器（iterator）。通过迭代器next方法向生成器请求一个新值`

next 函数调用后，生成器就开始执行代码，当代码执行到 yield 关键字时，就会生成一个中间结果，然后返回一个新对象

每当生成一个当前值后，`生成器就会非阻塞地挂起执行`，随后耐心等待下一次值请求的到达。这是普通函数完全不具有的强大特性

`next函数调用后，返回的对象。属性value是值，属性done的值为true/false，false表明后面还有值会生成`

```javascript
const result2 = weaponsIterator.next();
```

该操作将生成器从挂起状态唤醒，中断执行的生成器从上次离开的位置继续执行代码

### 对迭代器进行迭代

while 循环来迭代生成器生成的值

```javascript
function* WeaponGenerator() {
  yield "Katana";
  yield "Wakizashi";
  yield "Kusarigama";
}

const weaponsIterator = WeaponGenerator();

let item;
while (!(item = weaponsIterator.next()).done) {
  assert(item !== null);
}
```

### 把执行权交给下一个生成器

```javascript
function* WeaponGenerator() {
  yield "Sun Tzu";
  yield* NinjaGenerator();
  yield "Genghis Khan";
}

function* NinjaGenerator() {
  yield "Hattori";
  yield "Yoshi";
}

for (let warrior of WeaponGenerator()) {
  assert(warrior !== null);
}

// 依次输出 Sun Tzu， Hattori， Yoshi，Genghis Khan
```

`在迭代器上使用yield*操作符，程序会跳转到另一个生成器上执行`

`for-of循环不会关心WeaponGenerator委托到另一个生成器上，它只关心在done状态到来之前到一个值调用next方法`
