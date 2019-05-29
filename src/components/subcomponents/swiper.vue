<template>
  <div>
      <!-- 将来，谁使用此轮播图组件，谁为我们传递 lunbotuList -->
      <!-- 此时，lunbotuList 应该是父组件向子组件传值来设置-->
    <mt-swipe :auto="4000">
      <mt-swipe-item v-for="item in lunbotuList" :key="item.id">
        <img :src="item.img" :class="{full:isfull}">
      </mt-swipe-item>
    </mt-swipe>
  </div>

  <!-- 分析：为什么商品评论中的轮播图 那么丑 -->

  <!-- 1.首页中的图片，它的宽和高，都是使用了 100%的宽度 -->
  <!-- 2，在商品详情页面中，轮播图的图片，如果也使用 宽高为100 的话，页面不好看 -->
  <!-- 3.商品详情页面中的轮播图，希望高度是100%，宽度自适应 -->
  <!-- 4.经分析，得到， 问题的原因：首页中的轮播图 和 详情页中的轮播图，分歧点是宽度到底是100%，还是自适应。 -->
  <!-- 5.既然这两个轮播图其他方面没有冲突，只是宽度有分析，那么我们可以定义一个属性，让轮播图的调用者，手动指定轮播图 的宽度是否为100% -->
</template>
<script>
export default {
    props:["lunbotuList","isfull"]
};
</script>

<style lang="scss" scoped>

.mint-swipe {
  height: 200px;
  text-align: center;
  // .mint-swipe-item:nth-child(1){
  //     background-color: red;
  // }
  .mint-swipe-item {
    // &:nth-child(1) {
    //   background-color: red;
    // }
    // &:nth-child(2) {
    //   background-color: green;
    // }
    // &:nth-child(3) {
    //   background-color: blue;
    // }
  }
  img {
    // width: 100%;
    height: 100%;
  }
}

.full{
    width:100%;
}

</style>

