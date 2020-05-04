// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: 'wechat'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  jumpList(f) {
    var self = this;
    if(f.detail.value.userInput == ''){
      self.setData({
        error:"请输入正确的信息"
      })
    }else{
      wx.navigateTo({
        url: '/pages/list/list?kwd=' + f.detail.value.userInput,
      });
    }
  },
  getData: function(e) {
    var self = this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/sign',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      success(res){
        self.setData({
          name: res.data.msg
        })
        console.log(res.data)
      },
      fail(err){
        console.log(err)
      }
    })
  }
})