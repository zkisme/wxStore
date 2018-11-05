# 使用

```javascript
import store from 'store'
//Page()
Page({
  data:{},
  onLoad(){
    this.store = store(this)
  }
})

// Component()
Component({
  attached(){
    this.store = store(this)
  }
})
```

## 判断是Page还是Component的实例
```javascript
ctx.instanceType = ctx.route ? 'page' : 'component';
```

## 按需加载
```js
 Page({
   storeData: {
     name:null
   }
 })
```