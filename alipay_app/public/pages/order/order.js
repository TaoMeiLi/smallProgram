import {
  getOrderDetail,
  cancelOrder,
  checkOrder
} from '../../app_requests';
import { assign } from '../../utils/object';
import { word } from '../../utils/locale';
import { show_loading, hide_loading } from '../../utils/api';
import {setMyStorageSync, clearStorageSync} from '../../utils/mystorage';

const app = getApp();
let isRun = true;
const { 
  negative, 
  currency, 
  ordercancelok, 
  orderchange, 
  storenoreview,
  weightip,
  warn,
} = app.locale.orderinfo;

Page({
  /**
   * 页面的初始数据
   */
  data: {
    orderInfo: {},
    isLoading: true,
    locale: app.locale,
    navigate: `${negative}${currency}`,
    hideBtn: false,
    hideAddDishes: false,
    showMore: false,
    dishesCur: [],
    dishesPrev: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this._initPage(options.order_id);
    this.setData({
      locale: app.locale,
      navigate: `${app.locale.orderinfo.negative}${app.locale.orderinfo.currency}`,
      currency: app.locale.orderinfo.currency
    })
  },

  onPullDownRefresh: function() {
    const that = this;
    const order_id = that.data.orderInfo.order_id;
    this.getOrderData(order_id, function (res) {
      that.changeOrder(res);
      wx.stopPullDownRefresh();
    })
  },

  clearOrderTime() {
    clearInterval(this.orderTime);
  },
  
  setOrder(res) {
    if (res.status == 2 || res.status == 3) {
      clearStorageSync(res.shop_id);
      clearStorageSync('carts');
      if (res.ordermode == 3) {
        app.globalData = assign({}, app.globalData, {carts: [], orderRemark: null})
      } else {
        app.globalData = assign({}, app.globalData, {carts: [], peopleNumber: null, orderRemark: null})
      }
    }
  },

  getOrderData(orderId, cb) {
    const _this = this;
    getOrderDetail({ orderId }, res => {
      cb && cb(res);
    })
  },

  _initPage(orderId) {
    const that = this;
    that.getOrderData(orderId, function (rst) {
      console.log(rst, 'order id: '+orderId);
      if (rst.status !== 1) {
        that.changeOrder(rst);
      }
    })
  },

  changeOrder(rst) {
    const that = this;
    const {ordermode, pay_status} = rst;
    this.setData({
      orderInfo: that.resetCartPrice(rst),
      isLoading: false,
      hideBtn: ordermode == 1 && pay_status == 2,
      hideAddDishes: that.hideAddBtn(rst),
    });
    this.setOrder(rst);
  },
  
  /**
   * 是否隐藏加菜按钮
   * 1: 扫付 && 来源5:  不区分单人多人，收银订单是否加菜
   * 2: 非扫付 && 来源非5: 单人模式， 非下单人不能加菜。多人模式：都可以加菜
   */
  hideAddBtn(rst) {
    const {source, addDishes} = rst;
    const {usersOnline, platform_info} = app.globalData;
    const openid = platform_info ? platform_info.openid : null;
    if (source == 5) {
      return addDishes == 2;
    } else {
      return usersOnline ? false : openid != rst.openid; 
    }
  },

  getDishesPrice(dishes, memberpriceTotal, isMember) {
    dishes = dishes ? dishes.map(item => {
      if (item.bmemberprice == 1 && item.bargainprice == 0) {
        isMember = 1;
        item.totalprice = (item.memberprice + item.aprice) * item.count;
      } else {
        item.totalprice = (item.price + item.aprice) * item.count;
      }
      memberpriceTotal += item.totalprice;
      return item;
    }) : []

    return {dishes, memberpriceTotal, isMember}
  },

  resetCartPrice(rst) {
    let dishesCur = rst.dishes["batch"],
        dishesPrev = rst.dishes["all"],
        memberpriceTotal = 0,
        isMember = 0;
    let newDishesCur = this.getDishesPrice(dishesCur, memberpriceTotal, isMember);
    dishesCur = newDishesCur.dishes,
    memberpriceTotal = newDishesCur.memberpriceTotal,
    isMember = newDishesCur.isMember;

    let prevDishesCur = this.getDishesPrice(dishesPrev, memberpriceTotal, isMember);
    dishesPrev = prevDishesCur.dishes,
    memberpriceTotal = prevDishesCur.memberpriceTotal,
    isMember = prevDishesCur.isMember;
    this.setStorageOrder(rst);
    let dishes = dishesCur;
    this.setData({
      dishesPrev: dishesPrev,
      dishesCur: dishesCur
    })
    return assign({}, rst, {dishes, dishesPrev, dishesCur, memberpriceTotal, isMember})
  },

  setStorageOrder(data) {
    if (data.pay_status == 1 && data.status < 4) {
      setMyStorageSync(`ORDERDETILL_${data.order_id}`, data.dishes);
    }
  },

  cancelOrder() {
    const that = this;
    const order_id = this.data.orderInfo.order_id;
    if (app.globalData.shops.ordermode == 3) {
      console.log('ordermode 3');
    } else {
      cancelOrder({order_id}, rst => {
        that.toastMsg(`${ordercancelok}`);
        wx.reLaunch({
          url: `/pages/orderdetail/orderdetail?order_id=${order_id}`
        })
      })
    }
  },

  toastMsg(title) {
    wx.showToast({
      title,
      icon: 'none',
      duration: 2000
    })
  },
  /**
   * reLaunch 继续点餐，先付到首页，后付到扫码页面
   * 加菜，后付到首页
   */
  continuedc() {
    const {ordermode} = this.data.orderInfo;
    if (ordermode == 3) {
      wx.reLaunch({
        url: '/pages/scan/scan?isScan=true'
      })
    } else {
      wx.reLaunch({
        url: '/pages/index/index'
      })
    }
  },

  addish() {
    const {order_id, people} = this.data.orderInfo;
    app.globalData = assign({}, app.globalData, {order_id, peopleNumber: people});
    setTimeout(function() {
      wx.reLaunch({
        url: '/pages/index/index?addish=true'
      })
    }, 200);
  },
  
  reLaunchPay() {
    wx.reLaunch({
      url: `/pages/pay/pay?order_id=${this.data.orderInfo.order_id}`
    })
  },

  navigateToPay() {
    wx.navigateTo({
      url: `/pages/pay/pay?order_id=${this.data.orderInfo.order_id}`
    })
  },

  toInvoice() {
    wx.navigateTo({
      url: `/pages/invoice/invoice?url=${this.data.orderInfo.invoice_url}`
    })
  },

  topay() {
    const that = this;
    if (isRun) {
      that.payBySource();
      isRun = false;
    }
    setTimeout(function () {
      isRun = true;
    }, 1500) 
  },

  checkWeight() {
    let {dishesCur, dishesPrev} = this.data;
    const allDishes = dishesCur.concat(dishesPrev);
    const weight = allDishes.filter(d => {
      return d.count == 0;
    });
    if (weight.length == 0) {
      const {shops} = app.globalData;
      if (shops.ordermode == 3 && shops.multiple == 1) { // 后付、多人
        this.reLaunchPay();
      } else {
        this.navigateToPay();
      }

    } else {
      wx.showModal({
        title: warn,
        content: word(weightip, weight[0].name),
        showCancel: false,
        success: function(res) {
          if (res.confirm) {
            console.log('用户点击确定')
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    }
  },

  payBySource() {
    const _this = this;
    const {shops} = app.globalData;
    if (shops.ordermode == 2 && shops.multiple != 1) { // 先付、单人
      _this.navigateToPay();
    } else {
      _this.topayHandler();
    }
  },
  
  topayHandler() {
    const that = this;
    const info = this.data.orderInfo;
    show_loading();
    checkOrder({ 
      order_id: info.order_id, 
      order_batch_id: info.order_batch_id,
      table_sno: info.table_no 
    }, res => {
      console.log('[orderDetai.js]:', res, info);
      const {is_update, orderData} = res;
      if (is_update) {
        that.toastMsg(`${orderchange}`);
        that.changeOrder(orderData);
      } else {
        const {status} = orderData;
        if (status == 2) {
          that.checkWeight()
        } else if (status == 3) {
          that.toastMsg(`${storenoreview}`);
        } else {
          console.log(status);
        }
      }
      hide_loading();
    })
  },
  showMore() {
	let {orderInfo, dishesCur, dishesPrev} = this.data;
    this.setData({
      showMore: !this.data.showMore
    }, function() {
		console.log(this.data.showMore, 'more')
		let tempDishes = dishesCur;
		if(this.data.showMore) {
			tempDishes = dishesCur.concat(dishesPrev);
		} else {
			tempDishes = dishesCur;
		}
		this.setData({
			orderInfo: assign(orderInfo, {dishes: tempDishes})
		})
	})
  }
})