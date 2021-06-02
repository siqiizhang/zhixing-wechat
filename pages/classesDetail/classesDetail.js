// pages/classesDetail/classesDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askForLeaveReason: "",
    classesInfoDetail: "",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var getClassesInfoDetail = JSON.parse(options.classesInfoDetail);
    this.setData({
      classesInfoDetail: getClassesInfoDetail,
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

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  bind: function (e) {
    this.setData({
      askForLeaveReason: e.detail.value
    });
  },
  /**请假 */
  askForLeave: function (e) {
    /**获取请假原因，校验是否填写*/
    var getAskForLeaveReason = this.data.askForLeaveReason;
    var userId = this.data.classesInfoDetail.userId;
    var classesDate = this.data.classesInfoDetail.classesDate;
    var classesTime = this.data.classesInfoDetail.classesTime;
    var classesId = this.data.classesInfoDetail.classesId;
    if (getAskForLeaveReason != "") {
      wx.showModal({
        title: '提示',
        content: '确认要请假?',
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
            wx.request({
              url: 'http://127.0.0.1:6001/zhixing/courseInfoController/leaveCourse',
              method: 'POST',
              header: {
                'content-type': 'application/json;charset=UTF-8'
              },
              data: {
                userId: userId,//用户ID
                classesDate: classesDate,//上课日期
                classesTime: classesTime,//上课时间
                classesId: classesId,//班级ID
                askForLeaveReason: getAskForLeaveReason//请假原因
              },
              success: function (res) {
                wx.showToast({
                  title: res.data.msg,
                  icon: 'none',
                  duration: 2000
                });
              }
            })
          } else if (res.cancel) {
            console.log('用户点击取消')
          }
        }
      })
    } else {
      wx.showToast({
        title: '请假原因没有填写！',
        icon: 'none',
        duration: 2000
      })
    }
  }
})