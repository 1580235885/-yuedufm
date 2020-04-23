<template>
    <div class="comment" v-show="isData">
      <div class="comment-content">
        <textarea name id cols="30" rows="10" placeholder="说点什么吧！" v-model="msg"></textarea>
        <button @click="addData">评论</button>
      </div>
      <div class="comment-list">
        <p>最新评论（{{lists.length}}）</p>
        <ul v-if="lists.length">
          <li v-for="(list,index) in lists" :key="index">
            <img src="http://www.yuedufm.com/static/file/member/defaultuser " alt />
            <div>
              <p>
                {{list.nikiname}}
                <span>{{list.reply_time}}</span>
              </p>
              <p>{{list.content}}</p>
            </div>
            <span class="del" @click="del(list.id,list.nikiname)">删除</span>
          </li>
        </ul>
        <ul v-else style="text-align:center;padding-bottom:20px" >暂无评论</ul>
      </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    name: 'comment',
    data() {
      return {
        lists:[],
        msg:'',
        isData:false
      }
    },
    methods: {
      getData() {
        this.axios.get('http://localhost:3000/api/comments/'+(this.$route.params.id==undefined?1025:this.$route.params.id)+'/page/1')
        .then(res =>{
          this.isData=true
          this.lists=[]
          if(res.data.res){
            this.lists=this.lists.concat(res.data.res)
          }
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      addData() {
        if(localStorage.getItem('token')) {
          if(this.msg.trim()) {
             this.axios.post('http://localhost:3000/api/comment',{
              article_id:parseInt(this.$route.params.id==undefined?1025:this.$route.params.id),
              content:this.msg,
            },
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(res=>{
              if(res.data.res_code==200) {
                this.msg=''
                alert('评论发表成功！')
                this.getData()
              }else if(res.data.res_code==401) {
                alert('登录超时，请重新登录!')
              }
            }).catch(err=>{
              console.log(err)
            })
          }else {
            alert('评论不能为空！')
          }
        }else {
          alert('请登录后评价！')
        }
      },
      del(id,user) {
        if(localStorage.getItem('token')){
          if(localStorage.getItem('usermsg')==user) {
            this.axios.delete('http://localhost:3000/api/comment/'+id,{
              headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
              }
            }).then(res=>{
              if(res.data.res_code==200){
                this.getData()
                alert('删除成功！')
              }
            }).catch(err=>{
              console.log(err)
            })
          }else{
            alert('您没有权限删除他人评论！')
          }
        }else{
          alert('请登录！')
        }
      }
    },
    created() {
      this.getData()
      bus.$on('token',data=>{
        localStorage.setItem('token',data)
      })
      bus.$on('usermsg',data=>{
        localStorage.setItem('usermsg',data)
      })
    },
    watch:{
      '$route'(){
        this.getData()
      }
    }
}
</script>

<style scoped>
.comment-content {
    overflow: hidden;
    margin-bottom: 30px;
    display: flex;
    justify-content: space-between;
}
.comment-content textarea {
    background: #FFF;
    width: 530px;
    padding: 10px;
    height: 30px;
    line-height: 16px;
    font-size: 12px;
    resize: none;
    border: 0;
    outline: none;
}
.comment-content button {
    width: 70px;
    background: #ee5044;
    font-size: 12px;
    color: white;
    text-align: center;
    height: 50px;
    line-height: 50px;
    border: none;
    outline: 0;
    cursor: pointer;
}
.comment-list {
    width: 100%;
    overflow: hidden;
}
.comment-list>p {
    
    color: #ee5044;
    background: #FFF;
    float: left;
    padding: 0 15px;
    line-height: 40px;
    cursor: pointer;
    font-size: 12px;
}
.comment-list ul {
    float: left;
    width: 100%;
    background: #FFF;
    padding: 30px 30px 0;
    box-sizing: border-box;
}
.comment-list ul li {
    display: flex;
    border-bottom: 1px dashed #EEE;
    padding-bottom: 20px;
    margin-bottom: 20px;
}
.comment-list li:last-child {
    border: 0;
    margin-bottom: 0;
}
.comment-list ul li img {
    width: 40px;
    height: 40px;
}
.comment-list ul li>div {
    flex: 1;
    margin-left: 15px;
}
.comment-list li p:first-child {
    color: #707070;
    font-weight: bold;
    font-size: 14px;
    margin-bottom: 5px;
    line-height: 22px;
}
.comment-list li p span {
    margin-left: 8px;
    font-size: 12px;
    color: #999;
    font-weight: normal;
}
.comment-list li p:last-child {
    margin-bottom: 15px;
    font-size: 12px;
}
.del{
  display: none;
  color: #ee5044;
  font-size: 14px;
  cursor: pointer;
}
.comment-list li:hover .del{
  display: block
}
</style>