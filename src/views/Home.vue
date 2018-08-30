<style lang="less">
  a{
    color: #4682BE;
    text-decoration: none;
  }

  .home{
    height: 100%;

    /* 左侧导航栏 */
    .left{
      overflow-y: scroll;
      width: 280px;
      height: 100%;
      padding: 15px 8px 15px 25px;
      font-size: 15px;

      /* big-title */
      .big-title>a{
        font-size: 25px;
        font-weight: bold;
        color: #000;
      }

      /* p */
      p{
        margin-top: 15px;
      }

      /* 目录 */
      .small-title{
        margin-top: 10px;
        font-size: 14px;
        font-weight: bold;
      }

      /* li */
      .slideBar-list{
        margin-top: 10px;
        li{
          margin: 3px 0;
          margin-left: 40px;
          font-size: 13px;
        }
      }
    }
  }
</style>

<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <div
      class="left"
      v-html="slideBar"/>
  </div>
</template>

<script>
import marked from 'marked'

export default {
  name: 'Home',
  data () {
    return {
      slideBar: ''
    }
  },
  // 生命周期  页面 数据 挂载完毕 之后
  mounted () {
    this.$http.get('/api/slideBar?')
      .then(v => {
        const rendererMD = new marked.Renderer()
        // h
        rendererMD.heading = (text, level) => {
          if (level === 1) {
	          return `<h${level} class="big-title">${text}</h${level}>`
          } else {
	          return `<h${level} class="small-title">${text}</h${level}>`
          }
        }

        // ol
        rendererMD.list = (text, level, a) => {
          console.log(text, level, a)
          return `<ol class="slideBar-list" start="0">${text}</ol>`
        }
      	const m = marked(v.data, {renderer: rendererMD})
        this.slideBar = m
      }).catch(e => {
        console.log(e)
      })
  }
}
</script>
