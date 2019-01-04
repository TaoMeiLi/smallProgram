module.exports = (moneyType) => {
  let currency = moneyType == 2 ? '＄' : '￥';
  return {
    scan: {
      des:'扫码点餐',
      reserver_btn: '扫码下单',
      paydes: '扫码支付',
      tip: '请扫描桌边二维码',
      title: '扫一扫',
      warn: '提示',
      warn_content: '网络异常',
      warm_wxscan: '请使用微信扫一扫扫描二维码！',
      warn_notwxdc: '请扫描正确二维码！',
      carts_cache: 1800000,
      scan_user: '尊敬的{0}客官',
      currency,
    },
    orderinfo: {
      negative: '-',
      currency,
      bgift: '赠',
      table_no: '桌台号',
      meal_no: '取餐号',
      people: '人数',
      ordermemo: '备注',
      order_no: '订单编号',
      order_time: '下单时间',
      total_price: '商品总价',
      member_price: '会员价',
      member_discount: '会员折扣',
      coupon_price: '优惠券',
      credit_price: '积分',
      balance_price: '储值',
      pay_price: '总计',
      topay: '去支付',
      toinvoice: '电子发票',
      cancelorder: '取消订单',
      adddish: '加菜',
      continuedc: '继续点餐',
      nomemo: '暂无备注',
      wxpay:'微信支付',
      placeagain: '再试一次',
      storenorder: '门店未接单',
      tryagain:'请重试或咨询服务员!',
      ordercancelok: '订单取消成功',
      orderchange: '订单发生变化',
      storenoreview: '门店还未审核订单，请联系服务员！',
      weightip: '亲，{0} (称重菜)未称重！',
      warn: '提示',
      show_more: '展开查看所有菜品',
      show_no_more: '收起所有菜品',
      diningWay: '就餐方式',
      diningWay_1: '堂食',
      diningWay_2: '外带',
      timeToShop: '预计到店',
      takeFoodCode: '取餐号',
      takeFoodTip: '提示：到店出示取餐号取餐',
      order_vipPrice: '储值支付金额',
      order_originalCost: '微信支付金额'
  
    },
    // 支付
    pay: {
      welcome: '请支付',
      currency,
      paybtn_confirm: '确定支付',
      paybtn: `微信支付 ${currency}{0}`,
      cno: 'NO.',
      coupon: '优惠券',
      credit: '积分',
      balance: '卡内余额',
      subtrack_money: `-${currency}{0}`,
      coupons_tip: '您有{0}张券可用',
      coupons_tip1: '{0}张券可用',
      coupon_okbtn: '确定',
      credit_tip: '共{0}积分，1积分抵{1}元',
      discountMoney: `-${currency}{0}`,
      costCard: '储值卡支付',
      date_msg_ef: '{0} 生效',
      date_msg_fa: '{0} 失效',
      openPayMethod: '未配置微信支付方式，请联系服务员',
      btn_goCharge: '去充值',
      charge_tip1: '充值{0}元',
      charge_tip2: '，赠送{0}元',
      charge_tip3: `${currency}{0}`,
      charge_tip4: '积分{0}',
      charge_tip5: '券{0}',
      charge_tip_add: '+',
      charge_tip_begin: '(',
      charge_tip_close: ')',
      chargeModalTitle: '选择充值金额',
      btn_goChargeNow: '立即充值',
      rule_give_money: '赠{0}元',
      label_total: '合计',
      card_label:" 储值卡",
      balance_insufficient: "余额不足",
      toast_payordertime: '支付时间超时，请重新下单。',
      use_coupon:'使用优惠券',
      max_coupon_tip: '已选最大优惠',
      coupon_title: '优惠券',
      vip_price:`享受会员价，仅需支付${currency}`,
      wx_price:`不享受会员价，原价付款${currency}`,
      wxpay:'支付宝支付',
      balance_pay_text: '余额支付',
      need_pay_text: '还需支付'
    }
  }
}