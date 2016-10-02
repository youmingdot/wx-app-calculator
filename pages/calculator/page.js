var app = getApp()

Page({
  data: {
    // 按钮组定义
    panel: [
      // 单独处理CA按钮
      // {text: 'CA', style: 'orange', tap: 'clearTap'},
      {text: '+/-', style: 'orange', tap: 'plusMinusTap'},
      {text: '％', style: 'orange', tap: 'percentTap'},
      {text: '÷', style: 'black', tap: 'operatorTap', extra: '/'},
      {text: '7', tap: 'numTap', extra: 7},
      {text: '8', tap: 'numTap', extra: 8},
      {text: '9', tap: 'numTap', extra: 9},
      {text: '×', style: 'black', tap: 'operatorTap', extra: '*'},
      {text: '4', tap: 'numTap', extra: 4},
      {text: '5', tap: 'numTap', extra: 5},
      {text: '6', tap: 'numTap', extra: 6},
      {text: '－', style: 'black', tap: 'operatorTap', extra: '-'},
      {text: '1', tap: 'numTap', extra: 1},
      {text: '2', tap: 'numTap', extra: 2},
      {text: '3', tap: 'numTap', extra: 3},
      {text: '＋', style: 'black', tap: 'operatorTap', extra: '+'},
      {text: '0', style: 'long', tap: 'numTap', extra: 0},
      {text: '.', tap: 'decimalTap'},
      {text: '＝', style: 'black', tap: 'operateTap'}
    ],

    clearText: 'CA',

    // 中转值
    transit: '',
    // 当前输入值
    current: '0',
    // 当前运算符
    operator: '',

    // 最后触摸按下
    lastTouch: null
  },

  onLoad: function (options) {
    // 从缓存中读取结果
    var result = wx.getStorageSync('calculator.result')
    if (result) {
      this.setCurrent(result)
    }
  },

  onUnload: function () {
    // 存储结果数据到缓存中
    wx.setStorageSync('calculator.result', this.data.result)
  },

  // 设置当前值
  setCurrent: function (current) {
    if (current == undefined) {
      // 如果未提供显示值，则从结果中取出
      current = this.data.current
    }

    if (typeof current != 'string') {
      current = current.toString()
    }

    if (current.length >= 12) {
      current = current.substr(0, 11)
    }

    this.setData({current: current})

    // 控制清除当前和清除全部显示
    var showCa = current == '0' || current == '-0'
    this.setData({clearText: showCa ? 'CA' : 'C'})
  },

  // 按下数字键
  numTap: function (event) {
    var number = event.currentTarget.dataset.extra

    // 如果存在运算符，且中转值为空，则写入中转值
    if (this.data.operator && !this.data.transit) {
      this.setData({transit: this.data.current})
      this.setCurrent('0')
    }

    var current = this.data.current != '0' ? this.data.current + number : number;

    // 限制输入总长度
    if (current.length >= 12) {
      current = this.data.current
    }

    this.setCurrent(current)
  },

  // 正负号
  plusMinusTap: function () {
    var current = this.data.current

    if (current.charAt(0) == '-') {
      current = current.substr(1)
    } else {
      current = '-' + current
    }

    this.setCurrent(current)
  },

  // 运算符
  operatorTap: function (event) {
    this.checkResult()
    this.setData({operator: event.currentTarget.dataset.extra})
  },

  // 去百分数
  percentTap: function () {
    this.checkResult()
    var current = parseFloat(this.data.current) * 0.01
    this.setCurrent(current.toString())
  },

  // 等于号
  operateTap: function () {
    var result = this.data.current
    if (this.data.transit) {
      result = this.operate(this.data.transit, this.data.current, this.data.operator);
    }

    this.setCurrent(result)
    this.setData({transit: ''})
  },

  // 小数点
  decimalTap: function () {
    if (this.data.current.indexOf('.') != -1) {
      return
    }

    this.setCurrent(this.data.current + '.')
  },

  // 清除按钮
  clearTap: function () {
    if (this.data.ca = 'CA') {
      // 清除全部
      this.setData({transit: '', operator: ''})
    }

    this.setCurrent('0')
  },

  // 删除当前输入
  deleteCurrent: function () {
    var current = this.data.current

    current = current && current.substr(0, current.length - 1)

    if (current.length < 1) {
      current = '0'
    }

    this.setCurrent(current)
  },

  inputTouchStart: function (event) {
    // 记录触摸事件
    this.setData({
      lastTouch: {
        timeStamp: event.timeStamp,
        startX: event.touches[0].screenX,
        startY: event.touches[0].screenY,
        dX: 0,
        dY: 0
      }
    })
  },

  inputTouchMove: function (event) {
    var lastTouch = this.data.lastTouch

    if (!lastTouch) {
      return
    }

    // 记录触摸事件
    this.setData({
      lastTouch: {
        timeStamp: lastTouch.timeStamp,
        startX: lastTouch.startX,
        startY: lastTouch.startY,
        dX: event.touches[0].screenX - lastTouch.startX,
        dY: event.touches[0].screenY - lastTouch.startY
      }
    })
  },

  inputTouchEnd: function (event) {
    var lastTouch = this.data.lastTouch

    if (!lastTouch) {
      return
    }

    var dTime = event.timeStamp - lastTouch.timeStamp

    if (dTime < 800 && lastTouch.dX > 80 && Math.abs(lastTouch.dY) < lastTouch.dX / 2) {
      this.deleteCurrent()
    }

    this.setData({lastTouch: null})
  },

  checkResult: function () {
    if (this.data.current && this.data.transit && this.data.operator) {
      var result = this.operate(this.data.transit, this.data.current, this.data.operator);
      this.setCurrent(result)
      this.setData({transit: ''})
    }
  },

  operate: function (a, b, operator) {
    a = parseFloat(a)
    b = parseFloat(b)

    switch (operator) {
      case '+':
        return a + b
      case '-':
        return a - b
      case '/':
        return a / b
      case '*':
        return a * b
      default:
        return b
    }
  }
})
