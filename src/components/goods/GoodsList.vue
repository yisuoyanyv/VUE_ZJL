<template>
    <div class="goodslist">
        <!-- <router-link class="goodsitem" v-for="item in goodslist" :key="item.id" :to="'/home/goodsinfo/'+item.id" tag="div">
            <img :src="item.img_url" alt="">
            <h1 class="title"> {{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="cell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </router-link> -->

        <!-- 在网页中，有两种跳转方式：
        方式1:使用 a 标签的形式，叫做 标签跳转
        方式2:使用 window.location.href 的形式，叫做 编程式导航 -->
        <div class="goodsitem" v-for="item in goodslist" :key="item.id" @click="goDetail(item.id)">
            <img :src="item.img_url" alt="">
            <h1 class="title"> {{item.title}}</h1>
            <div class="info">
                <p class="price">
                    <span class="now">¥{{item.sell_price}}</span>
                    <span class="old">¥{{item.market_price}}</span>
                </p>
                <p class="cell">
                    <span>热卖中</span>
                    <span>剩{{item.stock_quantity}}件</span>
                </p>
            </div>
        </div>

        <mt-button type="danger" size="large" @click="getMore()">加载更多</mt-button>
        
        
    </div>
</template>
<script>
export default {
    data(){
        //往自己组件内部挂载 一些私有数据的
        return {
            pageindex:1,//分页的页数
            goodslist:[
                {img_url:'https://placekitten.com/400/600',
                title:'小米6 至尊陶瓷版 全网通',
                sell_price:2499,
                market_price:2399,
                stock_quantity:500,
                id:1
                },
                {img_url:'https://placekitten.com/400/600',
                title:'小米6 至尊陶瓷版 全网通',
                sell_price:2499,
                market_price:2399,
                stock_quantity:500,
                id:2,
                },
                {img_url:'https://placekitten.com/400/600',
                title:'小米6 至尊陶瓷版 全网通',
                sell_price:2499,
                market_price:2399,
                stock_quantity:500,
                id:3
                }
            ],//存放商品列表的数组

        }
    },
    methods:{
        getGoodsList(){
            //获取商品列表
            this.$http.get('api/getgoods?pageindex='+this.pageindex).then(result=>{
                if(result.body.status===0){
                    this.goodslist=this.goodslist.concat(result.body.message);
                }
            })
        },
        getMore(){
            this.pageindex++;
            this.getGoodsList();
        },

        goDetail(id){
            //使用JS的形式进行路由导航
            //注意区分 this.$route 和 this.$router 这两个对象，
            //其中，this.$route 是路由参数对象，所有路由中的参数，params,query都属于它
            //其中，this.$router 是一个路由导航对象，用它可以方便的使用 JS代码，实现路由的 前进，后退  ，跳转到新的 RUL地址。
            
            //1.最简单的
            // this.$router.push('/home/goodsinfo/'+id)
            //2.传递对象
            // this.$router.push({path:'/home/goodsinfo/'+id})
            //3.传递命名的路由
            this.$router.push({name:"goodsinfo",params:{id}})
        },
    },
    created(){
        // this.getGoodsList();
    }
    
}
</script>
<style lang="scss" scoped>

.goodslist{
    display:flex;
    flex-wrap: wrap;
    padding: 7px;
    justify-content: space-between;
    .goodsitem{
        width:49%;
        border:1px solid #ccc;
        box-shadow: 0 0 8px #ccc;
        margin:4px 0;
        padding:2px; 
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        min-height: 200px;
        img{
            width:100%;
        }
        .title{
            font-size: 14px;
        }

        .info{
            background-color: #eee;
            p{
                margin:0;
                padding:5px;
            }
            .price{
                

                .now{
                    color:red;
                    font-weight: bold;
                    font-size: 16px;

                }

                .old{
                    text-decoration: line-through;
                    font-size: 12px;
                    margin-left: 10px;

                }

            }

            .sell{

            }
        }

    }
}

</style>
