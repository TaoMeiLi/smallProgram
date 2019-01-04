import { 
  filterStorageKeys,
  getWxStorageSync, 
  setWxStorageSync, 
  clearStorageSync 
} from '../utils/wxstorage';
import { 
  USERINFO, 
  LOGINSTATE, 
  INDEXPARAMS, 
  HIDE, 
  CARTSTIME,
  ORDERDETILL,
  ADDISH,
  LAUNCHPARAMS,
  CARTS,
  WXMAP
} from '../constant';

exports.getCartsTime = function () {
  return getWxStorageSync(CARTSTIME);
}

exports.setCartsTime = function (data) {
  setWxStorageSync(CARTSTIME, data);
}

exports.setUserInfo = function (data) {
  setWxStorageSync(USERINFO, data);
}
exports.getUserInfo = function () {
  return getWxStorageSync(USERINFO);
}

exports.getLoginState = function () {
  return getWxStorageSync(LOGINSTATE);
}

exports.setIndexParams = function (data) {
  setWxStorageSync(INDEXPARAMS, data);
}

exports.getIndexParams = function () {
  return getWxStorageSync(INDEXPARAMS);
}

exports.setLaunchParams = function (data) {
  setWxStorageSync(LAUNCHPARAMS, data);
}

exports.getLaunchParams = function () {
  return getWxStorageSync(LAUNCHPARAMS);
}

exports.setHide = function (data) {
  setWxStorageSync(HIDE, data)
}

exports.getHide = function () {
  return getWxStorageSync(HIDE);
}

exports.getAddish = function () {
  return getWxStorageSync(ADDISH);
}

exports.setAddish = function (data) {
  setWxStorageSync(ADDISH, data);
}

exports.removeAddish = function() {
  clearStorageSync(ADDISH);
}

exports.removeHide = function() {
  clearStorageSync(HIDE);
}

exports.setAny = function (key, data) {
  setWxStorageSync(key, data);
}

exports.getAny = function (key) {
  return getWxStorageSync(key);
}

exports.removeAny = function (key) {
  clearStorageSync(key)
}

exports.getOrderDetail = function (key) {
  return getWxStorageSync(`${ORDERDETILL}${key}`);
}

exports.getCarts = function() {
  return getWxStorageSync(CARTS)
}

exports.removeOrderOrderDetail = function (key) {
  const _list = filterStorageKeys(ORDERDETILL);
  const _key = `${ORDERDETILL}${key}`;
  _list.forEach(k => {
    if (k != _key) {
      clearStorageSync(k);
    }
  })
}

exports.getWxmap = function() {
  return getWxStorageSync(WXMAP);
}