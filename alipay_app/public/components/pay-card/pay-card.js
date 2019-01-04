import { assign } from '../../utils/object';

const app = getApp();
Component({
  mixins: [],
  props: {
    
  },
  data: {
    locale: app.locale,
    swiperIndex: 0,
  },
  didMount() {
    this.setData({
      locale: app.locale,
      data: this.props.data,
      money: this.props.money,
      vipPrice: this.props.vipPrice,
    })
  },
  didUpdate(prevProps) {
    
  },
  didUnmount() {},
  methods: {
    // 切换卡
    bindchange(e) {
      let index = e.detail.current,
        data = this.data.data,
        selectedItem = {};
      if (data.length) {
        data.forEach(item => {
          item.checked = false;
        });
        data[index].checked = true;
        selectedItem = data[index];
      }

      this.setData({
        swiperIndex: index,
        data: data,
      })
      let NewBalanceNotPay = true;
      if (this.data.vipPrice) {
        NewBalanceNotPay = selectedItem.max_consume_money < this.data.vipPrice ? true : false;
      } else {
        NewBalanceNotPay = selectedItem.max_consume_money < this.data.money ? true : false;
      }
      let parms = assign(selectedItem, { balanceNotPay: NewBalanceNotPay });
      this.props.onChangeCard(parms);
    },
  },
});
