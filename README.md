## Table of Contents

# Note
## 直接用浏览器打开app
在package.json中配置
```
"homepage": "./",
```
这样build出来的index.html用浏览器直接打开就可以了。

## 访问本地文件
用```fetch("./road.json")```访问本地文件，如果没有启动服务器，而是直接用浏览器打开，chrome会遇到问题：
```
Fetch API cannot load file:///C:/Users/TerryYin/Desktop/map/mapreact/build/road.json. URL scheme must be "http" or "https" for CORS request.
```
chrome浏览器需要就行相应的设置：
Windows：
设置Chrome的快捷方式属性，在“目标”后面加上--allow-file-access-from-files，注意前面有个空格，重新打开Chrome即可。
Mac：
只能通过终端打开浏览器：打开终端，输入下面命令：open -a "Google Chrome" --args --disable-web-security然后就可以屏蔽安全访问了[ --args：此参数可有可无]

## 兼容性问题
### ie遇到不支持startWith的问题
安装babel-polyfill```npm install --save babel-polyfill```并在index.js头上引用```import 'babel-polyfill';```。
如遇到还是有问题，执行一下```npm install```。


# TODO：
IE浏览器暂时不能支持。
