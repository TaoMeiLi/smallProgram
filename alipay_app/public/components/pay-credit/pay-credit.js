import { word } from '../../utils/locale';
import { limit_decimal } from '../../utils/format';
const app = getApp();

Component({
  mixins: [],
  props: {
  },
  data: {
    locale: app.locale,
    creditMoney: 0,
    subtrackMoney: word(app.locale.pay.subtrack_money, 0),
    isChecked: false,
    credit_tip: ''
  },
  didMount() {
    this.setData({
      locale: app.locale,
      payMoney: this.props.payMoney,
      data: this.props.data,
    })
  },
  didUpdate(prevProps, prevData) {
    if(this.props) {
      if (this.props.data) {
        this._upData(this.props.data);
      }
      if (this.props.payMoney) {
        this.setData({
          payMoney: this.props.payMoney,
          creditMoney: this.props.data.total * this.props.data.ratio
        })
        this._computeCredit();
      }
    }
  },
  didUnmount() {},
  methods: {
    switchChange(e) { //是否使用积分
      const { value } = e.detail;
      this.setData({
        isChecked: value
      })
      this._computeCredit();
      this.props.onBseCredit({ creditMoney: value ? this.data.creditMoney : 0 });

    },
    _upData(newVal) {
      const { locale } = this.data;
      if (!newVal) return;
      let creditMoney = newVal.total * newVal.ratio;
      let pointScreenName = getApp().globalData.pointScreenName;
      this.setData({
        credit: newVal,
        creditMoney: creditMoney,
        subtrackMoney: word(locale.pay.subtrack_money, limit_decimal(creditMoney / 100)),
        credit_tip: word(locale.pay.credit_tip, newVal.total, newVal.ratio / 100),
        isChecked: false,
      })
      console.log(word(locale.pay.credit_tip, newVal.total, newVal.ratio / 100),'word(locale.pay.credit_tip, newVal.total, newVal.ratio / 100)')
    },
    _computeCredit() {
      let { isChecked, creditMoney, payMoney, locale } = this.data;
      if (payMoney < creditMoney) {
        creditMoney = payMoney;
      }
      if (payMoney <= 0) {
        creditMoney = 0;
      }
      this.setData({
        creditMoney: parseInt(creditMoney / 100) * 100,
        subtrackMoney: word(locale.pay.subtrack_money, limit_decimal(parseInt(creditMoney / 100))),
      })
      this.props.onBseCredit({ creditMoney: isChecked ? this.data.creditMoney : 0 });
      
    }
  }
});
