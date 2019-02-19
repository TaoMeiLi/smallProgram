// pages/list/list.js
const lists = (()=>{
  let list = [];
  for (var i = 0; i <= 100; i++) {
    list.push(i);
  }
  return list
});
const images = ["http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=12050865ed1190ef15f69a9ca672f763/77c6a7efce1b9d166aca42e9f9deb48f8c54642d.jpg", "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=12050865ed1190ef15f69a9ca672f763/77c6a7efce1b9d166aca42e9f9deb48f8c54642d.jpg", "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=12050865ed1190ef15f69a9ca672f763/77c6a7efce1b9d166aca42e9f9deb48f8c54642d.jpg", "http://imgsrc.baidu.com/image/c0%3Dshijue1%2C0%2C0%2C294%2C40/sign=12050865ed1190ef15f69a9ca672f763/77c6a7efce1b9d166aca42e9f9deb48f8c54642d.jpg"];
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: lists(),
    images: images,
    opacity: 0,
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    const { shopId, shopName } = options;
    this.setData({
      shopId: shopId ? shopId : '1',
      shopName: shopName ? shopName : '1号店'
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  bindTop1(){
    const { shopId } = this.data;
    wx.navigateTo({
      url: `../list/list?shopId=${shopId}`
    })
  },
 
  onPageScroll(e) {
    const scrollTop = e.scrollTop;
    let newOpacity = this.data.opacity;

    if (scrollTop && scrollTop <= 64) {
      let num = scrollTop/64;
      newOpacity = num.toFixed(2);
    } else if (scrollTop > 64) {
      newOpacity = 1;
    } else {
      newOpacity = 0;
    }

    this.setData({
      opacity: newOpacity
    })
  }
})