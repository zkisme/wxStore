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

  },

  created(){
    Store(this)
    console.log(this.store)
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
