// pages/searchResults/searchResults.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        keyword: '',
        searchResults: [],
        historyid: ''
    },
    jumpToDetail: function(e){
      // console.log(e.currentTarget.id);// 点击事件的historyid
      this.setData({
        historyid: e.currentTarget.id
      })
      var self = this;
      wx.request({
        url: 'https://abc.acrosstheuniverse.top/getHistoryDetail',
        method: 'GET',
        data:{
          "historyid": self.data.historyid
        },
        success: function(res){
          // console.log(res.data);
          wx.navigateTo({
            url: '/pages/eventDetail/eventDetail?dynasty=' + res.data.dynasty + '&title=' + res.data.title + '&time=' + res.data.time + '&text=' + res.data.content + '&dyid=' + res.data.dyid + '&historyid=' + res.data.historyid,
          })
        }
      })
    },
    jumpToFeedback: function(){
      // 未搜索到相应的结果，点击反馈，携带搜索词，跳转到反馈页面
      wx.navigateTo({
        url: '/pages/feedback/feedback',
      })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            keyword: options.keyword
        });
        var self = this;
        console.log(self.data.keyword,options)
        wx.request({
            url: 'https://abc.acrosstheuniverse.top/searchHistory',
            method: 'GET',
            data:{
              "keyword": self.data.keyword
            },
            success: function(res){
              // console.log(res.data)
            //   self.data.searchResults = res.data;
              if(res.data.msg === 'null'){
                // 显示未找到该结果
                self.setData({
                  searchResults: []
                })
              }else{
                for(var i=0;i<res.data.result.length;i++){
                  res.data.result[i].content = res.data.result[i].content.substr(0,40) + '...';
                }
                self.setData({
                  searchResults: res.data.result
                });
                
              }
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