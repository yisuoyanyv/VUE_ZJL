import Vue from 'vue'

//导入MUI 的样式
import './lib/mui/css/mui.css'

//按需导入 Mint-UI中的组件
import {Header} from 'mint-ui'
//导入App根组件
import app from './APP.vue'

Vue.component(Header.name,Header)
var vm=new Vue({
    el:'#app',
    render:c=>c(app)
})