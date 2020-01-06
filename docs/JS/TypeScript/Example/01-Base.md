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
