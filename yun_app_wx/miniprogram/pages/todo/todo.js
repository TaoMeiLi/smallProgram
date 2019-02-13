// miniprogram/pages/todo/todo.js
Page({
  data: {
    _openid:'o2aX20Iqe5Qx5f5GHza4XIMh5F1Q',
    list:[],
  },
  onLoad: function (options) {
    this._initData();
  },
  _initData(){
    const db = wx.cloud.database();
    db.collection('todo').where({
      _openid: this.data._openid
    }).get({
      success: res => {
        this.setData({
          list: res.data[0].list,
        })
        console.log('[数据库] [查询记录] 成功: ', res)
      },
      fail: err => {
        wx.showToast({
          icon: 'none',
          title: '查询记录失败'
        })
        console.error('[数据库] [查询记录] 失败：', err)
      }
    })
  },
  
})