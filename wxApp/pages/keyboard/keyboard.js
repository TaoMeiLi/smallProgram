// pages/keyboard/keyboard.js
const app = getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    data: [
      { name: 'text', inputtype: 'text'},
      { name: '数字', inputtype: 'number'},
      { name: '身份证', inputtype: 'idcard'},
      { name: '带小数点数字', inputtype: 'digit'}
    ],
    inputType: '',  // 输入框类型
    keyboardH: 0,   // 键盘高度
    showKeyboard: false,
  },
  bindInputFocus: function(e) {
    console.log(e);
    let keyboardH = (e.detail.height+10)*2,
      inputType = e.currentTarget.dataset.type;
    console.log(keyboardH,'键盘高度');
    app.globalData = { ...app.globalData, keyboardH: keyboardH};

    this.setData({
      keyboardH: keyboardH ? keyboardH : 0,
      inputType: inputType ? inputType : '',
      showKeyboard: true
    })
  },
  bindInputBlur: function(e) {
    this.setData({
      showKeyboard: false
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.getSystemInfo({
      success: function(res) {
        console.log(res.SDKVersion,'小程序基础库版本号');
      },
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})