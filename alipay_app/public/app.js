import {initApp} from './app_session';

const locales = require('./locale');

App({
  globalData: {},
  locale:locales(),
  userInfo: null,
  onLaunch(options) {
    console.log('[app.js] onLaunch options:',options);
    initApp(options).then(parmas => {
     console.log('[app.js] onLaunch success:', parmas);
    }, err => {
      console.log('[app.js] onLaunch fail:', err);
    })
  },
  onShow(options) {
    console.log('[app.js] onShow options:', options);
  }
  
})
