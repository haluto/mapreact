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

* 当前采用的方式：

如果fetch失败，则用本地数组。

## 兼容性问题
### ie遇到不支持startWith的问题
安装babel-polyfill```npm install --save babel-polyfill```并在index.js头上引用```import 'babel-polyfill';```。
如遇到还是有问题，执行一下```npm install```。


# 增加数据的步骤
## 增加路的信息
1. 在road.json中增加路的信息。

2. 在地图文件夹中增加地图图片（原始图片太大，用画图3D转化成尺寸较小的图片）。

3. 在MapLoader.js中，

     3.1 import该图片。```import JinJingLu from "./icon/金京路.jpg"```;

     3.2 在convertRoadImage中增加对应关系。``` case "金京路":  return JinJingLu; ```


# 部署服务器
1. 下载nodejs ```https://nodejs.org/en/```
2. 安装、启动服务
```
npm install -g serve
serve -s build -l 4000
```
3. 打开网页查看(serve命令的提示信息)
```
- Local:            http://localhost:4000       │
- On Your Network:  http://xxx.xxx.xxx.xxx:4000
```