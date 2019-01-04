const {
  getWxStorageSync,
  setWxStorageSync
} = require('./wxstorage');
const CARTS = 'carts';

const cartDataGet = function () {
  return getWxStorageSync(CARTS);
}

const cartDataSet = function (data) {
  setWxStorageSync(CARTS, data)
}

/**
 * 检验菜品数量是否售完 
 * @param {*} item 菜品数据 
 * @return {boolean} 是否添加到购物，售完增加提示，返回false
 */
const cartSoldCheck = function (item) {
  const cartCount = cartItemCount(item);
  let {count, leftamount, name} = item;
  const _count = cartCount + count;
  if (_count > leftamount) {
    wx.showToast({
      title: `${name}仅剩${leftamount}`,
      icon: 'none',
      duration: 2000
    })
    return false;
  }
  
  return true;
}

/**
 * 获取购物车菜品总数量
 * @return {number} 返回购物车菜品总数
 */
const cartItemCount = function (item) {
  let total = 0;
  const cart = cartDataGet();
  cart.forEach(k => {
    if (k.dishsno == item.dishsno) {
      total += k.count
    }
  })

  return total;
}

/**
  * 获取购物车指定菜品的集合，总数
  * @param {*} sno 菜品速记吗 套餐只传速记吗
  * @param {*} duid 菜品规格duid
  * @param {*} cookid 单品做法id
 */
const cartItemFilter = function (sno, duid, cookid) {
  let count = 0;
  const data = cartDataGet().filter(k => {
    if (duid && !cookid) {
      if (k.dishsno == sno && k.duid == duid) {
        count += k.count;
        return true;
      }
    } else if (duid && cookid) {
      if (k.dishsno == sno && k.duid == duid && k.cookid == cookid) {
        count += k.count;
        return true;
      }
    } else if (sno && !duid && !cookid) {
      if (k.dishsno == sno) {
        count += k.count;
        return true;
      }
    }
  })
  return {
    count,
    data
  }
}

module.exports = {
  cartDataGet,
  cartDataSet,
  cartSoldCheck,
  cartItemCount,
  cartItemFilter
}