// pages/todayList.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    title: '',
    list:[],
    // list: [{
    //   title: 'title',
    //   time: 'time',
    //   text: 'text'
    // }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log(options);
    // 赋值-时间标题和类型
    var time = options.time.split(',')[0] + '月' + options.time.split(',')[1] + '日';
    console.log(time)
    // 发送options.time日期 收到数据并改变list
    this.setData({
      type: options.type,
      title: time
    })
    // 赋值-数据list
    var self=this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/today',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: { date: options.time.split(',')[0] + '月' + options.time.split(',')[1] + '日' }, //time[0] + '月' + time[1] + '日'
      success(res) {
        console.log(res.data);
        var eventlistdata = [];
        if (res.data.events) {
          res.data.events.map((item, idx) => {
            console.log(item.content.split('——'))
            var json = {
              title: 'title',
              time: item.content.split('——')[0],
              text: item.content.split('——')[1]
            }
            eventlistdata.push(json);
          })
        }
        self.setData({
          list: eventlistdata
        })
      },
      fail(err) {
        console.log(err)
      }
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