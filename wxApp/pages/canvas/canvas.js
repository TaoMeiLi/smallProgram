// pages/canvas/canvas.js
Page({
  data: {

  },
  onLoad() {

  },
  onReady(){
    const context = wx.createCanvasContext('firstCanvas');

    context.arc(50, 50, 10, 0, 2 * Math.PI, false)
    context.moveTo(10,10)
    context.arcTo(70, 170, 20, 170, 110)
    
    context.rect()
    context.setFillStyle('#eeeeee')
    context.fill()

    context.beginPath()
    context.moveTo(20,15)
    context.bezierCurveTo(10,100,200,100,200,30);
    context.setFillStyle('#fac');
    context.stroke()

    context.clearRect(0,0,100,100)

    // wx.downloadFile({
    //   url: 'http://is5.mzstatic.com/image/thumb/Purple128/v4/75/3b/90/753b907c-b7fb-5877-215a-759bd73691a4/source/50x50bb.jpg',
    //   success(res) {
    //     context.save()
    //     context.beginPath()
    //     context.arc(50, 50, 25, 0, 2 * Math.PI)
    //     context.clip()
    //     context.drawImage(res.tempFilePath, 25, 25)
    //     context.restore()
    //     context.draw()
    //   }
    // })
    context.draw()

  },
})