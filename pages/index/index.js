// pages/index/index.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    startTimeStamp: 0,
    duration: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    this.setData({
      startTimeStamp: 50
    })
    
    // 每隔1秒取一下时间戳，减去starttime，得到duration，计算属性转化成mm:ss格式
    // this.setData({
    //   startTimeStamp: +new Date()
    // })
    let self = this
    setInterval(function () {
      let nowTimeStamp = +new Date(), old = self.startTimeStamp
      let dur = nowTimeStamp - old
      console.log(old)
      self.setData({
        duration: nowTimeStamp - old
      })
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