// pages/lineDetail/lineDetail.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dynasty:'',
    list:[],
    // list: [{
    //   title: 'title',
    //   time: 'time',
    //   text: 'text'
    // }]
  },

 JumpDetail(e){
   console.log(e.currentTarget.id, parseInt(e.currentTarget.id));
  var id=parseInt(e.currentTarget.id);
  var data=this.data.list[id];
   wx.navigateTo({
     url: '/pages/eventDetail/eventDetail?dynasty='+this.data.dynasty+'&title=' + data.title + '&time=' + data.time + '&text=' + data.content + '&dyid=' + data.dyid + '&historyid=' + data.historyid,
   })
 },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      dynasty:options.dynasty
    })
    var self = this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/getDynastyItems',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: { dyname: options.dynasty},
      success(res) {
        console.log(res.data);
        var listdata = [];
        if (res.data) {
          res.data.map((item, idx) => {
            var json = {
              title: item.title,
              time: item.time.split('年')[0]+'年',
              text: item.content.substr(0,40)+'...',
              content: item.content,
              dyid: item.dyid,
              historyid: item.historyid
            }
            listdata.push(json);
          })
        }
        // console.log(listdata)
        self.setData({
          list: listdata
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