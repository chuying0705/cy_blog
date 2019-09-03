<template>
  <div >
    <div id="content" v-html="content"></div>
  </div>
</template>

<script>
import marked from 'marked'
import hljs from 'highlight.js'
import 'highlight.js/styles/xcode.css'
export default {
  name: 'EditArtical',
  data () {
    return {
      articleContent: '#### how to use mavonEditor in nuxt.js![img7.jpg](public%5Cupload%5C20198291640372269.jpg)',
      content: ''
    }
  },
  mounted () {
    marked.setOptions({
      highlight: function (code) {
        return hljs.highlightAuto(code).value
      }
    })
    this.content = marked(this.articleContent)
  }
}
</script>

<style scoped>
  .markdown-body .highlight pre, .markdown-body pre,
  /deep/ #content pre{
    background-color: #f6f8fa;
    boder: 1px solid #ccc;
    border-radius: 3px;
    /*font-size: 85%;*/
    line-height: 1.45;
    overflow: auto;
    padding: 16px;
  }
</style>
