# this 关键字

## 涵义

this关键字是一个非常重要的语法点。毫不夸张地说，不理解它的含义，大部分开发任务都无法完成

`前一章已经提到，this可以用在构造函数之中，表示实例对象。除此之外，this还可以用在别的场合。但不管是什么场合，this都有一个共同点：它总是返回一个对象`

`简单说，this就是属性或方法“当前”所在的对象`

```javascript
this.property
```

上面代码中，this就代表property属性当前所在的对象

`JavaScript 语言之中，一切皆对象，运行环境也是对象，所以函数都是在某个对象之中运行，this就是函数运行时所在的对象（环境）。这本来并不会让用户糊涂，但是 JavaScript 支持运行环境动态切换，也就是说，this的指向是动态的，没有办法事先确定到底指向哪个对象，这才是最让初学者感到困惑的地方`

## 实质

JavaScript 语言之所以有 this 的设计，跟内存里面的数据结构有关系

```javascript
var obj = { foo:  5 };
```

`上面的代码将一个对象赋值给变量obj。JavaScript 引擎会先在内存里面，生成一个对象{ foo: 5 }，然后把这个对象的内存地址赋值给变量obj。也就是说，变量obj是一个地址（reference）。后面如果要读取obj.foo，引擎先从obj拿到内存地址，然后再从该地址读出原始的对象，返回它的foo属性`

`原始的对象以字典结构保存，每一个属性名都对应一个属性描述对象。举例来说，上面例子的foo属性，实际上是以下面的形式保存的`

```javascript
{
  foo: {
    [[value]]: 5
    [[writable]]: true
    [[enumerable]]: true
    [[configurable]]: true
  }
}
```

注意，foo属性的值保存在属性描述对象的value属性里面

`这样的结构是很清晰的，问题在于属性的值可能是一个函数`

```javascript
var obj = { foo: function () {} };
```

`这时，引擎会将函数单独保存在内存中，然后再将函数的地址赋值给foo属性的value属性`

```javascript
{
  foo: {
    [[value]]: 函数的地址
    ...
  }
}
```

`由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行`

```javascript
var f = function () {};
var obj = { f: f };

// 单独执行
f()

// obj 环境执行
obj.f()
```

`JavaScript 允许在函数体内部，引用当前环境的其它变量`

```javascript
var f = function () {
  console.log(x);
};
```

上面代码中，函数体里面使用了变量x。该变量由运行环境提供

`现在问题就来了，由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境`

```javascript
var f = function () {
  console.log(this.x);
}
```

上面代码中，函数体里面的this.x就是指当前运行环境的x

```javascript
var f = function () {
  console.log(this.x);
}

var x = 1;
var obj = {
  f: f,
  x: 2,
};

// 单独执行
f() // 1

// obj 环境执行
obj.f() // 2
```

上面代码中，函数f在全局环境执行，this.x指向全局环境的x；在obj环境执行，this.x指向obj.x

## 使用场合

this主要有以下几个使用场合

### 全局环境

全局环境使用this，它指的就是顶层对象window

```javascript
this === window // true

function f() {
  console.log(this === window);
}
f() // true
```

上面代码说明，不管是不是在函数内部，只要是在全局环境下运行，this就是指顶层对象window

### 构造函数

构造函数中的this，指的是实例对象

```javascript
var Obj = function (p) {
  this.p = p;
};
```

上面代码定义了一个构造函数Obj。由于this指向实例对象，所以在构造函数内部定义this.p，就相当于定义实例对象有一个p属性

```javascript
var o = new Obj('Hello World!');
o.p // "Hello World!"
```

### 对象的方法

`如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向`

但是，这条规则很不容易把握。请看下面的代码

```javascript
var obj ={
  foo: function () {
    console.log(this);
  }
};

obj.foo() // obj
```

上面代码中，obj.foo方法执行时，它内部的this指向obj

但是，下面这几种用法，都会改变this的指向

```javascript
// 情况一
(obj.foo = obj.foo)() // window
// 情况二
(false || obj.foo)() // window
// 情况三
(1, obj.foo)() // window
```

上面代码中，obj.foo就是一个值。这个值真正调用的时候，运行环境已经不是obj了，而是全局环境，所以this不再指向obj

> 对象设置属性或方法时，返回设置的属性或方法

`可以这样理解，JavaScript 引擎内部，obj和obj.foo储存在两个内存地址，称为地址一和地址二。obj.foo()这样调用时，是从地址一调用地址二，因此地址二的运行环境是地址一，this指向obj。但是，上面三种情况，都是直接取出地址二进行调用，这样的话，运行环境就是全局环境，因此this指向全局环境。上面三种情况等同于下面的代码`

