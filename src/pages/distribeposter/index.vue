<template>
 <div class="distribeposter">
  <canvas :style="{width:canvasWidth,height:canvasHeight}"   canvas-id="firstCanvas"></canvas>
  <div class='btn' @click='saveImg' v-if="isOk">保存推广海报</div>
 </div>
</template>

<script>
import globalStore from "../../stores/global-store";

export default {
  data () {
    return {
      bcg: globalStore.state.imgapi + 'image/descirbebcg.jpg',
      isOk: false,
      canvasWidth:'',
      canvasHeight:'',
      erweimaImg:''
    }
  },

  components: {
  
  },

  methods: {
   getImageInfo(url) {    //  图片缓存本地的方法
    return new Promise(function (resolve, reject) {
      wx.getImageInfo({   //  小程序获取图片信息API
        src: url,
        success: function (res) {
          resolve(res.path)
          console.log(res.path)
        },
        fail(err) {
          console.log(err)
        }
      })
    })
  },
  drawcanvas: function (ImgArr, screenWidth, screenHeight, callback) {
    var that = this;
    const ctx = wx.createCanvasContext('firstCanvas');
    ctx.clearRect(0, 0, 0, 0);
    const WIDTH = screenWidth;
    const HEIGHT = screenWidth*1.636;
    //  绘制图片模板的 底图
    ctx.drawImage(ImgArr[1], 0, 0, WIDTH, HEIGHT);
    //ctx.drawImage(ImgArr[1], 40, 70, screenWidth - 95, screenWidth - 95);
    ctx.setTextAlign('left')
    ctx.setFontSize(16);
    ctx.setFillStyle('rgb(34,34,34)')
    ctx.fillText(`${that.userName}邀你加入会员`, 120, 160);
    ctx.drawImage(ImgArr[2], screenWidth/2-75, 230, 150, 150);
    const avatarurl_width = 70;    //绘制的头像宽度
    const avatarurl_heigth = 70;   //绘制的头像高度
    const avatarurl_x = screenWidth/2-35;   //绘制的头像在画布上的位置
    const avatarurl_y = 60;   //绘制的头像在画布上的位置
    ctx.save();
    ctx.beginPath(); //开始绘制
    ctx.arc(avatarurl_width / 2 + avatarurl_x, avatarurl_heigth / 2 + avatarurl_y, avatarurl_width / 2, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.clip();
    ctx.drawImage(ImgArr[0], avatarurl_x, avatarurl_y, avatarurl_width, avatarurl_heigth); // 推进去图片，必须是https图片
    ctx.restore(); //恢复之前保存的绘图上下文 恢复之前保存的绘图上下午即状态 还可以继续绘制
    ctx.draw();
    callback("绘图完成")
  },
  saveImg: function () {
    var that = this;
    wx.showToast({
      title: '正在保存',
      icon: 'loading',
      duration: 1000
    })
    wx.getSystemInfo({

      success: function (res) {
        wx.canvasToTempFilePath({
          x: 0,
          y: 0,
          width: res.screenWidth,
          height: res.screenWidth*1.636,
          destWidth: (res.screenWidth) * 4,
          destHeight: res.screenWidth * 1.636 * 4,
          canvasId: 'firstCanvas',
          fileType: 'jpg',
          success: function (res) {
            var templocaFilePate = res.tempFilePath
            wx.getSetting({
              success(res) {
                if (!res.authSetting['scope.writePhotosAlbum']) {
                  wx.authorize({
                    scope: 'scope.writePhotosAlbum',
                    success() {
                      that.delImg(templocaFilePate, that.erweimaImg)
                    }
                  });
                }
                else {
                  that.delImg(templocaFilePate, that.erweimaImg)
                }
              },
            })
          }
        })
      }
    })
  },
  delImg: function (templocaFilePate, Imgfilepath) {
    var that = this;
    wx.saveImageToPhotosAlbum({
      filePath: templocaFilePate,
      success(res) {
        wx.showToast({
          title: '图片保存成功',
          icon: 'success',
          duration: 1000
        })
        wx.request({
          url: 'https://www.guqinet.com:8444/upload/delFile',
          headers: {
            'Content-Type': 'application/json'
          },
          data: {
            path: Imgfilepath
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    })

  }
  },

  onLoad:function(options){
    var that = this;
    wx.showLoading({
      title: '正在生成海报',
      icon: 'loading '
    })
    wx.request({
      url: 'https://www.guqinet.com:8444/upload/getShare',
      headers: {
        'Content-Type': 'application/json'
      },
      data: {
        page: 'pages/index/index',
        scene: options.distribeId
      },
      success: function (res) {
        var erweimaImg = res.data;
        that.erweimaImg= erweimaImg.split('/').pop()
         wx.login({//登陆获取code
           success:res=>{
              if(res.code){
          wx.getUserInfo({    //获取微信用户信息
          success: function (res) {
            let useravator = res.userInfo.avatarUrl;  //  调取图片处理方法
            that.userName=res.userInfo.nickName;
            let result1 = that.getImageInfo(useravator)
            let result2 = that.getImageInfo(that.bcg)
            let result3 = that.getImageInfo(erweimaImg)
            Promise.all([result1,result2, result3]).then(function (res) {
              let locaImgarr = res;
              that.screenWidth=wx.getSystemInfoSync().windowWidth;
              that.canvasWidth=that.screenWidth+'px';
              that.canvasHeight=that.screenWidth*1.636+'px'
              that.drawcanvas(locaImgarr, that.screenWidth, wx.getSystemInfoSync().windowHeight, function (res) {
                console.log('------------------')
                if (res == "绘图完成") {
                  wx.showToast({
                    title: '海报生成成功',
                  })                
                  that.isOk=true               
                }
              })

            })
          }
        });
              }
            }
          })



     
      }
    })
  }
}
</script>

<style scoped>
.btn{
  width: 90%;
  height: 80rpx;
  line-height: 80rpx;
  text-align: center;
  background: #F33F40;
  color: #fff;
  margin: 20rpx auto;
  border-radius: 10rpx;
}
canvas{
  margin: 0 auto;
}
</style>
