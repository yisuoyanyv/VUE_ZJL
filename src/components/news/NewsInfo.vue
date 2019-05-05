<template>
<div class="newsinfo-container">
    <!--大标题 -->
    <h3 class="title">{{newsinfo.title}}</h3>
    <!-- 子标题 -->
    <p class="subtitle">
        <span>发表时间：{{newsinfo.add_time | dateformat}}</span>
        <span>点击：{{newsinfo.click}}次</span>
    </p>
    <hr>
    <!-- 内容区域 -->
    <div class="content" v-html="newsinfo.content"></div>

    <!-- 评论 子组件 区域 -->
    <comment-box :id="this.id"></comment-box>


</div>
    
</template>
<script>
import {Toast} from 'mint-ui'

//1.导入评论子组件
import comment from '../subcomponents/comment.vue'
export default {
    data(){
        return {
            id:this.$route.params.id,//将URL地址中传递过来的的参数值保存，方便以后调用
            newsinfo:{//新闻对象
                title:'太有钱总是件比较伤脑筋的事 巴菲特股东大会56个问答实录',
                add_time:'2019-5-5',
                click:100,
                content:'五一假期，有票乘客却上不了火车的消息引发关注。昨天，铁路部门致歉并表示将与有关部门共商增加诚信记录内容。而在江西，一名“买短乘长”逃票旅客，被拘10天！<h2>这真是好玩的实现</h2>'


            }
        }
    },
    methods:{
        getNewsInfo(){
            //获取新闻详情
            this.$http.get('api/getnew/'+this.id).then(result=>{
                if(result.body.status ===0){

                    this.newsinfo=result.body.message[0]
                }else{
                    Toast('获取新闻失败！')
                }
            })
        }
    },
    created(){
        // this.getNewsInfo()
    },
    components:{//用来注册子组件的节点
        'comment-box':comment

    }
}
</script>
<style lang="scss" >
.newsinfo-container{
    padding: 0 4px;
    .title{
        font-size: 16px;
        text-align:center;
        margin:15px 0;
        color:red;
    }

    .subtitle{
        font-size: 13px;
        color:#226aff;
        display: flex;
        justify-content: space-between;

    }
    .content{
        img{
            width:100%;
        }
    }

}

</style>