```javascript
// 情况一
(obj.foo = function () {
  console.log(this);
})()
// 等同于
(function () {
  console.log(this);
})()

// 情况二
(false || function () {
  console.log(this);
})()

// 情况三
(1, function () {
  console.log(this);
})()
```

> `如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层`

```javascript
var a = {
  p: 'Hello',
  b: {
    m: function() {
      console.log(this.p);
    }
  }
};

a.b.m() // undefined
```

`上面代码中，a.b.m方法在a对象的第二层，该方法内部的this不是指向a，而是指向a.b，因为实际执行的是下面的代码`

```javascript
var b = {
  m: function() {
   console.log(this.p);
  }
};

var a = {
  p: 'Hello',
  b: b
};

(a.b).m() // 等同于 b.m()
```

如果要达到预期效果，只有写成下面这样

```javascript
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};
```

`如果这时将嵌套对象内部的方法赋值给一个变量，this依然会指向全局对象`

```javascript
var a = {
  b: {
    m: function() {
      console.log(this.p);
    },
    p: 'Hello'
  }
};

var hello = a.b.m;
hello() // undefined
```

上面代码中，m是多层对象内部的一个方法。为求简便，将其赋值给hello变量，结果调用时，this指向了顶层对象。为了避免这个问题，可以只将m所在的对象赋值给hello，这样调用时，this的指向就不会变

```javascript
var hello = a.b;
hello.m() // Hello
```

## 使用注意点

### 避免多层 this

`由于this的指向是不确定的，所以切勿在函数中包含多层的this`

```javascript
var o = {
  f1: function () {
    console.log(this);
    var f2 = function () {
      console.log(this);
    }();
  }
}

o.f1()
// Object
// Window
```

上面代码包含两层this，结果运行后，第一层指向对象o，第二层指向全局对象，因为实际执行的是下面的代码

```javascript
var temp = function () {
  console.log(this);
};

var o = {
  f1: function () {
    console.log(this);
    var f2 = temp();
  }
}
```

一个解决方法是在第二层改用一个指向外层this的变量

```javascript
var o = {
  f1: function() {
    console.log(this);
    var that = this;
    var f2 = function() {
      console.log(that);
    }();
  }
}

o.f1()
// Object
// Object
```

上面代码定义了变量that，固定指向外层的this，然后在内层使用that，就不会发生this指向的改变

`事实上，使用一个变量固定this的值，然后内层函数调用这个变量，是非常常见的做法，请务必掌握`

`JavaScript 提供了严格模式，也可以硬性避免这种问题。严格模式下，如果函数内部的this指向顶层对象，就会报错`

```javascript
var counter = {
  count: 0
};
counter.inc = function () {
  'use strict';
  this.count++
};
var f = counter.inc;
f()
// TypeError: Cannot read property 'count' of undefined
```

上面代码中，inc方法通过'use strict'声明采用严格模式，这时内部的this一旦指向顶层对象，就会报错

### 避免数组处理方法中的 this

`数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this`

```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    });
  }
}

o.f()
// undefined a1
// undefined a2
```

`上面代码中，foreach方法的回调函数中的this，其实是指向window对象，因此取不到o.v的值。原因跟上一段的多层this是一样的，就是内层的this不指向外部，而指向顶层对象`

`解决这个问题的一种方法，就是前面提到的，使用中间变量固定this`

```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    var that = this;
    this.p.forEach(function (item) {
      console.log(that.v+' '+item);
    });
  }
}

o.f()
// hello a1
// hello a2
```

另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境

```javascript
var o = {
  v: 'hello',
  p: [ 'a1', 'a2' ],
  f: function f() {
    this.p.forEach(function (item) {
      console.log(this.v + ' ' + item);
    }, this);
  }
}

o.f()
// hello a1
// hello a2
```

### 避免回调函数中的 this

`回调函数中的this往往会改变指向，最好避免使用`

```javascript
var o = new Object();
o.f = function () {
  console.log(this === o);
}

// jQuery 的写法
$('#button').on('click', o.f);
```

上面代码中，点击按钮以后，控制台会显示false。原因是此时this不再指向o对象，而是指向按钮的 DOM 对象，因为f方法是在按钮对象的环境中被调用的。这种细微的差别，很容易在编程中忽视，导致难以察觉的错误

为了解决这个问题，可以采用下面的一些方法对this进行绑定，也就是使得this固定指向某个对象，减少不确定性

## 绑定 this 的方法

