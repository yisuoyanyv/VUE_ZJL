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

Vue.http.options.root='http://zjlspace'//TODO

//导入MUI 的样式
import './lib/mui/css/mui.css'
//导入MUI 的拓展图标样式
import './lib/mui/css/icons-extra.css'
//按需导入 Mint-UI中的组件
import {Header,Swipe,SwipeItem,Button} from 'mint-ui'


//1.3导入自己的 router.js路由模块
import router from './router.js'
//导入App根组件
import app from './APP.vue'

Vue.component(Header.name,Header)
Vue.component(Swipe.name,Swipe)
Vue.component(SwipeItem.name,SwipeItem)
Vue.component(Button.name,Button)
var vm=new Vue({
    el:'#app',
    render:c=>c(app),
    router,//1.4挂载路由对象到VM实例上
})