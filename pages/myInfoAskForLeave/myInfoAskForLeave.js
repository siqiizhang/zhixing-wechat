// pages/myInfoAskForLeave/myInfoAskForLeave.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    askForLeaveInfoList: [{ "askForLeaveStatus": "请假待审批", "classesName": "班级一", "askForLeaveRemark": "", "classesId": "1", "headTeacherId": "1", "classesTime": "00:00:00-12:10:20", "studentName": "张思齐", "classesDate": "", "headTeacherName": "教师一", "askForLeaveStatusColor": "yellow" }],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    var askForLeaveInfoList = JSON.parse(options.askForLeaveInfoListString);
    that.setData({
      askForLeaveInfoList: askForLeaveInfoList,
    });
    console.log("获取请假信息：" + JSON.stringify(this.data.askForLeaveInfoList));
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

  }
})