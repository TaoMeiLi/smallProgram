import locales from  '../../locale';
const locale = locales();
Page({
  data: {
    isLoading: true,
    locale: locale.scan,
    user: {
      avatarUrl: '',
      name: 'xxx',
    }
  },
  onLoad() {},
  sanCode() {
    console.log('[scan.js] scan start');
    my.scan({
      type: 'qr',
      success: (res) => {
        console.log(res, 'scan');
      },
    });
  },
});
