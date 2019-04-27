const path = require('path')
//启用热更新的 第2步
const webpack=require('webpack')
//新版webpack 配置vue 需要配置的VueLoaderPlugin
const VueLoaderPlugin=require('vue-loader/lib/plugin')
//导入在内存中生成html页面的插件
//只要是插件，都一定要放到 plugins 节点中去
//这个插件的两个作用：
//1.自动在内存中根据指定页面生成一个内存的页面
//2.自动，把打包好的 bundle.js 追加到页面中去。
const htmlWebpackPlugin=require('html-webpack-plugin')
//这个配置文件，起始就是一个JS文件，通过Node 中的模块操作，向外暴露了一个配置对象
module.exports={
    //在配置文件中，需要手动指定入口 和 出口
    entry:path.join(__dirname,'./src/main.js'),//入口，表示要使用webpack 打包哪个文件
    output:{//输出文件相关的配置
        
        path:path.join(__dirname,'./dist'),//指定打包好的文件，输出到哪个目录中去
        filename:'bundle.js',//这个指定输出的文件的名称
    },
    devServer:{//这是配置 dev-server 命令参数的第二种形式，相对了说，这种方式麻烦一些
        // --open --port 3002 --contentBase src --hot
        open:true,//自动打开浏览器
        port:3004,//设置启动时候的运行端口
        contentBase:'src',//指定托管的根目录
        hot:true,//启用热更新  第一步

    },
    plugins:[//配置插件的节点
         new webpack.HotModuleReplacementPlugin(),//new一饿热更新的 模块对象，这是启用热更新的第3部
         new htmlWebpackPlugin({//创建一个 在内存中生成 HTML 页面的插件
            template:path.join(__dirname,'./src/index.html'),//指定 模版页面，将来会根据指定的页面路径，去生成内存中的 页面
            filename:'index.html'//指定生成的页面的名称

         }),
         new VueLoaderPlugin(),

    ],
    module:{//这个节点，用于配置 所有第三方模块 加载器
        rules:[//所有第三方模块的 匹配规则
            {test:/\.css$/, use:['style-loader','css-loader']},//配置处理 .css 文件的第三方loader规则  ，调用顺序是从右到左
            {test:/\.less$/, use:['style-loader','css-loader','less-loader']},//配置处理.less文件的第三方loader规则
            {test:/\.scss$/, use:['style-loader','css-loader','sass-loader']},//配置处理 .scss文件的第三方loader规则
            {test:/\.(jpg|jpeg|png|gif|bmp)$/,use:'url-loader?limit=1024&name=[hash:8]-[name].[ext]'},//处理图片路径的loader 
            //limit 给定的值，是图片的大小，单位是byte，如果我们引用的图片，大于等于给定的limit值，则不会被转为base64格式的字符串，如果 图片
            //小于给定的limit值，则会被转为base64的字符串
            //name 设置图片被编译后的名称
            {test:/\.(ttf|eot|svg|woff|woff2)$/,use:'url-loader'},//处理字体文件
            {test:/\.js$/,use:'babel-loader',exclude:/node_modules/},//配置Babel 来转换高级的ES语法
            {test:/\.vue$/,use:'vue-loader'},//处理.vue文件的loader



        ]

    },
    resolve:{
        alias:{//修改Vue被导入的包的路径
            // "vue$":"vue/dist/vue.js"
        }
    }
};

//当我们在 控制台， 直接输入  webpack 命令执行的时候， wepack 做了以下几步；
//1. 首先，webpack 发现，我们并没有通过命令的形式，给他指定入口和出口
//2.webpack就会去项目的根目录中 ，查找一个叫 ‘webpack.config.js' 的配置文件
//3.当找到配置文件后， webpack 会去解析执行这个 配置文件， 当解析执行完配置文件后，就 得到了 配置文件
// 中，导出的配置对象

//4. 当webpack 拿到 配置对象后，就拿到了配置对象中，指定的入口和出口，然后进行打包构建。