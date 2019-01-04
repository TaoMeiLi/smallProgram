const app = getApp();

Component({
  mixins: [],
  data: {
    locale: app.locale,
    isChecked: true, // 选择微信
  },
  props: {},
  didMount() {
    console.log(this.props.money,'moneymoneymoneymoneymoneymoney')
    this.setData({
      locale: app.locale,
      money: this.props.money,// 原价: 支付宝支付金额
      useMoney: this.props.useMoney,
      payMoney: this.props.payMoney, // 微信支付金额 = 订单金额-优惠券-积分-（储值）
      // memberPay: this.props.memberPay, // 会员支付：1:储值+积分+券true  2: 关闭false
      chargeStatus: this.props.chargeStatus,  //会员充值： 1:开启 2:关闭 3:智能推荐
      costCardMoney: this.props.costCardMoney,  // 使用储值支付金额
      balanceNotPay: this.props.balanceNotPay,  // 储值余额不足
      isCheckedCharge: this.props.isCheckedCharge, // 储值卡支付选中状态
      isCheckedWx: this.props.isCheckedWx,   //  微信支付选中状态
      vipPrice: this.props.vipPrice,
    })
    this._computeWx();
    
  },
  didUpdate(prevProps) {
    if(this.props) {
      if (this.props.payMoney != prevProps.payMoney) {
        this.setData({
          payMoney: this.props.payMoney
        })

        this._computeWx();
      }
      console.log(this.props.chargeStatus, this.props.isCheckedWx, this.props.memberPay,'chargeStatuschargeStatus')
      if (this.props.chargeStatus != prevProps.chargeStatus) {
        this.setData({
          chargeStatus: this.props.chargeStatus
        })
        this._computeWx();
      }

      if (this.props.costCardMoney != prevProps.costCardMoney) {
        this.setData({
          costCardMoney: this.props.costCardMoney
        })
        this._computeWx();
      }

      if (this.props.balanceNotPay.toString().length) {
        this.setData({
          balanceNotPay: this.props.balanceNotPay
        })
        this._computeWx();
      }
      if (this.props.isCheckedCharge.toString().length) {
        this.setData({
          isCheckedCharge: this.props.isCheckedCharge
        })
      }

      if (this.props.isCheckedWx.toString().length) {
        this.setData({
          isChecked: this.props.isCheckedWx,
          isCheckedWx: this.props.isCheckedWx
        })
        this._computeWx();
      }

      if(this.props.money) {
        this.setData({
          money:this.props.money
        })
      }
      
    }
  },
  didUnmount() {},
  methods: {
    selectWx() {
      this.props.onUpDataisChecked({ action: 'wx' });
    },

    _computeWx() {
      let { isChecked, payMoney, chargeStatus, costCardMoney, balanceNotPay, isCheckedCharge, isCheckedWx } = this.data,
        newWxMoney = payMoney > 0 ? payMoney : 0;

      if (chargeStatus == 3) {
        if (balanceNotPay) {
          newWxMoney = payMoney > 0 ? payMoney : 0;
          this.props.onUpDataisChecked({action: 'wx'})
        } else {  //余额充足
          if (isCheckedWx) {
            newWxMoney = payMoney > 0 ? payMoney : 0;

          } else {
            newWxMoney = 0;
          }
        }
      } else {

        if (payMoney > 0) {
          newWxMoney = isChecked ? payMoney : 0;
        } else {
          newWxMoney = 0;

        }


      }

      this.setData({
        wxMoney: newWxMoney,
      })

      this.props.onUseWx({ wxMoney: newWxMoney });
    },



  }
});
