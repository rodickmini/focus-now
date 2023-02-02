// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimeStamp: 0,
    duration: "00:00"
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
    let now = +new Date()
    console.log(now)
    this.setData({
      startTimeStamp: now
    })
    
    // 每隔1秒取一下时间戳，减去starttime，得到duration，计算属性转化成mm:ss格式
    
    setInterval(() => {
      let now = +new Date(), old = this.data.startTimeStamp
      let dur = now - old //毫秒数
      this.displayDuration(dur)
    }, 1000)
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