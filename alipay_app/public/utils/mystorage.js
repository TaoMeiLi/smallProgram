exports.getMyStorageSync = (key) => {
  try {
    let value = my.getStorageSync({ key: `${key}` });
    if (value) {
      return value.data;
    }
  } catch (e) {
    console.log(e, 'getMyStorageSync');
  }
}

exports.setMyStorageSync = (key, data) => {
  try {
    my.setStorageSync({
      key: `${key}`,
      data,
      success: function (res) {
        my.alert({content: 'success!'});
      },
      fail: function(res){
        my.alert({content: res.errorMessage});
      }
    });
  } catch (e) {    
    console.log(e, 'setMyStorageSync')
  }
}

exports.clearStorageSync = (key) => {
  try {
    my.removeStorageSync({
      key: `${key}`,
      success: function(){
        my.alert({content: '删除成功'});
      }
    });
  } catch (e) {
    console.log(e, 'clearStorageSync');
  }
}

exports.filterStorageKeys = (key) => {
  try {
    const res = my.getStorageInfoSync();
    const keys = res.keys;
    const _keys = keys.filter(k => {
      return k.indexOf(key) >= 0;
    })
    return _keys;
  } catch (e) {
    console.log(e, 'clearStorageSync');
  }
}