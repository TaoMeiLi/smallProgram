const RELAUNCHSCAN = '/pages/scan/scan?isScan=true';
const RELAUNCHORDER = '/pages/orderdetail/orderdetail?order_id=';
const RELAUNCHBOOKING = '/pages/booking/booking';
const REDIRECTINDEX = '/pages/index/index';
const NAVIGATESHOPLIST = '/pages/shopList/shopList';

const navigateUrl = function (url) {
  setTimeout(function() {
    wx.navigateTo({url})
  }, 200);
}

const reLanucnUrl = function(url) {
  setTimeout(function() {
    wx.reLaunch({url})
  }, 200);
}

const redirectUrl = function (url) {
  setTimeout(function() {
    wx.redirectTo({url})
  }, 200);
}

exports.navigateShopList = function () {
  navigateUrl(NAVIGATESHOPLIST);
}

exports.relaunchScan = function() {
  reLanucnUrl(RELAUNCHSCAN)
}

exports.relaunchOrder = function (id) {
  const url = `${RELAUNCHORDER}${id}`
  reLanucnUrl(url);
}

exports.reLanucnBooking = function () {
  reLanucnUrl(RELAUNCHBOOKING)
}

exports.redirectToUrl = function (url) {
  redirectUrl(url);
}

exports.reLanucnIndex = function (parmas) {
  if (parmas) {
    const {suid, business, brid, bid, sid, tid} = parmas;
    reLanucnUrl(`${REDIRECTINDEX}?suid=${suid}&business=${business}&brid=${brid}&bid=${bid}&sid=${sid}&tid=${tid}`);
  } else {
    reLanucnUrl(REDIRECTINDEX);
  }
}

exports.redirectToIndex = function (parmas) {
  if (parmas) {
    const {suid, business, brid, bid, sid, tid} = parmas;
    redirectUrl(`${REDIRECTINDEX}?suid=${suid}&business=${business}&brid=${brid}&bid=${bid}&sid=${sid}&tid=${tid}`);
  } else {
    redirectUrl(REDIRECTINDEX);
  }
}