// pages/authorization/authorization.js
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    //判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    getPhone:false,
    isHide: false,
    sessionKey:'',
    openid:'',
    phone:'',
    nickName:'',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this;
    // 查看是否授权
    wx.getSetting({
      success: function (res) {
        if (res.authSetting['scope.userInfo']) {
          wx.getUserInfo({
            success: function (res) {// 用户已经授权过,不需要显示授权页面,所以不需要改变 isHide 的值
              var nickName = JSON.parse(res.rawData).nickName;
              that.setData({
                nickName: nickName,
              });
              
              // 查询用户是否已经授权过手机号，如果已经授权过微信号，那么直接进入页面，没有则需要进行授权
              wx.request({
                url: 'http://127.0.0.1:6001/zhixing/weChatLoginController/queryUserInfoByWechat',
                method: 'POST',
                header: {
                  'content-type': 'application/json;charset=UTF-8'
                },
                data: {
                  wechatName: that.data.nickName,
                },
                success: function (res) {
                  if (res.data.success.valueOf("true")) {
                    var userStatus = res.data.userStatus;
                    if (userStatus == "0"){
                      that.setData({
                        getPhone: true,
                      });
                    } else if (userStatus == "1"){
                      app.globalData.userId = res.data.result.id;
                      wx.navigateTo({
                        url: '../mainPage/mainPage?userId=' + res.data.result.id + "&usersAllInfo=" + res.data.result,
                      })
                    }else{
                      wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                      })
                    }
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
          });
        } else {
          // 用户没有授权
          // 改变 isHide 的值，显示授权页面
          that.setData({
            isHide: true
          });
        }
      }
    });
  },
  getPhoneNumber: function (e) {
    var encryptedData = e.detail.encryptedData;
    var iv = e.detail.iv;
    var that = this;
    if (e.detail.errMsg == 'getPhoneNumber:fail user deny') { //用户点击拒绝
      wx.showModal({
        title: '手机号未授权',
        content: '如需正常使用小程序功能，请按确定后并重新点击【手机号授权】按钮，然后选择【允许】',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
          }
        }
      })
      return false;
    } else {
      wx.showLoading({
        title: 'Loading...',
      })
      wx.login({
        success: function (e) {
          wx.request({
            // 自行补上自己的 APPID 和 SECRET
            url: 'https://api.weixin.qq.com/sns/jscode2session?appid=wx6d650574fead9475&secret=0c0a83ef9565de210112e5d0c2882c82&js_code=' + e.code + '&grant_type=authorization_code',
            success: resIdAndKey => {
              console.log("用户的openid:" + resIdAndKey.data.openid);
              console.log("用户的session_key:" + resIdAndKey.data.session_key);
              that.setData({
                openid: resIdAndKey.data.openid,
                sessionKey: resIdAndKey.data.session_key,
              });
            }
          });
          wx.getUserInfo({
            success: function (res) {
              var nickName = JSON.parse(res.rawData).nickName;
              var avatarUrl = JSON.parse(res.rawData).avatarUrl;
              let promise = new Promise(function (resolve, reject) {
                wx.request({
                  url: 'http://127.0.0.1:6001/zhixing/wechatAuthController/getBindPhone',
                    method: 'POST',
                    header: {
                      'content-type': 'application/json;charset=UTF-8'
                    },
                    data: {
                      openId: that.data.openid,
                      encrypData: encryptedData,
                      iv: iv,
                      sessionKey: that.data.sessionKey,
                      nickName: nickName,
                      avatarUrl: avatarUrl,
                    },
                    success: function (res) {
                      if (res.data.success.valueOf("true")) {
                        var userId = res.data.result.id;
                        var usersAllInfo = res.data.result;
                        var phone = res.data.result.mobile;
                        app.globalData.userId = res.data.result.id;
                        that.setData({
                          phone: phone,
                        });
                        wx.navigateTo({
                          url: '../mainPage/mainPage?userId=' + userId + "&usersAllInfo=" + usersAllInfo,
                        })
                      } else {
                        wx.showToast({
                          title: res.data.msg,
                          icon: 'none',
                          duration: 2000
                        })
                      }
                    }
                })
              })
            },
            fail: function (e) {
              wx.hideLoading();
              debugger;
            }
          })
        }, fail: function () {
          wx.hideLoading();
          debugger;
        }
      })
    }
  },
  bindGetUserInfo: function (e) {
    if (e.detail.userInfo) {
      //用户按了允许授权按钮
      var that = this;
      // 获取到用户的信息了，打印到控制台上看下
      console.log("用户的信息如下：");
      console.log(e.detail.userInfo);
      //授权成功后,通过改变 isHide 的值，让实现页面显示出来，把授权页面隐藏起来
      that.setData({
        isHide: false,
        getPhone: true,
        userInfo: e.detail.userInfo
      });
    } else {
      //用户按了拒绝按钮
      wx.showModal({
        title: '警告',
        content: '您点击了拒绝授权，将无法进入小程序，请授权之后再进入!!!',
        showCancel: false,
        confirmText: '返回授权',
        success: function (res) {
          // 用户没有授权成功，不需要改变 isHide 的值
          if (res.confirm) {
            console.log('用户点击了“返回授权”');
          }
        }
      });
    }
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