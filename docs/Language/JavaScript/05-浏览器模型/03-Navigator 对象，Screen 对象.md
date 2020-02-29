# Navigator 对象，Screen 对象

window.navigator属性指向一个包含浏览器和系统信息的 Navigator 对象。脚本通过这个属性了解用户的环境信息。

## Navigator 对象的属性

### Navigator.userAgent

`navigator.userAgent属性返回浏览器的 User Agent 字符串，表示浏览器的厂商和版本信息。`

下面是 Chrome 浏览器的userAgent。

```
navigator.userAgent
// "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/29.0.1547.57 Safari/537.36"
```

`通过userAgent属性识别浏览器，不是一个好办法。因为必须考虑所有的情况（不同的浏览器，不同的版本），非常麻烦，而且用户可以改变这个字符串。这个字符串的格式并无统一规定，也无法保证未来的适用性，各种上网设备层出不穷，难以穷尽。所以，现在一般不再通过它识别浏览器了，而是使用“功能识别”方法，即逐一测试当前浏览器是否支持要用到的 JavaScript 功能。`

`不过，通过userAgent可以大致准确地识别手机浏览器，方法就是测试是否包含mobi字符串。`

```javascript
var ua = navigator.userAgent.toLowerCase();

if (/mobi/i.test(ua)) {
  // 手机浏览器
} else {
  // 非手机浏览器
}
```

`如果想要识别所有移动设备的浏览器，可以测试更多的特征字符串。`

```javascript
/mobi|android|touch|mini/i.test(ua)
```

### Navigator.plugins

Navigator.plugins属性返回一个类似数组的对象，成员是 Plugin 实例对象，表示浏览器安装的插件，比如 Flash、ActiveX 等。

```javascript
var pluginsLength = navigator.plugins.length;

for (var i = 0; i < pluginsLength; i++) {
  console.log(navigator.plugins[i].name);
  console.log(navigator.plugins[i].filename);
  console.log(navigator.plugins[i].description);
  console.log(navigator.plugins[i].version);
}
```

### Navigator.platform

`Navigator.platform属性返回用户的操作系统信息，比如MacIntel、Win32、Linux x86_64等 。`

```javascript
navigator.platform
// "Linux x86_64"
```

### Navigator.onLine

`navigator.onLine属性返回一个布尔值，表示用户当前在线还是离线（浏览器断线）。`

```javascript
navigator.onLine // true
```

`有时，浏览器可以连接局域网，但是局域网不能连通外网。这时，有的浏览器的onLine属性会返回true，所以不能假定只要是true，用户就一定能访问互联网。不过，如果是false，可以断定用户一定离线。`

`用户变成在线会触发online事件，变成离线会触发offline事件，可以通过window.ononline和window.onoffline指定这两个事件的回调函数。`

```javascript
window.addEventListener('offline', function(e) { console.log('offline'); });
window.addEventListener('online', function(e) { console.log('online'); });
```

### Navigator.language，Navigator.languages

`Navigator.language属性返回一个字符串，表示浏览器的首选语言。该属性只读。`

```javascript
navigator.language // "en"
```

`Navigator.languages属性返回一个数组，表示用户可以接受的语言。Navigator.language总是这个数组的第一个成员。HTTP 请求头信息的Accept-Language字段，就来自这个数组。`

```javascript
navigator.languages  // ["en-US", "en", "zh-CN", "zh", "zh-TW"]
```

如果这个属性发生变化，就会在window对象上触发languagechange事件。

### Navigator.geolocation

`Navigator.geolocation属性返回一个 Geolocation 对象，包含用户地理位置的信息。注意，该 API 只有在 HTTPS 协议下可用，否则调用下面方法时会报错。`

Geolocation 对象提供下面三个方法。

+ Geolocation.getCurrentPosition()：得到用户的当前位置
+ Geolocation.watchPosition()：监听用户位置变化
+ Geolocation.clearWatch()：取消watchPosition()方法指定的监听函数

`注意，调用这三个方法时，浏览器会跳出一个对话框，要求用户给予授权。`

### Navigator.cookieEnabled

Navigator.cookieEnabled属性返回一个布尔值，表示浏览器的 Cookie 功能是否打开。

```javascript
navigator.cookieEnabled // true
```

注意，这个属性反映的是浏览器总的特性，与是否储存某个具体的网站的 Cookie 无关。用户可以设置某个网站不得储存 Cookie，这时cookieEnabled返回的还是true。

## Navigator 对象的方法

### Navigator.javaEnabled()

Navigator.javaEnabled()方法返回一个布尔值，表示浏览器是否能运行 Java Applet 小程序。

```javascript
navigator.javaEnabled() // false
```

### Navigator.sendBeacon()

Navigator.sendBeacon()方法用于向服务器异步发送数据

## Screen 对象
