import { word } from '../../utils/locale';
import { limit_decimal } from '../../utils/format';
const { assign, omit } = require('../../utils/object');
const { getTime } = require('../../utils/time');
const app = getApp();

Component({
  mixins: [],
  props: {
    data: [],   //初始劵信息
    money: "",  //原始支付金额
    dishes: [], //菜品信息
    payData: {},
  },
  data: {
    locale: app.locale,
    money: 0, //原始支付金额
    payMoney: 0, //实付金额
    coupons: [], //优惠券信息
    isConfirm: false, //是否确定选择
    showCouponModal: false, //是否显示优惠券窗口
    selectedCoupons: [], //已选优惠券
    disabledCoupons: [], //不可用优惠券
    availableCoupons: [], //可用优惠券
    hasCoupons: word(app.locale.pay.coupons_tip, 0), //您有几张劵可用
    hasCouponsTip: word(app.locale.pay.coupons_tip1, 0),
    discountMoney: word(app.locale.pay.discountMoney, 0), //抵消多少钱
    scrollPos: 0,
    isChecked: false, // 优惠券开关
    maxCoupons: 0, // 最大优惠金额
    comfirmDiscountMoney: 0,// 选择的优惠券抵消金额
    flag: true,
  },
  didMount() {
    this._initCoupons(this.props.data);
    this.setData({
      locale: app.locale,
      data: this.props.data,   //初始劵信息
      money: this.props.money,  //原始支付金额
      dishes: this.props.dishes, //菜品信息
      payData: this.props.payData,
    })
  },
  didUpdate(prevProps, prevData) {
    if(prevProps != this.props) {
      this._initCoupons(this.props.data);
    }
    
  },
  didUnmount() {},
  methods: {
    /**
     * 是否显示优惠券modal
     */
    showCoupon() {
      this.setData({
        showCouponModal: !this.data.showCouponModal
      })
    },
    /**
     * 是否使用优惠券
     */
    switchChange(e) {
      const { value } = e.detail;
      this.setData({
        isChecked: value
      })
      this.confirmCoupons();
      if (this.data.flag) {
        this.setData({
          flag: false
        })
      }


    },
    /**
     * 初始化优惠券数据
     */
    _initCoupons(newCoupons, oldCoupons) { //初始化优惠券数据
      const { locale } = this.data;
      this.setData({
        selectedCoupons: [],
        isChecked: false
      })
      let coupons = [];
      let _me = this;

      if (!newCoupons.length) return;
      newCoupons.forEach(item => {
        if (item.coupon_id.length > 0) { //如果coupon_id数组大于1，代表这类劵里有多张
          for (let i = 0; i < item.coupon_id.length; i++) {
            let newItem = omit(item, "limitations", "coupon_id");
            const currentTime = new Date().getTime(),
              { effective_time, failure_time } = newItem,
              efTime = new Date(effective_time),
              faTime = new Date(failure_time);
            //后台给的劵都是生效的劵后台给的劵都是生效的劵
            let dateMsg = word(locale.pay.date_msg_ef, effective_time);
            if (currentTime < efTime) {
              dateMsg = word(locale.pay.date_msg_ef, effective_time);
            } else if (currentTime >= efTime && currentTime <= faTime) {
              dateMsg = word(locale.pay.date_msg_fa, failure_time);
            } else {
              dateMsg = word(locale.pay.date_msg_fa, failure_time);
            }
            newItem.dateMsg = dateMsg;

            newItem.id = item.coupon_id[i];
            newItem.index = i;
            //newItem.coupon_id = [];

            coupons.push(newItem);
          }
        }
      })

      console.log(coupons, 'coupons');

      this.setData({
        coupons: coupons,
        isConfirm: false,
      })
      this._initIcon();
      //this._checkEnableAmount();
      this._computeCoupons();
      _me.setData({
        hasCouponsTip: word(locale.pay.coupons_tip1, coupons.filter(item => !item.disabled).length)

      })
      this._defaultSelectCoupon();

    },
    /**
     * 初始化优惠券图标
     */
    _initIcon() {
      let { coupons, locale } = this.data;
      //let vouchers = coupons.filter(item => item.type == 1);
      let gifts = coupons.filter(item => item.type == 2);
      coupons = coupons.map((item, index) => {
        let seq = (index + 1) % 4;
        item.bg = "voucher_icon" + seq;
        return item;
      });
      gifts = gifts.map((item, index) => {
        let seq = (index + 1) % 3;
        item.icon = "gift_icon" + seq;
        return item;
      });
      this.setData({
        coupons: coupons,
        hasCouponsTip: word(locale.pay.coupons_tip1, coupons.filter(item => !item.disabled).length)

      })
    },
    /**
     * 计算劵的信息
     */
    _computeCoupons() {
      let { selectedCoupons, coupons } = this.data;
      let selectedCouponsIds = selectedCoupons.map(item => item.id);

      coupons = coupons.map(item => {
        if (selectedCouponsIds.indexOf(item.id) >= 0) {
          item.selected = true;
        } else {
          item.selected = false;
        }
        return item;
      })
      this._getDisabledCoupons();

      let normalCoupons = coupons.filter(item => !item.disabled),
        selectC = normalCoupons.filter(item => item.selected),
        noSelectC = normalCoupons.filter(item => !item.selected),
        disabledCoupons = coupons.filter(item => item.disabled);

      this.setData({
        availableCoupons: normalCoupons,
        coupons: selectC.concat(noSelectC).concat(disabledCoupons)
      })
    },
    /**
     * 计算不可用劵
     */
    _getDisabledCoupons() {
      let { selectedCoupons, coupons, isChecked, locale } = this.data,
        {money} = this.props,
        selectedCouponIds = selectedCoupons.map(item => item.id),
        disableArray = this._checkEnableAmount(),
        isHaveDishCoupon = selectedCoupons.filter(item => item.type == 2 && item.products && item.products.length).length;

      this._checkHavaRightToUseCoupons();
      let discountMoney = this._getSelectedCouponMoney(selectedCoupons);
      if (discountMoney >= money) { //金额已足够支付，则其他劵不可用
        coupons = coupons.map(item => {
          if (selectedCouponIds.indexOf(item.id) >= 0) {
            item.disabled = false;
          } else {
            item.disabled = true;
          }
          return item;
        })
      } else {
        coupons = coupons.map(coupon => {
          selectedCoupons.forEach(selectedCoupon => {
            if (coupon.template_id !== selectedCoupon.template_id) { //不是同模板劵
              if (selectedCoupon.mix_type == 0) { //可混用
                if (coupon.mix_type == 1) { //自己为不可混用
                  coupon.disabled = true;
                }
                if (coupon.mix_type == 2) {
                  let cLimitCoupon = coupon.cLimitCoupon;
                  if (cLimitCoupon.indexOf(selectedCoupon.template_id) >= 0) { //不在指定混用范围内
                    coupon.disabled = true;
                  }
                }
              }
              if (selectedCoupon.mix_type == 1) { //不可混用
                coupon.disabled = true;
              }
              if (selectedCoupon.mix_type == 2) { //部分可以混用
                let cLimitCoupon = selectedCoupon.cLimitCoupon;
                //console.log(selectedCoupon, cLimitCoupon, coupon.template_id,cLimitCoupon.indexOf(parseInt(coupon.template_id)), 'teste')
                if (cLimitCoupon.indexOf(parseInt(coupon.template_id)) >= 0) { //在指定混用范围内
                  coupon.disabled = true;
                }
                if (coupon.mix_type == 1) { //自己为不可混用
                  coupon.disabled = true;
                }
              }
              if (selectedCoupon.type == 2 && selectedCoupon.products && selectedCoupon.products.length) { //如果已选了一种类型的菜品劵
                if (coupon.type == 2 && coupon.products && coupon.products.length) { //则其他类型的菜品劵置灰
                  if (selectedCoupon.products[0] == coupon.products[0]) {
                    coupon.disabled = true;
                  }
                }
              }
            } else {//同模板劵 max_use
              let sameTemplate = selectedCoupons.filter(item => item.template_id == coupon.template_id);
              if (selectedCouponIds.indexOf(coupon.id) < 0) { //没在选择劵中            
                if (selectedCoupon.max_use) {
                  if (sameTemplate.length >= selectedCoupon.max_use) {//且同类劵已达到上限
                    coupon.disabled = true;
                  }
                }
              }
            }
          })
          return coupon;
        })
      }

      coupons = coupons.filter(item => !item.disabled)
        .filter(item => !item.selected)
        .map(item => {
          if (item.type == 2 && item.products && item.products.length) {
            //console.log(item, parseInt(discountMoney) + this._getCouponMoney(item), money, '菜品判断');
            if (parseInt(discountMoney) + this._getCouponMoney(item) > money) {
              item.disabled = true;
            }
          }
          if (isHaveDishCoupon > 0) { //如果有菜品卷，就不能超额
            //console.log(item, parseInt(discountMoney) + parseInt(item.money), money, '菜品判断');
            if (parseInt(discountMoney) + this._getCouponMoney(item) > money) {
              item.disabled = true;
            }
          }
          return item;
        })

      console.log(this.props.payData, 'payData');

      this.setData({
        coupons: coupons,
        hasCoupons: word(locale.pay.coupons_tip, coupons.filter(item => !item.disabled).length),
      })
      return disableArray;
    },
    /**
    * 检查劵金额是否满足要求
    */
    _checkEnableAmount() {
      let { coupons, isChecked, locale } = this.data,
        {money,dishes} = this.props,
        dishsno = dishes.map(item => item.dishsno); //返回所有订单菜品速记码
      let disableArray = [];
      coupons = coupons.map(item => {
        item.disabled = false;
        if (item.enable_amount > money) { //满多少钱可用
          item.disabled = true;
        } else {
          if (item.limit_type == 1) { //每满多少用一张劵
            item.useNum = parseInt(money / item.enable_amount);
          }
        }
        if (item.type == 2 && item.products && item.products.length) { //如果是菜品劵
          item.disabled = true;
          item.products.forEach(pro => {
            if (dishsno.indexOf(pro) >= 0) {
              //let dishNum = dishsno.filter(dno => dno == pro).length;
              const { cpqflag } = dishes.filter(dis => dis.dishsno == pro)[0];
              if (item.enable_amount <= money && cpqflag) {
                item.disabled = false;
                item.dishNum = dishes.filter(item => item.dishsno == pro)[0].count;
              }
            }
          })
        }
        return item;
      })

      coupons = coupons.map(item => {
        if (item.useNum != undefined) { //满额度多少可用一张，剩余的置灰
          if (item.index >= item.useNum) {
            item.disabled = true;
          }
        }
        if (item.dishNum != undefined) { //一个菜只能用一张卷
          if (item.index >= item.dishNum) {
            item.disabled = true;
          }
        }
        return item;
      })


      let enableCount = coupons.filter(item => !item.disabled).length; //过滤可用卷
      disableArray = coupons.filter(item => item.disabled);
      this.setData({
        hasCoupons: word(locale.pay.coupons_tip, enableCount),

      })
      return disableArray;
    },
    /** 
 * 选择优惠劵
*/
    selectCoupon(e) {
      let { selectedCoupons } = this.data;
      let selectedCoupon = e.currentTarget.dataset.coupon; //当前选择的劵
      if (!selectedCoupon) return;
      if (selectedCoupon.disabled) return; // 如果劵不可用，点击无效
      let selectedIndex = this._checkHaveCoupons(selectedCoupon);
      if (selectedIndex === -1) {
        selectedCoupons.push(selectedCoupon);
      } else {
        selectedCoupons.splice(selectedIndex, 1);
      }
      this.setData({
        selectedCoupons: selectedCoupons,
      })
      this._computeCoupons();
      // this.setData({
      //   scrollPos: 0
      // })
    },
    /**
   * 判断已选劵中是否有当前劵
   */
    _checkHaveCoupons(selectedCoupon) {
      const { id } = selectedCoupon;
      const { selectedCoupons } = this.data;
      let selectedIndex = -1;
      selectedCoupons.forEach((item, index) => {
        if (item.id == id) {
          selectedIndex = index;
        }
      })
      return selectedIndex;
    },
    /**
     * 是否为自定义面值菜品卷
     */
    _getCouponMoney(coupon) {
      const { dishes } = this.data;
      let money = coupon.money;
      if (coupon.type == 2 && coupon.products && coupon.products.length && coupon.is_diy_deno) {//如果菜品劵是自定义面值，抵消菜品的金额
        dishes.forEach(item => {
          if (item.dishsno == coupon.products[0]) {
            money = item.price;
          }
        })
      } else {
        money = coupon.money;
      }

      return money;
    },
    /**
     * 已选优惠券金额
     */
    _getSelectedCouponMoney(selectedCoupons) {
      let { dishes } = this.data,
        discountMoney = 0;
      if (selectedCoupons.length) {
        if (selectedCoupons.length == 1) {
          let couponOne = selectedCoupons[0];
          discountMoney = this._getCouponMoney(couponOne);
        } else {
          //console.log(selectedCoupons, 'selectedCoupons')
          discountMoney = selectedCoupons.reduce((sum, cou) => {
            //console.log(sum, cou, 'sum before')
            if (sum["money"] != undefined) {
              //console.log(sum, 'sum')
              return this._getCouponMoney(sum) + this._getCouponMoney(cou);
            }
            return sum + this._getCouponMoney(cou);
          });
          //console.log(discountMoney, 'discountMoney')
        }
      }
      return discountMoney;
    },
    /**
     * 确认优惠券
     */
    confirmCoupons() {
      this.setData({
        showCouponModal: false
      });
      let { selectedCoupons, dishes, isChecked, locale } = this.data,
        denoCoupons = selectedCoupons.filter(item => item.type == 1),
        giftCoupons = selectedCoupons.filter(item => item.type == 2),
        discountMoney = this._getSelectedCouponMoney(selectedCoupons),
        denoMoney = this._getSelectedCouponMoney(denoCoupons),
        giftMoney = this._getSelectedCouponMoney(giftCoupons);

      this.setData({
        isConfirm: selectedCoupons.length ? true : false,
        discountMoney: word(locale.pay.discountMoney, limit_decimal(discountMoney / 100)),
        comfirmDiscountMoney: discountMoney
      })

      let params = isChecked ? { discountMoney, selectedCoupons, denoCoupons, giftCoupons, denoMoney, giftMoney } : { discountMoney: 0, selectedCoupons: [], denoCoupons: [], giftCoupons: [], denoMoney: 0, giftMoney: 0 };


      this.props.onConfirmCoupon(params)
    },
    /**
     * 关闭优惠券弹窗
     */
    _close() {
      this.setData({
        showCouponModal: false
      });
    },
    /**
     * 默认选中最佳优惠券
     */
    _defaultSelectCoupon() {
      let _me = this,
        { availableCoupons } = this.data,
        selectedCoupon = availableCoupons[0];

      availableCoupons.sort((cou1, cou2) => {
        return cou2.money - cou1.money;
      })
      let dishCoupon = availableCoupons.filter(item => item.type == 2 && item.products && item.products.length && !item.is_diy_deno);
      if (dishCoupon.length) {
        selectedCoupon = dishCoupon[0];
      } else {
        selectedCoupon = availableCoupons[0];
      }

      let selectedItemDom = {
        currentTarget: {
          dataset: {
            coupon: selectedCoupon
          }
        }
      };
      this.selectCoupon(selectedItemDom);
      setTimeout(function() {
        _me.confirmCoupons();
      }, 100)

    },
    reachBottom() {
      console.log('reache bottom')
    },
    _checkHavaRightToUseCoupons() {
      const { djqflag, cpqflag } = this.props.payData;
      let { coupons } = this.data;
      coupons = coupons.map(item => {
        if (!djqflag) {
          if (item.type == 1) item.disabled = true;
        }
        if (!cpqflag) {
          if (item.type == 2) item.disabled = true;
        }
        return item;
      })
      console.log(djqflag, cpqflag, 'flag')
    }

  }
});
