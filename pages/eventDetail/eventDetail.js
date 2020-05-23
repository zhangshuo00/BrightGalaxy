// pages/eventDetail/eventDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cardCur: 0,
    swiperList: [{
      id: 0,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84000.jpg'
    }, {
      id: 1,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big84001.jpg',
    }, {
      id: 2,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big39000.jpg'
    }, {
      id: 3,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'
    }, {
      id: 4,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big25011.jpg'
    }, {
      id: 5,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big21016.jpg'
    }, {
      id: 6,
      type: 'image',
      url: 'https://ossweb-img.qq.com/images/lol/web201310/skin/big99008.jpg'
      }],
    title: '',
    shortdes: '',
    entitle: '',
    time: '',
    text: '',
    dyid: '',
    historyid: '',
    dynasty: '',
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    console.log('op',options);
    // wx.request({
    //   url: 'https://www.mxnzp.com/api/convert/translate?content='+options.title+'from=zh&to=en&app_id=xsjlkymfpkorugmi&app_secret=QVUvOW4yWmJGZlg5ZnBXVGVsVk9jQT09',
    //   method: 'GET',
    //   header: {
    //     'Content-Type': 'application/json'
    //   },
    //   success: function(res){
    //     console.log(res)
    //   },
    //   fail: function(err){
    //     console.log(err);
    //   }
    // })
    this.setData({
      title: options.title,
      entitle: options.entitle,
      time: options.time.split('年')[0] + '年',
      text: options.text.split('@'),//.replace(/@/g, '\n\r &nbsp;&nbsp;&nbsp;&nbsp;'),
      dyid: options.dyid,
      historyid: options.historyid,
      dynasty:options. dynasty
    });
    console.log('te',this.data.text)
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