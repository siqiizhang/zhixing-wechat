// pages/course/course.js
var weeksArray = [];
var GetCourseInfo = function (that) {
    wx.request({
      url: 'http://192.168.43.232:6001/zhixing/CourseInfoController/queryCourseInfo',
      method: 'POST',
      header: {
        'content-type': 'application/json;charset=UTF-8'
      },
      data: {
        aaaa:'1111',
      },
      success: function (res) {
        console.log("本周课程信息" + JSON.stringify(res));
        var sList = res.data.result;
        var sch_listData = dealData(sList);
        that.setData({
          sch_listData: sch_listData, 
        });
      },
      fail: function (e) {
        that.setData({
          loadingHidden: true,
        })
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
      courseInfoDetail:{},
      is_modal_Hidden : true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
      var scheduleList = [];
      var daysArray = getSevenDays();
      var sch_listData = dealData(scheduleList);
      this.setData({
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
    GetCourseInfo(that);
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
        courseInfoDetail: this.data.courseInfoDetail
      })
    },
  /**点击课程弹出框——取消 */
  cancelCourseInfo: function(e){
    this.setData({show:false})
  },
  /**点击课程弹出框——确定按钮*/
  confirmCourseInfo: function(e){
    this.setData({show:false})
  },
  /**
   * 点击请假，显示请假信息，弹出确认框确认请假
   */
  clickLeave: function(e) {
    var taht = this;
    wx.showModal({
      title: '提示',
      content: '确认要请假?',
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          wx.request({
            url: 'http://192.168.43.232:6001/zhixing/CourseInfoController/leaveCourse',
            method: 'POST',
            header: {
              'content-type': 'application/json;charset=UTF-8'
            },
            data: {
              courseId : e.currentTarget.dataset.courseId,
              courseName : e.currentTarget.dataset.courseName,
              timePeriod : e.currentTarget.dataset.timePeriod,
              dayOfWeek : e.currentTarget.dataset.dayOfWeek,
            },
            success: function (res) {
              wx.showToast({
                title: res.data.msg
              });
            },
            fail: function (e) {
              
            }
          })
        }else if(res.cancel){
          console.log('用户点击取消')
        }
      }
    })
  },
  /**
   * 点击课程，展示课程详情
   */
  clickCourse: function (e) {
    var that=this;
    var courseInfoDetail = e.currentTarget.dataset;
    that.setData({
      courseInfoDetail: courseInfoDetail,
      is_modal_Hidden: false,
    });
  },
})

var getSevenDays = function () {
  var daysArray = [];
  var dayDict = {};
  var weekStr = '';
  var weekNum = '';

  for (var i = 0; i < 7; i++) {
    var date = new Date(); //当前日期
    var newDate = new Date();
    newDate.setDate(date.getDate() + i);

    var m = (newDate.getMonth() + 1) < 10 ? "0" + (newDate.getMonth() + 1) : (newDate.getMonth() + 1);
    var d = newDate.getDate() < 10 ? "0" + newDate.getDate() : newDate.getDate();

    var time = newDate.getFullYear() + "-" + m + "-" + d;
    var dayStr = m + "/" + d;

    if (getWeekByDay(time) == '周一') {
      weekNum = 0;
    } else if (getWeekByDay(time) == '周二') {
      weekNum = 1;
    } else if (getWeekByDay(time) == '周三') {
      weekNum = 2;
    } else if (getWeekByDay(time) == '周四') {
      weekNum = 3;
    } else if (getWeekByDay(time) == '周五') {
      weekNum = 4;
    } else if (getWeekByDay(time) == '周六') {
      weekNum = 5;
    } else if (getWeekByDay(time) == '周日') {
      weekNum = 6;
    }
    dayDict = { "date_text": dayStr, "weekName": getWeekByDay(time), "weekNum": weekNum };

    console.log("date_text:" + dayStr + "weekName:" + getWeekByDay(time) + "weekNum:" + weekNum)
    daysArray.push(dayDict);
  }

  weeksArray = daysArray;
  return daysArray;
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