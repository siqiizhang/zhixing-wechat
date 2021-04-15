// pages/components/modal.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    modalHidden: {
      type: Boolean,
      value: false
    }//这里定义了modalHidden属性，属性值可以在组件使用时指定.写法为modal-hidden  
  },

  /**
   * 组件的初始数据
   */
  data: {
    text:"text",//这是组件内部数据
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 这里放置自定义方法  
    modal_click_Hidden: function () {
      this.setData({
        modalHidden: true,
      })
    },
    // 确定  
    Sure: function (e) {
      //提交修改后的数据，返回成功信息
      console.log(this.data.text)
    },
    // 自定义组件与页面之间的数据通信
    groupClick: function (e){
      var courseInfoDetail = {}
      // 使用 triggerEvent 方法触发自定义组件事件，指定事件名、detail对象和事件选项
      this.triggerEvent('okEvent', {courseInfoDetail})
      this.setData({
        
      })
      }
  }
})
