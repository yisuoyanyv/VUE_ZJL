<template>
  <div>
    <!-- 轮播图区 -->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.url">
        <img :src="item.img">
      </mt-swipe-item>
    </mt-swipe>

    <!-- 九宫格 到 六宫格 改造 -->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/消息.png" alt="" >
          <div class="mui-media-body">新闻咨询</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
            <img src="../../images/图片.png" alt="" >

          <div class="mui-media-body">图片分享</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/购买.png" alt="" >
          <div class="mui-media-body">商品购买</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/对话.png" alt="" >
          <div class="mui-media-body">留言反馈</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/视频.png" alt="" >
          <div class="mui-media-body">视频专区</div>
        </a>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <a href="#">
          <img src="../../images/客服.png" alt="" >
          <div class="mui-media-body">联系我们</div>
        </a>
      </li>
    </ul>
  </div>
</template>
<script>
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      lunbotuList: [
          {url:'1',img:'http://b-ssl.duitang.com/uploads/item/201312/05/20131205171908_SEnjm.thumb.700_0.jpeg'},
          {url:'2',img:'http://img2.ph.126.net/dOAqy2E6Ksvh1KnsMVbx2w==/6631435002582387419.jpg'},
          {url:'3',img:'http://b-ssl.duitang.com/uploads/blog/201306/06/20130606093816_whscP.jpeg'},
          
          ]
    };
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      // this.$http.get('http://vue.studyit.io/api/getlunbo').then(result=>{

      this.$http
        .get(
          "https://uploadbeta.com/api/pictures/random/?key=BingEverydayWallpaperPicture"
        )
        .then(result => {
          console.log(result.body);
          if (result.body.result === 0) {
            //成功了
            this.lunbotuList = result.body.message;
          } else {
            //失败的
            Toast("加载轮播图失败...");
          }
        });
    }
  },
  created() {
    // this.getLunbotu();
  }
};
</script>

<style lang="scss" scoped>
.mint-swipe {
  height: 200px;
  // .mint-swipe-item:nth-child(1){
  //     background-color: red;
  // }
  .mint-swipe-item {
    &:nth-child(1) {
      background-color: red;
    }
    &:nth-child(2) {
      background-color: green;
    }
    &:nth-child(3) {
      background-color: blue;
    }
  }
  img {
    width: 100%;
    height: 100%;
  }
}

.mui-grid-view.mui-grid-9 .mui-table-view-cell{
    background-color: white;
    border: 0;
    img{
        height: 60px;
        width:60px;
    }
}
.mui-grid-view .mui-grid-9{
    background-color: white;
    border:none;

}
.mui-media-body{
    font-size:13px;
}

</style>


