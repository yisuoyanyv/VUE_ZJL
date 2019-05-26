<template>
  <div>
    <!-- 轮播图区 -->
    <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>

    <!-- 九宫格 到 六宫格 改造 -->

    <ul class="mui-table-view mui-grid-view mui-grid-9">
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/newslist">
          <img src="../../images/消息.png" alt="" >
          <div class="mui-media-body">新闻咨询</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/photolist">
            <img src="../../images/图片.png" alt="" >

          <div class="mui-media-body">图片分享</div>
        </router-link>
      </li>
      <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3">
        <router-link to="/home/goodslist">
          <img src="../../images/购买.png" alt="" >
          <div class="mui-media-body">商品购买</div>
        </router-link>
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
import swiper from "../subcomponents/swiper.vue"
export default {
  data() {
    return {
      lunbotuList: [
          // {id:'1',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3386943452,2432197688&fm=26&gp=0.jpg'},
          // {id:'2',img:'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1742886454,2307269776&fm=26&gp=0.jpg'},
          // {id:'3',img:'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2231222646,2938648366&fm=26&gp=0.jpg'},
          
          ]
    };
  },
  methods: {
    getLunbotu() {
      //获取轮播图数据的方法
      this.$http
        .get(
          "api/slideshow/list"
        )
        .then(result => {
          console.log(result)
          console.log(result.body);
          if (result.status === 200) {
            //成功了
            this.lunbotuList = result.body;
          } else {
            //失败的
            Toast("加载轮播图失败...");
          }
        });
    }
  },
  components:{
    swiper
  },
  created() {
    this.getLunbotu();
  }
};
</script>

<style lang="scss" scoped>

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


