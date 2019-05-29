<template>
    <div class="shopcar-container">
        <div class="goods-list">
            <!--商品列表项区  -->
            <div class="mui-card"  v-for="(item,i) in goodslist" :key="item.id">
				<div class="mui-card-content">
					<div class="mui-card-content-inner">
						<mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChange(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
                        <img :src="item.thum_path" alt="">
                        <div class="info">
                            <h1>{{item.title}}</h1>
                            <p>
                                <span class="price">¥{{item.sell_price}}</span>
                                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                                <!-- 问题：如何从商品的购物车中获取数量 -->
                                <!-- 1.我们可以先创建一个空对象，然后循环购物车中所有商品的数据，把当前循环商品的ID，作为对象的属性名，
                                ，count值作为对象的属性值，这样当把所有的商品循环一遍，就会得到一个对象： {88:9,90:1} -->
                                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
                            </p>
                        </div>
					</div>
				</div>
			</div>

            <!-- 结算区域 -->
            <div class="mui-card" >
				<div class="mui-card-content">
					<div class="mui-card-content-inner jiesuan">
                        <div class="left">
                            <p>总计（不含运费）</p>
                            <p>已勾选商品 <span class="red">{{$store.getters.getGoodsCountAndAmount.count}}</span>件，总价 ¥ <span class="red">{{$store.getters.getGoodsCountAndAmount.amount}}</span></p>

                        </div>
						<mt-button type="danger">去结算</mt-button>
					</div>
                    
				</div>
			</div>
        </div>
    </div>
</template>
<script>
import numbox from '../subcomponents/shopcar_numbox.vue'
export default {
    data(){
        return {
            goodslist:[{
                id:'1',
                thum_path:'https://i8.mifile.cn/a1/pms_1558857668.87751277.jpg',
                title:'Redmi K20 Pro',
                sell_price:'2999'

            },
           ],//购物车中所有商品的数据

        }
    },
    methods:{
        getGoodsList(){
            //1.获取到store中所有的商品的Id，然后拼接出一个 用逗号分隔的字符串。
            var idArr=[]
            this.$store.state.car.forEach(item=>idArr.push(item.id));
            //如果购物车中没有商品，则直接返回，不需要请求后台接口，否则会报错
            if(idArr.length<=0){
                return;
            }
            //获取购物车商品列表
            this.$http.get('api/goods/getshopcarlist/'+idArr.join(",")).then(result=>{
                if(result.body.status==0){
                    this.goodslist=result.body.message;

                }

            })
        },
        remove(id,index){
            //点击删除，把商品从store中根据传递的id删除，把当前组件中的goodslist中，对应要删除的那个商品，使用index来删除
            this.goodslist.splice(index,1)
            this.$store.commit('removeFromCar',id)


        },
        selectedChange(id,val){
            //每当点击开关，把最新的开关状态同步到store中
            // console.log(id+'--'+val)
            this.$store.commit('updateGoodsSelected',{id,selected:val})
        }
    }
    ,
    created(){
        // this.getGoodsList();//
    },
    components:{
        numbox
    }
}
</script>

<style lang="scss" scoped>
.shopcar-container{
    background-color: #eee;
    overflow: hidden;

    .goods-list{
        .mui-card-content-inner{
            display:flex;
            align-items:center;
        }
        img{
            height: 60px;
            width:60px;
        }
        h1{
            font-size: 14px;
        }

        .info{
            display:flex;
            flex-direction: column;
            justify-content: space-between;
            .price{
                color:red;
            }
        }
    }

    .jiesuan{
        display: flex;
        justify-content: space-between;
        .red{
            color:red;
            font-size: 16px;
            font-weight: 900;
        }
    }
}

</style>


