import { postCharge, getChargeResult } from '../../app_requests';
import { word } from '../../utils/locale';
import { assign } from '../../utils/object';
const app = getApp();

Component({
  mixins: [],
  props: {
    // payMoney: 0, // 减去优惠券、积分后 还需要支付的金额
    // cardBalance: 0, // 会员卡余额
    // cid: '', 
    // orderId: '',            // orderId
    // openCharge: false,      // 是否开启充值
    // chargeRules: [],        // 储值规则
    // money: 0,               // 订单金额
    // openPayMethod: true,    // 是否开启支付通道，（储值充值支付通道同小程序支付通道。）
    // vipPrice: 0,            // 会员价：储值支付金额
    // chargeStatus: 1,   // 会员充值： 1:开启 2:关闭 3:智能推荐
    // copywriting: '',    // 推荐文案
    // multiple: 1.1,       // 订单金额倍数,
    // total:0,
    // payAmount: 0, // 订单支付金额
  },  
  data: {
    locale: app.locale,
    isChecked: true,        // 选择储值
    costCardMoney: 0,       // 抵扣会员卡金额
    showRuleModal: false,
    isGoCharge: true,
  },
  didMount() {
    this.setData({
      locale: app.locale,
      isChecked: this.props.isCheckedCharge,
      isCheckedWx: this.props.isCheckedWx,
      balanceNotPay: this.props.balanceNotPay,
      payMoney: this.props.payMoney,
      cardBalance: this.props.cardBalance, // 会员卡余额
      cid: this.props.cid,
      orderId: this.props.orderId,            // orderId
      openCharge: this.props.openCharge,      // 是否开启充值
      chargeRules: this.props.chargeRules,        // 储值规则
      money: this.props.money,               // 订单金额
      openPayMethod: this.props.openPayMethod,    // 是否开启支付通道，（储值充值支付通道同小程序支付通道。）
      vipPrice: this.props.vipPrice ,            // 会员价：储值支付金额
      chargeStatus: this.props.chargeStatus,   // 会员充值： 1:开启 2:关闭 3:智能推荐
      copywriting: this.props.copywriting,    // 推荐文案
      multiple: this.props.multiple,       // 订单金额倍数,
      total: this.props.total,
      payAmount: this.props.payAmount, // 订单支付金额
    })
    setTimeout(()=>{
      this._getPhoneSystem();
      this._computePrepaid();
      this.getPreviewRules();
      this.getSignPreviewRules();
    },0)
    

  },
  didUpdate(prevProps, prevData) {
    if(this.props) {
      if (this.props.payMoney != prevProps.payMoney) { // 减去优惠券、积分后 还需要支付的金额
        this.setData({
          payMoney: this.props.payMoney
        })
        this._computePrepaid(this.props.payMoney);
      }
      if (this.props.cardBalance != prevProps.cardBalance) {// 会员卡余额
        this.setData({
          cardBalance: this.props.cardBalance,
          isChecked: true
        })

        this._computePrepaid();
      }

      if (this.props.cid != prevProps.cid) {
        this.setData({
          cid: this.props.cid,
          isChecked: true
        })
      }

      if (this.props.isCheckedCharge != prevProps.isCheckedCharge) {// 储值卡支付选中状态
        this.setData({
          isChecked: this.props.isCheckedCharge
        })
        this._computePrepaid();
      }

      if (this.props.isCheckedWx != prevProps.isCheckedWx) {//  微信支付选中状态
        this.setData({
          isCheckedWx: this.props.isCheckedWx
        })
      }

      if (this.props.balanceNotPay.toString().length) {// 余额不足
        console.log(this.props.balanceNotPay,'balanceNotPay2')
        this.setData({
          balanceNotPay: this.props.balanceNotPay
        })
        this._computePrepaid();
      }

      if (this.props.total != prevProps.total) {
        this.setData({
          total: this.props.total
        })
      }
    }
  },
  didUnmount() {},
  
  methods: {
    /**
     * 选择储值支付
     */
    selectPrepaid() {
      this.props.onUpDataisChecked({ action: 'prepaid' });
    },

    /**
     * 计算支付价格
     */
    _computePrepaid(pm) {
      const { cardBalance, isChecked, chargeStatus, balanceNotPay, isCheckedCharge, vipPrice, money } = this.data;
      let payMoney = pm ? pm : this.data.payMoney;
      console.log(payMoney, pm, isCheckedCharge, balanceNotPay,"需要储值支付金额");

      let newCostCardMoney = 0;
      if (isChecked) {
        if (chargeStatus == 3) {
          if (balanceNotPay) { // 余额不足
            newCostCardMoney = 0;
          } else {
            if (payMoney > 0) {
              newCostCardMoney = payMoney > 0 ? payMoney : 0;
            } else {
              newCostCardMoney = 0;
            }
          }
        } else {

          if (payMoney > 0) {
            newCostCardMoney = payMoney > cardBalance ? cardBalance : payMoney;
          } else {
            newCostCardMoney = 0;
          }

        }
      } else if (!this.data.isCheckedWx && !this.data.isCheckedCharge) {
        if (!balanceNotPay) {
          if (chargeStatus == 3) {
            if (payMoney > 0) {
              newCostCardMoney = payMoney > cardBalance ? cardBalance : payMoney;
            } else {
              newCostCardMoney = 0;
            }
          } else {
            if (payMoney > 0) {
              newCostCardMoney = payMoney > cardBalance ? cardBalance : payMoney;
            } else {
              newCostCardMoney = 0;
            }
          }
        } else {
          if (chargeStatus == 1 || chargeStatus == 2) {
            if (payMoney > 0) {
              // newCostCardMoney = payMoney > cardBalance ? cardBalance : payMoney;
              newCostCardMoney = 0;

            } else {
              newCostCardMoney = 0;
            }
          }
        }

      }

      this.setData({
        costCardMoney: newCostCardMoney,
      })

      this.props.onUsePrepaidCard({ costCardMoney: newCostCardMoney });
    },
    /**
     * 充值规则根据充值金额排序
     */
    _sortFormat() {
      const chargeRules = assign([], this.data.chargeRules);
      let newChargeRules = chargeRules.sort((item1, item2) => {
        return item1.rechargeAmount - item2.rechargeAmount;
      });
      return newChargeRules;
    },
    /**
     * 计算获得要展示的储值规则
     */
    getPreviewRules() {
      const { chargeRules, money } = this.data;
      console.log(chargeRules)
      if (!chargeRules.length) return;

      let newChargeRules = this._sortFormat(),
        previewRules = {};

      for (let i = 0; i < newChargeRules.length; i++) {
        if (newChargeRules[i].rechargeAmount >= money) {
          previewRules = newChargeRules[i];
          break;
        } else {
          previewRules = newChargeRules[newChargeRules.length - 1];
        }
      }

      let previewRulesText = this.getMergeRules(previewRules);

      this.setData({
        previewRules: previewRules,
        previewRulesText: previewRulesText,
      })
    },
    /**
     * 合并赠送金额+积分+券
     */
    getMergeRules(previewRules) {
      const { locale } = this.data;
      let text1 = previewRules.rechargeAmount ? word(locale.pay.charge_tip1, previewRules.rechargeAmount / 100) : '',
        text2 = previewRules.giveMoney || previewRules.giveCouponMoney || previewRules.giveCredit ? word(locale.pay.charge_tip2, ((previewRules.giveMoney + previewRules.giveCouponMoney) / 100) + previewRules.giveCredit) : '',
        text3 = previewRules.giveMoney ? word(locale.pay.charge_tip3, previewRules.giveMoney / 100) : '',
        text4 = previewRules.giveCredit ? word(locale.pay.charge_tip4, previewRules.giveCredit) : '',
        text5 = previewRules.giveCouponMoney ? word(locale.pay.charge_tip5, previewRules.giveCouponMoney / 100) : '',
        text_begin = text2 || text4 || text5 ? locale.pay.charge_tip_begin : '',
        text_close = text_begin ? locale.pay.charge_tip_close : '',
        add1 = text4 && text3 ? locale.pay.charge_tip_add : '',
        add2 = (text3 || text4) && text5 ? locale.pay.charge_tip_add : '';

      let previewRulesText = text1 + text2 + text_begin + text3 + add1 + text4 + add2 + text5 + text_close;

      return previewRulesText
    },
    /**
     * 标记展示的储值规则，在充值规则列表页将改规则默认选中
     */
    getSignPreviewRules() {
      const { chargeRules, previewRules, locale } = this.data;
      let newChargeRules = assign([], chargeRules);
      // console.log(newChargeRules,'newChargeRules')
      newChargeRules.forEach(item => {
        let rulesText2 = this.getMergeRules(item).split('(')[1];
        item.rulesText1 = item.giveMoney || item.giveCouponMoney || item.giveCredit ? word(locale.pay.rule_give_money, ((item.giveMoney + item.giveCouponMoney) / 100 + item.giveCredit)) : '';
        item.rulesText2 = rulesText2 ? `(${rulesText2}` : '';
        if (item.charge_id === previewRules.charge_id) {
          item.isChecked = true;
        }
      })
      this.setData({
        chargeRules: newChargeRules
      })
    },

    /**
     * 打开充值规则页面
     */
    _showRuleModal(e) {
      const { showRuleModal } = this.data;
      this.setData({
        showRuleModal: !showRuleModal
      })
    },

    /**
     * 去充值
     */
    _goCharge(eventDetail, eventOption) {
      if (!this.data.isGoCharge) return;
      this.setData({
        isGoCharge: false
      })

      const { cid, orderId, chargeStatus, locale } = this.data;
      let { checkedRule, rechargeMoney } = eventDetail.detail,
        _me = this;
      if (!checkedRule) {
        checkedRule = this.data.previewRules;
      }
      let rechargeAmount = checkedRule.rechargeAmount;
      if (chargeStatus == 3) {
        rechargeAmount = rechargeMoney;
      }
      let chargeParam = {
        orderId: orderId, // 订单id
        cid: cid, // 卡id
        chargeId: chargeStatus == 3 ? "" : checkedRule.charge_id, // 规则id
        rechargeAmount: rechargeAmount, // 充值金额
      };
      let goStatus = app.globalData.goStatus;
      if (goStatus == 2) {
        assign(app.globalData, { chargeAndPayParam: chargeParam });
      }
      if (!this.data.openPayMethod) { //是否开启了支付通道
        my.showModal({
          content: locale.pay.openPayMethod,
          showCancel: false,
          success(res) {
            if (res.confirm) {
              my.navigateBack({
                delta: 1
              })
            }
          }
        })
      } else {
        my.hideLoading();
        setTimeout(() => {
          postCharge({ data: chargeParam }, rst => {
            _me.setData({
              chargeOrderId: rst.outTradeNo,
              isGoCharge: true
            })
            let params = { rst: rst, chargeOrderId: rst.outTradeNo };
            console.log(params, 'params')

            _me.props.onAliPay(params);
          })
        }, 500)

      }


    },
    _getPhoneSystem() {
      let { phoneSystem } = app.globalData;

      this.setData({
        phoneSystemType: phoneSystem ? phoneSystem.split(' ')[0] : null
      })
    }
  }
});
