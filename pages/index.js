// pages/index.js

import Store from '../src/wxStore.js'

Page({

  /**
   * 页面的初始数据
   */
  data: {
    number: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('page,', this)
    // store.init(this)
    Store(this)
    this.update()
  },
  addNumber(){
    let number = this.store.data.number || 0
    number ++ 
    // this.store.data.number = number;
    // this.update()
    this.update({number})
  }
})