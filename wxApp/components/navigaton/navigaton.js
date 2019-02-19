// components/navigaton/navigaton.js
const backImg = '<';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    title: String,
    isback: {
      type: Boolean,
      value: true,
      observer: function(newVal,oldVal) {
        console.log(newVal,'newVal')
        this.setData({
          isback: newVal
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    backImg: backImg,
    isback: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    backBtn(){
      console.log(11)
      wx.navigateBack({
        delta:1
      })
    }
  }
})
