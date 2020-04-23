<template>
    <div class="top" v-show="isData">
        <h3>
        {{txt}}频道其他节目
        
        </h3>
        <ul>
        <li v-for='(list,index) in lists' :key='index'>
            <router-link :to='"/article/"+list.id'>{{list.title}}</router-link>
            <p>
            <span>文：{{list.author}}</span>
            <span>主播：{{list.podcast}}</span>
            </p>
        </li>
        </ul>
    </div>
</template>
<script>
export default {
    name: 'top',
    data() {
        return {
            lists:[],
            txt:null,
            isData:false
        }
    },
    methods: {
        getData() {
            this.axios.get('http://localhost:3000/api/articles/'+this.$route.params.num+'/top10')
            .then(res=>{
                this.isData=true
                this.lists=[]
                this.lists=this.lists.concat(res.data.res.articles)
                this.txt=res.data.res.type
            }).catch(err=>{
                console.log(err)
            })
        }
    },
    created() {
        this.getData()
    },
    watch: {
        '$route'() {
            this.getData()
        }
    }
}
</script>

<style scoped>
.top {
    background: #FFF;
    margin: 30px 0;
    padding: 30px;
}
.img-list, .top {
    background: #FFF;
    margin: 30px 0;
    padding: 30px;
}
.img-list h3, .top h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
    overflow: hidden;
}
.img-list h3 span,.top h3 span {
    float: right;
    vertical-align: middle;
    margin-left: 5px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
}
.top h3 span:hover {
  color: #ee5044
}
ul {
  padding-top: 30px
}
.arrows {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('../assets/arrows.png') center no-repeat;
    background-size: contain;
    vertical-align: bottom;
    transform: rotate(-90deg)
}
.top li {
    padding-bottom: 10px;
    border-bottom: 1px dashed #EEE;
    margin-bottom: 10px;
    line-height: 20px;
}
.top li:last-child {
  padding: 0;
  margin: 0;
  border: 0
}
.top li a {
    color: #999;
    font-size: 12px;
}
.top li a:hover {
  color: #ee5044;
}
.top li p {
    color: #999;
    line-height: 20px;
    font-size: 12px;
}
.top li p span {
    margin-right: 20px;
}
</style>