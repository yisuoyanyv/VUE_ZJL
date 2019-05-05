<template>
<div class="cmt-container">
    <h3>发表评论</h3>
    <hr>
    <textarea placeholder="请输入您的高见（最多允许120字）" maxlength="120"></textarea>
    <mt-button type="primary" size="large">发表评论</mt-button>
    <div class="cmt-list">
        <div class="cmt-item" v-for="(item,index) in comments" :key="item.add_time">
            <div class="cmt-title">
                第{{index}}楼&nbsp;&nbsp;用户：{{item.user_name}}&nbsp;&nbsp;发表时间：{{item.add_time|dateformat}}
            </div>
            <div class="cmt-body">{{item.content === 'undefined' ?'此用户很懒，没留下评论':item.content}}</div>
        </div>
         
    </div>
    <mt-button type="primary" size="large" plain @click="getMore">加载更多</mt-button>
</div>
    
</template>
<script>
import {Toast} from 'mint-ui'
export default {
    data(){
        return {
            pageIndex:1,//默认展示第一页数据
            comments:[
                {user_name:'zjl',add_time:'2019-12-12 12:12:12',content:'窗前明月光，你是地上双'},
                {user_name:'zjl',add_time:'2019-12-12 12:12:12',content:'窗前明月光，你是地上双'},

                {user_name:'zjl',add_time:'2019-12-12 12:12:12',content:'窗前明月光，你是地上双'},
                {user_name:'zjl',add_time:'2019-12-12 12:12:12',content:'窗前明月光，你是地上双'},

            ]//所有的评论数据
        }
    },
    methods:{
        getComments(){//获取评论
            this.$http.get("/api/getcomments/"+this.id+"?pageindex="+this.pageIndex)
            .then((result)=>{
                if(result.body.status ===0){
                    //每当获取新评论数据的时候，不要把老数据清空覆盖，而是应该以老数据拼接上新数据。
                    this.comments=this.comments.concat(result.body.message);

                }else{
                    Toast('获取评论失败！')

                }
            })
        },
        getMore(){
            //加载更多
            this.pageIndex++;
            this.getComments();
        }

    },
    props:["id"],
    created(){
        // this.getComments()
    }
    
}
</script>

<style lang="scss" scoped>
.cmt-container{
    h3{
        font-size: 18px;
    }
    textarea{
        font-size: 14px;
        height: 85px;
        margin:0;
    }

    .cmt-list{
        margin:5px 0;

        .cmt-item{
            font-size: 13px;
            .cmt-title{
                line-height: 30px;
                background-color: #ccc;
                

            }

            .cmt-body{
                line-height: 35px;
                text-indent:2em;
                
            }

        }
    }
}

</style>
