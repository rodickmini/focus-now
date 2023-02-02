// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      const res = wx.getStorageInfoSync()
      console.log(res.keys)
      if(res.keys.indexOf('startTimeStamp') === -1) { //没取到
        let startTimeStamp = +new Date()
        wx.setStorageSync('startTimeStamp', startTimeStamp)
      }
    } catch (e) {
      // Do something when catch error
      console.log('getStorageInfoSync error')
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
    // 获取当前时间戳写入localstrage: startTimeStamp
    let startTimeStamp = wx.getStorageSync('startTimeStamp')

    this.setData({
      startTimeStamp: startTimeStamp
    })
    
    // 每隔1秒取一下时间戳，减去startTimeStamp，得到duration，调用displayDuration方法转化成mm:ss格式
    this.intervalHandler = setInterval(() => {
      let now = +new Date(), old = this.data.startTimeStamp
      let dur = now - old //毫秒数
      this.displayDuration(dur)
    }, 1000)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {
    // 写入localstorage
    // clearInterval

    clearInterval(this.intervalHandler)
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