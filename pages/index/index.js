// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    focusing: false,
    eventName: '无所事事中',
    btnText: '开始专注',
    startTimeStamp: 0,
    duration: "",
    intervalHandler: null
  },

  displayDuration: function(miliseconds) {
    //将毫秒数转化成mm:ii格式字符串
    let min = Math.floor(miliseconds / 1000 / 60)
    let minutes = min > 9 ? min : "0"+ min
    let sec = Math.floor(miliseconds / 1000 % 60)
    let seconds = sec > 9 ? sec : "0"+ sec
    this.setData({
      duration: minutes + ":" + seconds
    })
  },

  showActionSheet: function() {
    let self = this
    wx.showActionSheet({
      itemList: ['专注下一件事', '结束专注'],
      success (res) {
        if (res.tapIndex ===  0) {
          //专注下一件事
          self.startFocus()
        } else if (res.tapIndex ===  1) {
          //结束专注
          self.endFocus()
        }
      },
      fail (res) {
        console.log(res.errMsg)
      }
    })    
  },

  startFocus: function() {
    this.setData({
      focusing: true
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
    }, 1000)

    this.setData({
      intervalHandler: handler
    })
  },

  endFocus: function() {
    this.setData({
      focusing: false
    })
    let now = +new Date()
    let data = {
      eventName: this.data.eventName,
      start: this.data.startTimeStamp,
      end: now
    }
    wx.setStorageSync(now + '', data)
    wx.removeStorageSync('startTimeStamp')

    console.log('this.intervalHandler', this.data.intervalHandler)
    clearInterval(this.data.intervalHandler)
    this.setData({
      duration: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    
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
    // this.startFocus()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 写入localstorage
    // clearInterval

    clearInterval(this.data.intervalHandler)
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

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