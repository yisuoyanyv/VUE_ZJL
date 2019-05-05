#这是一个Vue 入门级学习项目
#知识点后面会整理更新

1.git add .
2. git commit =m "体检信息"
3.git push
##制作首页App组件
1.完成Header区域，使用的是Mint-UI 中的Header 组件
2.制作底部的 Tabbar区域，使用的是 MUI 的Tabbar.html
    +在制作 购物车小图标的时候，注意以下操作
    +先把拓展图标 的css样式，拷贝到项目中
    +拷贝拓展图标的css样式依赖的ttf文件到项目中
    +为购物车小图标添加如下样式 “mui-icon mui-icon-extra mui-icon-extra-cart"
3.要在中间区域放置一个 router-view 来展示路由要匹配到中组件

##改造Tabbar 为 router-link

##设置路由高亮

##点击tabbar 中的路由连接，展示对应的路由组件

##制作首页轮播图布局

##加载首页轮播图数据
1.获取数据，如何获取呢 ，使用 vue-resource （也可用axios）加载后台api数据
2.使用 vue-resource 的this.$http.get 获取数据
3.获取的的数据，保存到data身上
4.使用v-for循环渲染数据

##改造九宫格区域的样式

##改造我们的新闻咨询路由链接

##新闻咨询页面制作
1.绘制界面，使用 MUI 中的media-list.html
2.使用vue-resource 获取数据
3.渲染真实数据

##实现新闻资讯列表 ，点击跳转到新闻详情
1.把列表中的每一项改造为 router-link，同时，在跳转的时候应该提供唯一的一个ID标识符
2.创建新闻详情的组件页面， NewsInfo.vue
3.在路由模块中，将新闻详情的路由地址 和 组件页面对应起来

##实现新闻详情的页面布局 和数据渲染

##单独封装一个comment.vue子组件
1.先创建一个单独的comment.vue 组件模板
2.在需要使用comment 组件的页面，先手动 导入 comment 组件
    + ·`import comment from './comment.vue'`
3.在父组件中，使用 `components`属性，将刚才导入的comment 组件，注册为自己的子组件
4.将注册子组件时候的，注册名称，以标签形式，在页面中引用。

##获取到所有的评论数据，显示到页面中

##实现点击加载更多评论的功能

1.为 【加载更多】按钮，绑定点击事件，在事件中，请求 下一页数据
2.点击加载更多，让pageIndex++ ，然后重新调用 this.getComments()方法，重新获取最新一页的数据 
3.为了防止新数据覆盖老数据的情况，每当点击加载更多 的时候，获取到新数据，应该用老数据调用数组的 concat方法，拼接上新数组。