`this的动态切换，固然为 JavaScript 创造了巨大的灵活性，但也使得编程变得困难和模糊。有时，需要把this固定下来，避免出现意想不到的情况。JavaScript 提供了call、apply、bind这三个方法，来切换/固定this的指向`

### Function.prototype.call() 

`函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数`

```javascript
var obj = {};

var f = function () {
  return this;
};

f() === window // true
f.call(obj) === obj // true
```

上面代码中，全局环境运行函数f时，this指向全局环境（浏览器为window对象）；call方法可以改变this的指向，指定this指向对象obj，然后在对象obj的作用域中运行函数f

`call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象`

```javascript
var n = 123;
var obj = { n: 456 };

function a() {
  console.log(this.n);
}

a.call() // 123
a.call(null) // 123
a.call(undefined) // 123
a.call(window) // 123
a.call(obj) // 456
```

`如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法`

```javascript
var f = function () {
  return this;
};

f.call(5)
// Number {[[PrimitiveValue]]: 5}
```

上面代码中，call的参数为5，不是对象，会被自动转成包装对象（Number的实例），绑定f内部的this

`call方法还可以接受多个参数`

```javascript
func.call(thisValue, arg1, arg2, ...)
```

`call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数`

```javascript
function add(a, b) {
  return a + b;
}

add.call(this, 1, 2) // 3
```

上面代码中，call方法指定函数add内部的this绑定当前环境（对象），并且参数为1和2，因此函数add运行后得到3

`call方法的一个应用是调用对象的原生方法`

```javascript
var obj = {};
obj.hasOwnProperty('toString') // false

// 覆盖掉继承的 hasOwnProperty 方法
obj.hasOwnProperty = function () {
  return true;
};
obj.hasOwnProperty('toString') // true

Object.prototype.hasOwnProperty.call(obj, 'toString') // false
```

上面代码中，hasOwnProperty是obj对象继承的方法，如果这个方法一旦被覆盖，就不会得到正确结果。call方法可以解决这个问题，它将hasOwnProperty方法的原始定义放到obj对象上执行，这样无论obj上有没有同名方法，都不会影响结果

### Function.prototype.apply()

`apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数，使用格式如下`

```javascript
func.apply(thisValue, [arg1, arg2, ...])
```

`apply方法的第一个参数也是this所要指向的那个对象，如果设为null或undefined，则等同于指定全局对象。第二个参数则是一个数组，该数组的所有成员依次作为参数，传入原函数。原函数的参数，在call方法中必须一个个添加，但是在apply方法中，必须以数组形式添加`

```javascript
function f(x, y){
  console.log(x + y);
}

f.call(null, 1, 1) // 2
f.apply(null, [1, 1]) // 2
```

利用这一点，可以做一些有趣的应用

#### 找出数组最大元素

`JavaScript 不提供找出数组最大元素的函数。结合使用apply方法和Math.max方法，就可以返回数组的最大元素`

```javascript
var a = [10, 2, 4, 15, 9];
Math.max.apply(null, a) // 15
```

#### 将数组的空元素变为undefined

通过apply方法，利用Array构造函数将数组的空元素变成undefined

```javascript
Array.apply(null, ['a', ,'b'])
// [ 'a', undefined, 'b' ]
```

`空元素与undefined的差别在于，数组的forEach方法会跳过空元素，但是不会跳过undefined。因此，遍历内部元素的时候，会得到不同的结果`

```javascript
var a = ['a', , 'b'];

function print(i) {
  console.log(i);
}

a.forEach(print)
// a
// b

Array.apply(null, a).forEach(print)
// a
// undefined
// b
```

#### 转换类似数组的对象

`另外，利用数组对象的slice方法，可以将一个类似数组的对象（比如arguments对象）转为真正的数组`

```javascript
Array.prototype.slice.apply({0: 1, length: 1}) // [1]
Array.prototype.slice.apply({0: 1}) // []
Array.prototype.slice.apply({0: 1, length: 2}) // [1, undefined]
Array.prototype.slice.apply({length: 1}) // [undefined]
```

`上面代码的apply方法的参数都是对象，但是返回结果都是数组，这就起到了将对象转成数组的目的。从上面代码可以看到，这个方法起作用的前提是，被处理的对象必须有length属性，以及相对应的数字键`

#### 绑定回调函数的对象

前面的按钮点击事件的例子，可以改写如下

```javascript
var o = new Object();

o.f = function () {
  console.log(this === o);
}

var f = function (){
  o.f.apply(o);
  // 或者 o.f.call(o);
};

// jQuery 的写法
$('#button').on('click', f);
```

