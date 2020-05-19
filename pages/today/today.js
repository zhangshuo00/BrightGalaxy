// pages/today/today.js

var util = require('../../utils/util.js');

Page({

  /**
   * 页面的初始数据 后期从后端获取
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

    multiArray: [
      ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      ['1日', '2日', '3日', '4日', '5日', '6日', '7日', '8日', '9日', '10日', '11日', '12日', '13日', '14日', '15日', '16日', '17日', '18日', '19日', '20日', '21日', '22日', '23日', '24日', '25日', '26日', '27日', '28日', '29日', '30日', '31日']
    ],
    multiIndex: [0, 0],
    time: 'riqi',
    eventlist: [{
      title: 'title',
      time: 'time',
      text: 'text'
    }]
  },

  MultiChange(e) {
    // 发送fetch请求查询 并跳转
    console.log('picker发送选择改变，携带值为', e.detail.value)
    var search=[e.detail.value[0]+1,e.detail.value[1]+1]
    this.setData({
      multiIndex: e.detail.value
    })
  wx.navigateTo({
    url: '/pages/todayList/todayList?type=search&time='+search,
  })
  },

  MultiColumnChange(e) {
    // console.log(e, this.data.multiIndex)
    // this.setData({
    //   multiIndex: [e.detail.column,e.detail.value]
    // })    
    // console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    var data = {
      multiArray: this.data.multiArray,
      multiIndex: this.data.multiIndex
    };
    data.multiIndex[e.detail.column] = e.detail.value;
    // var arr1 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31];
    // var arr2 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29];
    // var arr3 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30];
    var arr1 = new Array(31),arr2=new Array(29),arr3=new Array(30);
    for (var i = 0; i < 31; i++) {
      if(i<29){
        arr2[i] = i+1+'日';
      }
      if(i<30){
        arr3[i] = i+1+'日';
      }
      arr1[i] = i+1+'日';
    }
    if (e.detail.column == 0) {
      switch (e.detail.value + 1) {
        case 1:
        case 3:
        case 5:
        case 7:
        case 8:
        case 10:
        case 12:
          data.multiArray[1] = arr1;
          break;
        case 2:
          data.multiArray[1] = arr2;
          break;
        default:
          data.multiArray[1] = arr3;
          break;
      }
    }
    // console.log(data.multiIndex);
    this.setData(data);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    // 赋值-时间
    var DATE = util.formatDate(new Date());
    var time = [DATE.month,DATE.day];
    var pre = [DATE.month, DATE.day-1];
    var next = [DATE.month, DATE.day+1]
    DATE = DATE.year + ' 年 ' + DATE.month + ' 月 ' + DATE.day + ' 日 '
    this.setData({
      date: DATE,
      todaytime: time,
      pretime: pre,
      nexttime: next
    });
    // 赋值-历史上的今天eventlist
    var self=this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/today',
      method: 'POST',
      header: {
        'Content-Type': 'application/json'
      },
      data: { date: '5月13日' }, //time[0] + '月' + time[1] + '日'
      success(res) {
        console.log(res.data);
        var eventlistdata=[];
        if(res.data.events){
          res.data.events.map((item,idx)=>{
            console.log(item.content.split('——'))
            var json={
              title:'title',
              time: item.content.split('——')[0],
              text: item.content.split('——')[1]
            }
            eventlistdata.push(json);
          })
        }
        self.setData({
          eventlist:eventlistdata
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