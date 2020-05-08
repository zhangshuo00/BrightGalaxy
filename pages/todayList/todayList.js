// pages/todayList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    list: [{
      title: 'title',
      time: 'time',
      text: 'text'
    }, {
      title: 'title1',
      time: 'time1',
      text: 'text1'
    }, {
      title: 'title2',
      time: 'time2',
      text: 'text2'
    }, {
      title: 'title3',
      time: 'time3',
      text: 'text3'
    }, {
      title: 'title4',
      time: 'time4',
      text: 'text4'
    }, ]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    var time = options.time[0] + '月' + options.time[2] + '日'
    // 发送options.time日期 收到数据并改变list
    this.setData({
      type: options.type,
      title: time
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})