const newsRange = new Map();
newsRange.set("gn", "国内");
newsRange.set("gj", "国际");
newsRange.set("cj", "财经");
newsRange.set("yl", "娱乐");
newsRange.set("js", "教育");
newsRange.set("ty", "体育");
newsRange.set("other", "其它");
/*gn、gj、cj、yl、js、ty和other*/

const newsTypsMap = {
  'gn': '国内',
  'gj': '国际',
  'cj': '财经阴',
  'yl': '娱乐',
  'js': '教育',
  'ty': '体育',
  "other": "其它"
}

Page({
  data: {
    pagenews: {},
    newsType: {}
  },
  onLoad: function () {
    this.setTypes();
    this.getNewsByType("gn");
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
  getNewsByType(ntype) {
    console.log(ntype);
    wx.request({
      url: 'https://test-miniprogram.com/api/news/list',
      data: {
        type: ntype
      },
      success: res => {
        let result = res.data.result;
        // for (var item of result) {
        //   console.log(item);
        // }
        this.setData({
          pagenews: result
        });
      },
      complete: () => {
        console.log("getNewsByType complete");
      }
    })
  },
  onNewsTypeChange: function (options) {
    console.log("onNewsTypeChange");
    let newstype = options.currentTarget.dataset.value
    this.getNewsByType(newstype);
  },
  onClickNewsItem(options){
    let id = options.currentTarget.dataset.id;
    console.log(id);
    wx.navigateTo({
      url: '/pages/newsDetail/newsDetail?id=' + id,
    })
  }
})
