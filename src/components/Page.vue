<template>
    <div class="page" v-show="isData">
        <ul>
            <li v-show="$route.params.page>1" @click="upPage" style="margin-right:20px">上一页</li>
            <li v-for="(count,index) in counts" :key='index' v-show="$route.params.page>4&&$route.params.page<=counts-3&&$route.params.page>index-3&&$route.params.page<index+6||$route.params.page<=4&&index<8&&index>-1||$route.params.page>counts-3&&counts>=index&&counts-9<index">
                <router-link :to="'/list/'+$route.params.num+'/page/'+count" :class="{active:index+1==$route.params.page}"> {{count}}</router-link>
            </li>
            <li v-show="$route.params.page<counts" @click="downPage" style="margin-left:20px">下一页</li>
        </ul>
    </div>
</template>

<script>
import bus from '../bus'
export default {
    name:'page',
    data() {
        return {
            counts:1,
            isData:false
        }
    },
    created() {
        bus.$on('sendPage',(count)=> {
            this.counts=Math.ceil(count/10)
            this.isData=true
        })
    },
    methods: {
        upPage() {
            this.$router.push({path:'/list/'+this.$route.params.num+'/page/'+(this.$route.params.page-1)})
        },
        downPage() {
            this.$router.push({path:'/list/'+this.$route.params.num+'/page/'+eval(this.$route.params.page+'+'+1)})
        }
    }
}
</script>

<style scoped>
.page .active {
    color: #ee5044
}
.page {
    width: 100%;
    text-align: center
}
.page ul {
    display: inline-block;
    margin: auto;
    overflow: hidden;
}
.page ul li {
    font-size: 12px;
    cursor: pointer;
    float: left;
}
.page ul li:hover,.page li a:hover {
    color: #ee5044
}
.page a {
    padding: 3px 10px;
    font-size: 12px;
    color: #707070;
}
</style>