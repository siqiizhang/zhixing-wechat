// pages/classes/classes.js
const util = require('../../utils/util.js')
var weeksArray = [];
var GetClassesInfo = function (that) {
    wx.request({
      url: 'http://127.0.0.1:6001/zhixing/courseInfoController/queryThisWeekCourseInfo',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: {
        userId: that.data.userId,
      },
      success: function (res) {
        if (res.data.success.valueOf("true")) {
          console.log("本周课程信息" + JSON.stringify(res));
          var sList = res.data.result;
          var sch_listData = dealData(sList);
          that.setData({
            sch_listData: sch_listData,
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
      show: false,
      sch_listData: [],
      dateArray: [],
      classesInfoDetail:{},
      userId: '',
      usersAllInfo: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var scheduleList = [];
      var daysArray = getSevenDays();
      var sch_listData = dealData(scheduleList);
      this.setData({
        userId: options.userId,
        usersAllInfo: options.usersAllInfo,
        dateArray: daysArray,
        sch_listData: sch_listData,
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
    GetClassesInfo(that);
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
    // 接受triggerEvent 方法触发的自定义组件事件来更新同步数据
    okEvent : function (e) {
      console.log(e)
      this.setData({
        classesInfoDetail: this.data.classesInfoDetail
      })
    },
  /**点击课程弹出框——取消 */
  cancelClassesInfo: function(e){
    this.setData({show:false})
  },
  /**点击课程弹出框——确定按钮*/
  confirmClassesInfo: function(e){
    this.setData({show:false})
  },
  /**
   * 点击课程，展示课程详情
   */
  clickClasses: function (e) {
    var that=this;
    var classesInfoDetail = JSON.stringify(e.currentTarget.dataset.classesinfo);
    wx.navigateTo({
      url: '../classesDetail/classesDetail?classesInfoDetail=' + classesInfoDetail,
    })
  },
})

var getSevenDays = function () {
  var daysArray = [];
  var dayDict = {};
  var weekStr = '';
  var weekNum = '';

  var date = new Date(); //当前日期
  var dateWeek = new Date().getDay(); //当前为本周的周几
  var now = new Date();
  var nowYear = now.getYear(); //当前年 
  var nowMonth = now.getMonth(); //当前月 
  var nowDay = now.getDate(); //当前日 
  var nowDayOfWeek = now.getDay(); //今天是本周的第几天 
  nowYear += (nowYear < 2000) ? 1900 : 0;
  var dateStart = formatDate(new Date(nowYear, nowMonth, nowDay - nowDayOfWeek + 1 + 0));//本周开始日期
  for (var i = 0; i < 7; i++) {
    var dayStr = formatDate(new Date(new Date(dateStart).getTime() + i*24 * 60 * 60 * 1000));
    var dateTextM = new Date(dayStr).getMonth() + 1;
    var dateTextD = new Date(dayStr).getDate();
    var dateText = dateTextM + "-" + dateTextD;
    dayDict = { "date_text": dateText, "weekName": getWeekByDay(dayStr), "weekNum": i };
    console.log("date_text:" + dateText + "weekName:" + getWeekByDay(dayStr) + "weekNum:" + i)
    daysArray.push(dayDict);
  }
  weeksArray = daysArray;
  return daysArray;
}
var formatDate = function (formatDate){
  let myyear = formatDate.getFullYear();
  let mymonth = formatDate.getMonth() + 1;
  let myweekday = formatDate.getDate();
  return [myyear, mymonth, myweekday].map(formatNumber).join('-');
}
var formatNumber = function (n){
  n = n.toString()
  return n[1] ? n : '0' + n
}
var getWeekByDay = function (dayValue) {
  var day = new Date(Date.parse(dayValue.replace(/-/g, '/'))); //将日期值格式化  
  var today = new Array("周日", "周一", "周二", "周三", "周四", "周五", "周六"); //创建星期数组  
  return today[day.getDay()];  //返一个星期中的某一天，其中0为星期日  
}


var dealData = function (scheduleInfoList) {
  var tag = weeksArray[0].weekNum;
  console.log('tag:' + tag);
  var ar = [1, 2, 3, 4, 5, 6, 7, 1, 2, 3, 4, 5, 6, 7];
  var A_Mon_text_ar = [];
  var A_Tues_text_ar = [];
  var A_Wed_text_ar = [];
  var A_Thur_text_ar = [];
  var A_Fri_text_ar = [];
  var A_Sat_text_ar = [];
  var A_Sun_text_ar = [];
  var B_Mon_text_ar = [];
  var B_Tues_text_ar = [];
  var B_Wed_text_ar = [];
  var B_Thur_text_ar = [];
  var B_Fri_text_ar = [];
  var B_Sat_text_ar = [];
  var B_Sun_text_ar = [];
  var C_Mon_text_ar = [];
  var C_Tues_text_ar = [];
  var C_Wed_text_ar = [];
  var C_Thur_text_ar = [];
  var C_Fri_text_ar = [];
  var C_Sat_text_ar = [];
  var C_Sun_text_ar = [];

  for (var i = 0; i < scheduleInfoList.length; i++) {
    if (scheduleInfoList[i].timePeriod == '0') {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        A_Mon_text_ar = A_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        A_Tues_text_ar = A_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        A_Wed_text_ar = A_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        A_Thur_text_ar = A_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        A_Fri_text_ar = A_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        A_Sat_text_ar = A_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        A_Sun_text_ar = A_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
    else if (scheduleInfoList[i].timePeriod == '1') {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        B_Mon_text_ar = B_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        B_Tues_text_ar = B_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        B_Wed_text_ar = B_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        B_Thur_text_ar = B_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        B_Fri_text_ar = B_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        B_Sat_text_ar = B_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        B_Sun_text_ar = B_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    } else {
      if (scheduleInfoList[i].dayOfWeek == ar[tag]) {
        C_Mon_text_ar = C_Mon_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 1]) {
        C_Tues_text_ar = C_Tues_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 2]) {
        C_Wed_text_ar = C_Wed_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 3]) {
        C_Thur_text_ar = C_Thur_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 4]) {
        C_Fri_text_ar = C_Fri_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 5]) {
        C_Sat_text_ar = C_Sat_text_ar.concat(scheduleInfoList[i]);
      } else if (scheduleInfoList[i].dayOfWeek == ar[tag + 6]) {
        C_Sun_text_ar = C_Sun_text_ar.concat(scheduleInfoList[i]);
      }
    }
  }

  var sch_listData = [{ "time_title": "上午", "Mon_text": A_Mon_text_ar, "Tues_text": A_Tues_text_ar, "Wed_text": A_Wed_text_ar, "Thur_text": A_Thur_text_ar, "Fri_text": A_Fri_text_ar, "Sat_text": A_Sat_text_ar, "Sun_text": A_Sun_text_ar },
  { "time_title": "下午", "Mon_text": B_Mon_text_ar, "Tues_text": B_Tues_text_ar, "Wed_text": B_Wed_text_ar, "Thur_text": B_Thur_text_ar, "Fri_text": B_Fri_text_ar, "Sat_text": B_Sat_text_ar, "Sun_text": B_Sun_text_ar },
  { "time_title": "晚上", "Mon_text": C_Mon_text_ar, "Tues_text": C_Tues_text_ar, "Wed_text": C_Wed_text_ar, "Thur_text": C_Thur_text_ar, "Fri_text": C_Fri_text_ar, "Sat_text": C_Sat_text_ar, "Sun_text": C_Sun_text_ar }]

  return sch_listData;
}