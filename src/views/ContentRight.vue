<template>
    <div class="content-right">
        <user></user>
        <img-list></img-list>
        <text-list></text-list>
        <img src="http://qingwenyi.com/smedia/upload/1530.jpg" width="360px" height="236px">
    </div>
</template>
<script>
import User from '../components/User'
import ImgList from '../components/ImgList'
import TextList from '../components/TextList.vue'

export default {
    name: 'content-right',
    components: {
        TextList,
        ImgList,
        User
	}
}
</script>
<style scoped>
.content-right {
    float: right;
    width: 360px;
}

</style>