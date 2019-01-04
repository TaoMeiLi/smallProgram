const {
  random
} = require('lodash');
const {
  mock_host,
  mock_port
} = require('../dev.config');

const HOST = `http://${mock_host}:${mock_port}`; //小程序规定引用的图片等必须为https完整绝对路径

/*支付*/
module.exports = (app, prefix) => {

  /**
   * 获得支付信息
   * ===========================================
   * @param {String: orderId} orderId 备注 订单Id
   * ===========================================
   * @prop money 支付金额
   * @prop order_id 订单id
   * @prop cards 会员卡
   * @prop coupons 优惠券
   * @prop dishes 菜品信息
   * 
   */
  app.get(`${prefix}/pay/:orderId`, function (req, res) {
	  console.log(req.orderId);
	  let len = 3,//random(0, 4),
		  couponLen = 20, //330,
		  couponIdArray = [];
	  Array.from(Array(couponLen)).forEach(() => {
		  let tempId = random(0, 1000000);
		  couponIdArray.push(tempId);
	  })
	  //console.log(couponIdArray, 'couponIdArray')

	  let cards = [ //会员卡
		  {
			  cid: "26122234543", //卡id
			  cno: "2612 2234 543", //卡号
			  grade: '1', // 卡等级
			  grade_name:'等级名称1', // 等级名
			  name: '会员名1', // 会员名
			  max_consume_money: 1400, //门店会员卡最大消费储值金额 
			  balance: 1076767600, //余额
			  checked: true,
			  coupons: [ //优惠券
				  {
					  coupon_id: ['100005', '100006', '100007', '100008'], //券id- string类型
					  template_id: "222222", //券模板id- string类型
					  title: "菜品卷类型", //标题
					  money: 200000, //金额
					  type: 2, //类型（1代金券，2礼品劵(包括菜品劵)）
					  limit_type: 0, //启用金额限制类型(0: 满多少, 1: 每满多少(1张))
					  products: [ //可用此券的菜品速记码 //优惠券抵消金额最大的菜品，一卷顶多个菜 //products来判断是不是菜品劵
			"10004"
					  ],
					  effective_time: "2017-06-23 00:00:00", //券⽣效时间- string类型
					  failure_time: "2017-10-30 23:59:59", //券失效时间- string类型
					  limitations: [ //券规则文案
						  "11",
						  "每次消费最多可以使用2张",
						  "可以和其他种类的券混用"
					  ],
					  enable_amount: 3000, //满多少额可用- string类型
					  max_use: "3", //同种模板券最大时使用几张- string类型
					  mix_type: 0, //混用类型{0: 可以, 1: 不可以, 2: 部分可以}
					  is_diy_deno: false //是否支持自定义面值，仅礼品券支持自定义面值- boolean类型//true不让选择(针对于礼品劵，菜品劵不限制)
				  },
				  {
					  coupon_id: couponIdArray, //['100001','100002','100003','100004'], //券id- string类型
					  template_id: "111111", //券模板id- string类型
					  title: "代金券-无敌套餐1", //标题
					  money: 30000, //金额
					  type: 1, //类型（1代金券，2礼品劵(包括菜品劵)）
					  effective_time: "2017-06-23 00:00:00", //券⽣效时间- string类型
					  failure_time: "2017-10-30 23:59:59", //券失效时间- string类型

					  limit_type: 0, //启用金额限制类型(0: 满多少, 1: 每满多少(1张))
					  enable_amount: 5000, //满多少额可用- string类型
					  max_use: "3", //同种模板券最大时使用几张- string类型
					  mix_type: 0, //混用类型{0: 可以, 1: 不可以, 2: 部分可以}
					  cLimitCoupon: [ //可以混用的卷模板id
						  "222222", //template_id
					  ],
					  is_diy_deno: false //是否是自定义面值- boolean类型//true不让选择(针对于礼品劵，菜品劵不限制)
				  },
				  {
					  coupon_id: ['1000011', '1000012', '1000013', '1000014'], //券id- string类型
					  template_id: "333333", //券模板id- string类型
					  title: "代金券-无敌套餐3", //标题
					  money: 3600, //金额
					  type: 1, //类型（1代金券，2礼品劵(包括菜品劵)）
					  effective_time: "2017-06-23 00:00:00", //券⽣效时间- string类型
					  failure_time: "2017-10-30 23:59:59", //券失效时间- string类型
					  limitations: [ //券规则文案
						  "11",
						  "每次消费最多可以使用2张",
						  "可以和其他种类的券混用"
					  ],
					  enable_amount: 40000, //满多少额可用- string类型
					  max_use: "5", //同种模板券最大时使用几张- string类型
					  mix_type: 1, //混用类型{0: 可以, 1: 不可以, 2: 部分可以}
					  is_diy_deno: false //是否支持自定义面值，仅礼品券支持自定义面值- boolean类型//true不让选择(针对于礼品劵，菜品劵不限制)
				  }
			  ],
			  use_credit: true, //是否开启积分
			  credit: { //积分
				  total: 100,
				  ratio: 100, //一积分抵消金额单位：分
			  }
		  },
		  {
			  cid: "26122234522", //卡id
			  cno: "2612 2234 522", //卡号
			  grade: '2', // 卡等级
			  grade_name:'等级名称2', // 等级名
			  name: '会员名3', // 会员名
			  max_consume_money: 44400, //门店会员卡最大消费储值金额
			  balance: 100, //余额
			  coupons: [ //优惠券
				  
			  ],
			  use_credit: false, //是否开启积分
			  credit: { //积分
				  total: 10,
				  ratio: 100, //一积分抵消金额单位：分
			  }
		  },
		  {
			  cid: "26122234533", //卡id
			  cno: "2612 2234 533", //卡号
			  grade: '3', // 卡等级
			  grade_name:'等级名称3', // 等级名
			  name: '会员名3', // 会员名
			  max_consume_money: 12000, //门店会员卡最大消费储值金额
			  balance: 10, //余额
			  coupons: [],
			  use_credit: true, //是否开启积分
			  credit: { //积分
				  total: 130,
				  ratio: 100, //一积分抵消金额单位：分
			  }
		  },
	{
			  cid: "26122234544", //卡id
			  cno: "2612 2234 544", //卡号
			  grade: '4', // 卡等级
			  grade_name:'等级名称4', // 等级名
			  name: '会员名4', // 会员名
			  max_consume_money: 5600, //门店会员卡最大消费储值金额
			  balance: 10, //余额
			  coupons: [ //优惠券
				  {
					  coupon_id: ['300001', '300002', '300003', '300004', '300005'], //券id- string类型
					  template_id: "333", //券模板id- string类型
					  title: "代金券-无敌套餐1", //标题
					  money: 18, //金额
					  type: 1, //类型（1代金券，2礼品劵）
					  limit_type: 0, //启用金额限制类型(0: 满多少, 1: 每满多少(1张))
					  products: [ //可用此券的菜品速记码 //优惠券抵消金额最大的菜品，一卷顶多个菜 //判断是不是菜品劵
						  10004,
						  10005
					  ],
					  effective_time: "2017-06-23 00:00:00", //券⽣效时间- string类型
					  failure_time: "2017-10-30 23:59:59", //券失效时间- string类型
					  limitations: [ //券规则文案
						  "11",
						  "每次消费最多可以使用2张",
						  "可以和其他种类的券混用"
					  ],
					  enable_amount: 22, //满多少额可用- string类型
					  max_use: "5", //同种模板券最大时使用几张- string类型
					  mix_type: 1, //混用类型{0: 可以, 1: 不可以, 2: 部分可以}
					  cLimitCoupon: [ //可以混用的卷模板id
						  "2064552", //template_id
						  "2064553"
					  ],
					  is_diy_deno: false //是否支持自定义面值，仅礼品券支持自定义面值- boolean类型//true不让选择(针对于礼品劵，菜品劵不限制)
				  }
			  ],
			  use_credit: false, //是否开启积分
			  credit: { //积分
				  total: 10,
				  ratio: 100, //一积分抵消金额单位：分
			  }
		  },
	{
			  cid: "26122234555", //卡id
			  cno: "2612 2234 555", //卡号
			  grade: '5', // 卡等级
			  grade_name:'等级名称5', // 等级名
			  name: '会员名5', // 会员名
			  max_consume_money: 2400, //门店会员卡最大消费储值金额
			  balance: 10, //余额
			  coupons: [ //优惠券
				  {
					  coupon_id: ['300001', '300002', '300003', '300004', '300005'], //券id- string类型
					  template_id: "333", //券模板id- string类型
					  title: "代金券-无敌套餐1", //标题
					  money: 18, //金额
					  type: 1, //类型（1代金券，2礼品劵）
					  limit_type: 0, //启用金额限制类型(0: 满多少, 1: 每满多少(1张))
					  products: [ //可用此券的菜品速记码 //优惠券抵消金额最大的菜品，一卷顶多个菜 //判断是不是菜品劵
						  10004
					  ],
					  effective_time: "2017-06-23 00:00:00", //券⽣效时间- string类型
					  failure_time: "2017-10-30 23:59:59", //券失效时间- string类型
					  limitations: [ //券规则文案
						  "11",
						  "每次消费最多可以使用2张",
						  "可以和其他种类的券混用"
					  ],
					  enable_amount: 22, //满多少额可用- string类型
					  max_use: "5", //同种模板券最大时使用几张- string类型
					  mix_type: 1, //混用类型{0: 可以, 1: 不可以, 2: 部分可以}
					  cLimitCoupon: [ //可以混用的卷模板id
						  "2064552", //template_id
						  "2064553"
					  ],
					  is_diy_deno: false //是否支持自定义面值，仅礼品券支持自定义面值- boolean类型//true不让选择(针对于礼品劵，菜品劵不限制)
				  }
			  ],
			  use_credit: true, //是否开启积分
			  credit: { //积分
				  total: 10,
				  ratio: 100, //一积分抵消金额单位：分
			  }
		  }
	  ];
	  //cards.length = 0;
	  let charge_rules = [  // 储值规则
		  {
			  charge_id: '1231',              // 规则id
			  rechargeAmount: 100000,           // 充值1000（单位：分）
			  giveMoney: 0,                   // 送200（单位：分）
			  giveCredit: 1000,                  // 送30积分
			  giveCouponMoney: 1000,             // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1232',              // 规则id
			  rechargeAmount:2340,           // 充8000（单位：分）
			  giveMoney: 110000,                // 送100（单位：分）
			  giveCredit: 2900,                  // 送0积分
			  giveCouponMoney: 3000,             // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1233',              // 规则id
			  rechargeAmount: 40000,           // 充4000（单位：分）
			  giveMoney: 0,                 // 送100（单位：分）
			  giveCredit: 110,                 // 送10积分
			  giveCouponMoney: 30100,           // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1234',              // 规则id
			  rechargeAmount: 5401,           // 充4000（单位：分）
			  giveMoney: 10000,                 // 送100（单位：分）
			  giveCredit: 100,                 // 送100积分(1积分= )
			  giveCouponMoney: 110,           // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1235',              // 规则id
			  rechargeAmount: 31100,           // 充值1000（单位：分）
			  giveMoney: 0,                   // 送200（单位：分）
			  giveCredit: 1220,                  // 送30积分
			  giveCouponMoney: 0,             // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1236',              // 规则id
			  rechargeAmount: 281,           // 充8000（单位：分）
			  giveMoney: 0,                // 送100（单位：分）
			  giveCredit: 0,                  // 送0积分
			  giveCouponMoney: 3000,             // 礼品券+代金券 金额（单位：分）
		  },
		  {
			  charge_id: '1237',              // 规则id
			  rechargeAmount: 14010,           // 充4000（单位：分）
			  giveMoney: 0,                 // 送100（单位：分）
			  giveCredit: 0,                 // 送10积分
			  giveCouponMoney: 0,           // 礼品券+代金券 金额（单位：分）
		  }
	  ].splice(0,3);
	  // charge_rules.length = 0;
	  res.json({
		  errcode: 0, //random(0, 1),
		  errmsg: 'success',
		  result: {
			  total: 9000, // 订单金额
			  money: 9002, //支付金额（单位：分）
			  order_id: "2222", //订单id
			  order_batch: "123456",
			  table_sno: "23456",
			  cards: cards,
			  openPayMethod: true,   // 是否开启支付方式
			  payment_mode: 6,        // 支付方式   美团:6 
			  source: 3, //微信1，支付宝2，微信扫码点餐 3， 支付宝小程序 4， pos扫码支付 5，预点餐6 
	  		cpqflag: true,//是否可使用菜品券
			  djqflag: true, //是否可用代金券
			  openCharge: true,   // 是否开启充值
			  chargeStatus: 3,    //  会员充值： 1:开启 2:关闭 3:智能推荐
			  multiple: 1.1,		// 订单金额倍数
	  		copywriting: '剩余的钱可以在下次使用剩余的钱可以在下次使用剩余的钱可以在下次使用', 	// 推荐文案
			  charge_rules: charge_rules, 
			  lockOrderTime: Date.now(), //点击支付，锁定订单的时间，返回时间戳
			  payTime: 0, //先付设置支付时间，默认3分钟，未设置返回0即可。 
			  vipPrice: 8300,   // 会员价：储值支付金额,
			  tel: '',     // 用户是否完善手机号
			  checkPhone: 2,     // 商家开启了 完善手机号功能 1:开启，2: 关闭
			  memberPay: 1,       // 会员支付：1:储值+积分+券  2: 关闭
			  dishes: [ //订单菜品信息
				  {
					  name: '土豆丝',
					  dishsno: '10004', //菜品速记吗
					  type: 1, //type 单品是 1  套餐是 2
					  price: 2000,
					  origin_price: 3990, //原价
					  aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
						count: 2, //数量
						cpqflag: true, //是否可用代金券
					},
					{
						name: '土豆丝',
						dishsno: '10005', //菜品速记吗
						type: 1, //type 单品是 1  套餐是 2
						price: 1800,
					  origin_price: 3990, //原价
					  aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
		  			count: 2, //数量
		  			cpqflag: true, //是否可用代金券
				  }
			  ]
		  }
	  });
  });

  /**
   * 提交支付接口
   * =================================
   * @param type 支付方式{1: 美团}
   * @param orderId 订单id
   * @param money 需要支付金额
   * @param payMoney 实际支付金额
   * @param card //消费的储值卡
   * =================================
	  card: {
		  cid: "", //卡号
		  cost: 22, //储值消费
		  coupons: [], //所用的优惠券
		  credit: 22, //消费积分
	  }
   */

  app.post(`${prefix}/postpay/:orderId`, function (req, res) {
	  res.json({
		  errcode: 0, //random(0, 1),
		  errmsg: '支付成功',
		  result: {
			  "tradeNO": "251127",
		  }
	  });
  })

  /**
   * 查询支付结果
   * @param orderId 订单id
   */
  app.get(`${prefix}/payresult/:orderId`, function (req, res) {
	  res.json({
		  errcode: 0, //random(0, 1),
		  errmsg: '支付成功',
		  result: {
			  status: 2 //random(1,3) //{1: success, 2: waiting, 3: fail}
		  }
	  })
  })

  /**
   * 提交充值接口
   * @param orderId 订单id
   * @param chargeId 规则id
   * @param cid   卡id
   */
  app.post(`${prefix}/postcharge/:orderId`,function(req,res) {
	  res.json({
		  errcode: 0,
		  errmsg: '充值成功',
		  result: {
			  "outTradeNo": "251127", // 充值订单号
			  "appId": "wxf30a104104974b5d",
			  "timeStamp": "1501135485",
			  "nonceStr": "msxxdeeq3n1bxm9dfdh91ghjytm349",
			  "package": "prepay_id=wx2017072714930780425302",
			  "signType": "MD5",
			  "paySign": "C8A557623094694CC938B02E6",
			  "status": "SUCCESS",
			  "random": "WorrVsjyekyjVJQADQATHBsZyXAP",
			  "sign": "32ace86c378adddw7411e3e2a97fa"
		  }
	  })
  })

  /**
   * 查询充值结果
   * @param chargeOrderId 充值订单id
   */
  app.get(`${prefix}/chargeresult/:chargeOrderId`,function(req,res) {
	  res.json({
		  errcode: 0, //random(0, 1),
		  errmsg: '充值成功',
		  result: {
			  status: 2 //random(1,3) //{1: success, 2: waiting, 3: fail}
		  }
	  })
  })

  /**
   * 取消支付
   * @param orderId 订单id
   */
  app.post(`${prefix}/unlockOrder/:orderId`, (req, res) => {
	  const {data} = req;
	  res.json({
		  errcode: 0,
		  errmsg: '取消支付成功！',
		  errlevel: 'alert',
		  result: {}
	  })
  });
}
