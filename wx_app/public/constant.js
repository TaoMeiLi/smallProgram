/*
* 常量配置
*/
module.exports = { 
  activity: { //公告类型: {1-满，2-赠，3-特}
    1: '满减',
    2: '买赠',
    3: '特价'
  },
  orderStatus: { //订单状态
    1: '新订单', //未支付
    2: '下单成功', //已支付
    3: '等待审核',
    4: '下单失败',
    5: '门店退单',
    6: '取消订单'
  },
  payStatus: { //支付状态
    1: '待付款',
    2: '已完成',
    3: '已取消',
    4: '已退款'
  },
  booking: {
    bTable: 3, //后付有桌位
    aNtable: 2, //先付无桌位
    aTable: 1  //先付有桌位
  },
  style: {
    topBottom: 1, //原设计
    leftRightSmall: 2, //左右结构小图
    leftRightBig: 3, //左右结构大图
    topBottomMiddle: 4, //上下结构中图
  },
  homeStyle: {
    1: {
      'indexRight': '',
      'dishClass': '',
      'kindClass': '',
      'dishKindClass': '',
      'hide': '',
      'count_btn': '',
    },
    2: {
      'indexRight': '',
      'dishClass': 'small_dish_view',
      'kindClass': 'selected',
      'dishKindClass': 'new_kind_item',
      'hide': 'hide',
      'count_btn': '',
    },
    3: {
      'indexRight': 'padding0',
      'dishClass': 'big_dish_view',
      'kindClass': 'actived',
      'dishKindClass': 'big_kind_item',
      'hide': 'hide',
      'count_btn': '',
    },
    4: {
      'indexRight': '',
      'dishClass': 'middle_dish_view',
      'kindClass': '',
      'dishKindClass': 'middle_kind_view',
      'hide': 'hide',
      'count_btn': 'middle',
    }
  },
  USERINFO: 'user_info',
  LOGINSTATE:'login_state',
  INDEXPARAMS:'index_params',
  LAUNCHPARAMS:'launch_params',
  CARTSTIME: 'cartstime',
  ORDERDETILL: 'ORDERDETILL_',
  WXMAP:'wxMap',
  HIDE: 'hide',
  ADDISH: 'addish',
  CARTS: 'carts',
  BOOING: 'booking',
  wxScanUrl: "weixin.qq.com",
  qcordUrl: "welcrm.com", //二维码主域名验证,
  DEFAULTCOLOR: '#FF6D5B'  // 默认颜色值
}