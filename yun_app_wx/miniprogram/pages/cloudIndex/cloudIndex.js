// miniprogram/pages/cloudIndex/cloudIndex.js
Page({
  data: {
    flagList: [],
    _openid: 'o2aX20Iqe5Qx5f5GHza4XIMh5F1Q',
  },
  onLoad: function (options) {
    this._initData();
  },
  _initData() {
    const db = wx.cloud.database();
    db.collection('flag').where({
      _openid: this.data._openid
    }).get({
      success: res=> {
        this.setData({
          flagList: res.data
        })
        console.log('flag 列表',res.data);
      },
      fail: err => {
        wx.showToast({
          title:'获取flag列表失败',
          icon: 'none',
        });
        console.error('失败',err);
      }
    })
  },
  // 增
  add() {
    
  },
  // 删
  delete() {

  },
  // 改
  modify() {

  },
  // 查
  query() {
    
  }
})