<template>
<div>
    <div class="user">
        <span class="triangle"></span>
        <div class="detail">
            <img src="../assets/user.png" alt="">
            <div>
                <p>{{user}}<i></i></p>
                <div>
                    <p>
                        <span>作品：31</span><br>
                        <span>粉丝：119</span>
                    </p>
                    <a href="javascript:void(0)">关注</a>
                </div>
            </div>
        </div>
    </div>
    <div class="admire">
        <a href="javascript:void(0)" title="点个赞！">
            <span><i></i></span>
            <span class="hover" @click="bad" v-if="isLike">取消赞</span>
            <span class="hover" @click="good" v-else>赞</span>
            <strong>{{count}}</strong>
        </a>
        <a href="javascript:void(0)" title="收藏文本">
            <span><i></i></span>
            <span class="hover" @click="like">收藏</span>
            <strong>4</strong>
        </a>
        <a href="javascript:void(0)" title="打赏主播">
            <span>赏</span>
            <span class="hover">打赏</span>
        </a>
    </div>
</div>
    
</template>
<script>
import bus from '../bus'
export default {
    name:'User',
    data(){
        return {
            user:'薇薇',
            isLike:false,
            count:0
        }
    },
    created() {
        bus.$on('user',data=>{
            this.user=data
        })
        bus.$on('liked',(data,count)=>{
            this.isLike=data
            this.count=count
        })
        bus.$on('exit',data=>{
            this.isLike=false
        })
    },
    methods:{
        good() {
            if(localStorage.getItem('token')) {
               this.axios.post('http://localhost:3000/api/article/'+(this.$route.params.id==undefined?'1025':this.$route.params.id)+'/like',null,{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res=>{
                    if(res.data.res_code==200){
                        bus.$emit('upData','')
                        alert('点赞成功！')
                    }
                }).catch(err=>{
                    console.log(err)
                }) 
            }else {
                alert('登录后可点赞！')
            }
        },
        bad() {
            if(localStorage.getItem('token')) {
               this.axios.delete('http://localhost:3000/api/article/'+(this.$route.params.id==undefined?'1025':this.$route.params.id)+'/like',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res=>{
                    console.log(res)
                    if(res.data.res_code==200){
                        bus.$emit('upData','')
                        alert('已取消点赞！')
                    }
                }).catch(err=>{
                    console.log(err)
                }) 
            }else {
                alert('登录后可点赞！')
            }
        },
        like() {
            if(localStorage.getItem('token')) {
               this.axios.get('http://localhost:3000/api/articles/like',{
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                }).then(res=>{
                    if(res.data.res_code==200){
                        alert('已收藏！')
                    }
                }).catch(err=>{
                    console.log(err)
                }) 
            }else {
                alert('登录后可收藏！')
            }
        }

    }
}
</script>

<style scoped>
.user {
    position: relative;
    padding: 30px;
    border-bottom: 1px dashed #EEE;
    background-color: #fff;
}
.triangle {
    position: absolute;
    left: -10px;
    top: 50%;
    border-right: 10px solid #fff;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
}
.user .detail {
    overflow: hidden;
}
.user .detail img {
    float: left;
    width: 80px;
    height: 80px;
}
.user .detail>div {
    float: right;
    width: 190px;
}
.user .detail>div>p {
    font-size: 16px;
    padding-bottom: 15px;
}
.user .detail>div i {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('../assets/song.png') center no-repeat;
    background-size: contain;
    vertical-align: inherit;
    margin-left: 5px;
}
.user .detail>div div {
    overflow: hidden;
    font-size: 12px;
}
.user .detail>div div a{
    font-size: 12px;
    padding: 0 15px;
    color: white;
    background: #ee5044;
    line-height: 30px;
    float: right;
}
.user .detail>div div p {
    float: left;
}
.admire {
    display: flex;
    padding: 20px 0;
    text-align: center;
    background-color: #fff;
}
.admire a {
    display: inline-block;
    height: 52px;
    line-height: 52px;
    margin-left: 35px;
}
.admire a span {
    display: inline-block;
    width: 50px;
    height: 50px;
    border: 1px solid #ACACAC;
    line-height: 50px;
    text-align: center;
    color: #999;
    margin-right: 15px;
    border-radius: 50%;
    font-size: 18px;
}
.admire a span i {
    display: inline-block;
    width: 18px;
    height: 18px;
}
.admire a:first-child span i {
    background: url('../assets/admire.png') center no-repeat;
    opacity: .5;
    background-size: contain;
}
.admire a:nth-child(2) span i {
    background: url('../assets/love.png') center no-repeat;
    opacity: .5;
    vertical-align: middle;
    background-size: contain;
}
.admire .hover {
    background-color: #999;
    color: #fff;
    display: none;
    font-size: 12px
}
.admire a:hover span {
    display: none
}
.admire a:hover .hover {
    display: inline-block
}
.admire .hover:last-child{
    background-color: #ee5044;
    font-size: 12px;
    border:1px solid #ee5044
}

.admire a strong {
    display: inline-block;
    font-weight: normal;
    line-height: 52px;
    color: #707070;
    font-size: 18px;
}
</style>