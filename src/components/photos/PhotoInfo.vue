<template>
  <div class="photoinfo-container">
    <h3>{{photoinfo.title}}</h3>
    <p class="subtitle">
      <span>发表时间：{{photoinfo.add_time | dateformat}}</span>
      <span>点击:{{photoinfo.click}}次</span>
    </p>
    <hr>

    <!-- 缩略图区域 -->
    
    <vue-preview
      :list="list"
      :thumbImageStyle="{width: '80px', height: '80px', margin: '10px'}"
      :previewBoxStyle="{border: '1px solid #eee'}"
      :tapToClose="true"
      @close="closeHandler"
      @destroy="destroyHandler"
    />

    <!-- 图片内容区域 -->
    <div class="content" v-html="photoinfo.content"></div>

    <!-- 评论子组件 现成的 -->
    <cmt-box id="id"></cmt-box>
  </div>
</template>
<script>
//1.导入评论子组件
import comment from "../subcomponents/comment.vue";
export default {
  data() {
    return {
      id: this.$route.params.id, //从路由中获取的 图片id
      photoinfo: {
          title:'今天是个好日子，心想的事儿都能成',
          add_time:'2019-5-20',
          click:20
      },//图片详情
      list: [//缩略图数组
        {
          src: 'https://placekitten.com/600/400',
          w: 600,
          h: 600
        },
        {
          src: 'https://placekitten.com/1200/900',
          w: 1200,
          h: 900
        }
      ],
    };
  },
  methods: {
    getPhotoInfo() {
      //获取图片的详情
      this.$http.get("api/getimageInfo/" + this.id).then(result => {
        if (result.body.status == 0) {
          this.photoinfo = result.body.message[0];
        }
      });
    },
    getThumbs(){
        //获取缩略图
        this.$http.get('api/getthuumimages/'+this.id).then(result=>{
            if(result.body.status===0){
                //循环每个图片数据，补全图片的宽和高
                result.body.message.foreach(item=>{
                    item.w=600;
                    item.h=400;
                });
                //把完整的数据保存到list中
                this.list= result.body.message;
            }
        })

    },
     // 即将关闭的时候，调用这个处理函数
    closeHandler() {
      console.log('closeHandler')
    },
    // 完全关闭之后，调用这个函数清理资源
    destroyHandler() {
      console.log('destroyHandler')
    }
  },
  created() {
    // this.getPhotoInfo();
    // this.getThumbs();
  },
  components: {
    //注册评论子组件
    "cmt-box": comment
  }
};
</script>
<style lang="scss" scoped>
.photoinfo-container {
  padding: 3px;
  h3 {
    color: #26a2ff;
    font-size: 15px;
    text-align: center;
    margin: 15px 0;
  }

  .subtitle {
    display: flex;
    justify-content: space-between;
    font-size: 13px;
  }
  .content {
    font-size: 13px;
    line-height: 30px;
  }
}
</style>
