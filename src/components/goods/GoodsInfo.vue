<template>
    <div class="goodsinfo-container">

        <transition @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter">
            <div class="ball" v-show="ballFlag" ref="ball"></div>
        </transition>
        <!-- 商品轮播图区 -->
        <div class="mui-card">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <swiper :lunbotuList="lunbotu" :isfull="false"></swiper>
					</div>
				</div>
			</div>

        <!-- 商品购买区 -->

        <div class="mui-card">
				<div class="mui-card-header">{{goodsinfo.title}}</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p class="price">
                            市场价：<del>¥{{goodsinfo.market_price}}</del>&nbsp;销售价:<span class="now_price">¥{{goodsinfo.sell_price}}</span>
                        </p>
                        <p>
                            购买数量:<numbox @getcount="getSelectedCount" :max="goodsinfo.stock_quantity"></numbox>
                        </p>
                        <p>
                            <mt-button type="primary" size="small">立即购买</mt-button>
                            <mt-button type="danger" size="small" @click="addToShopCar()">加入购物车</mt-button>
                            <!-- 分析：如何实现加入购物车时候，拿到选择的数量 -->
                            <!-- 1.经分析发现：按钮属于goodsinfo页面，数字 属于 numberbox组件 -->
                            <!-- 2.由于涉及到了父子组件的嵌套，所以，无法直接在goodsinfo 页面中获取到选中的商品数量值 -->
                            <!-- 3.怎么解决这个问题：设计到了子组件向父组件传值了（事件调用机制） -->
                            <!-- 4.事件调用的本质：父向子传递方法，子调用这个方法，同时把数据当作参数传递 给这个方法。 -->
                        </p>
					</div>
				</div>
				
			</div>

        <!-- 商品参数区 -->
        <div class="mui-card">
				<div class="mui-card-header">商品参数</div>
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
                        <p>商品货号：{{goodsinfo.goods_no}}</p>
                        <p>库存情况：{{goodsinfo.stock_quantity}}件</p>
                        <p>上架时间：{{goodsinfo.add_time | dateformat}}</p>
					</div>
				</div>
				<div class="mui-card-footer">
                    <mt-button type="primary" size="large" plain @click="goDesc(id)">图文介绍</mt-button>
                    <mt-button type="danger" size="large" plain @click="goComment(id)">商品评论</mt-button>
                </div>
			</div>
    </div>
</template>
<script>
//导入轮播图组件
import swiper from "../subcomponents/swiper.vue"

import numbox from "../subcomponents/goodsinfo_numbox.vue"
export default {
    data(){
        return {
            id:this.$route.params.id,//将路由参数对象中的id 挂载到data上，方便后期调用
            lunbotu:[{
                img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557423435195&di=ec23b469a13dc0953c27a4f2b7ce6bfb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F20182%2F21%2F2018221142159_MZ33z.jpeg'
            },{
                img:'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1557423435195&di=ec23b469a13dc0953c27a4f2b7ce6bfb&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F20182%2F21%2F2018221142159_MZ33z.jpeg'
            }],//轮播图的数据
            goodsinfo:{
                title:'小米6 至尊故宫版',
                market_price:2999,
                sell_price:2699,
                goods_no:100001,
                stock_quantity:99,
                add_time:'2019-05-27'

            },//获取到的商品的信息
            ballFlag:false,//控制小球的隐藏和显示的标识符
            selectedCount:1,//保存用户选中的商品数量，默认用户买一个

        }
    },
    methods:{
        getLunbotu(){
            this.$http.get('api/getthumimages/'+this.id).then(result=>{
                if(result.body.status===0){
                    //先循环轮播图数组的每一项，为 item 添加 img属性，因为轮播图组件中，只认识 item.img,不认识item.src
                    result.body.message.forEach(item=>{
                        item.img=item.src
                    })
                    this.lubotu=result.body.message

                }
            })

        },

        getGoodsInfo(){
            //获取商品的信息
            this.$http.get('api/goods/getinfo/'+this.id).then(result=>{
                if(result.body.status===0){
                    this.goodsinfo=result.body.message[0];

                }
            })
        },

        goDesc(id){
            //点击使用编程式导航跳转到 图文介绍页面
            this.$router.push({name:"goodsdesc",params:{id}})

        },
        goComment(id){
            //点击跳转到 评论页面
            this.$router.push({name:"goodscomment",params:{id}})

        },
        addToShopCar(){
            //添加到购物车
            this.ballFlag=!this.ballFlag;
            //{id:商品的id,count:要购买的数量，price :商品的单价，selected:false}

            //拼接出一个要保存到 store中的商品对象
            var goodsinfo={id:this.id,count:this.selectedCount,price:this.goodsinfo.sell_price,selected:true}
            //调用store 中的mutations 来将商品加入到购物车中
            this.$store.commit('addToCar',goodsinfo)
            
        },

        beforeEnter(el){
            el.style.transform="translate(0,0)";//起始位置

        },
        enter(el,done){
            el.offsetWidth;
            //小球动画优化思路：
            //1.先分析导致动画 不准确的本质原因： 我们把小球 最终 位移到的位置，已经局限在了某一分辨率下的 滚动条未滚动的情况下；
            //2.只要分辨率 和测试时候的不一样，或者 滚动条有一定的滚动距离之后，问题就出现了；
            //3.因此，经过分析得到，不能把位置的纵横坐标 直接写死了，而是应该 根据不同情况，动态计算这个坐标值；
            //4.经过分析，得出解题思路： 先得到徽标的横纵坐标， 再得到小球的横纵坐标，然后 让 y求差，x值也求差， 得到的 结果，就是纵横坐标要位移的距离
            //5.如何获取徽标和小球的位置？？？ domOject.getBoundingClientRect()

            //获取小球 在页面中的位置
            const ballPostion=this.$refs.ball.getBoundingClientRect();
            //获取徽标在页面中的位置
            const badgePostion=document.getElementById("badge").getBoundingClientRect();

            const xDist=badgePostion.left-ballPostion.left;
            const yDist=badgePostion.top-ballPostion.top;

            
            el.style.transform=`translate(${xDist}px,${yDist}px)`;
            el.style.transition="all 0.5s cubic-bezier(.4,-0.3,1,.68)";
            done()


        },
        afterEnter(el){
            this.ballFlag=!this.ballFlag;

        },
        getSelectedCount(count){
            //当子组件把选中的数量传递给子组件的时候，把选中的值保存到data上。
            this.selectedCount=count;
            console.log('父组件拿到的数量值为：'+this.selectedCount)

        }


    },
    created(){
        // this.getLunbotu()
        // this.getGoodsInfo()
    },
    components:{
        swiper,
        numbox

    }
    
}
</script>
<style lang="scss" scoped>
.goodsinfo-container{
    background-color: #eee;
    overflow: hidden;

    .mui-card-footer{
        display: block;

        button{
            margin:15px 0;
        }
    
    }

    .ball{
        width:15px;
        height: 15px;
        border-radius: 50%;
        background-color: red;
        position:absolute;
        z-index:99;
        top:410px;
        left:80px;
    }

}


</style>
