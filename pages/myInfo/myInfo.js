// pages/myInfo/myInfo.js
/**获取用户信息 */
const app = getApp()
var GetMyInfo = function (that) {
  wx.request({
    url: 'http://127.0.0.1:6001/zhixing/weChatLoginController/queryUserInfo',
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    data: {
      userId: that.data.userId,
    },
    success: function (res) {
      if (res.data.success.valueOf("true")) {
        console.log("用户详细信息" + JSON.stringify(res));
        that.setData({
          userBasicInfo: res.data.result.userBasicInfo, 
          userClassesInfoList: res.data.result.userClassesInfoList, 
          askForLeaveInfoList: res.data.result.askForLeaveInfoList, 
          campusInfoList: res.data.result.campusInfoList, 
        });
      } else {
        wx.showToast({
          title: res.data.msg,
          icon: 'none',
          duration: 2000
        })
      }
    }
  })
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
      showClassesView: true,
      show: false,
      userBasicInfo:{},
      userClassesInfoList:[],
      askForLeaveInfoList:[],
      campusInfoList:[],
      userId:'',
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var userId = app.globalData.userId;
      this.setData({
        userId: userId,
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
    GetMyInfo(that);
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
  clickMyClassesInfo: function () {
    var that = this;
    var userClassesInfoListString = JSON.stringify(that.data.userClassesInfoList);
    wx.navigateTo({
      url: '../myInfoClasses/myInfoClasses?userClassesInfoListString=' + userClassesInfoListString,
    })
  },
  clickMyAskForLeave: function(){
    var that = this;
    var askForLeaveInfoListString = JSON.stringify(that.data.askForLeaveInfoList);
    wx.navigateTo({
      url: '../myInfoAskForLeave/myInfoAskForLeave?askForLeaveInfoListString=' + askForLeaveInfoListString,
    })
  },
  clickCampusInfo: function(){
    var that = this;
    var campusInfoListString = JSON.stringify(that.data.campusInfoList);
    wx.navigateTo({
      url: '../myInfoCampus/myInfoCampus?campusInfoListString=' + campusInfoListString,
    })
  }
})