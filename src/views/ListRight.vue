<template>
    <div class="listRight">
        <img src="../assets/code.jpg" alt="" width="100%">
        <top></top>
        <img src="../assets/show.jpg" alt="" width="100%">
    </div>
</template>

<script>
    import top from '../components/Top10.vue'
    export default {
    name: "ListLeft",
    components: {
        top
    }
}
</script>

<style scoped>
.listRight {
    width: 360px;
    float: right;
}
</style>