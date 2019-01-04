/**
 * type: wgs84(GPS 坐标) || gcj02(国测局坐标)
 */
const locales = require('../locale');
const {location, placeorder} = locales();
const {compareDistance} = require('../app_requests');

const wxGetLocation = function () {
  return new Promise(function (resolve, reject) {
    wx.getLocation({
      type: 'wgs84', 
      success: function(res) {
        const {latitude, longitude} = res;
        resolve({
          latitude,
          longitude
        })
      },
      fail: function (res) {
        console.log('微信获取位置失败', res);
        resolve({
          latitude: null,
          longitude: null
        })
      }
    })
  })
}

const compareDistanceReq = function (parmas) {
  return new Promise(function (resolve, reject) {
    compareDistance(parmas, res => {
      resolve(res);
    })
  })
}

const openSetting = function() {
  return new Promise(function (resolve, reject) {
    wx.openSetting({
      success: (res) => {
        console.log(res, 'setting');
        resolve(res);
        /*
         * res.authSetting = {
         *   "scope.userInfo": true,
         *   "scope.userLocation": true
         * }
         */
      },
      fail: function (res) {
        reject(res)
      }
    })
  })
}

const compareUserLocation = function (parmas) {
  return new Promise(function (resolve, reject) {
    const {lat, lng, distance, sf} = parmas;
    if (lat && lng && distance && distance && distance > 0 && lat > 0 && lng > 0 && !sf) {
      console.log('门店设置了位置', parmas);
      wxGetLocation().then(result => {
        const {latitude, longitude} = result;
        console.log('获取用户地理位置', result);
        if (latitude && longitude) {
          compareDistanceReq({
            lat: latitude,
            lng: longitude,
            slat: lat,
            slng: lng,
          }).then(function(res) {
            console.log('比较位置', res);
            if (res.distance && res.distance > distance) {
              reject(1);
            } else {
              resolve();
            }
          })
        } else {
          reject(2);
        }
      })
    } else {
      resolve();
    }
  })
}

const locationErrorMsg = function (code) {
  const {locationTitle, getlocationfail, orderlocation} = placeorder;
  wx.showModal({
    title: locationTitle,
    content: code == location.OVER ? orderlocation : getlocationfail,
    showCancel: false,
    success: function(res) {
      if (res.confirm) {
        wx.reLaunch({
          url: `/pages/scan/scan?isScan=true`
        })
      } else if (res.cancel) {
        console.log('用户点击取消')
      }
    }
  })
}

module.exports = {
  wxGetLocation,
  compareDistanceReq,
  compareUserLocation,
  locationErrorMsg,
  openSetting
}