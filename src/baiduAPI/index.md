# 接入百度地图 API

## 关于 Typescript+React 接入百度地图的两种方法

### 第一种

首先，需要在你的 index.html 模板页面头部加载百度地图 JavaScript API 代码，密钥可去百度地图开放平台官网申请

<script type="text/javascript" src="//api.map.baidu.com/api?type=webgl&v=1.0&ak=您的密钥"></script>

然后在需要的页面中:

```typescript
let map = new globalThis.BMap.Map('baiduMap'); //创建Map实例，这里的globalThis，是为了兼容window.BMap的报错
然后进行相关的地图操作...
```

### 第二种

##### 不是很推荐，这一种方法没有相应的开发文档可以参考，但一般的需求还是可以完成的

也是在 index 中加入 script 代码

然后，使用 npm 方式安装 react 组件库，然后通过 es 模块加载

使用旧版的 2D 地图的话 [react-bmap](https://github.com/huiyan-fe/react-bmap)

npm install react-bmap --save 或 yarn add react-bmap --save

npm install react-bmapgl --save 或 yarn add react-bmapgl --save

需要的页面中：

```typescript
//参考https://lbsyun.baidu.com/solutions/reactBmapDoc
import React from 'react';
import ReactDOM from 'react-dom';
import { Map, Marker, NavigationControl, InfoWindow } from 'react-bmapgl';

class App extends React.Component {
	render() {
		return (
			<Map center={{ lng: 116.402544, lat: 39.928216 }} zoom='11'>
				<Marker position={{ lng: 116.402544, lat: 39.928216 }} />
				<NavigationControl />
				<InfoWindow position={{ lng: 116.402544, lat: 39.928216 }} text='内容' title='标题' />
				{/* 然后进行相关地图操作... */}
			</Map>
		);
	}
}
ReactDOM.render(<App />, document.getElementById('container'));
```

#### 按需导入

常用的导入方法会直接把整个包导入进来

```typescript
import { Map, Marker, MapvglView, MapvglLayer } from 'react-bmapgl';
```

如果希望引入的包体积小一点，所有组件都支持 lodash 风格进行按需导入

```typescript
import Map from 'react-bmapgl/Map';
import Marker from 'react-bmapgl/Overlay/Marker';
```

## 创建 AK，加载百度地图 sdk

去百度地图开放平台先申请 AK
//api.map.baidu.com/api?type=webgl&v=1.0&ak=密钥
KmRcV4UXcyR5IvYq3hzgMSKtCGpugAsH

## 地图初始化

## 添加地图控件

## 绘制用户行驶路线

## 绘制服务区地图

不能跑出服务区之外