上面代码中，点击按钮以后，控制台将会显示true。由于apply方法（或者call方法）不仅绑定函数执行时所在的对象，还会立即执行函数，因此不得不把绑定语句写在一个函数体内。更简洁的写法是采用下面介绍的bind方法

### Function.prototype.bind()

`bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数`

```javascript
var d = new Date();
d.getTime() // 1481869925657

var print = d.getTime;
print() // Uncaught TypeError: this is not a Date object.
```

上面代码中，我们将d.getTime方法赋给变量print，然后调用print就报错了。这是因为getTime方法内部的this，绑定Date对象的实例，赋给变量print以后，内部的this已经不指向Date对象的实例了

bind方法可以解决这个问题

```javascript
var print = d.getTime.bind(d);
print() // 1481869925657
```

上面代码中，bind方法将getTime方法内部的this绑定到d对象，这时就可以安全地将这个方法赋值给其他变量了

bind方法的参数就是所要绑定this的对象，下面是一个更清晰的例子

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var func = counter.inc.bind(counter);
func();
counter.count // 1
```

上面代码中，counter.inc方法被赋值给变量func。这时必须用bind方法将inc内部的this，绑定到counter，否则就会出错

this绑定到其他对象也是可以的

```javascript
var counter = {
  count: 0,
  inc: function () {
    this.count++;
  }
};

var obj = {
  count: 100
};
var func = counter.inc.bind(obj);
func();
obj.count // 101
```

上面代码中，bind方法将inc方法内部的this，绑定到obj对象。结果调用func函数以后，递增的就是obj内部的count属性

`bind还可以接受更多的参数，将这些参数绑定原函数的参数`

```javascript
var add = function (x, y) {
  return x * this.m + y * this.n;
}

var obj = {
  m: 2,
  n: 2
};

var newAdd = add.bind(obj, 5);
newAdd(5) // 20
```

`上面代码中，bind方法除了绑定this对象，还将add函数的第一个参数x绑定成5，然后返回一个新函数newAdd，这个函数只要再接受一个参数y就能运行了`

`如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window）`

```javascript
function add(x, y) {
  return x + y;
}

var plus5 = add.bind(null, 5);
plus5(10) // 15
```

上面代码中，函数add内部并没有this，使用bind方法的主要目的是绑定参数x，以后每次运行新函数plus5，就只需要提供另一个参数y就够了。而且因为add内部没有this，所以bind的第一个参数是null，不过这里如果是其他对象，也没有影响

bind方法有一些使用注意点

#### 每一次返回一个新函数

bind方法每运行一次，就返回一个新函数，这会产生一些问题。比如，监听事件的时候，不能写成下面这样

```javascript
element.addEventListener('click', o.m.bind(o));
```

上面代码中，click事件绑定bind方法生成的一个匿名函数。这样会导致无法取消绑定，所以，下面的代码是无效的

```javascript
element.removeEventListener('click', o.m.bind(o));
```

正确的方法是写成下面这样：

```javascript
var listener = o.m.bind(o);
element.addEventListener('click', listener);
//  ...
element.removeEventListener('click', listener);
```

#### 结合回调函数使用

`回调函数是 JavaScript 最常用的模式之一，但是一个常见的错误是，将包含this的方法直接当作回调函数。解决方法就是使用bind方法，将counter.inc绑定counter`

```javascript
var counter = {
  count: 0,
  inc: function () {
    'use strict';
    this.count++;
  }
};

function callIt(callback) {
  callback();
}

callIt(counter.inc.bind(counter));
counter.count // 1
```

上面代码中，callIt方法会调用回调函数。这时如果直接把counter.inc传入，调用时counter.inc内部的this就会指向全局对象。使用bind方法将counter.inc绑定counter以后，就不会有这个问题，this总是指向counter

`还有一种情况比较隐蔽，就是某些数组方法可以接受一个函数当作参数。这些函数内部的this指向，很可能也会出错`

```javascript
var obj = {
  name: '张三',
  times: [1, 2, 3],
  print: function () {
    this.times.forEach(function (n) {
      console.log(this.name);
    });
  }
};

obj.print()
// 没有任何输出
```

`上面代码中，obj.print内部this.times的this是指向obj的，这个没有问题。但是，forEach方法的回调函数内部的this.name却是指向全局对象，导致没有办法取到值。稍微改动一下，就可以看得更清楚`

```javascript
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this === window);
  });
};

