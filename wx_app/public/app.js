const { assign } = require('utils/object');
const { promisify } = require('utils/api');
const { parseQuery } = require('utils/format');
const { 
  setIndexParams, 
  getIndexParams, 
  setLaunchParams,
  setHide, 
  getHide,
  removeHide,
  getWxmap
} = require('./reducer/storage');
const { 
  relaunchScan,
} =require('./reducer/toroute'); 
const appSession = require('./app_session');
const locale = require('./locale');
let _app = null;
//app.js
App({
  locale: locale(),
  requesting: false,
  globalData: {},
  version: '2',

  _promisify() {
    const keys = Object.keys(wx)
    .filter(key=>typeof wx[key]==='function')
    .filter(key=>!/Sync$/.test(key));
    wx.p = {};
    keys.forEach(method=>wx.p[method]=promisify(wx[method]));
  },

  onLaunch(launchParams) {
    // console.log('app.js onLaunch', launchParams);
    // this._promisify();
    // _app = this;
    // setLaunchParams(launchParams);
    // appSession.checkAfterAppLaunch(_app, launchParams);
  },

  onShow(showParams) {
    // console.log('app onShow', 'start', showParams, getWxmap(), getCurrentPages().map(p => p.route));
    
    // setLaunchParams(showParams);
    // this.appInit(showParams);

    // if (_app && _app.globalData) {
    //   assign(_app.globalData, showParams);
    // }
    
    // if (showParams.path.indexOf("scan")>=0) {
    //   removeHide();
    // }
    
    // if(getHide()) {
    //   if (showParams.scene != '1014' && !getWxmap()) {
    //     if (showParams.scene != '1043') {
    //       console.log(getHide(), "!=1014 to scan v10", showParams, showParams.scene)
    //       relaunchScan();
    //     }
    //   }   
    // }

    // removeHide();
  },

  onHide(option) {
    // console.log(_app.globalData.notNeedHide, 'onHide Coming... App');
    // console.log(_app.globalData,'----------');

    // if(!_app.globalData.notNeedHide) {
    //   console.log(option, "onhide scan");
    //   //setHide(true);
    // } 
  },

  appInit(params) {
    if (params) {
      const {referrerInfo, query} = params;
      if (referrerInfo && referrerInfo.extraData && referrerInfo.extraData.suid) {
        this.setIndexParmsync(referrerInfo.extraData);
      }
      if (query && query.q) {
        let qStr = decodeURIComponent(query.q);
        qStr = parseQuery(qStr.substring(qStr.indexOf('?')+ 1, qStr.length));
        this.setIndexParmsync(qStr);
      }

      console.log('[app.js] setIndexParmsync: ', getIndexParams())
    }
  },

  setIndexParmsync(data) {
    setIndexParams(data);
    removeHide();
  },

  /**
   * 检查url的query是否符合规则
   */
  checkQuery(querystr) {
    var _result = false;
    if ('suid' in querystr
      && 'business' in querystr
      && querystr.business == 2
      && 'bid' in querystr
      && 'brid' in querystr
      && 'tid' in querystr) {
      _result = true;
    }
    return _result;
  },

  alert(msg, callback = null) {
    wx.p.showModal({
      title: '',
      content: String(msg),
      showCancel: false
    }).then(res=>{
      if (res.confirm && callback) {
        callback();
      }
    })
  },

  showMessagePage(errcode = 0, errmsg = '', buttons = [], iconUrl = null) {
    const c = parseInt(errcode);
    if (isNaN(c)) throw new Error('wrong errcode', errcode);

    const m = encodeURIComponent(errmsg);

    if (buttons
      && (typeof buttons === 'object')
      && !Array.isArray(buttons)) {
      buttons = [buttons];
    }

    if (buttons && buttons.length && !buttons[0].hasOwnProperty('label'))
      throw new Error('wrong buttons', buttons);

    let url = `/pages/msg/msg?code=${c}&message=${m}`;
    if (buttons && buttons.length) {
      url += `&buttons=${encodeURIComponent(JSON.stringify(buttons))}`;
    }
    if (iconUrl) {
      url += `&icon=${iconUrl}`;
    }

    wx.navigateTo({ url });
  },

  //普通请求前校验失败后的重新登录
  reLogin() {
    appSession.onSessionFail();
  },

  //用户已经授权后(由userinfo页面调用)
  onUserinfoGot(userinfo) {
    appSession.onUserinfoGot(userinfo);
  }
})