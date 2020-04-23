<template>
  <div class="text-list" v-show="isData">
    <h3>
      {{txt}}频道其他节目
      <span @click="all">
        查看全部
        <i class="arrows right"></i>
      </span>
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
import bus from '../bus.js'
export default {
    name: 'TextList',
    data(){
      return {
        lists:[],
        txt:'悦读FM',
        tab:null,
        isData:false
      }
    },
    created() {
      bus.$on('typeid',type=>{
        this.tab=type
        this.getData()
      })
      this.getData()
    },
    methods: {
      getData() {
        this.txt=this.$route.params.id==undefined?'悦读FM':this.tab==1?'悦读':this.tab==2?'情感':this.tab==3?'连播':this.tab==4?'校园':this.tab==5?'音乐':this.tab==6?'Labs':'悦读FM'
        this.axios.get('http://localhost:3000/api/articles/'+this.tab+'/rand')
        .then(res =>{
          this.isData=true
          this.lists=[]
          this.lists=this.lists.concat(res.data.res)
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      all() {
        this.$router.push({path:'/list/'+this.tab+'/page/1'})
      }
    }
}
</script>
<style scoped>
.text-list {
    background: #FFF;
    margin: 30px 0;
    padding: 30px;
}
.img-list, .text-list {
    background: #FFF;
    margin: 30px 0;
    padding: 30px;
}
.img-list h3, .text-list h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
    overflow: hidden;
}
.img-list h3 span,.text-list h3 span {
    float: right;
    vertical-align: middle;
    margin-left: 5px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
}
.text-list h3 span:hover {
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
.text-list li {
    padding-bottom: 10px;
    border-bottom: 1px dashed #EEE;
    margin-bottom: 10px;
    line-height: 20px;
}
.text-list li:last-child {
  padding: 0;
  margin: 0;
  border: 0
}
.text-list li a {
    color: #999;
    font-size: 12px;
}
.text-list li a:hover {
  color: #ee5044;
}
.text-list li p {
    color: #999;
    line-height: 20px;
    font-size: 12px;
}
.text-list li p span {
    margin-right: 20px;
}
</style>