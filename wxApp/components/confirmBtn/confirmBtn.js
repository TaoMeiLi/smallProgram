// components/confirmBtn/confirmBtn.js
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    yesText: {
      type: String,
      value: '完成',
      observer: 'setYesBtnText'
    },
    cancelText: {
      type: String,
      value: '隐藏',
      observer: 'setCancelBtnText'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    cancelText: '',
    yesText: '',
  },

  /**
   * 组件的方法列表
   */
  methods: {
    setYesBtnText(newVal,oldVal) {
      this.setData({
        yesText: newVal
      })
    },
    setCancelBtnText(newVal,oldVal) {
      this.setData({
        cancelText: newVal
      })
    }
  }
})
