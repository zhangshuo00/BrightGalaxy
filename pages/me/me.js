// pages/me/me.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      userInfo:{
          nickName:'登录',
          avatarUrl: '../../images/head.jpg'
      },
      hasUserInfo: false,
      canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //用户授权
  getUserInfo: function (e) {
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    });
  },
  login: function(e){
      var that = this;
      wx.getUserInfo({
          success: function(res){
              that.setData({
                  userInfo:{
                      nickName: res.userInfo.nickName,
                      avatarUrl: res.userInfo.avatarUrl
                  }
              })
          },
          fail:function(res){
            console.log(res); //未授权情况下
          }
      })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(this.data.canIUse)
      var that = this;
      wx.checkSession({
          success: function () {
              //console.log('处于登录态');
              that.login();
          },
          fail: function () {
              //console.log('需要重新登录');
              wx.login({
                  success: function (res) {
                      // console.log(res.code)
                      wx.request({
                          url: 'https://abc.acrosstheuniverse.top/login',
                          method: 'POST',
                          data: { code: res.code },
                          header: {
                              'content-type': 'application/json'
                          },
                          success: function (res) {
                              try {
                                  wx.setStorageSync('skey', res.skey)
                              }catch(e){

                              }
                          }
                      })
                  }
              })
          }
      })
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

  }
})