App({
  globalData: {
    userInfo: null
  },

  getUserInfo: function (callback) {
    if (this.globalData.userInfo) {
      callback(this.globalData)
    } else {
      var that = this
      wx.login({
        success: function () {
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
