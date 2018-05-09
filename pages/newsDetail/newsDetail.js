// pages/newsDetail/newsDetail.js
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:{},
    id:'',
    title: '',
    date: '',
    source: '',
    firstImage: '',
    readCount: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("secondpage");
    //let id = options.id;
    this.setData({
      id: options.id
    })
    this.getNewsDetail(this.data.id);
  },

  getNewsDetail: function (id,callback) {
    if(id==null||id.lenth<=0){
      return;
    }
    console.log(id);
    wx.showLoading({
      title: "加载中"
    });
    wx.request({
      url: 'https://test-miniprogram.com/api/news/detail',
      data: {
        id: id
      },
      success: res => {
        this.setNewsDetailToPage(res.data.result);
      },
      complete: () => {
        console.log("getNewsDetail complete");
        callback && callback();
        wx.hideLoading();
      }
    })
  },

  setNewsDetailToPage: function (newsDetail) {
    console.log(newsDetail);
    let content = newsDetail.content;   
    let tmpContent = [];
    for (var part of content) {
      let ctype = part.type;
      if (ctype == "image") {
        // console.log(part);
        this.setImageContent(part, tmpContent);
      } else {
        this.setTextContent(part, tmpContent);
      }
      // console.log(part);
    }
    let date = util.formatTime(new Date(newsDetail.date));

    this.setData({
      contents: tmpContent,
      title: newsDetail.title,
      date: date,
      source: newsDetail.source,
      firstImage: newsDetail.firstImage,
      readCount: newsDetail.readCount
    })
  },

  setImageContent: function (partContent, aimContent) {
    aimContent.push({
      nodes: [{
        name: 'img',
        attrs: {
          src: partContent.src,
          height:'100%',
          width:'100%'
        },
      }]
    });
  },
  setTextContent: function (partContent, aimContent) {
    aimContent.push({
      nodes: [{
        name: partContent.type,
        children: [{
          type: 'text',
          text: partContent.text
        }]
      }]
    })
  }  
})