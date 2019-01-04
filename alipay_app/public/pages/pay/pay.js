import { getPay, postPay } from '../../app_requests';
import { word } from '../../utils/locale';
import { assign } from '../../utils/object';
import { limit_decimal } from '../../utils/format';
import { setWxStorageSync, getWxStorageSync } from '../../utils/wxstorage';

const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
  data: {
    locale: app.locale,
    orderId: "", //订单id
    money: null, //支付原始金额
    payData: {}, //支付信息
    cards: [], //会员卡信息
    coupons: [], //当前会员卡里劵的信息
    useCredit: true,
    credit: null, //当前会员卡里积分信息
    selectedCoupons: [],
    denoCoupons: [],
    giftCoupons: [],
    discountMoney: 0,
    creditMoney: 0,   // 会员卡抵扣金额
    payMoney: 0,  // 微信支付金额
    useMoney: 0,  // useMoney = 订单金额 - 优惠券 - 积分;
    sub_deno: 0, //代金券抵扣金额
    sub_gift: 0,
    cardBalance: 0, //会员卡余额
    costCardMoney: 0, //抵扣会员卡金额
    currentCard: {}, //当前会员卡,
    paybtn: '',
    limit_decimal,
    dishes: [],//订单菜品信息
    isPay: false,
    openCharge: false, // 是否开启充值
    chargeStatus: 1, // 充值：1开启，2关闭 3智能推荐
    timeto: 0, //支付倒计时
    chargeRules: [],  // 储值规则
    useAll: true, // 储值和微信可以共用,
    isCheckedCharge: true, // 储值卡支付选中状态
    isCheckedWx: false,   //  微信支付选中状态
    total: 0,             // 订单金额
    openTelModal: true,  // 打开完善手机号弹窗(前提是useHasTel:false);
    useHasTel: true,     // 用户是否已完善手机号
    codeUseTime: 0,
    CDTime: 180,
    memberPay: true,       // 会员支付：1:储值+积分+券true  2: 关闭false
    // goStatus: 1  // 1:充值， 2:充值并支付
  },
  onLoad(options) {
    const {order_id} = options;
    this._initData(order_id)

    if (getWxStorageSync('keyboardH')) {
      this.setData({ keyboardH: getWxStorageSync('keyboardH') });
    }

    this.setData({
      locale: app.locale
    })

  },
  // 请求页面数据
  _initData(order_id) {
    this.setData({
      orderId: order_id
    })

    let _me = this;
    //方法：请求页面数据
    getPay({ orderId: order_id }, rst => {
      console.log(rst, 'getPayData')
      let cards = rst.cards, // 会员卡
        coupons = [],        // 优惠券
        credit = null;       // 积分
        console.log(rst.cards,'++++++++++会员卡')
      if (cards.length) {
        cards.forEach(item => {
          if (item.checked) {
            coupons = assign([], item.coupons);
            credit = item.credit;
            _me.setData({
              currentCard: assign({}, item),
              cardBalance: item.max_consume_money,
              useCredit: item.use_credit
            })
          }
        })
      }
      let NewBalanceNotPay = true;
      if (rst.vipPrice) {
        NewBalanceNotPay = cards[0].max_consume_money < rst.vipPrice ? true : false;
      } else {
        NewBalanceNotPay = cards[0].max_consume_money < rst.money ? true : false;
      }

      console.log(app.globalData,'globalData');
      _me.setData({
        payData: rst,
        money: rst.money,
        cards: cards,
        coupons: coupons,
        credit: credit,
        payMoney: rst.money,
        dishes: rst.dishes,
        openCharge: rst.openCharge,
        timeto: rst.payTime && rst.lockOrderTime ? rst.lockOrderTime + rst.payTime : 0,
        chargeRules: rst.charge_rules,
        vipPrice: rst.vipPrice,
        chargeStatus: rst.chargeStatus, // 会员充值：3:智能推荐
        multiple: rst.multiple, //订单金额倍数
        copywriting: rst.copywriting, // 推荐文案
        balanceNotPay: NewBalanceNotPay,
        total: rst.total, // 订单金额
        useHasTel: rst.tel.length ? true : false,     // 前用户是否完善手机号
        checkPhone: rst.checkPhone == 1 ? true : false,   // 商家是否开启了 完善手机号功能
        memberPay: rst.memberPay == 2 ? false : true,   // 会员支付：1:储值+积分+券  2: 关闭
        source: 3, //1微信，2支付宝，3微信扫码点餐， 4支付宝小程序， 5pos扫码支付，6预点餐 

      })
      _me.computeMoeny();
      _me.wxAndCharge();
    });
  },

  wxAndCharge() {
    let { balanceNotPay, chargeStatus, memberPay } = this.data;
    console.log(balanceNotPay, 'balanceNotPay')
    console.log(memberPay, 'memberPay')
    if (memberPay) { // 会员支付：储值+积分+券
      if (chargeStatus == 3) {
        if (balanceNotPay) {// 余额不足
          this.setData({
            isCheckedWx: true,
            isCheckedCharge: false
          })
        } else {
          this.setData({
            isCheckedWx: false,
            isCheckedCharge: true
          })
        }
      } else {
        if (balanceNotPay) {// 余额不足
          this.setData({
            isCheckedCharge: true,
            isCheckedWx: true
          })
        } else {
          this.setData({
            isCheckedCharge: true,
            isCheckedWx: false
          })
        }
      }
    } else { // 会员支付： 关闭
      this.setData({
        isCheckedWx: true,
        isCheckedCharge: false
      })
    }
  },

  // 支付倒计时
  finish() {
    console.log('[pay.js] finish');
    this.cancelOrderEvent(this.data.orderId);
  },

  _confirmCoupon(e) { //使用优惠券
    const { discountMoney, selectedCoupons, denoCoupons, giftCoupons, denoMoney, giftMoney } = e;
    this.setData({
      discountMoney,
      selectedCoupons,
      denoCoupons,
      giftCoupons,
      denoMoney,
      giftMoney
    }, () => {
      this.computeMoeny();
    });
    console.log(discountMoney, selectedCoupons, denoCoupons, giftCoupons, denoMoney, giftMoney, '使用优惠券');

  },
  _changeCard(cardData) { //选择会员卡
    console.log(cardData, '选择会员卡');
    this.setData({
      coupons: assign([], cardData.coupons),
      credit: cardData.credit,
      currentCard: assign({}, cardData),
      cardBalance: cardData.max_consume_money,
      discountMoney: 0,
      creditMoney: 0,
      useCredit: cardData.use_credit,
      sub_deno: 0,
      sub_gift: 0,
      denoMoney: 0,
      giftMoney: 0,
      selectedCoupons: [],
      denoCoupons: [],
      giftCoupons: [],
      balanceNotPay: cardData.balanceNotPay,
    })

    setTimeout(()=>{
      this.computeMoeny();
      this.wxAndCharge();
    },0)
    
  },

  _useCredit(e) { //使用积分
    const { creditMoney } = e;
    this.setData({
      creditMoney: creditMoney
    }, () => {
      this.computeMoeny();
    })
  },
  _usePrepaidCard(e) { // 使用储值卡
    console.log(e.costCardMoney, '使用储值金额')
    const { costCardMoney } = e;

    this.setData({
      costCardMoney: costCardMoney,
    }, () => {
      this.computeMoeny();
    })

  },
  _useWx(e) { // 使用支付宝
    console.log(e.wxMoney, '使用支付宝支付金额');
    const { wxMoney } = e;
    this.setData({
      payMoney: wxMoney,
    }, () => {
      this.computeMoeny();
    })

  },

  _upDataisChecked(e) { // 更新 储值卡支付和微信支付的是否选中
    const { action } = e;
    let { chargeStatus, balanceNotPay, memberPay } = this.data;

    if (!memberPay) return; // 会员支付：储值+积分+券true  关闭false

    if (chargeStatus == 3) {
      if (balanceNotPay) {  // 余额不足
        this.setData({
          isCheckedCharge: action == 'wx' ? false : true,
          isCheckedWx: action == 'wx' ? true : false,
        })
      } else {
        this.setData({
          isCheckedCharge: action == 'wx' ? false : true,
          isCheckedWx: action == 'wx' ? true : false,
        })
      }

    } else {
      if (!balanceNotPay) { // 余额足
        this.setData({
          isCheckedCharge: action == 'wx' ? false : true,
          isCheckedWx: action == 'wx' ? true : false,
        })
      } else {// 余额不足
        this.setData({
          isCheckedCharge: action != 'wx' ? !this.data.isCheckedCharge : this.data.isCheckedCharge,
          isCheckedWx: action == 'wx' ? !this.data.isCheckedWx : this.data.isCheckedWx,
        })
      }

    }

  },
  computeMoeny() {//计算支付价格
    let { money, discountMoney, creditMoney, cardBalance, currentCard, costCardMoney, payMoney, vipPrice, isCheckedCharge, locale } = this.data;
    let newMoney = isCheckedCharge && vipPrice ? vipPrice : money;
    let useMoney = ((newMoney - discountMoney) > 0 ? newMoney - discountMoney : 0) - creditMoney;
    let residueMoney = ((newMoney - discountMoney) > 0 ? newMoney - discountMoney : 0) - creditMoney - costCardMoney - payMoney;
    console.log(money,'(isCheckedCharge && vipPrice ? vipPrice : money),')
    this.setData({
      money: money,
      vipPriceMoney: (isCheckedCharge && vipPrice ? vipPrice : money),
      creditMoney,
      discountMoney,
      useMoney: useMoney > 0 ? useMoney : 0, // 如果有vip价格 并且用储值卡支付，订单金额为vip价格
      wxUseMoney: useMoney - costCardMoney,
      paybtn: locale.pay.paybtn_confirm,
      residueMoney: residueMoney < 0 ? 0 : residueMoney,  // 剩余需支付金额
    })
    // console.log(newMoney , discountMoney ,creditMoney , costCardMoney ,payMoney,useMoney,'computeMoney')
  },

  /** 
   * 支付
  */
  _topay(e) {
    if (this.data.residueMoney) {
      this._balanceNotPayshowToast();
      return;
    }
    this.setData({
      isPay: true
    })
    const {
      money,
      orderId,
      currentCard,
      selectedCoupons,
      creditMoney,
      discountMoney,
      costCardMoney,
      denoCoupons,
      giftCoupons,
      denoMoney,
      giftMoney,
      payData,
      chargeStatus,
      vipPrice,
      cards,
      locale } = this.data;
    let payMoney = this.data.payMoney;
    const denoCouponsIds = denoCoupons.map(item => item.id),
      giftCouponsIds = giftCoupons.map(item => item.id),
      dishesCoupon = selectedCoupons.filter(item => (item.type == 2) && item.products && item.products.length)
        .map(item => {
          let dishItem = {
            products: item.products,
            is_diy_deno: item.is_diy_deno,
            money: item.money
          }
          return dishItem;
        })

    let payParam = {
      orderId: orderId, //订单号
      cno: currentCard.cid, //当前卡号
      grade: currentCard.grade, // 卡等级
      grade_name: currentCard.grade_name, // 等级名
      name: currentCard.name, // 会员名
      consume_amount: money, //消费总金额
      payment_amount: payMoney, //实付总金额(微信支付)
      sub_balance: costCardMoney, //消费储值金额
      sub_credit: creditMoney / 100,//消费积分个数
      sub_credit_money: creditMoney, //消费积分金额
      sub_coupons: discountMoney,//消费优惠券金额
      deno_coupon_ids: denoCouponsIds, //代金券ids
      gift_coupons_ids: giftCouponsIds, //礼品劵ids
      sub_deno: denoMoney, //代金券抵扣金额
      sub_gift: giftMoney, //礼品劵抵扣金额
      dishesCoupon: dishesCoupon, //菜品卷信息
      formId: e ? e.detail.formId : ''
    };
    console.log(vipPrice, money, chargeStatus, '消费总金额')
    let { goStatus, chargeAndPayParam, formId } = app.globalData;
    if (goStatus == 2) {
      payParam.cno = chargeAndPayParam.cid;
      payParam.grade = cards.filter(item => (item.cno == chargeAndPayParam.cid))[0].grade;
      payParam.grade_name = cards.filter(item => (item.cno == chargeAndPayParam.cid))[0].grade_name;
      payParam.name = cards.filter(item => (item.cno == chargeAndPayParam.cid))[0].name;

      let newSubBlance = ((vipPrice ? vipPrice : money) - creditMoney);
      payParam.sub_balance = (newSubBlance - discountMoney) > 0 ? newSubBlance - discountMoney : 0;
      payParam.formId = formId;
      payParam.payment_amount = 0;
      payMoney = 0;
      if (chargeStatus == 3) {
        payParam.consume_amount = vipPrice ? vipPrice : money;
      }
    }
    let { isCheckedCharge } = this.data;
    if (chargeStatus == 3 && isCheckedCharge) {
      payParam.consume_amount = vipPrice ? vipPrice : money;
    }
    console.log("执行支付方法", payParam, 'payParam');
    let _me = this;
    postPay({ data: payParam }, rst => {
      console.log('post pay data:', payParam);
      if (payMoney) {
        if (!this.data.payData.openPayMethod) {
          my.showModal({
            content: locale.pay.openPayMethod,
            showCancel: false,
            success(res) {
              if (res.confirm) {
                my.navigateBack({
                  delta: 1
                })
              }
            }
          })
          return;
        }
        my.hideLoading();
        this.alipay(rst);
      } else {
        setTimeout(function() {
          my.reLaunch({
            url: '/pages/order/order?order_id=' + _me.data.orderId,
          })
        }, 100)
      }
      this.setData({
        isPay: false
      })
      // assign(app.globalData, {goStatus: 1});
    })
    setTimeout(function() {
      _me.setData({
        isPay: false
      })
    }, 5000)
  },

  // 支付宝支付
  alipay(data) {
    let _me = this,
    rst = null,
    chargeOrderId = null;

    assign(app.globalData, { notNeedHide: true});
  
    if(data.type) {
      rst = data.detail.rst;
      chargeOrderId = data.detail.chargeOrderId;
    } else {
      rst = data;
    }
    my.tradePay({
      ...rst,
      'success': function(res) {
        setTimeout(function() {
          my.reLaunch({
            // url: '/pages/waiting/waiting?order_id=' + _me.data.orderId,
            url: `/pages/waiting/waiting?order_id=${_me.data.orderId}${chargeOrderId ? '&chargeOrderId=' + chargeOrderId : ''}`,
          })

          _me.goChargeAndPay();
        }, 100)

      },
      'fail': function(res) {
        assign(app.globalData, { notNeedHide: false });
        console.log("用户取消支付", res)
      }
    })
  },
  goChargeAndPay() {
    let { goStatus, chargeAndPayParam } = app.globalData;
    console.log("并支付", goStatus)

    if (goStatus == 2) {
      this._topay();
      assign(app.globalData, { goStatus: 1 });
    }
  },

  getVerifyCodeParam() {
    let verifyCodeParam = getWxStorageSync('verifyCodeParam'),
      codeUseTime = 0;
    // console.log(verifyCodeParam,'showshowhsow');
    if (verifyCodeParam && verifyCodeParam.hideTime) {
      let nowTime = Date.now();
      let _waitTime = verifyCodeParam.waitTime ? (verifyCodeParam.waitTime) * 1000 : 0;
      // console.log(nowTime , verifyCodeParam.hideTime ,_waitTime,"++++++++")
      if (nowTime - verifyCodeParam.hideTime > _waitTime) { // 超过倒计时了 
        codeUseTime = 0;
        verifyCodeParam.status = 2;
      } else { // 还有剩余倒计时
        // 从获取验证码息屏 到 重新打开 用的总共时间
        codeUseTime = (180 - verifyCodeParam.waitTime) + (Math.floor((nowTime - verifyCodeParam.hideTime) / 1000));
      }

      this.setData({
        verifyCodeParam: verifyCodeParam ? verifyCodeParam : null,
        codeUseTime: codeUseTime
      })


      // console.log(verifyCodeParam,codeUseTime,'codeUseTime','---+++++show+++------');

    }


  },
  onShow() {
    this.getVerifyCodeParam();

    assign(app.globalData, { notNeedHide: false });

  },
  setVerifyCodeParam() {
    // console.log('息屏了pay');
    let verifyCodeParam = getWxStorageSync('verifyCodeParam');
    let waitTime = getWxStorageSync('verifyCodeTime'); //此时的倒计时还剩下的秒数
    if (verifyCodeParam) {
      verifyCodeParam.waitTime = waitTime;

      verifyCodeParam.hideTime = Date.now();

      setWxStorageSync('verifyCodeParam', verifyCodeParam);
    }


    // console.log(getWxStorageSync('verifyCodeParam'),'---+++hide+++++---1111---');
  },
  onHide() {
    this.setVerifyCodeParam();

  },
  onUnload() {
    // console.log('onUnload','onUnload')
    this.setVerifyCodeParam();
  },
  _balanceNotPayshowToast() {
    let title = '储值余额不足，请充值或选择其他支付方式';
    // if(!openCharge || chargeStatus == 2) {
    //   title = '储值余额不足，请选择其他支付方式'
    // }

    my.showToast({
      content: title,
      icon: 'none',
      duration: 3000,
    });
  },

  upDataOpenTelModal(e) {
    this.setData({
      openTelModal: e.detail.status
    })
  },
  // 取消支付
  _cancelPay() {
    const { orderId } = this.data;
    app.globalData = assign({}, app.globalData, { order_id: orderId });
    console.log(orderId, '取消支付orderId')
    cancelPay({ orderId: orderId }, rst => {
      setTimeout(function() {
        my.reLaunch({
          url: '/pages/index/index?addish=true'
        })
      }, 200);
    })

  },

});
