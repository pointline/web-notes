# tsconfig.json

```json
{
  "compilerOptions": {
    /* Basic Options */
    // "incremental": true,                   /* Enable incremental compilation */
    "target": "es5" /* Specify ECMAScript target version: 'ES3' (default), 'ES5', 'ES2015', 'ES2016', 'ES2017', 'ES2018', 'ES2019' or 'ESNEXT'. */,
    "module": "commonjs" /* Specify module code generation: 'none', 'commonjs', 'amd', 'system', 'umd', 'es2015', or 'ESNext'. */,
    // "lib": [],                             /* Specify library files to be included in the compilation. 指定要包含在编译中的库文件 */
    // "allowJs": true,                       /* Allow javascript files to be compiled. 允许编译 javascript 文件 */
    // "checkJs": true,                       /* Report errors in .js files. 报告 javascript 文件中的错误 */
    // "jsx": "preserve",                     /* Specify JSX code generation: 'preserve', 'react-native', or 'react'. 指定 jsx 代码的生成: 'preserve', 'react-native', or 'react' */
    // "declaration": true,                   /* Generates corresponding '.d.ts' file. */
    // "declarationMap": true,                /* Generates a sourcemap for each corresponding '.d.ts' file. */
    // "sourceMap": true,                     /* Generates corresponding '.map' file. 生成相应的 '.map' 文件 */
    // "outFile": "./",                       /* Concatenate and emit output to single file. */
    // "outDir": "./",                        /* Redirect output structure to the directory. 指定输出目录 */
    // "rootDir": "./",                       /* Specify the root directory of input files. Use to control the output directory structure with --outDir. 用来控制输出目录结构 --outDir */
    // "composite": true,                     /* Enable project compilation */
    // "tsBuildInfoFile": "./",               /* Specify file to store incremental compilation information */
    // "removeComments": true,                /* Do not emit comments to output. 删除编译后的所有的注释 */
    // "noEmit": true,                        /* Do not emit outputs. */
    // "importHelpers": true,                 /* Import emit helpers from 'tslib'. 从 tslib 导入辅助工具函数 */
    // "downlevelIteration": true,            /* Provide full support for iterables in 'for-of', spread, and destructuring when targeting 'ES5' or 'ES3'. */
    // "isolatedModules": true,               /* Transpile each file as a separate module (similar to 'ts.transpileModule'). 将每个文件做为单独的模块  */

    /* Strict Type-Checking Options */
    "strict": true /* Enable all strict type-checking options. 启用所有严格类型检查选项 【开启】*/,
    // "noImplicitAny": true,                 /* Raise error on expressions and declarations with an implied 'any' type. 在表达式和声明上有隐含的 any类型时报错 */
    // "strictNullChecks": true,              /* Enable strict null checks. 启用严格的 null 检查 */
    // "strictFunctionTypes": true,           /* Enable strict checking of function types. */
    // "strictBindCallApply": true,           /* Enable strict 'bind', 'call', and 'apply' methods on functions. */
    // "strictPropertyInitialization": true,  /* Enable strict checking of property initialization in classes. */
    // "noImplicitThis": true,                /* Raise error on 'this' expressions with an implied 'any' type. */
    // "alwaysStrict": true,                  /* Parse in strict mode and emit "use strict" for each source file. */

    /* Additional Checks */
    // "noUnusedLocals": true,                /* Report errors on unused locals. 有未使用的变量时，抛出错误 */
    // "noUnusedParameters": true,            /* Report errors on unused parameters. 有未使用的参数时，抛出错误 */
    // "noImplicitReturns": true,             /* Report error when not all code paths in function return a value. 并不是所有函数里的代码都有返回值时，抛出错误 */
    // "noFallthroughCasesInSwitch": true,    /* Report errors for fallthrough cases in switch statement. 报告 switch 语句的 fallthrough 错误 */

    /* Module Resolution Options */
    // "moduleResolution": "node",            /* Specify module resolution strategy: 'node' (Node.js) or 'classic' (TypeScript pre-1.6). */
    // "baseUrl": "./",                       /* Base directory to resolve non-absolute module names. */
    // "paths": {},                           /* A series of entries which re-map imports to lookup locations relative to the 'baseUrl'. */
    // "rootDirs": [],                        /* List of root folders whose combined content represents the structure of the project at runtime. */
    "typeRoots": [
      // "./typings",
      // "./node_modules/@types"
    ] /* List of folders to include type definitions from. 包含类型声明的文件列表 */,
    "types": [
      // "node", "lodash", "express"
    ] /* Type declaration files to be included in compilation.   需要包含的类型声明文件名列表 */,
    // "allowSyntheticDefaultImports": true,  /* Allow default imports from modules with no default export. This does not affect code emit, just typechecking. */
    "esModuleInterop": true /* Enables emit interoperability between CommonJS and ES Modules via creation of namespace objects for all imports. Implies 'allowSyntheticDefaultImports'. */,
    // "preserveSymlinks": true,              /* Do not resolve the real path of symlinks. */
    // "allowUmdGlobalAccess": true,          /* Allow accessing UMD globals from modules. */

    /* Source Map Options */
    // "sourceRoot": "",                      /* Specify the location where debugger should locate TypeScript files instead of source locations. */
    // "mapRoot": "",                         /* Specify the location where debugger should locate map files instead of generated locations. */
    // "inlineSourceMap": true,               /* Emit a single file with source maps instead of having a separate file. */
    // "inlineSources": true,                 /* Emit the source alongside the sourcemaps within a single file; requires '--inlineSourceMap' or '--sourceMap' to be set. */

    /* Experimental Options */
    // "experimentalDecorators": true,        /* Enables experimental support for ES7 decorators. 启用装饰器 */
    // "emitDecoratorMetadata": true,         /* Enables experimental support for emitting type metadata for decorators. */

    /* Advanced Options */
    "forceConsistentCasingInFileNames": true /* Disallow inconsistently-cased references to the same file. */
  },
  "files": [] /* 显示指定需要编译的文件 */,
  "include": [] /* 包含编译文件 */,
  "exclude": ["./folder/**/*.spec.ts", "./folder/someSubFolder"] /* 排除文件 */,
  "extends": "./configs/base" /* 集成基础配置 */,
  "compileOnSave": true /* 保存时重新生成文件 */
}
```
