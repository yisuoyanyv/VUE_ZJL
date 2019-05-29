<template>
  <div>

    <div class="mui-numbox" data-numbox-min="1"  style="height:25px">
      <button class="mui-btn mui-btn-numbox-minus" type="button">-</button>
      <input id="test" class="mui-input-numbox" type="number" :value="initcount" readonly ref="numberbox" @change="countChanged">
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
            //数量改变了
            console.log(this.$refs.numberbox.value)
            //每当数量值改变，立即将最新的数量同步到 购物车的 store中，覆盖之前的数量值。
            this.$store.commit('updateGoodsInfo',{id:this.goodsid,count:this.$refs.numberbox.value})
        }
    },
    props:['initcount','goodsid']
   

};
</script>

<style lang="scss" scoped>
</style>
