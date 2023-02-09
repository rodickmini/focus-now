const app = getApp()
Component({
  properties: {
    // defaultData（父页面传递的数据-就是引用组件的页面）
    defaultData: {
      type: Object,
      value: {
        title: "页面标题"
      },
      observer: function (newVal, oldVal) { }
    }
  },
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuTop: app.globalData.menuTop,
    menuHeight: app.globalData.menuHeight,
  },
  attached: function () { },
  methods: {
    navigateBack() {
      wx.navigateBack()
    },
    navigateToStatPage() {
      console.log('navigateToStatPage')
      wx.navigateTo({
        url: '/pages/stat/stat'
      })
    }
  }
})
