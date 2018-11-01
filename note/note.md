###  预期功能

- 创建store状态管理器

- 简单、小巧、易用

- 页面和组件可以共享store

- 页面和组件可以更新store

- store的更改是响应式的


###  实现思路

#### store状态存储位置

1. globalData

2. store文件

#### 响应式方法


#### 初始化方法

1. 构建页面的时候加入

```javascript
const store = require('store')
extendPage(store, {
  //...
})
```

2. 在页面或者组件的生命周期中加入

```JavaScript
const store = require('store')
Component({
  data:{},
  create(){
    store.init(this)
  }
})
```