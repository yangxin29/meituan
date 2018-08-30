<style scoped lang="less">
  /* 左侧导航栏 */
  .left{
    width: 280px;
    height: 100%;
  }
</style>

<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <div class="left">
      1
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  // 生命周期  页面 数据 挂载完毕 之后
  mounted () {
    this.$http.get('/api/slideBar?')
      .then(v => {
      	console.log(v.data)
      }).catch(e => {
      	console.log(e)
      })
  }
}
</script>
