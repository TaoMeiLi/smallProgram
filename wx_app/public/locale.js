module.exports = (moneyType)  => {

  let currency = moneyType == 2 ? '＄' : '￥';
  return {
    err_required: '请输入{0}'
    , loading: '正在加载...'
    , time_from_to: '{0} 至 {1}'
    , load_more: '点击加载更多'
    , no_more: '我是有底线的'
    , alert: {
      button_text: '我知道了'
    }
    /*用户授权*/
    , userInfoModal: {
      title: "授权提示",
      content: "要先允许使用[用户信息]才可以登录哦",
      fail: "授权失败",
      extFail: "第三方平台自定义信息失败"
    }
    /*登录*/
    , login: {
    }
    /*首页*/
    , index: {
      saofu: {
        confirmText: '我知道了',
        title: '该桌位没有未结订单',
        content: '请先点餐或者联系服务员'
      },
      activity: {
        discount: '{0} 个活动',
        okbtn: '确定',
        notice: '公告',
      },
  
      downline: '点餐链接出现错误，请重新扫码!',
    
      search: {
        placeholder: '搜索',
        cancel:'取消',
        hot:'历史搜索',
        result:'没有找到相关菜品',
        order_tip: '订单'
      },
      ws: {
        user_join: '加入本桌点餐！',
        add: '增加了',
        reduce: '减少了',
        dishes: '道菜！',
        duration: 2000,
        place_title: '提示',
        place_content: '已提交本桌订单',
        left_btn: '继续点餐',
        right_btn: '去看看',
      }
    },
    wstype: {
      CART: 'cart',
      CART_CLEAN: 'cart_clean',
      USER_ONLINE:'user_online',
      CART_ORDER: 'cart_order',
      KEEPALIVE: 'keepalive',
      MERGED: 'yd_merged',
      YDSAVED: 'yd_saved',
      YDCANCELED: 'yd_canceled'
    }
    /*支付 */
    , pay: {
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
      openPayMethod: '当前门店不支持在线结账，请联系服务员结账！',
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
      wxpay:'微信支付',
      balance_pay_text: '余额支付',
      need_pay_text: '还需支付'
    }
  
    ,location: {
      OVER: 1,
      ERROR: 2   
    }
    
    /**购物车 */
    ,carts: {
      clean: '清空',
      go_order: '去下单',
      currency,
      continue: '凑单',
      achieve: '已达标',
      ok: '确定',
      recommendTitle: '点了{0}的人也喜欢',
      remark: '忌口备注',
      remarkText: '备注',
      memo: '(可多选)',
      discounts: {
        1: '满减',
        2: '满赠',
        3: '特价'
      },
      tip: '个活动',
      more_dishes: '以下菜品点了多份',
      known: '知道了',
      need: '需要',
      no_need: '不需要',
      must_tip: '亲，您还没有添加{0}哦～'
    }
    ,placeorder: {
      people: '人数',
      peopleholder: '请填写所需餐具数',
      remark: '备注',
      remarkholder: '填写您的忌口要求，商家会尽量满足',
      totalprice: '实付款',
      placeorder: '提交订单',
      currency,
      choosepeople: '亲，请选择人数',
      locationTitle: '提示',
      getlocationfail: '获取地理位置失败，请开启定位！',
      orderlocation: '请在门店规定范围内点餐!',
      ws: {
        title: '提示',
        content: '购物车发生变化',
        confirmText: '我知道了',
      },
      timeToShop: '预计到店',
      diningWay: '就餐方式',
      diningWay_1: '堂食',
      diningWay_2: '外带',
      defaultTime: '请选择到店时间',
      timetoshopmodal: {
        btn_ok: '确定'
      }
    }
    ,scan: { //扫码
      des:'扫码点餐',
      reserver_btn: '扫码下单',
      paydes: '扫码支付',
      tip: '请扫描桌边二维码',
      title: '扫一扫',
      warn: '提示',
      warn_content: '网络异常',
      warm_wxscan: '请使用微信扫一扫扫描二维码！',
      warn_notwxdc: '请扫描正确二维码！',
      reserve_title: '您的菜已保存到购物车，到店后请扫描桌面上的二维码下单',
      reserve_cancel: '取消此单',
      reserve_time: '订单12小时内有效',
      carts_cache: 1800000,
      scan_user: '尊敬的{0}客官',
      scheduled: '预点餐',
      currency,
      scheduled_tip:'正在排队/不在餐厅'
    },
    order: { //订单列表
      detail: '查看详情',
      pay: '去支付',
      actual_pay: `实付: ${currency}`
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
      total_label: '总计',
      member_price: '会员价',
      member_discount: '会员折扣',
      coupon_price: '优惠券',
      credit_price: '积分',
      balance_price: '储值',
      pay_price: '商品总价',
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
      order_vipPrice: '储值卡支付 ',
      order_vipPrice_1: '只需支付',
      order_originalCost: '，微信原价支付',
      order_yuan: '元',
  
    },
    orderstatus: {
      writepay: '等待付款',
      promisetext:'我们承诺',
      alldishes: '所有菜品',
      ordercomplete: '订单已完成',
      ordercancel: '订单已取消',
      orderrefund: '订单已退款',
      ordererror: '小主，该单未提交成功，请重新点餐或呼喊服务员~',
      abnormalerr: '小主，支付结果异常，避免重复支付，请联系服务员~',
      closeorder:'自动关闭',
      completeorder: '内上齐',
      left:'还剩',
      errorder: '下单失败',
      waiteconfirm: '下单成功，请联系服务员审核',
      waiting: '等待服务员审核',
      payerr: '支付失败'
    },
    dishes:{
      lefttitle:'仅剩:',
      leftunit:'份',
      norm:'规格',
      cook:'做法',
      currency,
      maindish:'主菜',
      mustSelected: '(必选)',
      mandatory:'辅菜',
      optional:'可选菜品',
      addcart:'加入购物车',
      vipPrice:'VIP价',
      recommends: '猜你喜欢',
      commonPrice:'非会员'
    },
    shopList: {
      seltCity: '选择城市',
      search_placehoder: '搜索门店',
      search_city: '搜索城市',
      loc_fail:'定位失败',
      loc_again: '重新定位',
      list_title: '门店列表',
      dist_unit: '米',
      getLoc_title: '是否授权获取当前位置',
      getLoc_content: '需要获取您的地理位置，请确认授权，否则将无法推荐附近的门店给您',
      get_succ: '授权成功',
      get_fail: '授权失败',
      locate_fail: '定位失败,请重新定位',
      err_seltSity : '请先选择城市',
      btn_select: '选择',
      search_noShop: '没有找到相关门店',
      search_noCity: '没有找到相关城市',
      cityList_title: '已开通城市',
      btn_diancan: '扫码点餐',
      btn_yudiancan: '提前预点',
      no_more_shops: '我是有底线的~',
      now_city: '当前定位城市：',
      no_list: '当前城市还没有门店，敬请期待！',
      tip_text: '提示',
  
    },
    confirmBtn: {
      cancelText: '取消',
      yesText: '确定',
    },
    GZH: 'gzh',
  };
}