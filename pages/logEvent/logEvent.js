const app = getApp();
var timestamp = Date.parse(new Date());
var date = new Date(timestamp);
var Y = date.getFullYear();
var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1);
var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();

Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    index: null,
    picker: ['时事', '新闻', '生活','旅游','情感'],
    bgColor: ['bg-red', 'bg-orange', 'bg-green', 'bg-pink','bg-purple'],
    changebg:'bg-blue',
    multiIndex: [0, 0, 0],
    date: Y+'-'+M+'-'+D,
    imgList: [],
    modalName: null,
    tagtxt:'默认',
    logtxt: '请先登录'
  },
  PickerChange(e) {
    console.log(e);
    this.setData({
      index: e.detail.value
    })
  },
  MultiChange(e) {
    this.setData({
      multiIndex: e.detail.value
    })
  },
  DateChange(e) {
    this.setData({
      date: e.detail.value
    })
  },
  ChooseImage() {
    wx.chooseImage({
      count: 4, //默认9
      sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
      sourceType: ['album'], //从相册选择
      success: (res) => {
        if (this.data.imgList.length != 0) {
          this.setData({
            imgList: this.data.imgList.concat(res.tempFilePaths)
          })
        } else {
          this.setData({
            imgList: res.tempFilePaths
          })
        }
      }
    });
  },
  ViewImage(e) {
    wx.previewImage({
      urls: this.data.imgList,
      current: e.currentTarget.dataset.url
    });
  },
  DelImg(e) {
    wx.showModal({
      title: '',
      content: '确定要删除这张图片吗？',
      cancelText: '取消',
      confirmText: '确定',
      success: res => {
        if (res.confirm) {
          this.data.imgList.splice(e.currentTarget.dataset.index, 1);
          this.setData({
            imgList: this.data.imgList
          })
        }
      }
    })
  },
  showModal(e) {
    this.setData({
      modalName: e.currentTarget.dataset.target
    });
  },
  hideModal(e) {
    this.setData({
      modalName: null
    });
  },
  checkTag(e){
    let id = e.currentTarget.id.slice(3);
    let value = this.data.picker[id];
    let bgColor = this.data.bgColor[id];
    this.setData({
      tagtxt: value,
      changebg:bgColor
    });
  },
  formSubmit(e) { 
    var that = this;
    var skey = '';
    var title = e.detail.value.title;  //事件标题
    var text = e.detail.value.text; //事件内容
    var date = this.data.date; //事件日期
    var tagtxt = this.data.tagtxt; //事件标签
    var imgList = JSON.stringify(this.data.imgList);  //图片
    if (wx.getStorageSync('skey')==''){
      wx.showToast({
        title: '请先登录!',
        icon: 'none',
        duration: 2000
      });
    }else{
      skey = wx.getStorageSync('skey');
      console.log(wx.getStorageSync('skey'),skey,'skey');
    }
    
    if(skey!='' && (title!='' || text!='' || imgList!='[]')){
      console.log('开始提交',skey,date,title,text,tagtxt,imgList);
      wx.request({
        method: "POST",
        url: "https://abc.acrosstheuniverse.top/addNotes",
        data: {
          skey:skey,
          date: date,
          title: title,
          content: text,
          tag: tagtxt
          //imgList: imgList
        },
        header: {
          'content-type': 'application/json'
        },
        success: (res) => {
          if(res.data.msg=='success'){
            wx.showToast({
              title: '保存成功',
              duration: 2000
            });
            this.setData({ //表单清空
              title: '',
              text: '',
              date: Y + '-' + M + '-' + D,
              imgList: [],
              tagtxt: '默认',
              changebg: 'bg-blue'
            });
          }
        },
        fail:function(res){
          wx.showToast({
            title: '保存失败',
            duration: 2000
          });
        }
      });
    } else if (skey != '' && (title == '' || text == '' || imgList == '[]')){
      wx.showToast({
        title: '提交为空！',
        icon:'none',
        duration: 2000
      });
    }
    
  }
})