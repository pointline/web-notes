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
