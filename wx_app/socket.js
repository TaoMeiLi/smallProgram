const WebSocket = require('ws');
let cartDataMsg = null;

function computeCart(data) {//处理购物车
    let disData = JSON.parse(data),
        action = disData.type,
        cart = {};

    switch(action) {
        case "cart": //增加或减少购物车
            cart = updateCart(disData);
            break;
        case "cart_clean": //清空购物车
            cart = clearCart(disData);
            break;
        case "cart_order": //提交订单
            cart = clearCart(disData);
            break;
        default: //返回购物车信息
            cart = getCart(disData);
    }
    return cart;
}

function getCart(params) { //链接成功后，拿到最新的购物车状态
    let carts = {
        "type":"cart",
        "data":{
            "totalitem":[
                // {
                //     "key":"EAGjZWjwimCU_00004_122_",
                //     "count":3,
                //     "data":{
                //         "aprice":0,
                //         "cookText":"",
                //         "cookid":"",
                //         "cookname":"",
                //         "cooks":{
    
                //         },
                //         "count":3,
                //         "createInfo":{
                //             "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIWNgp1kLVtQjnjcmlQKDj7iaypWsGkAt62V6dEnPBKVBI5sVL2jAzsl6HW9pkN6SVe22JBOMvnicNw/132",
                //             "city":"Chaoyang",
                //             "country":"China",
                //             "gender":1,
                //             "language":"zh_CN",
                //             "nickName":"Jaleel",
                //             "province":"Beijing"
                //         },
                //         "dishsno":"00004",
                //         "duid":"122",
                //         "hasRemark":false,
                //         "id":"10317",
                //         "isWeigh":0,
                //         "leftamount":-1,
                //         "min_count":5,
                //         "min_reduce":1,
                //         "min_unit":1,
                //         "name":"西红柿炒鸡蛋",
                //         "normname":"大份",
                //         "norms":{
                //             "bargainprice":1,
                //             "duid":"122",
                //             "limitCount":0,
                //             "memberprice":{
                //                 "gid":[
                //                     "1",
                //                     "2"
                //                 ],
                //                 "price":10
                //             },
                //             "normname":"大份",
                //             "orgprice":80,
                //             "price":50
                //         },
                //         "pic_b":"https://yulongge.github.io/images/wxdc/dishes1.png",
                //         "pic_s":"https://yulongge.github.io/images/wxdc/dishes1.png",
                //         "pkid":"123",
                //         "price":50,
                //         "remarks":{
    
                //         },
                //         "soldout":1,
                //         "type":"1",
                //         "unit":"斤",
                //         "userInfo":{
                //             "avatarUrl":"https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIWNgp1kLVtQjnjcmlQKDj7iaypWsGkAt62V6dEnPBKVBI5sVL2jAzsl6HW9pkN6SVe22JBOMvnicNw/132",
                //             "city":"Chaoyang",
                //             "country":"China",
                //             "gender":1,
                //             "language":"zh_CN",
                //             "nickName":"Jaleel",
                //             "province":"Beijing"
                //         }
                //     }
                // }
            ],
            "modify":{
                "key":"",
                "count":0,
                "data":""
            }
        }
    }; 
    cartDataMsg = carts;
    return carts;
}

function updateCart(params) { //更新购物车
    console.log(params, '更新的菜品');
    let cartData = cartDataMsg,
        {key, count} = params.data.modify,
        totalitem = cartData.data.totalitem;
    cartData.type = params.type;
    cartData.data.modify = params.data.modify;

    if(key) {
        let flag = false;
        totalitem = totalitem.map(item => {
            if(key === item.key) {
                flag = true;
                item.count = item.count + count;
                item.data.count = item.data.count + count;
            }
            return item;
        })
        if(!flag) totalitem.push(params.data.modify);
    } else {
        totalitem.push(params.data.modify);
    }
    cartData.data.totalitem = totalitem;

    let updatedCart = cartData;
    cartDataMsg = cartData;
    return updatedCart;
}

function clearCart(disData) { //清空购物车
    cartDataMsg = disData;
    cartDataMsg.data.totalitem = [];
    return cartDataMsg;
}

exports.openSocket= function(server) { //socket 连接
    const wss = new WebSocket.Server({ server });
    wss.on('connection', function(ws) { //ws 链接
        ws.on('message', function incoming(message) {
            const cartData = JSON.stringify(computeCart(message));
            //ws.send(cartData);
            wss.broadcast(cartData);
        });
        ws.on("close", function() {
            console.log('ws server closed ...')
        })
    });

    wss.broadcast = function broadcast(data) { // ws 广播
        //console.log(data, 'broadcast');
        wss.clients.forEach(function each(client) {
            if (client.readyState === WebSocket.OPEN) {
                //console.log(data, 'client broadcast')
                client.send(data);
            }
        });
    };
}

