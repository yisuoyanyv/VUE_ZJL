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

//1.3导入自己的 router.js路由模块
import router from './router.js'
//导入App根组件
import app from './APP.vue'




var vm=new Vue({
    el:'#app',
    
    render:c=>c(app),
    router,//1.4挂载路由对象到VM实例上
})