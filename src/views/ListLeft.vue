<template>
    <div class="listLeft">
        <article-list></article-list>
        <page></page>
    </div>
</template>

<script>
    import ArticleList from '../components/ArticleList.vue'
    import page from '../components/Page.vue'
    export default {
    name: "ListLeft",
    components: {
        ArticleList,
        page
    }
}
</script>

<style scoped>
.listLeft {
    width: 620px;
    float: left;
}
</style>