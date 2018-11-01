let originData = {
  default:{
    data: {
      firstName: 'kai',
      lastName: 'zhu',
      fullName: function(){
        return this.firstName + this.lastName
      },
    },
  },
  pageA:{
    data: {
      firstName: "pageA",
      lastName: "pageA"
    }
  } 
}
let globalData = null

/**
 *
 *
 * @class Store
 * @param ctx 通常传入this
 * @param 第二个参数，用于页面级别的store，可以穿一个字符串认为是storeDefault中的字段， 可以传一个引入的文件， 如果为空store取storeDefault.default
 * 
 */
function Store (ctx, scope = 'default'){
  let store = {}
  if(!ctx) throw new Error('store.init() 方法至少传入一个参数')
  if(!ctx.setData) return;
  // if(!scope) store = storeDefault 
  if(typeof scope === 'string') store = originData[scope] || {}
  if(typeof scope === 'object') store = scope

  ctx.store = store
  ctx.globalStore = originData.globalStore

  store.data && Object.keys(store.data).length && ctx.setData(store.data)
  ctx.update = _update
  _subscribe(ctx)

  return store
}

function _update(data){
  if(data){
    if(Object.keys(data).length === 0) return
    Object.assign(this.store.data, data)
  }
  if(!data) data = this.store.data
  _publish(data)
}

let context = []

function _subscribe(ctx){
  if(context.indexOf(ctx) >= 0) return
  context.push(ctx)
}

function _publish(store){
  context.forEach((ctx, index) => {
    ctx.setData && ctx.setData(store)
  })
}

function _unSubscribe(ctx, scope){

}

// let store = new Store()


export default Store;
module.exports = Store;





