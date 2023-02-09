// pages/stat/stat.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sessionList: []
  },

  navigateBack: function() {
    wx.navigateBack()
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 读取local storage
    const res = wx.getStorageInfoSync()
    if(res.keys.length !== 0) {
      let keys = res.keys, arr = []
      console.log(keys)
      arr = keys.filter((el) => {
        return el.indexOf('session') !== -1
      }).map((el) => {
        return wx.getStorageSync(el)
      }).sort((a, b) => {
        return b.start - a.start
      }).map((el) => {
        return {
          eventName: el.eventName,
          start: this.timeFormat(el.start),
          end: this.timeFormat(el.end),
          duration: this.durationFormat(el.end - el.start)
        }
      })
      this.setData({
        sessionList: arr
      })
    }
  },

  durationFormat: function(miliseconds) {
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

  timeFormat: function(timeStamp) {
    let date = new Date(timeStamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y = date.getFullYear() + '-',
      M = (date.getMonth()+1 < 10 ? '0'+(date.getMonth()+1) : date.getMonth()+1) + '-',
      D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ',
      h = date.getHours() < 10 ? '0' + date.getHours() + ':' : date.getHours() + ':',
      m = date.getMinutes() < 10 ? '0' + date.getMinutes() + ':' : date.getMinutes() + ':',
      s = date.getSeconds() < 10 ? '0' + date.getSeconds() + '' : date.getSeconds() + ''
      return Y + M + D + h + m + s
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