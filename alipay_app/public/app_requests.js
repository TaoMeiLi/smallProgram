const { assign } = require('./utils/object');
const { request, configUtil } = require('./utils/request');
const { mock_prefix } = require('./app.config');


//应用授权后登陆
const loginApp = (app, paramsWithCode, callback) => request(
  'POST', `${mock_prefix}/login`,
  paramsWithCode,
  callback
);


//业务请求：获得首页数据
const getIndex = (data, callback) => request('GET', `${mock_prefix}/index`, {...data}, callback);

//业务请求： 获取支付信息
const getPay =({orderId}, callback) => request('GET', `${mock_prefix}/pay/${orderId}`, {}, callback);

//业务请求： 提交支付信息
const postPay = ({ data }, callback) => request('POST', `${mock_prefix}/postpay/${data.orderId}`, {...data}, callback);

//业务请求： 检查订单是否需要更新
const checkOrder = ({order_id, table_sno, order_batch_id}, callback) => request('POST', `${mock_prefix}/checkOrder`, {order_id, table_sno, order_batch_id}, callback);

//业务请求： 获取订单详情信息
const getOrderDetail = ({ orderId }, callback) => request('GET', `${mock_prefix}/getOrderInfo/${orderId}`, {}, callback);

//业务请求：取消订单
const cancelOrder = ({order_id, cancel}, callback) => request('POST', `${mock_prefix}/cancelOrder`, {order_id, cancel}, callback);

module.exports = {
  login(app, paramsWithCode, callback) {
    configUtil(app);
    assign(app.globalData, paramsWithCode);
    loginApp(app, paramsWithCode, callback);
    return this;
  },
  getIndex,
  getPay,
  checkOrder,
  getOrderDetail,
  cancelOrder,
  postPay
}