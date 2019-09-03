<template>
  <div class="mavonEditor">
      <mavon-editor ref="md" :ishljs = "true" @imgAdd="imgAdd" v-model="articleContent" @save="saveContent"/>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'EditArtical',
  data () {
    return {
      markdownOption: {
        // bold: true // 粗体
      },
      articleContent: ''
    }
  },
  methods: {
    imgAdd (pos, $file) {
      console.log(pos, $file)
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('file', $file)
      axios({
        url: '/file/upload',
        method: 'post',
        data: formdata,
        headers: {
          'Content-Type': 'form-data'
        }
      }).then((data) => {
        // 第二步.将返回的url替换到文本原位置![...](./0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        console.log(data)
        this.$refs.md.$img2Url(pos, encodeURI(data.data))
      })
    },
    saveContent () {
      console.log(this.articleContent)
    }
  }
}
</script>

<style scoped>
  .mavonEditor {
    width: 100%;
    height: 100%;
  }
</style>
