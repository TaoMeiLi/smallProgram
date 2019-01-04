const { random } = require('lodash');
const { mock_host, mock_port } = require('../dev.config');

const HOST = `http://${mock_host}:${mock_port}`; //小程序规定引用的图片等必须为https完整绝对路径

/*订单列表*/
module.exports = (app, prefix)=>{
    /**
     * 获取订单详情
     * @param id 订单id
     * ===========================================
     * @prop order_id 订单id
     * 
     */
    app.get(`${prefix}/getOrderInfo/:orderId`, function(req, res) {
        res.json({
            errcode: 0, //random(0, 1),
            errmsg: 'sucess',
            result: {
                order_id: '56765678766788',
                shop_id: 11234,
                people: 3, //用餐人数
                ordermemo: "不要啦", //备注字数限制
                shop_id: 21249,
                ordermode: 3,//{1: '扫付', 2: '先付', 3: '后付'}//显示取餐号/桌牌号
                source: 3, //微信1，支付宝2，微信扫码点餐 3， 支付宝小程序 4， pos扫码支付 5，预点餐6 
                addDishes: 2, // 开启加菜 2: 关闭
                meal_no: '222', //取餐号 
                mealfee: 10, //茶位费
				table_no: "222", //桌台号
				table_name: '二号桌台', //桌台名称
                create_time: new Date().getTime() - 1800, //下单时间
                add_time: '2018-05-10',
                vipPrice: 2999, // vip:储值支付
                total: 3000, //总价
                cost: 3000, //实付金额
                diningWay:1, // 就餐方式:1:堂食，2:外带 默认：1   Number类型
                timeToShop:'40分钟后', // 预计到店时间
                wlife_pay_info: {
                    orderId: 1122222, //订单号
                    cno: 2222, //当前卡号
                    consume_amount: 1000, //消费总金额
                    payment_amount: 20000, //实付总金额(微信支付)
                    payment_mode: 6,//美团支付方式
                    sub_balance: 3000, //消费储值金额
                    sub_credit: 1000/100,//消费积分个数
                    sub_credit_money: 2000, //消费积分金额
                    sub_coupons: 3000,//消费优惠券金额
                    deno_coupon_ids: [], //代金券ids
                    gift_coupons_ids: [], //礼品劵ids
                    sub_deno: 2000, //代金券抵扣金额
                    sub_gift: 1110, //礼品劵抵扣金额
                },
                discounts: [{
                    title: '全单会员5折',
                    money: 2000,
                }, {
                    title: '满200-50',
                    money: 2000,
                }],
                invoice_url: 'www.baidu.com', //发票地址
                status: 2, //订单状态 {1: 新订单 2: 下单成功 3, 等待审核 4， 下单失败 5 门店退单 6 取消订单 7 异常订单}
                pay_status: 1, //支付状态 1,未支付 2已支付 3 已退款 4 支付失败
                waiting_time: 1800000, //等待时间 (秒) 上饭默认半小时
                pay_waiting_time: 1800000, //支付时间 默认半小时
                name: "精品烤羊排精品烤羊排+米饭精品烤羊排精品烤羊排等5件商品", // 名称拼接
                dishes: { //菜品信息{batch: 最新菜品信息，all: 过往批次菜品信息}
                    "batch": [
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝1',
                            dishsno: '10004', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 2000,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 1800,
                            orgprice: 2000,
                            bmemberprice: 1,
                            bargainprice: 0,
                            bgift: 0, // 0 否， 1是
                        },
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝2',
                            dishsno: '00002', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 1600,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 2000,
                            orgprice: 2000,
                            bmemberprice: 0,
                            bargainprice: 1,
                            bgift: 1, // 0 否， 1是
                        },
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝3',
                            dishsno: '00002', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 2000,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 2000,
                            orgprice: 2000,
                            bmemberprice: 0,
                            bargainprice: 0,
                            bgift: 0, // 0 否， 1是
                        }
                    ],
                    "all": [
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝4',
                            dishsno: '00002', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 2000,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 1800,
                            orgprice: 2000,
                            bmemberprice: 1,
                            bargainprice: 0,
                            bgift: 0, // 0 否， 1是
                        },
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝5',
                            dishsno: '00002', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 1600,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 2000,
                            orgprice: 2000,
                            bmemberprice: 0,
                            bargainprice: 1,
                            bgift: 1, // 0 否， 1是
                        },
                        {
                            remarks: { //菜品备注
                                '37': '辣椒',
                                '38': '香菜',
                                '41': '香菜',
                                '39': '不要辣椒37',
                                '40': '香菜38',
                            },
                            hasRemark: true, //是否备注
                            name: '土豆丝6',
                            dishsno: '00002', //菜品速记吗
                            cookid: '1', //做法id 单品
                            cookname: '红烧',
                            normid: '1', //规格duid 单品
                            normname: '大份',
                            cookAndnorm: '大份, 红烧',
                            type: 1, //type 单品是 1  套餐是 2
                            price: 2000,
                            origin_price: 3990, //原价
                            aprice: 0, //单位是分 单品：加价是1份加价, 套餐：所有小菜加价
                            count: 5, //数量
                            pic: 'https://yulongge.github.io/images/wxdc/dishes1.png',
                            memberprice: 2000,
                            orgprice: 2000,
                            bmemberprice: 0,
                            bargainprice: 0,
                            bgift: 0, // 0 否， 1是
                        }
                    ]
                }
            }
        });
    })

    app.post(`${prefix}/checkOrder`, (req, res) => {
        const {order_id, table_sno} = req;
        res.json({
            errcode: 0,
            errlevel: 'alert',
            errmsg: '请求成功！',
            result: {
              orderData: {
                status: 2
              }, //is_update == 1 有变化更新订单
              is_update: 0, //0,没变化 1: 有变化
            }
        })
    });

    app.post(`${prefix}/cancelOrder`, (req, res) => {
        const {order_id, cancel} = req;
        res.json({
            errcode: 0,
            errmsg: '请求成功！',
            result: {

            }
        })
    });
}