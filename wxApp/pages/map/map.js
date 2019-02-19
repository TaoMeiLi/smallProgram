// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    myLongitude: 116.393723,    // 中心经度（用户）
    myLatitude: 40.004039,      // 中心纬度
    scale: 15,                  // 缩放级别(5-18)
    markers: [                  // 标记点（用于在地图上显示标记的位置）
      {
        id: 1231,  // id (number)
        latitude: 40.004033,  //纬度
        longitude: 116.393722, // 经度
        title: '1号店',     // 标注点名
        width: 20,
        height: 20,
        callout: {
          content:'1号店>>',
          padding: 5,
          bgColor: '#fff',
          color: '#000'
        },
        label: {
          content: '我',
          color: '#000',
          bgColor: '#fac'
        }
      },
      {
        id: 1231,  // id (number)
        latitude: 40.006711,  //纬度
        longitude: 116.357746, // 经度
        title: '2号店',     // 标注点名
        width: 20,
        height: 20,
        callout: {
          content: '2号店>>',
          padding: 5,
          bgColor: '#fff',
          color: '#000'
        },
        label: {
          content: '我',
          color: '#000',
          bgColor: '#fac'
        }
      },
      {
        id: 1232,  // id (number)
        latitude: 40.018807,  //纬度
        longitude: 116.413021, // 经度
        title: '3号店',     // 标注点名
        width: 20,
        height: 20,
        callout: {
          content: '3号店>>',
          padding: 5,
          bgColor: '#fff',
          color: '#000'
        },
        label: {
          content: '我',
          color: '#000',
          bgColor: '#fac'
        }
      },
      {
        id: 1233,  // id (number)
        latitude: 39.980540,  //纬度
        longitude: 116.427269, // 经度
        title: '4号店',     // 标注点名
        width: 20,
        height: 20,
        callout: {
          content: '4号店>>',
          padding: 5,
          bgColor: '#fff',
          color: '#000'
        },
        label: {
          content: '我',
          color: '#000',
          bgColor: '#fac'
        }
      },
      {
        id: 1234,  // id (number)
        latitude: 39.993430,  //纬度
        longitude: 116.386070, // 经度
        title: '5号店',     // 标注点名
        width: 20,
        height: 20,
        callout: {
          content: '5号店>>',
          padding: 5,
          bgColor: '#fff',
          color: '#000'
        },
        label: {
          content: '我',
          color: '#000',
          bgColor: '#fac'
        }
      }
    ],
    showLocation: false,         // 显示有方向的当前定位点
  
  },
  onLoad: function (options) {
  
  },
  onReady: function () {
  
  },
  onShow: function () {
  
  },
  markerTap: function(e) { // 点击标记点
    console.log(e.markerId,'点击点点id')
  },
  callOutTap: function(e) { // 点击标记点上的气泡
  },
  controlTap: function() { // 点击控件时触发，返回control的id
  
  },
  regionChange: function() { // 视野发生变化时触发
  
  },
  tapMap: function() { // 点击地图时触发
  
  },
  mapUpdated: function() { //地图渲染更新完成时触发
  
  }

})