obj.print()
// true
// true
// true
```

`解决这个问题，也是通过bind方法绑定this`

```javascript
obj.print = function () {
  this.times.forEach(function (n) {
    console.log(this.name);
  }.bind(this));
};

obj.print()
// 张三
// 张三
// 张三
```

#### 结合call方法使用

利用bind方法，可以改写一些 JavaScript 原生方法的使用形式，以数组的slice方法为例

```javascript
[1, 2, 3].slice(0, 1) // [1]
// 等同于
Array.prototype.slice.call([1, 2, 3], 0, 1) // [1]
```

上面的代码中，数组的slice方法从[1, 2, 3]里面，按照指定位置和长度切分出另一个数组。这样做的本质是在[1, 2, 3]上面调用Array.prototype.slice方法，因此可以用call方法表达这个过程，得到同样的结果

`call方法实质上是调用Function.prototype.call方法，因此上面的表达式可以用bind方法改写`

```javascript
var slice = Function.prototype.call.bind(Array.prototype.slice);
slice([1, 2, 3], 0, 1) // [1]
```

> bind(Array.prototype.slice)相当于把Array.prototype.slice挪到call前面去

> bind方法相当于把要绑定的this值挪到要执行方法的前面去

`上面代码的含义就是，将Array.prototype.slice变成Function.prototype.call方法所在的对象，调用时就变成了Array.prototype.slice.call。类似的写法还可以用于其他数组方法`

```javascript
var push = Function.prototype.call.bind(Array.prototype.push);
var pop = Function.prototype.call.bind(Array.prototype.pop);

var a = [1 ,2 ,3];
push(a, 4)
a // [1, 2, 3, 4]

pop(a)
a // [1, 2, 3]
```

如果再进一步，将Function.prototype.call方法绑定到Function.prototype.bind对象，就意味着bind的调用形式也可以被改写

```javascript
function f() {
  console.log(this.v);
}

var o = { v: 123 };
var bind = Function.prototype.call.bind(Function.prototype.bind);
bind(f, o)() // 123
```

上面代码的含义就是，将Function.prototype.bind方法绑定在Function.prototype.call上面，所以bind方法就可以直接使用，不需要在函数实例上使用

## 总结

+ 只要是函数，引擎就会单独保存在内存中，给一个内存地址
  + 由于函数是一个单独的值，所以它可以在不同的环境（上下文）执行
+ 由于函数可以在不同的运行环境执行，所以需要有一种机制，能够在函数体内部获得当前的运行环境（context）。所以，this就出现了，它的设计目的就是在函数体内部，指代函数当前的运行环境
+ this使用场合
  + 全局环境 this指向window
  + 构造函数 this指向新实例对象
  + 对象的方法
    + 如果对象的方法里面包含this，this的指向就是方法运行时所在的对象。该方法赋值给另一个对象，就会改变this的指向
    + 如果this所在的方法不在对象的第一层，这时this只是指向当前一层的对象，而不会继承更上面的层
+ 使用注意点
  + 避免多层 this
    + 由于this的指向是不确定的，所以切勿在函数中包含多层的this
      + 一个解决方法是在第二层改用一个指向外层this的变量
  + 避免数组处理方法中的 this
    + 数组的map和foreach方法，允许提供一个函数作为参数。这个函数内部不应该使用this
      + 解决这个问题的一种方法，就是前面提到的，使用中间变量固定this
      + 另一种方法是将this当作foreach方法的第二个参数，固定它的运行环境
  + 避免回调函数中的 this
    + 回调函数中的this往往会改变指向，最好避免使用
+ 绑定 this 的方法
  + Function.prototype.call()
    + 函数实例的call方法，可以指定函数内部this的指向（即函数执行时所在的作用域），然后在所指定的作用域中，调用该函数
    + call方法的参数，应该是一个对象。如果参数为空、null和undefined，则默认传入全局对象
    + 如果call方法的参数是一个原始值，那么这个原始值会自动转成对应的包装对象，然后传入call方法
    + call方法还可以接受多个参数
    + call的第一个参数就是this所要指向的那个对象，后面的参数则是函数调用时所需的参数
  + Function.prototype.apply()
    + apply方法的作用与call方法类似，也是改变this指向，然后再调用该函数。唯一的区别就是，它接收一个数组作为函数执行时的参数
  + Function.prototype.bind()
    + bind方法用于将函数体内的this绑定到某个对象，然后返回一个新函数
    + bind还可以接受更多的参数，将这些参数绑定原函数的参数
    + 如果bind方法的第一个参数是null或undefined，等于将this绑定到全局对象，函数运行时this指向顶层对象（浏览器为window
