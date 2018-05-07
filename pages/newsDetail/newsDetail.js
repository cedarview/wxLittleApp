// pages/newsDetail/newsDetail.js
var util = require('../../utils/util.js');  
Page({

  /**
   * 页面的初始数据
   */
  data: {
    contents:{},
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
    let id = options.id;
    this.getNewsDetail(id);
  },
  onPullDownRefresh() {
    console.log("pull down new detail");
    wx.stopPullDownRefresh();
  },

  getNewsDetail: function (id) {
    console.log(id);
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