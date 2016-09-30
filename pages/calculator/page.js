var app = getApp()

Page({
  data: {
    result: 0,
    hasDecimalPoint: false,
    resultText: '12,345,789.0'
  },

  onLoad: function (options) {
    // 从缓存中读取结果
    var result = wx.getStorageSync('calculator.result')
    if (result) {
      this.data.result = result
      //this.showResult()
    }
  },

  onUnload: function () {
    // 存储结果数据到缓存中
    wx.setStorageSync('calculator.result', this.data.result)
  },

  // 设置结果
  setResult: function (result, hasDecimalPoint) {

  },

  // 显示运算结果
  showResult: function (result) {
    if (result) {
      // 如果未提供显示值，则从结果中取出
      result = this.data.result
    }

    if (typeof result != 'string') {
      result = result.toString()
    }

    this.setData(result)
  }
})
