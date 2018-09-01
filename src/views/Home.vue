<style lang="less">
  a{
    color: #4682BE;
    text-decoration: none;
  }

  .home{
    display: flex;
    height: 100%;

    /* 左侧导航栏 */
    .left{
      overflow-y: scroll;
      min-width: 295px;
      height: 100%;
      padding: 15px 8px 15px 25px;
      font-size: 15px;
      box-sizing: border-box;
      box-shadow: 10px 0 15px rgba(0,0,0,.1);

      /* big-title */
      .big-title>a{
        font-size: 23px;
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
    /*右侧导航栏*/
    .right{
      flex: 1;
      overflow-y: scroll;
      height: 100%;
      padding: 25px;
      line-height: 24px;
      font-size: 15px;
      color: #333;
      box-sizing: border-box;

      .content{
        min-width: 500px;
        max-width: 650px;
      }
      /*h2*/
      .small-title{
        margin-top: 60px;
        padding-top: 20px;
        border-top: 2px solid #000;
        font-size: 18px;
        font-weight: bold;
      }
      /* big-title */
      .big-title{
        font-size: 30px;
        font-weight: bold;
      }

      /*p*/
      p{
        margin-top: 20px;
      }

      /*content-list*/
      .content-list{
        list-style: none;
        margin: 30px;

        li{
          &:before{
            content: '-';
            margin-right: 5px;
          }
        }
      }

      /*h3*/
      h3{
        margin-top: 60px;
        padding-top: 20px;
        border-top: 1px dotted #000;
        font-size: 18px;
        font-weight: bold;
      }
      /*code 代码块高亮显示*/
      pre>code{
        display: block;
        margin: 10px 0;
        padding: 10px;
        line-height: 1.8;
        letter-spacing: 1px;
        background: #111;
        border-radius: 5px;
      }
      code{
        font-family: Verdana, Arial;
        padding-left: 3px;
        padding-right: 3px;
        background: #f9f2f4;
        color: #c7254e;
        font-size: 12px;

        border-radius: 2px;
      }
    }
  }
</style>

<template>
  <div class="home">
    <!-- 左侧导航栏 -->
    <div
      class="left"
      @click = "changeDocs($event)"
      v-html="slideBar"/>

    <div
      class="right"
      ref="right">
      <div
        class="content"
        v-html="right_doc"/>
    </div>
  </div>

</template>

<script>
import marked from 'marked'
export default {
  name: 'Home',
  data () {
    return {
      slideBar: '',
      right_doc: ''
    }
  },
  // 生命周期  页面 数据 挂载完毕 之后
  mounted () {
    hljs.initHighlightingOnLoad()
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
          const p = document.createElement('div')
          p.innerHTML = text
          Array.from(p.children).forEach(li => {
            li.children[0].setAttribute('data-name', li.children[0].href.split('/').slice(-1).toString())
            li.children[0].href = '#'
          })

          return `<ol class="slideBar-list" start="0">${p.innerHTML}</ol>`
        }
      	const m = marked(v.data, { renderer: rendererMD })
        this.slideBar = m
      }).catch(e => {
        console.log(e)
      })
    // 默认加载 README 文档
    this.loadDocs('README')
  },
  methods: {
    // 翻页
    changeDocs (e) {
      const name = e.target.getAttribute('data-name')
      // 点到其他的东西 不做任何反应
      console.log(name)
      if (name) {
        const s = name === '#README' ? 'README' : name
        this.loadDocs(s)

        // 右侧滑动清零
        this.$refs.right.scrollTop = 0
      }
    },
    // 加载右侧文档
    loadDocs (name) {
      this.$http.get(`/api/docs?name=${name}`)
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
            return `<ol class="content-list">${text}</ol>`
          }

          const m = marked(v.data, {
            renderer: rendererMD,
            highlight (code, lang) {
              if (lang && hljs.getLanguage(lang)) {
                return hljs.highlight(lang, code, true).value
              } else {
                return hljs.highlightAuto(code).value
              }
            }
          })
          this.right_doc = m
        }).catch(e => {
          console.log(e)
        })
    }
  }
}
</script>
