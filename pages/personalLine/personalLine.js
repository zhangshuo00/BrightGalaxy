// pages/personalLine/personalLine.js

var allData = [], event = [], news = [], life = [], travel = [], love = [];

Page({

  /**
   * 页面的初始数据
   */
  data: {
    multiArray: [
      ['时间倒序', '时间顺序'],
      ['全部','时事', '新闻', '生活', '旅游', '情感']
    ],
    multiIndex: [0, 0],
    current:[], //当前
    allData:[], //全部
    event:[],//时事
    news:[],//新闻
    life:[],//生活
    travel:[],//旅游
    love:[], //感情
    bgColor: ['bg-blue','bg-red', 'bg-orange', 'bg-green', 'bg-pink', 'bg-purple'],
    flag:-1
  },
  //简易折叠效果
  ishidebox(e){
    console.log(e.target.id,e);
    var index = e.target.id.slice(3);
    var tid = 'timebox'+index;
    if(this.data.flag==index){
      this.setData({
        flag:-1
      })
    }else{
      this.setData({
        flag: index
      });
    }
  },
  MultiChange(e) {
    var a=[];
    this.setData({
      multiIndex: e.detail.value
    });
    //console.log(e.detail.value);
    if (e.detail.value[0] == 0){
      if (e.detail.value[1] == 0){
        this.setData({
          current: this.data.allData
        });
      } else if (e.detail.value[1] == 1){
        this.setData({
          current: this.data.event
        });
      } else if (e.detail.value[1] == 2) {
        this.setData({
          current: this.data.news
        });
      } else if (e.detail.value[1] == 3) {
        this.setData({
          current: this.data.life
        });
      } else if (e.detail.value[1] == 4) {
        this.setData({
          current: this.data.travel
        });
      } else if (e.detail.value[1] == 5) {
        this.setData({
          current: this.data.love
        });
      }
    } else{
      if (e.detail.value[1] == 0) {
        a = this.data.allData;
        this.setData({
          current: this.rvarr(a)
        });
      } else if (e.detail.value[1] == 1) {
        a = this.data.event;
        this.setData({
          current: this.rvarr(a)
        });
      } else if (e.detail.value[1] == 2) {
        a = this.data.news;
        this.setData({
          current: this.rvarr(a)
        });
      } else if (e.detail.value[1] == 3) {
        a = this.data.life;
        this.setData({
          current: this.rvarr(a)
        });
      } else if (e.detail.value[1] == 4) {
        a = this.data.travel;
        this.setData({
          current: this.rvarr(a)
        });
      } else if (e.detail.value[1] == 5) {
        a = this.data.love;
        this.setData({
          current: this.rvarr(a)
        });
      }
    }
  },
  MultiColumnChange(e) {
    let data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    this.setData(data);
  },
  rvarr(arr,n){
    var newarr=[];
    for (var i=0;i<arr.length;i++){
      newarr[i]=arr[arr.length-1-i];
    }
    return newarr;
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //请求后台数据 对6个数组重新赋值allData，event，news，life，travel，love
    var skey = wx.getStorageSync('skey');
    if(skey!=''){
      wx.request({
        method: "POST",
        url: "https://abc.acrosstheuniverse.top/getNotes",
        data: { skey:skey},//请求参数
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          if(res.data.msg=='success'){
            var resall = res.data.notes; 
            resall.sort(function (a, b) { return b['time'] < a['time'] ? 1 : -1 }).reverse();
            for(var i=0;i<resall.length;i++){
              var thenote = resall[i];
              thenote.time = thenote.time.slice(0, 4) + '.' + thenote.time.slice(5, 7) + '.' + thenote.time.slice(8);
              allData.push(thenote);             
              if (resall[i].tag=='时事'){
                event.push(thenote);
              } else if (resall[i].tag == '新闻'){
                news.push(thenote);
              } else if (resall[i].tag == '生活') {
                life.push(thenote);
              } else if (resall[i].tag == '旅游') {
                travel.push(thenote);
              } else if (resall[i].tag == '情感') {
                love.push(thenote);
              }
            }
            
            this.setData({  
              current: allData,
              allData: allData,
              event: event,//时事
              news: news,//新闻
              life: life,//生活
              travel: travel,//旅游
              love: love //感情
            });
          }
        },
        fail: function () {
          wx.showToast({
            title: '请求失败！',
            icon: 'none',
            duration: 2000
          });
        }
      });
    }
    
    // this.setData({  //加入接口后删除此段代码
    //   current:allData,
    //   allData: allData,
    //   event: event,//时事
    //   news: news,//新闻
    //   life: life,//生活
    //   travel: travel,//旅游
    //   love: love //感情
    // });

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