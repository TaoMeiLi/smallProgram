import { assign } from '../../utils/object';

const app = getApp();

Component({
  mixins: [],
  data: {
    locale: app.locale.pay
  },
  props: {},
  didMount() {
    this.setData({
      rechargeMoney: this.props.rechargeMoney,
      chargeRules: this.props.chargeRules,
      rechargeMoney: this.props.rechargeMoney
    })
  },
  didUpdate(prevProps) {
    if (prevProps.rechargeMoney != this.props.rechargeMoney) {
      this.setData({
        rechargeMoney: this.props.rechargeMoney
      })
    }
  },
  didUnmount() {},
  methods: {
    _close(e) {
      this.props.onShowRuleModal();
    },

    /**
     * 选择充值规则
     */
    onCheckRule(e) {
      const rule = e.currentTarget.dataset.item;
      const { chargeRules } = this.data;
      let checkedRule = null;

      chargeRules.forEach(item => {
        if (item.charge_id == rule.charge_id) {
          item.isChecked = true;
          checkedRule = assign({}, item);
        } else {
          item.isChecked = false;
        }
      })
      console.log(checkedRule, 'checkedRule选中的储值规则')
      this.setData({
        chargeRules,
        checkedRule,
      })
    },

    /**
     * 去充值
     */
    goCharge(e) {
      let goStatus = e.currentTarget.dataset.status;
      if (goStatus == 2) {
        assign(app.globalData, { goStatus: goStatus, formId: e.detail.formId });
      }
      const { checkedRule, rechargeMoney, chargeStatus } = this.data;
      let params = {
        checkedRule: checkedRule,
        rechargeMoney: chargeStatus == 3 ? rechargeMoney * 100 : 0
      };

      this.props.onGoCharge(params);
    },

  }
});
