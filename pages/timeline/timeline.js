// pages/search/search.js
const app = getApp();
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
    TabCur: 0,
    scrollLeft: 0,
    CustomBar: app.globalData.CustomBar,
    icon:[],
    // icon: [{
    //   name: '原始',
    //   isShow: true
    // }, {
    //   name: '夏',
    //   isShow: true
    // }, {
    //   name: '商',
    //   isShow: true
    // }, {
    //   name: '周',
    //   isShow: true
    // }, {
    //   name: '春秋',
    //   isShow: true
    // }, {
    //   name: '战国',
    //   isShow: true
    // }, {
    //   name: '秦',
    //   isShow: true
    // }, {
    //   name: '汉',
    //   isShow: true
    // }, {
    //   name: '三国',
    //   isShow: true
    // }, {
    //   name: '晋',
    //   isShow: true
    // }, {
    //   name: '十六国',
    //   isShow: true
    // }, {
    //   name: '南北朝',
    //   isShow: true
    // }, {
    //   name: '隋',
    //   isShow: true
    // }, {
    //   name: '唐',
    //   isShow: true
    // }, {
    //   name: '五代',
    //   isShow: true
    // }, {
    //   name: '宋',
    //   isShow: true
    // }, {
    //   name: '辽',
    //   isShow: true
    // }, {
    //   name: '金',
    //   isShow: true
    // }, {
    //   name: '元',
    //   isShow: true
    // }, {
    //   name: '明',
    //   isShow: true
    // }, {
    //   name: '清',
    //   isShow: true
    // }, {
    //   name: '近现代',
    //   isShow: true
    // }],
  },

  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      scrollLeft: (e.currentTarget.dataset.id - 1) * 60
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var self = this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/getdynasty',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      // data: { "dyname": "秦朝" },
      success:function(res) {
        // console.log(res.data);
        var icondata = []
        // if(res.data.dynasty){
        res.data.dynasty.map((item, idx) => {
          // console.log(item);
          let json = {
            isShow: true,
            name: item.dynasty_name,
            id: item.dyid,
            time: item.dynasty_time
          };
          icondata.push(json);
        })
        // };
        // console.log(icondata)
        self.setData({
          icon:icondata
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

  },
  jumpList(f) {
    var self = this;
    if (f.detail.value.userInput == '') {
      self.setData({
        error: "请输入正确的信息"
      })
    } else {
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
      success(res) {
        self.setData({
          name: res.data.msg
        })
        console.log(res.data)
      },
      fail(err) {
        console.log(err)
      }
    })
  }
})