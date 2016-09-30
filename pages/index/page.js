var app = getApp()

Page({
  data: {
    welcome: '欢迎光临寒舍',
    userInfo: {
      avatarUrl: '../images/default_avatar.png'
    }
  },

  onLoad: function (options) {
    var that = this
    // 获取用户信息
    app.getUserInfo(function (userInfo) {
      that.setData({userInfo: userInfo})
    })
  },

  entranceTap: function () {
    wx.navigateTo({
      url: '../calculator/page'
    })
  }
})
