<template>
  <div>
    <!-- 顶部滑动条区 -->
    <div id="slider" class="mui-slider">
      <div
        id="sliderSegmentedControl"
        class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted"
        data-scroll="1"
      >
        <div
          class="mui-scroll"
          style="transform: translate3d(0px, 0px, 0px) translateZ(0px); transition-duration: 0ms;"
        >
          <a
            :class="['mui-control-item',item.id == 0?'mui-active':'']"
            v-for="item in cates"
            :key="item.id" 
            @click="getPhotoListByCateId(item.id)"
          >{{item.title}}</a>
        </div>
      </div>
    </div>

    <!-- 图片列表区域 -->
    <ul class="photo-list">
      <router-link v-for="item in list" :key="item.id" :to="'/home/photoinfo/'+item.id" tag="li">
        <img v-lazy="item.img_url">
        <div class="info">
            <h1 class="info_title">{{item.title}}</h1>
            <div class="info_body">{{item.zhaiyao}}</div>
        </div>
      </router-link>
    </ul>
  </div>
</template>
<script>
//1.导入mui的js文件
import mui from "../../lib/mui/js/mui.js";

export default {
  data() {
    return {
      cates: [
        { id: 0, title: "All" },

        { id: 1, title: "Java" },
        { id: 2, title: "C++" },
        { id: 3, title: "Python" },
        { id: 4, title: "Go" },
        { id: 5, title: "Kotlin" },
        { id: 6, title: "Javascript" }
      ],
      list:[
          {id:1,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557423435195&di=ec23b469a13dc0953c27a4f2b7ce6bfb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F20182%2F21%2F2018221142159_MZ33z.jpeg',
          title:'可爱的兔子',zhaiyao:'这么可爱的吗？好看的兔兔'},
          {id:2,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557423435195&di=ec23b469a13dc0953c27a4f2b7ce6bfb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F20182%2F21%2F2018221142159_MZ33z.jpeg',
          title:'可爱的兔子',zhaiyao:'这么可爱的吗？好看的兔兔'},
      ]

    };
  },
  mounted() {
    //当组件中的DOM结构被渲染好，并放到页面中后，会执行这个钩子函数
    //如果要操作元素了，最好在mounted 里面，因为，这时候的DOM元素是最新的
    //2.初始化滑动控件
    mui(".mui-scroll-wrapper").scroll({
      deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
    });
  },
  methods: {
    getAllCategory() {
      //获取所有的图片分类
      this.$http.get("api/getimgcategory").then(result => {
        if (result.body.status === 0) {
          //手动拼接出完整的分类列表
          result.body.message.unshift({ title: "全部", id: 0 });
          this.cates = result.body.message;
        }
      });
    },
    getPhotoListByCateId(catedId){
        //根据分类ID获取图片列表
        this.$http.get('api/getimages/'+catedid).then(result=>{
            if(result.body.status==0){
                this.list=result.body.message;
            }
        })
    }
  },
  created() {
    // this.getAllCategory();
    //默认进入页面，主动请求所有图片列表的数据
    // this.getPhotoListByCateId(0);
  }
};
</script>
<style lang="scss" scoped>
// *{
//     touch-action: pan-y;

// }


.photo-list{
    list-style: none;
    margin:0;
    padding: 10px;
    padding-bottom:0;
    li{
        background-color: #ccc;
        text-align:center;
        margin-bottom:10px;
        box-shadow: 0 0 6px #999;
        position: relative;
        img{
            width:100%;
            vertical-align: middle;
        }
        img[lazy=loading] {
        width: 40px;
        height: 300px;
        margin: auto;
        }

        .info{
            color:white;
            text-align:left;
            position: absolute;
            bottom:0px;
            background-color: rgba(0,0,0,0.4);
            max-height: 84px;
            width:100%;
            .info_title{
                font-size: 14px;
            }
            .info_body{
                font-size:13px;

            }
        }
    }
}
</style>
