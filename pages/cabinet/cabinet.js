// pages/cabinet/cabinet.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    sichu_user: null,
    bookowns: []
  },

  load_bookown: function() {
    var app = getApp();
    var self = this;
    var url = app.globalData.api_url + "/v1/bookown/";
    wx.request({
      url: url,
      data: {
        uid: this.data.sichu_user.uid,
        trim_owner: 1,
        offset: this.data.bookowns.length
      },
      header: {
        "Authorization": "Bearer " + this.data.sichu_user.token
      },
      method: 'GET',
      success: function (res) {
        var data = res.data;
        if (data && 'objects' in data) {
          var bookowns = [...self.data.bookowns, ...data.objects];
          self.setData({
            bookowns: bookowns
          })
        } else {
          wx.removeStorageSync("sichu_user")
          wx.redirectTo({
            url: '/pages/login/login.js',
          })
        }
      },
      fail: function(res) {
        wx.clearStorageSync();
        wx.redirectTo({
          url: '/pages/login/login.js',
        })
      }
    })
  },

  on_detail: function(e) {
    console.log(e.target);
    console.log("on detail");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var app = getApp();
    this.setData({
      sichu_user: app.globalData.sichu_user
    })
    this.load_bookown()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.setNavigationBarTitle({
      title: '我的书橱'
    });
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
    console.log("reach bottom");
    this.load_bookown()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})