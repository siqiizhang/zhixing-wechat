// pages/components/tabbar/tabbar.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    defaultShowIndex: { // 属性名-- 父组件传过来的数据
      type: Number, // 类型（必填），接受的类型包括：String, Number, Boolean, Object, Array,                      null（表示任意类型）
      value: 0 // 属性初始值（可选），如果未指定则会根据类型选择一个
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 注册事件
    myTabbarEvent: function (e) {
      var index = parseInt(e.currentTarget.dataset.index)
      this.setData({ 
        defaultShowIndex: index,
      })
      wx.navigateTo({
        url: e.currentTarget.dataset.url
  　　})
    }
  }
})
