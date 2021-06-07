//mainPage.js
//获取应用实例
const app = getApp()
var GetTodayClassInfo = function (that) {
  wx.request({
    url: 'http://127.0.0.1:6001/zhixing/courseInfoController/queryTodayClassInfo',
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    data: {
      userId: that.data.userId,
    },
    success: function (res) {
      if (res.data.success.valueOf("true")) {
        var todayClassArray = res.data.result;
        console.log("今日课程信息" + JSON.stringify(res));
        that.setData({
          todayClassArray: todayClassArray,
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    },
  })
}
Page({
  data: {
    todayClassArray: [],
    userId: '',
    usersAllInfo: ''
  },
      /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var userId = app.globalData.userId;
      var usersAllInfo = options.usersAllInfo;
      this.setData({
          userId: userId,
          usersAllInfo : usersAllInfo,
        });
      console.log("赋值结束，查看结果");
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
  /**点击今日上课触发该事件 */
  showClassesInfo : function(e){
    let index = e.currentTarget.dataset.index;
    var that = this;
    var classesInfo = that.data.todayClassArray[index];
  },
  /**本周课程点击事件 */
  weekClasseseBind: function () {
    var that = this;
    wx.navigateTo({
      url: '../classes/classes?userId=' + that.data.userId + "&usersAllInfo=" + that.data.usersAllInfo,
    })
  },
  /**签到 */
  classesSignIn: function(e){
    console.log("签到");
    var that = this;
    wx.request({
      url: 'http://127.0.0.1:6001/zhixing/courseInfoController/classesSignIn',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: {
        studentId: e.currentTarget.dataset.studentid,
        classesId: e.currentTarget.dataset.classesid,
        timeTablesId: e.currentTarget.dataset.timetablesid,
        classesDate: e.currentTarget.dataset.classesdate,
        classesTime: e.currentTarget.dataset.classestime,
      },
      success: function (res) {
        if (res.data.success.valueOf("true")) {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          });
          GetTodayClassInfo(that);
        } else {
          wx.showToast({
            title: res.data.msg,
            icon: 'none',
            duration: 2000
          })
        }
      },
    })
  }
});