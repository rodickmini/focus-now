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
      })
      this.setData({
        sessionList: arr
      })
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