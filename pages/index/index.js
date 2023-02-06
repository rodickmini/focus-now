// pages/index/index.js
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
    intervalHandler: null
  },

  /*timeFormat
    输入miliseconds
    输出{
      hours: "",
      minutes: "",
      seconds: ""
    }
  */
  timeFormat: function(miliseconds) {
    let totalSecs = Math.floor(miliseconds / 1000)

    let hourStr = "", minStr = "", secStr = ""
    let hour = Math.floor(totalSecs / 3600)
    let remainSecs = Math.floor(totalSecs % 3600)
    let min = Math.floor(remainSecs / 60)
    let sec = Math.floor(remainSecs % 60)

    hourStr = hour > 9 ? "" + hour : "0" + hour
    minStr = min > 9 ? "" + min : "0" + min
    secStr = sec > 9 ? "" + sec : "0" + sec
    
    return {
      hours: hourStr,
      minutes: minStr,
      seconds: secStr
    }
  },

  // TODO返回{hours, minutes, seconds}
  displayDuration: function(miliseconds) {
    let {hours, minutes, seconds} = this.timeFormat(miliseconds)

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
    this.setData({
      focusing: true,
      eventName: this.data.inputValue ? this.data.inputValue : '无所事事中'
    })
    this.setData({
      inputValue: ''
    })
    const res = wx.getStorageInfoSync()
    if(res.keys.indexOf('startTimeStamp') === -1) {
      // let startTimeStamp = +new Date() - 59 * 60 * 1000
      let startTimeStamp = +new Date()
      wx.setStorageSync('startTimeStamp', startTimeStamp)
      this.setData({
        startTimeStamp: startTimeStamp
      })
    }else {
      let startTimeStamp = wx.getStorageSync('startTimeStamp')
      this.setData({
        startTimeStamp: startTimeStamp
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

  navigateToStatPage: function() {
    console.log('navigateToStatPage')
    wx.navigateTo({
      url: '/pages/stat/stat'
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