(window.webpackJsonp=window.webpackJsonp||[]).push([[53],{423:function(s,a,t){"use strict";t.r(a);var n=t(17),e=Object(n.a)({},(function(){var s=this,a=s.$createElement,t=s._self._c||a;return t("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[t("h1",{attrs:{id:"二进制位运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二进制位运算符"}},[s._v("#")]),s._v(" 二进制位运算符")]),s._v(" "),t("h2",{attrs:{id:"概述"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#概述"}},[s._v("#")]),s._v(" 概述")]),s._v(" "),t("p",[s._v("二进制位运算符用于直接对二进制位进行计算，一共有7个")]),s._v(" "),t("ul",[t("li",[s._v("二进制或运算符（or）：符号为|，表示若两个二进制位都为0，则结果为0，否则为1")]),s._v(" "),t("li",[s._v("二进制与运算符（and）：符号为&，表示若两个二进制位都为1，则结果为1，否则为0")]),s._v(" "),t("li",[s._v("二进制否运算符（not）：符号为~，表示对一个二进制位取反")]),s._v(" "),t("li",[s._v("异或运算符（xor）：符号为^，表示若两个二进制位不相同，则结果为1，否则为0")]),s._v(" "),t("li",[s._v("左移运算符（left shift）：符号为<<，详见下文解释")]),s._v(" "),t("li",[s._v("右移运算符（right shift）：符号为>>，详见下文解释")]),s._v(" "),t("li",[s._v("头部补零的右移运算符（zero filled right shift）：符号为>>>，详见下文解释")])]),s._v(" "),t("p",[t("code",[s._v("这些位运算符直接处理每一个比特位（bit），所以是非常底层的运算，好处是速度极快，缺点是很不直观，许多场合不能使用它们，否则会使代码难以理解和查错")])]),s._v(" "),t("blockquote",[t("p",[s._v("有一点需要特别注意，位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行。另外，虽然在 JavaScript 内部，数值都是以64位浮点数的形式储存，但是做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[s._v("i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" i "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("code",[s._v("上面这行代码的意思，就是将i（不管是整数或小数）转为32位整数")])]),s._v(" "),t("p",[s._v("利用这个特性，可以写出一个函数，将任意数值转为32位整数")]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("function")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[s._v("x")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("{")]),s._v("\n  "),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("return")]),s._v(" x "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("}")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br")])]),t("p",[s._v("上面这个函数将任意值与0进行一次或运算，这个位运算会自动将一个值转为32位整数。下面是这个函数的用法")]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.001")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.999")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Math"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("pow")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("+")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("toInt32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),s._v("Math"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[s._v("pow")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v("(")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("32")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(")")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -1")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br")])]),t("p",[t("code",[s._v("上面代码中，toInt32可以将小数转为整数。对于一般的整数，返回值不会有任何变化。对于大于或等于2的32次方的整数，大于32位的数位都会被舍去")])]),s._v(" "),t("h2",{attrs:{id:"二进制或运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二进制或运算符"}},[s._v("#")]),s._v(" 二进制或运算符")]),s._v(" "),t("p",[t("code",[s._v("二进制或运算符（|）逐位比较两个运算子，两个二进制位之中只要有一个为1，就返回1，否则返回0")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("上面代码中，0和3的二进制形式分别是00和11，所以进行二进制或运算会得到11（即3）")]),s._v(" "),t("p",[t("code",[s._v("位运算只对整数有效，遇到小数时，会将小数部分舍去，只保留整数部分。所以，将一个小数与0进行二进制或运算，等同于对该数去除小数部分，即取整数位")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.9")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("-")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.9")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("|")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// -2")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br")])]),t("h2",{attrs:{id:"二进制与运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二进制与运算符"}},[s._v("#")]),s._v(" 二进制与运算符")]),s._v(" "),t("p",[t("code",[s._v("二进制与运算符（&）的规则是逐位比较两个运算子，两个二进制位之中只要有一个位为0，就返回0，否则返回1")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("&")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 0")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"二进制否运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#二进制否运算符"}},[s._v("#")]),s._v(" 二进制否运算符")]),s._v(" "),t("p",[t("code",[s._v("二进制否运算符（~）将每个二进制位都变为相反值（0变为1，1变为0）。它的返回结果有时比较难理解，因为涉及到计算机内部的数值表示机制")])]),s._v(" "),t("p",[s._v("对一个整数连续两次二进制否运算，得到它自身")]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[t("code",[s._v("所有的位运算都只对整数有效。二进制否运算遇到小数时，也会将小数部分舍去，只保留整数部分。所以，对一个小数连续进行两次二进制否运算，能达到取整效果")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("2.9")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 2")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("47.11")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 47")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("1.9999")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 1")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("~")]),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br")])]),t("p",[t("code",[s._v("使用二进制否运算取整，是所有取整方法中最快的一种")])]),s._v(" "),t("h2",{attrs:{id:"异或运算符"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#异或运算符"}},[s._v("#")]),s._v(" 异或运算符")]),s._v(" "),t("p",[t("code",[s._v("异或运算（^）在两个二进制位不同时返回1，相同时返回0")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("3")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 3")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("p",[s._v("上面表达式中，0（二进制00）与3（二进制11）进行异或运算，它们每一个二进制位都不同，所以得到11（即3）")]),s._v(" "),t("p",[t("code",[s._v("“异或运算”有一个特殊运用，连续对两个数a和b进行三次异或运算，a^=b; b^=a; a^=b;，可以互换它们的值。这意味着，使用“异或运算”可以在不引入临时变量的前提下，互换两个变量的值")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("10")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[s._v("var")]),s._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("=")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("99")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\na "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" b "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" a"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(",")]),s._v(" a "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^=")]),s._v(" b"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[s._v(";")]),s._v("\n\na "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 99")]),s._v("\nb "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 10")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br"),t("span",{staticClass:"line-number"},[s._v("2")]),t("br"),t("span",{staticClass:"line-number"},[s._v("3")]),t("br"),t("span",{staticClass:"line-number"},[s._v("4")]),t("br"),t("span",{staticClass:"line-number"},[s._v("5")]),t("br"),t("span",{staticClass:"line-number"},[s._v("6")]),t("br"),t("span",{staticClass:"line-number"},[s._v("7")]),t("br")])]),t("p",[t("code",[s._v("这是互换两个变量的值的最快方法")])]),s._v(" "),t("p",[t("code",[s._v("异或运算也可以用来取整")])]),s._v(" "),t("div",{staticClass:"language-javascript line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-javascript"}},[t("code",[t("span",{pre:!0,attrs:{class:"token number"}},[s._v("12.9")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[s._v("^")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token number"}},[s._v("0")]),s._v(" "),t("span",{pre:!0,attrs:{class:"token comment"}},[s._v("// 12")]),s._v("\n")])]),s._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[s._v("1")]),t("br")])]),t("h2",{attrs:{id:"总结"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#总结"}},[s._v("#")]),s._v(" 总结")]),s._v(" "),t("ul",[t("li",[s._v("位运算符只对整数起作用，如果一个运算子不是整数，会自动转为整数后再执行")]),s._v(" "),t("li",[s._v("做位运算的时候，是以32位带符号的整数进行运算的，并且返回值也是一个32位带符号的整数")]),s._v(" "),t("li",[s._v("二进制或运算符（ | ）：两个二进制位都为0，则为0，否则为1")]),s._v(" "),t("li",[s._v("二进制与运算符（ & ）：两个二进制位都为1，则为1，否则为0")]),s._v(" "),t("li",[s._v("二进制否运算符（~）：对一个二进制位取反")]),s._v(" "),t("li",[s._v("二进制异或运算符（^）：两个二进制位不相同，则为1，否则为0")])])])}),[],!1,null,null,null);a.default=e.exports}}]);