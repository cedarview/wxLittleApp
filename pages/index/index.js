const newsRange = new Map();
newsRange.set("gn", "国内");
newsRange.set("gj", "国际");
newsRange.set("cj", "财经");
newsRange.set("yl", "娱乐");
newsRange.set("js", "教育");
newsRange.set("ty", "体育");
newsRange.set("other", "其它");
/*gn、gj、cj、yl、js、ty和other*/

Page({
  data: {
    pagenews: {},
    newsType: {},
    seletedType:""
  },
  onLoad: function () {
    this.setTypes();    
    this.setData({
      seletedType: "gn"
    })
    this.refresh();
  }, 
  onPullDownRefresh() {    
      console.log("pull down");
      this.refresh(() => {
        wx.stopPullDownRefresh()
      });
  },
  setTypes() {
    let types = [];
    //for()
    for (var [key, value] of newsRange) {
      types.push({
        key: key,
        value: value
      });
    }
    this.setData({
      newsType: types
    })
  },
  getNewsByType(ntype,callback) {
    console.log(ntype);
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: ntype
      },
      success: res => {
        let result = res.data.result;
        for (let item of result) {
          let dateString = item.date;
          var date = this.simplifyDate(new Date(dateString));
          item.date = date;    
        }        
        this.setData({
          pagenews: result
        });
      },
      complete: () => {
        console.log("getNewsByType complete");
        callback && callback();
      }
    })
  },
  simplifyDate: function(date){
    let hour = date.getHours();
    let minutes = date.getMinutes()
    return hour + ":" + (minutes >= 10 ? minutes:"0"+minutes)
  }
  ,
  onNewsTypeChange: function (options) {
    console.log("onNewsTypeChange");
    let nnewstype = options.currentTarget.dataset.value
    this.setData({
      seletedType: nnewstype
    })
    this.refresh();
    
  },
  refresh(callback){
    this.getNewsByType(this.data.seletedType,callback);
  },
  onClickNewsItem(options) {
    let id = options.currentTarget.dataset.id;
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + id,
    })
  }
})
