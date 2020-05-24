// pages/feedback/feedback.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  formSubmit(e) {
    var that = this;
    var skey = '';
    var title = e.detail.value.title;  //事件标题
    var text = e.detail.value.text; //事件内容
    if (wx.getStorageSync('skey') == '') {
      wx.showToast({
        title: '请先登录!',
        icon: 'none',
        duration: 2000
      });
    } else {
      skey = wx.getStorageSync('skey');
      console.log(wx.getStorageSync('skey'), skey, 'skey');
    }

    if (skey != '' && title != '' && text != '') {
      wx.request({
        method: "POST",
        url: "https://abc.acrosstheuniverse.top/feedback",
        data: {
          skey: skey,
          contackEmail: title,
          content: text
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          if (res.data.msg == 'feedback success') {
            wx.showToast({
              title: '反馈成功',
              duration: 2000
            });
            this.setData({ //表单清空
              title: '',
              text: '',
            });
          }
        },
        fail: function (res) {
          wx.showToast({
            title: '反馈失败',
            duration: 2000
          });
        }
      });
    } else if (skey != '' && (title == '' || text == '')) {
      wx.showToast({
        title: '提交不能为空！',
        icon: 'none',
        duration: 2000
      });
    }

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

  }
})