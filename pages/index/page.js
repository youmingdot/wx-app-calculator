var app = getApp()

Page({
  data: {
    welcome: '欢迎光临寒舍',
    userInfo: {
      
      avatarUrl: '../images/default_avatar.png'
    }
  },

  onLoad: function (callback) {
    var that = this
    app.getUserInfo(function(userInfo) {
      that.setData({userInfo: userInfo})
    })
  }
})
