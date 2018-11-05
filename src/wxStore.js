import diff from './diff'

let originData = {}
let globalData = {}

const FUNCTION_TYPE = '[object Function]',
      ARRAY_TYPE    = '[object Array]',
      OBJECT_TYPE   = '[object Object]';

/**
 * @class Store
 * @param ctx 通常传入this
 * @param 第二个参数，用于页面级别的store，可以穿一个字符串认为是storeDefault中的字段， 可以传一个引入的文件， 如果为空store取storeDefault.default
 * 
 */
function Store (ctx, scope = 'default'){
  let store = {}
  if(!ctx) throw new Error('Store() 方法至少传入一个参数')
  if(!ctx.setData) return;
  ctx.instanceType = ctx.route ? 'page' : 'component';
  // if(!scope) store = storeDefault 
  if(typeof scope === 'string') {
    originData[scope] = originData[scope] || {}
    store = originData[scope]
  }
  if(typeof scope === 'object') store = scope
  
  store.data = store.data || {};
  store.route = ctx.route ? ctx.route : _getPage().route
  ctx.store = store
  ctx.globalStore = originData.globalStore

  _initStore(ctx)
  // store.data && Object.keys(store.data).length && ctx.setData(store.data)
  ctx.update = _update
  _subscribe(ctx)
  _rewriteUnload(ctx)

  return store
}

// 提取store， 按需加载
function _initStore(ctx){
  const store = ctx.store
  // if(!store || !store.data || !Object.keys(store.data).length) return
  let data = {}
  Object.keys(ctx.data).forEach( key => {
    // 设置在data中为null的数据才认为是从store中获取的
    if(ctx.data[key] !== null) return
    // 全局变量
    if(key === 'globalData') {
      ctx.data[key].forEach(globalKey => {
        data[gloabalKey] = globalData[gloabalKey] !== undefined ? globalData[gloabalKey] : null
      })
    }
    else data[key] = store.data[key] !== undefined ? store.data[key] : null
  })
  ctx.setData(data)
}

// 更新store
function _update(data){
  if(data){
    if(Object.keys(data).length === 0) return
    Object.assign(this.store.data, data)
  }
  if(!data) data = this.store.data
  _publish(this.store, data)
}

// 订阅
function _subscribe(ctx){
  let store = ctx.store
  let {route} = store
  if(!store.context) store.context = {}
  if(!store.context[route]) store.context[route] = []
  if(store.context[route].indexOf(ctx) >= 0) return
  store.context[route].push(ctx)
  ctx.store = store
}

// 发布
function _publish(store, data){
  if(!store.context || !store.context[store.route]) return
  store.context[store.route].forEach((ctx, index) => {
    ctx.setData && ctx.setData(data)
  })
}

// 取消订阅
function _unSubscribe(ctx, isPage){
  let store = ctx.store
  if(isPage) {
    delete store.context[store.route]
    return false
  }

  let index = store.context[store.route].indexOf(ctx)
  if(index > -1) {
    store.context[store.route].splice(index, 1)
  }
}

// 查看类型
function _type(arg){
  return Object.prototype.toString.call(arg)
}

// 获取当前页
function _getPage(){
  return getCurrentPages()[getCurrentPages().length - 1]
}

// 重写注销页面或组件的方法
function _rewriteUnload(ctx){
  // debugger
  if(ctx.instanceType === 'page'){
    const onUnload = ctx.onUnload
    ctx.onUnload = function(){
      onUnload.call(ctx)
      _unSubscribe(ctx, true)
    }
  } else {
    const detached = ctx.detached
    ctx.detached = function(){
      detached.call(ctx)
      _unSubscribe(ctx)
    }
  }
}


export default Store;
module.exports = Store;





