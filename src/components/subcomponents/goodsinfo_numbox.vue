<template>
  <div>
      <!-- 问题：我们不知道什么时候能拿到max值，但是，总归有一刻，会得到一个真正的max值 -->
      <!-- 我们可以使用 watch 属性监听，来监听父组件传递过来的max，不管 watch 会被触发几次，
      但是，最后一次，总是一个合法的max值 -->
    <div class="mui-numbox" data-numbox-min="1" >
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" value="1" ref="numberbox" @change="countChanged">
      <button class="mui-btn mui-btn-numbox-plus" type="button">+</button>
    </div>
  </div>

  <!-- 分析：子组件什么时候把数据传递给父组件 -->
</template>
<script>
//TODO 这里注释如果打开，则点击+的时候，会加2
// import mui from '../../lib/mui/js/mui.min.js'
export default {
    mounted(){
        //初始化数字选择框组件
        // mui('.mui-number').numbox();//不用初始化可以点 
    },methods:{
        countChanged(){
            //每当文本框的数据被修改的时候，立即把 最新的数据，通过事件调用，传递给父组件
            // console.log(this.$refs.numberbox.value);
            this.$emit('getcount',parseInt(this.$refs.numberbox.value));
        }
    },
    props:['max'],
    watch:{
        //属性监听
        'max':function(newVal,oldVal){
            // mui(".mui-numbox").numbox().setOption('max',vewVal)

        }
    }

};
</script>

<style lang="scss" scoped>
</style>
