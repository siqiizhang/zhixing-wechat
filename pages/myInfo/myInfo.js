// pages/myInfo/myInfo.js
/**获取用户信息 */
var GetMyInfo = function (that) {
  wx.request({
    url: 'http://192.168.43.232:6001/zhixing/user/queryUserInfo',
    method: 'POST',
    header: {
      'content-type': 'application/json;charset=UTF-8'
    },
    data: {
      aaaa:'1111',
    },
    success: function (res) {
      console.log("用户信息" + JSON.stringify(res));
      var myInfo = res.data.result;
      that.setData({
        myInfo: myInfo, 
      });
    },
    fail: function (e) {
      
    }
  })
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
      myInfo:{},
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      this.setData({
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
})