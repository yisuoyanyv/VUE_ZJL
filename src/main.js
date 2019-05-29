import Vue from 'vue'
// 1.1导入路由的包
import VueRouter from 'vue-router'
//1.2安装路由
Vue.use(VueRouter)
//导入格式化时间的插件
import moment from 'moment'
//定义全局的过滤器
Vue.filter('dateformat',function(dataStr,pattern="YYYY-MM-DD HH:mm:ss"){
    return moment(dataStr).format(pattern)
})

//2.1导入 vue-resource 
import VueResource from 'vue-resource'
//2.2安装 vue-resource
Vue.use(VueResource)

Vue.http.options.root='http://localhost:8080/'//TODO
//全局设置 post 时候表单数据格式 组织形式
Vue.http.options.emulateJSON=true

//导入MUI 的样式
import './lib/mui/css/mui.css'
//导入MUI 的拓展图标样式
import './lib/mui/css/icons-extra.css'
//按需导入 Mint-UI中的组件
/*import {Header,Swipe,SwipeItem,Button,Lazyload} from 'mint-ui'
Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
Vue.use(Lazyload);*/

import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(MintUI)

//安装图片预览插件
import VuePreview from 'vue2-preview'
Vue.use(VuePreview)

//1.3导入自己的 router.js路由模块
import router from './router.js'
//导入App根组件
import app from './APP.vue'

//配置vuex的步骤
//1.运行 npm i vuex -S
//2.导入包
import Vuex from 'vuex'
//3.注册vuex到vue中
Vue.use(Vuex)

//每次刚进入网站，肯定会调用main.js，在刚调用的时候，先从本地缓存中读取，加载到car中
var car=JSON.parse(localStorage.getItem("car") || '[]')
//4.new Vuex.Store()实例，得到一个 数据仓储对象
var store=new Vuex.Store({
    state:{
        //可以把state 想象成组件中的data ,专门用来存储数据的
        //如果在组件中，想要访问， store中的数据，只能通过this.$store.state.**来访问
        car:car//将购物车中商品数据，用数组存储起来，在car数组中，存储一些商品的对象，暂时可以将这个商品对象设计成这样
        //{id:商品的id,count:要购买的数量，price :商品的单价，selected:false}

    },
    mutations:{
        //注意，如果要操作 store中的state值，只能通过调用 mutations中提供的方法，才能操作对应的数据。
        //不推荐直接操作state中的数据，因为玩意导致了数据的紊乱，不能快速定位到错误的原因。

        //注意，如果组件想要调用mutations中的方法，只能使用 this.$store.commit('方法名')
        //这种调用 mutations方法的格式，和 this.$emit('父组件中的方法名')

        addToCar(state,goodsinfo){
            //点击加入到购物车，将商品信息，保存到 store中的car上
            //分析：
            //1.如果购物车中，之前就已经有这个对应的商品了，只需更改数量即可。
            //2.如果没有，则直接把商品数据push到car中即可

            //假设 在购物车中没有找到 对应的商品。
            var flag=false;

            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count+=parseInt(goodsinfo.count)
                    flag=true
                    return true
                }
            })

            //如果最终循环完毕，得到的flag还是false，就把商品数据push到购物车中
            if(!flag){
                state.car.push(goodsinfo)
            }

            //当更新 car 之后，把car 数组，存储到本地的 localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))


        },

        updateGoodsInfo(state,goodsinfo){
            //修改购物车中商品的数量值
            //分析：
            state.car.some(item=>{
                if(item.id==goodsinfo.id){
                    item.count=parseInt(goodsinfo.count)
                    return true
                }
            })
            //当修改完商品数量 之后，把最新的car 数组，存储到本地的 localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))

        },
        removeFromCar(state,id){
            //根据ID，从store中的购物车中删除对应的那条商品数据
            state.car.some((item,i)=>{
                if(item.id==id){
                    state.car.splice(i,1)
                    return true
                }
            })

             //将删除完毕后的购物车数据，同步到本地的 localStorage中
             localStorage.setItem('car',JSON.stringify(state.car))
            
        },
        updateGoodsSelected(state,info){
            state.car.some(item=>{
                if(item.id==info.id){
                    item.selected=info.selected
                }
            })
            //当更新 car 之后，把car 数组，存储到本地的 localStorage中
            localStorage.setItem('car',JSON.stringify(state.car))
        }
    },
    getters:{
        //注意，这里的getters，只负责对外提供数据，不负责修改数据，如果想要修改state中的数据，请去找mutations.
        //经过对比发现，getters中的方法，和组件中的过滤器比较类似，都是没有修改愿数据，把原数据做了一层包装，提供给了 调用者；
        //其次，getters也和copputed比较像，只要state中的数据发生了变化，那么，如果getters正好也引用了这个数据，那么 就会立即触发getters的重新求值
        getAllCount(state){
            var c=0;
            state.car.forEach(item=>{
                c+=item.count
            })
            return c
        },
        getGoodsCount(state){
            var o={}

            state.car.forEach(item=>{
                o[item.id]=item.count
            })

            return o
        },
        getGoodsSelected(state){
            var o={}
            state.car.forEach(item=>{
                o[item.id]=item.selected
            })
            return o
        },
        getGoodsCountAndAmount(state){
            var o={
                count:0,//勾选的数量
                amount:0//勾选的总价
            }

            state.car.forEach(item=>{
                if(item.selected){
                    o.count+=item.count
                    o.amount+=item.price*item.count
                }

            })
            return o
        }
    }
    ///vuex总结
    //1.state中的数据，不能直接修改，如果想要修改，必须通过mutations
    //2.如果组件想要直接从state 上获取数据；需要 this.$store.state.***
    //3.如果 组件，想要修改数据，必须使用mutations提供的方法，需要通过 this.$store.commit('方法名'，唯一的一个参数)
    //4.如果 store中state上的数据，在对外提供的时候，需要做一层包装，那么，推荐使用 getterrs,如果需要使用getters,则用 this.$store.getters.***
    
})



var vm=new Vue({
    el:'#app',
    
    render:c=>c(app),
    router,//1.4挂载路由对象到VM实例上
    store,//5.将vuex 创建的 store 挂载到VM 实例上 ，只要挂载到了VM上，任何组件都能使用store来存取数据。
})