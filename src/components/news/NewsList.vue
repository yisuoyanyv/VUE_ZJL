<template>
  <ul class="mui-table-view">
    <li class="mui-table-view-cell mui-media" v-for="item in newslist" :key="item.id">
      <router-link :to="'/home/newsinfo/'+item.id" class>
        <img class="mui-media-object mui-pull-left" :src="item.img_url">
        <div class="mui-media-body">
          <h1>{{item.title}}</h1>
          <p class="mui-ellipsis">
              <span>发表时间：{{item.add_time | dateformat}}</span>
              <span>点击：{{item.click}}次</span>
          </p>
        </div>
      </router-link>
    </li>
   
  </ul>
</template>

<script>
import {Toast} from 'mint-ui'

export default {
    data(){
        return {
            newslist:[
                {id:1,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557072609518&di=4eb52e9e46aa42791c943417bd70daef&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F12d18d78cf9fd42415495eec5d6a2764c8f9df6e2a50d-smYHey_fw658',title:'这是一个很悲伤的故事',add_time:'2019-5-5',click:5},
                {id:2,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557072609518&di=4eb52e9e46aa42791c943417bd70daef&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F12d18d78cf9fd42415495eec5d6a2764c8f9df6e2a50d-smYHey_fw658',title:'这是一个很悲伤的故事',add_time:'2019-5-5',click:5},
                {id:3,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557072609518&di=4eb52e9e46aa42791c943417bd70daef&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F12d18d78cf9fd42415495eec5d6a2764c8f9df6e2a50d-smYHey_fw658',title:'这是一个很悲伤的故事',add_time:'2019-5-5',click:5},
                {id:4,img_url:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557072609518&di=4eb52e9e46aa42791c943417bd70daef&imgtype=0&src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F12d18d78cf9fd42415495eec5d6a2764c8f9df6e2a50d-smYHey_fw658',title:'这是一个很悲伤的故事',add_time:'2019-5-5',click:5},
            ],//新闻列表

        }
    },
    methods:{
        getNewsList(){//获取新闻列表
            this.$http.get('api/getnewslist').then(result=>{
                if(result.body.status===0){
                    //如果没有失败，应该将数据保存到data上
                    this.newslist=result.body.message

                }else{
                    Toast('获取新闻列表失败')
                }
            })


        }
    },
    created(){
        // this.getNewsList();
    }

};
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        h1{font-size:14px;}
    }
    .mui-ellipsis{
        font-size:12px;
        color:#226aff;
        display:flex;
        justify-content: space-between;
    }
}

</style>
