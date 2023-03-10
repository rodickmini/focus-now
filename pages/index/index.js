// pages/index/index.js

var timeModule = require('../../modules/time.js')

Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusing: false,
    eventName: '',
    inputValue: '',
    btnText: '开始专注',
    startTimeStamp: 0,
    section1: "00",
    section2: "00",
    section3: "",
    intervalHandler: null,
    navigationData: {
      title: "专注这一刻",
      hideBack: true
    }
  },

  // TODO返回{hours, minutes, seconds}
  displayDuration: function(miliseconds) {
    let {hours, minutes, seconds} = timeModule.durationFormat(miliseconds)

    if(hours === '00') {
      this.setData({
        section1: minutes,
        section2: seconds,
        section3: '',
      })
    } else {
      this.setData({
        section1: hours,
        section2: minutes,
        section3: seconds,
      })
    }
    
  },

  startFocus: function() {
    wx.vibrateShort()
    let eventName = this.data.inputValue ? this.data.inputValue : '无所事事'
    this.setData({
      focusing: true,
      eventName,
      inputValue: ''
    })
    const res = wx.getStorageInfoSync()
    if(res.keys.indexOf('startTimeStamp') === -1) {
      let startTimeStamp = +new Date()
      wx.setStorageSync('startTimeStamp', startTimeStamp)
      wx.setStorageSync('nowEvent', eventName)
      this.setData({
        startTimeStamp: startTimeStamp
      })
    }else {
      let startTimeStamp = wx.getStorageSync('startTimeStamp')
      let nowEvent = wx.getStorageSync('nowEvent')
      this.setData({
        startTimeStamp: startTimeStamp,
        eventName: nowEvent
      })
    }
    // 每隔1秒取一下时间戳，减去startTimeStamp，得到dur，调用displayDuration方法转化成hh:mm:ss格式
    let handler = setInterval(() => {
      let now = +new Date(), old = this.data.startTimeStamp
      let dur = now - old //毫秒数
      this.displayDuration(dur)

      //TODO: 每秒短震动
      // wx.vibrateShort()
    }, 1000)

    this.setData({
      intervalHandler: handler
    })
  },

  endFocus: function() {
    wx.vibrateShort()
    this.setData({
      focusing: false
    })
    let start = this.data.startTimeStamp, end = +new Date()
    let data = {
      eventName: this.data.eventName,
      start,
      end
    }
    wx.setStorageSync('session' + start, data)
    wx.removeStorageSync('startTimeStamp')
    wx.removeStorageSync('nowEvent')

    clearInterval(this.data.intervalHandler)
    this.setData({
      section1: '00',
      section2: '00',
      section3: '',
    })
  },

  inputEvent: function(e) {
    this.setData({
      inputValue: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //如果localStorage中有startTimeStamp则恢复focus
    const res = wx.getStorageInfoSync()
    if(res.keys.indexOf('startTimeStamp') !== -1) {
      this.startFocus()
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {
    // clearInterval
    clearInterval(this.data.intervalHandler)
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})