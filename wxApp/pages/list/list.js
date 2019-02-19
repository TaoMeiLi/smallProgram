// pages/list/list.js
const lists = (() => {
  let list = [];
  for (var i = 1; i <= 30; i++) {
    let item = {
      id : i,
      name: `${i}号门店`
    }
    list.push(item);
  }
  return list
});
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: lists(),
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let shopId = options.shopId;
    this.setData({
      shopId,
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  checkShop(e){
    let id = e.currentTarget.dataset.id;
    let {list} = this.data;
    let name = null;

    list.forEach((item,index)=> {
      if(item.id == id) {
        name = item.name;
      }
    })
    this.setData({
      shopId: id,
    })

    setTimeout(()=>{
      wx.navigateTo({
        url: `../navigationBar/navigationBar?shopId=${id}&shopName=${name}`
      })
    },200)
    
  }
})