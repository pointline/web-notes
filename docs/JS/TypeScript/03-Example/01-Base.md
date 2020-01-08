# Base

## typeof 操作符

```typescript
const info = {
  cpu: 0,
  memory: ""
};

// 通过变量生成类型结构
type ComputerInfo = Readonly<typeof info>;
// ComputerInfo相当于生成下面这样的结构
// 注意这里的typeof用法推测出类型
// 🔻
// type ComputerInfo = {
//     readonly cpu: number;
//     readonly memory: string;
// }
```

## 配置 axios 使用

通常情况下，我们会把后端返回数据格式单独放入一个 interface 里

```typescript
// 请求接口数据
export interface ResponseData<T = any> {
  /**
   * 状态码
   * @type { number }
   */
  code: number;

  /**
   * 数据
   * @type { T }
   */
  result: T;

  /**
   * 消息
   * @type { string }
   */
  message: string;
}
```

当我们把 API 单独抽离成单个模块时

```typescript
// 在 axios.ts 文件中对 axios 进行了处理，例如添加通用配置、拦截器等
import Ax from "./axios";

import { ResponseData } from "./interface.ts";

export function getUser<T>() {
  return Ax.get<ResponseData<T>>("/somepath")
    .then(res => res.data)
    .catch(err => console.error(err));
}
```

接着我们写入返回的数据类型 User，这可以让 TypeScript 顺利推断出我们想要的类型

```typescript
interface User {
  name: string;
  age: number;
}

async function test() {
  // user 被推断出为
  // {
  //  code: number,
  //  result: { name: string, age: number },
  //  message: string
  // }
  const user = await getUser<User>();
}
```

## 辨析联合类型

当类中含有字面量成员时，我们可以用该类的属性来辨析联合类型

做为一个例子，考虑 Square 和 Rectangle 的联合类型 Shape。Square 和 Rectangle 有共同成员 kind，因此 kind 存在于 Shape 中

```typescript
interface Square {
  kind: "square";
  size: number;
}

interface Rectangle {
  kind: "rectangle";
  width: number;
  height: number;
}

// 有人仅仅是添加了 `Circle` 类型
// 我们可能希望 TypeScript 能在任何被需要的地方抛出错误
interface Circle {
  kind: "circle";
  radius: number;
}

type Shape = Square | Rectangle | Circle;

function area(s: Shape) {
  switch (s.kind) {
    case "square":
      return s.size * s.size;
    case "rectangle":
      return s.width * s.height;
    case "circle":
      return Math.PI * s.radius ** 2;
    default:
      const _exhaustiveCheck: never = s;
  }
}
```

## 捕获字符串类型

许多 JavaScript 库和框架都使用原始的 JavaScript 字符串，你可以使用 const 定义一个变量捕获它的类型：

```typescript
// 捕获字符串的类型与值
const foo = "Hello World";

// 使用一个捕获的类型
let bar: typeof foo;

// bar 仅能被赋值 'Hello World'
bar = "Hello World"; // ok
bar = "anything else"; // Error
```

在这个例子里，bar 有字面量类型 Hello World

## 捕获键的名称

`keyof` 操作符能让你捕获一个类型的键。例如，你可以使用它来捕获变量的键名称，在通过使用 `typeof` 来获取类型之后

```typescript
const colors = {
  red: 'red',
  blue: 'blue'
};

type Colors = keyof typeof colors;
// typeof colors 会得到类型
// type {
//   red: string,
//   blue: string
}
// keyof typeof colors 再取建值
// 'red' | 'blue'

let color: Colors; // color 的类型是 'red' | 'blue'
color = 'red'; // ok
color = 'blue'; // ok
color = 'anythingElse'; // Error
```

这允许你很容易地拥有像字符串枚举+常量这样的类型，如上例所示

## 复合类型

TypeScript 的复合类型可以分为两类：set 和 map。set 是指一个无序的、无重复元素的集合。而 map 则和 JS 中的对象一样，是一些没有重复键的键值对

```typescript
// set
type Size = "small" | "default" | "big" | "large";
// map
interface IA {
  a: string;
  b: number;
}
```

### 复合类型间的转换

```typescript
// map => set
type IAKeys = keyof IA; // 'a' | 'b'
type IAValues = IA[keyof IA]; // string | number

// set => map
type SizeMap = {
  [k in Size]: number;
};
// 等价于
type SizeMap2 = {
  small: number;
  default: number;
  big: number;
  large: number;
};
```

### map 上的操作

```typescript
// 索引取值
type SubA = IA["a"]; // string

// 属性修饰符
type Person = {
  age: number;
  readonly name: string; // 只读属性，初始化时必须赋值
  nickname?: string; // 可选属性，相当于 | undefined
};
```

## 映射类型和同态变换

在 TypeScript 中，有以下几种常见的映射类型。它们的共同点是只接受一个传入类型，生成的类型中 key 都来自于 keyof 传入的类型，value 都是传入类型的 value 的变种

```typescript
type Partial<T> = { [P in keyof T]?: T[P] }; // 将一个map所有属性变为可选的
type Required<T> = { [P in keyof T]-?: T[P] }; // 将一个map所有属性变为必选的
type Readonly<T> = { readonly [P in keyof T]: T[P] }; // 将一个map所有属性变为只读的
type Mutable<T> = { -readonly [P in keyof T]: T[P] }; // ts标准库未包含，将一个map所有属性变为可写的
```

此类变换，在 TS 中被称为同态变换。在进行同态变换时，TS 会先复制一遍传入参数的属性修饰符，再应用定义的变换

```typescript
interface Fruit {
  readonly name: string;
  size: number;
}
type PF = Partial<Fruit>; // PF.name既只读又可选，PF.size只可选
```

## 其他常用工具类型

### 由 set 生成 map

```typescript
type Record<K extends keyof any, T> = { [P in K]: T };

type Size = "small" | "default" | "big";
/*
{
    small: number
    default: number
    big: number
}
 */
type SizeMap = Record<Size, number>;
```

### 保留 map 的一部分

```typescript
type Pick<T, K extends keyof T> = { [P in K]: T[P] };
/*
{
    default: number
    big: number
}
 */
type BiggerSizeMap = Pick<SizeMap, "default" | "big">;
```

### 删除 map 的一部分

```typescript
type Omit<T, K> = Pick<T, Exclude<keyof T, K>>;
/*
{
    default: number
}
 */
type DefaultSizeMap = Omit<BiggerSizeMap, "big">;
```

### 保留 set 的一部分

```typescript
type Extract<T, U> = T extends U ? T : never;

type Result = 1 | 2 | 3 | "error" | "success";
type StringResult = Extract<Result, string>; // 'error' | 'success
```

### 删除 set 的一部分

```typescript
type Exclude<T, U> = T extends U ? never : T;
type NumericResult = Exclude<Result, string>; // 1 | 2 | 3
```
