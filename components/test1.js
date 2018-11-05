// components/test1.js
import Store from '../src/wxStore.js'
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    number:null
  },

  attached(){
    console.log('component,', this)
    Store(this)
    console.log(this.store)
  },

  /**
   * 组件的方法列表
   */
  methods: {
    jian(){
      this.store.data.number --
      this.update()
    }
  }
})
