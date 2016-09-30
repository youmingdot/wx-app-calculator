App({
  globalData: {
    userInfo: null
  },

  // 获取用户信息，由于存在异步调用，这里使用回调实现
  getUserInfo: function (callback) {
    if (this.globalData.userInfo) {
      callback(this.globalData)
    } else {
      var that = this
      // 微信登录
      wx.login({
        success: function () {
          // 登录成功获得用户信息
          wx.getUserInfo({
            success: function (res) {
              that.globalData.userInfo = res.userInfo
              callback(that.globalData.userInfo)
            }
          })
        }
      })
    }
  }
})
