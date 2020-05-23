// pages/search/search.js
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {

    TabCur: 0,
    MainCur: 0,
    VerticalNavTop: 0,
    list: [],
    load: true,

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
    icon: [],
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

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    wx.showLoading({
      title: '加载中...',
      mask: true
    });
    
    this.fetchdynasty();
    console.log('onload',this.data.icon)
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {
    wx.hideLoading();
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
  tabSelect(e) {
    this.setData({
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    });
    this.fetchlist();
  },
  VerticalMain(e) {
    let that = this;
    let list = this.data.list;
    let tabHeight = 0;
    if (this.data.load) {
      for (let i = 0; i < list.length; i++) {
        let view = wx.createSelectorQuery().select("#main-" + list[i].id);
        view.fields({
          size: true
        }, data => {
          list[i].top = tabHeight;
          tabHeight = tabHeight + data.height;
          list[i].bottom = tabHeight;
        }).exec();
      }
      that.setData({
        load: false,
        list: list
      })
    }
    let scrollTop = e.detail.scrollTop + 20;
    for (let i = 0; i < list.length; i++) {
      if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
        that.setData({
          VerticalNavTop: (list[i].id - 1) * 50,
          TabCur: list[i].id
        })
        that.fetchlist();
        return false
      }
    }
  },
  fetchdynasty: function() {
    var self = this;
    wx.request({
      url: 'https://abc.acrosstheuniverse.top/getdynasty',
      method: 'GET',
      header: {
        'Content-Type': 'application/json'
      },
      // data: { "dyname": "秦朝" },
      success: function(res) {
        // console.log(res.data);
        var icondata = []
        // if(res.data.dynasty){
        res.data.dynasty.map((item, idx) => {
          // console.log(item);
          let json = {
            isShow: true,
            name: item.dynasty_name,
            dyid: item.dyid,
            id: idx,
            time: item.dynasty_time
          };
          icondata.push(json);
        })
        // };
        // console.log(icondata)
        self.setData({
          icon: icondata
        })
        self.fetchlist();
      },
      fail(err) {
        console.log(err)
      }
    })
  },
  fetchlist: function(){
    if(!this.data.icon[this.data.TabCur].list){
      var self = this;
      wx.request({
        url: 'https://abc.acrosstheuniverse.top/getDynastyItems',
        method: 'POST',
        header: {
          'Content-Type': 'application/json'
        },
        data: { dyname: self.data.icon[self.data.TabCur].name },
        success(res) {
          console.log('res', res.data);
          var listdata = [];
          if (res.data) {
            res.data.map((item, idx) => {
              var json = {
                title: item.title,
                time: item.time.split('年')[0] + '年',
                text: item.content.substr(0, 40) + '...',
                content: item.content,
                dyid: item.dyid,
                historyid: item.historyid
              }
              json.text = json.text.replace(/\\n/g, ' ');
              json.content = json.content.replace(/\?/g, '？');
              json.content = json.content.replace(/\\n/g, '@');
              listdata.push(json);
            });
          }
          // console.log(listdata)
          var icon = self.data.icon;
          icon[self.data.TabCur].list = listdata;
          self.setData({
            icon: icon
          })
          console.log('conent', self.data.list)
        },
        fail(err) {
          console.log(err)
        }
      })
    }
  }
  ,
  fetchline: function() {
    var self = this;
    if (this.data.icon) {
      var icon = this.data.icon;
      // console.log('data.icon',icon);
      this.data.icon.map((iconitem, iconidx) => {
        wx.request({
          url: 'https://abc.acrosstheuniverse.top/getDynastyItems',
          method: 'POST',
          header: {
            'Content-Type': 'application/json'
          },
          data: {
            dyname: iconitem.name
          },
          success(res) {
            // console.log('lineres', res.data);
            var listdata = [];
            if (res.data) {
              res.data.map((item, idx) => {
                var json = {
                  title: item.title,
                  time: item.time.split('年')[0] + '年',
                  text: item.content.substr(0, 40) + '...',
                  content: item.content,
                  dyid: item.dyid,
                  historyid: item.historyid
                }
                json.text = json.text.replace(/\\n/g, ' ');
                json.content = json.content.replace(/\?/g, '？');
                json.content = json.content.replace(/\\n/g, '@');
                listdata.push(json);
              });
            }
            // console.log(listdata)
            icon[iconidx].list = listdata;
            // console.log('conent', self.data.list)
          },
          fail(err) {
            console.log(err)
          }
        })
      })
      console.log('icon',icon)
      self.setData({
        icon: icon
      })
    }
  },
  JumpDetail(e) {
    console.log(e, e.currentTarget.id, e.currentTarget.id.split('-'));
    var listid = e.currentTarget.id.split('-')[1];
    var dynastyid = e.currentTarget.id.split('-')[0]
    var data = this.data.icon[dynastyid].list[listid];
    wx.navigateTo({
      url: '/pages/eventDetail/eventDetail?dynasty=' + this.data.icon[dynastyid].name + '&title=' + data.title + '&time=' + data.time + '&text=' + data.content + '&dyid=' + data.dyid + '&historyid=' + data.historyid,
    })
  },
})