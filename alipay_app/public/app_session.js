/**
 * 首次获取授权：
 * 1: getAuthCode =》 authcode 
 * 2: authcode => login => success
 * 3: getAuthUserInfo => userInfo
 * 4: 存到前端
 * 再次登陆，判断用户信息不用授权
 * 1: http => errcode => 再次授权
 * 2: 重复上述步骤
 */
import {login} from './app_requests';
import {setMyStorageSync, getMyStorageSync} from './utils/mystorage';
import {LOGINSTATE, USERINFO} from './constant';

let params = null;

/**
 * 获取授权和用户信息
 */
const initApp = (data) => {
  return new Promise(function (resolve, reject) {
    const loginState = getMyStorageSync(LOGINSTATE);
    const userInfo = getMyStorageSync(USERINFO);
    if (!!loginState && !!userInfo) {
      console.log('[session.js] checkUserInfo:', loginState, userInfo);
      params = {...params, ...loginState, ...userInfo, ...data};
      resolve(params);
      return;
    }
    getUserInfo().then((results) => {
      resolve(results);
    }, err => {
      console.log('[session.js] getUserInfo fail:', err);
      reject(err);
    });
  })
}

/**
 * 授权code存储到后端
 * @param {*} code 
 */
const authCodeLogin = (code) => {
  return new Promise(function (resolve, reject) {
    login(code, res => {
      console.log('session.js login res:', res);
      //存到全局数据里面，和缓存中
      resolve(res);
    })
  })
  
}

const getUserInfo = () => {
  return new Promise(function (resolve, reject) {
    my.getAuthCode({
      scopes: 'auth_base', //auth_base 静默 auth_user 主动
      success: (res) => {
        console.log('[session.js] getAuthCode res:', res);
        authCodeLogin(res).then(result => {
          setInfoStorage(LOGINSTATE, result);
          my.getAuthUserInfo({
            success: (userInfo) => {
              console.log('[session.js] getAuthUserInfo res:', userInfo)
              //存到全局数据里，和缓存中
              setInfoStorage(USERINFO, userInfo);
              resolve(params);
            },
            fail: (err) => {
              reject(err);
            }
          });
        });
      },
      fail: (err) => {
        reject(err);
      }
    });
  })
  
}



/**
 * 把用户数据存到缓存中
 */
const setInfoStorage =(key, result) => {
  params = {...params, ...result};
  setMyStorageSync(key, result);
}



module.exports = {
  initApp,
  getUserInfo
}