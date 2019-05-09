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
1.getComments

##实现点击加载更多评论的功能

1.为 【加载更多】按钮，绑定点击事件，在事件中，请求 下一页数据
2.点击加载更多，让pageIndex++ ，然后重新调用 this.getComments()方法，重新获取最新一页的数据 
3.为了防止新数据覆盖老数据的情况，每当点击加载更多 的时候，获取到新数据，应该用老数据调用数组的 concat方法，拼接上新数组。

##发表评论
1.把文本框做双向数据绑定
2.为发表按钮绑定一个事件
3.检查评论内容是否为空，如果为空，则Toast提示用户，评论内容不能为空
4.通过vue-resource发表一个请求，把评论内容提交给 服务器
5.当发表评论OK后，重新刷新列表，以查看最新的评论
    +如果调用getComments方法重新刷新评论列表的话，可能只能得到 最后一页的评论，前几页的评论获取不到
    +换一种思路，当评论成功后，在客户端，手动拼接出一个 最新的评论对象，然后 调用数组的unshift方法，把最新的评论，追加到 data中 comments的开头；这样，就能完美实现涮洗评论列表的需求。

##改造图片分享按钮 为路由的链接并显示对应的组件页面

##绘制图片列表 组件页面结构并美化样式
1.制作顶部的滑动条
2.制作底部的图片列表
###制作顶部滑动条的坑们：
1.需要借助 MUI 中的tab-top-webview-main.html
2.需要把 slider区域中的 mui-fullscreen 类去掉
3.滑动条无法正常触发滑动，通过检查官方文档，发现这是JS组件，需要被初始化：
 +导入mui.js
 +调用官方的方式去初始话：
 ```
 mui('.mui-scroll-wrapper').scroll({
	deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
});
 
 ```
 4. 我们在初始化滑动条的时候 ， 导入的mui.js,但是， 控制台报错：mui.min.js:946 Uncaught TypeError: 'caller', 'callee', and 'arguments' properties may not be accessed on strict mode functions or the arguments objects for calls to them
 + 经过合理的推测，觉得可能是mui.js中用到了caller', 'callee', and 'arguments'，但是，webpack 打包好的 bundle.js中，默认是启用严格模式的，所以，这两者冲突了；

 + 解决方案：
 1.把mui.js中的 非严格模式的代码改掉，但是不现实 
 2.把webpack打包时候的严格模式禁用掉。
 https://www.npmjs.com/package/babel-plugin-transform-remove-strict-mode
+ 最终，选择了 移除严格模式：使用这个插件：
babel-plugin-transform-remove-strict-mode
5. 刚进入 图片分享页面的时候，滑动条无法正常工作，经过我们认真的分析们，发现如果要初始化，滑动条，必须等Dom元素加载完毕，所以，我们把初始化滑动条的代码，搬到了 mounted生命周期函数中；
6. 当滑动条 调试 ok后，发现，tabbar 无法正常工作了，这时，需要把每个 tabbar按钮的样式中 'mui-tab-item'重新改一下名字；
7. 获取所有分类，并渲染列表

###制作图片列表区域
1. 图片列表需要使用懒加载技术，我们可以使用Mint-UI 提供的现成的组件 ‘lazy-load'
2. 根据 ‘lazy-load'的使用文档，尝试使用
3. 渲染图片列表数据

###实现了图片列表的懒加载改造 和样式美化

##实现了嗲集图片 跳转到 图片详情页面
1.在改造li 为 router-link的时候， 需要使用 tag 属性 指定要渲染为 哪种元素

##实现详情页面的布局和美化，同时 获取数据渲染页面
