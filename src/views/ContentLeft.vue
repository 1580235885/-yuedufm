<template>
  <div class="content-left">
    <content-txt></content-txt>
    <comment></comment>
  </div>
</template>
<script>
import ContentTxt from '../components/ContentTxt.vue'
import Comment from '../components/Comment.vue'
export default {
  name: "contentleft",
  components: {
    ContentTxt,
    Comment
  }
}
</script>
<style scoped>

.content-left {
    float: left;
    width: 620px;
    box-sizing: border-box;
}
</style>