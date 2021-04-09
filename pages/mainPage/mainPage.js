//mainPage.js
//获取应用实例
const app = getApp()
var GetTodayClassInfo = function (that) {
  wx.request({
    url: 'http://localhost:6001/zhixing/CourseInfoController/queryTodayClassInfo',
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    data: {
      aaaa:'1111',
    },
    success: function (res) {
      console.log("今日课程信息" + JSON.stringify(res));
      that.setData({
        todayClassArray: res.data.result,
      });
    },
    fail: function (e) {
      that.setData({
      })
    }
  })
}
Page({
  data: {
    todayClassArray: [],
    userName: '',
    userPhone: ''
  },
      /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      userName = options.userName;
      userPhone = options.userPhone;
      this.setData({
        todayClassArray: todayClassArray,
        });
    },
    /**
 * 生命周期函数--监听页面初次渲染完成
 */
onReady: function () {

},

/**
 * 生命周期函数--监听页面显示
 */
onShow: function () {
  var that = this;
  GetTodayClassInfo(that);
},

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  /**本周课程点击事件 */
  weekCourseBind: function () {
    var that = this;
    wx.navigateTo({
      url: '../course/course?userName=' + that.data.userName + "&userPhone=" + that.data.userPhone,
    })
  },
  tabChange(e) {
    console.log('tab change', e)
  }
});