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