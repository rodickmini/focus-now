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
    duration: "00:00",
    intervalHandler: null
  },

  displayDuration: function(miliseconds) {
    //将毫秒数转化成mm:ii格式字符串
    let totalSecs = Math.floor(miliseconds / 1000)

    let minStr = "", secStr = ""
    let min = Math.floor(totalSecs / 60)
    let sec = Math.floor(totalSecs % 60)
    
    if ( min <= 9 ) {
      minStr = "0"+ min
    } else if (min > 9 && min <= 59) {
      minStr = "" + min
    } else if (min > 59 && min <= 9 * 60) {

    }

    if ( sec <= 9 ) {
      secStr = "0"+ sec
    } else if (sec > 9 && sec <= 59) {
      secStr = "" + sec
    } else if (sec > 59 && sec <= 9 * 60) {

    } 

    this.setData({
      duration: minStr + ":" + secStr
    })
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
    // 每隔1秒取一下时间戳，减去startTimeStamp，得到duration，调用displayDuration方法转化成mm:ss格式
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
      duration: '00:00'
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