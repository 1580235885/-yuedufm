<template>
	<div class="hd-box">
		<div class="hd">
			<div class="fl-left" @click="index">
				<span class="span1"></span>
				<span class="span2"></span>
				<span class="span3"></span>
				<span class="span4">悦读FM</span>
			</div>
			<div class="list">
				<router-link :to="'/list/'+list.id+'/page/1'" v-for="(list,index) in lists" :key="index" :class="{active:($route.params.id!=$route.params.num)&&type==index+1}">{{list.type}}</router-link>
			</div>
			<div class="fl-right">
				<input type="text">
				<button><i class="search"></i></button>
                <p v-if="username">
                    <span class="username">{{username}}</span>
                    <span @click="exit" class="exit">退出</span>
                </p>
				<p v-else class="login">
					<span @click="showLogin">登录</span>
					<span @click="showEnroll">注册</span>
				</p>
			</div>
		</div>
	</div> 
</template>

<script>
import bus from '../bus.js'
export default {
    name: 'yuedu-hd',
    data() {
        return {
            lists: [],
            type:this.$route.params.num,
            username:'',
        }
    },
    created (){
        this.axios.get('http://localhost:3000/api/types')
        .then(res =>{
            this.lists=this.lists.concat(res.data.res)
        })
        .catch(function (error) {
            console.log(error);
        })
        bus.$on('sendType',data=>{
            this.type=data
        })
        bus.$on('usermsg',data=>{
            this.username=data
        })
        bus.$on('typeid',type=> {
            this.type=type
        })
        if(!this.username){
            localStorage.removeItem('token')
        }
    },
    methods: {
        index() {
            this.$router.push('/')
        },
        showLogin() {
            bus.$emit('login',true)
            const box=document.getElementsByClassName('loginBox')[0]
            box.style.left='-160%'
            setTimeout(()=>{
                box.style.left='0'
            },10)
        },
        showEnroll() {
            bus.$emit('enroll',true)
            const box1=document.getElementsByClassName('enrollBox')[0]
            box1.style.left='-160%'
            setTimeout(()=>{
                box1.style.left='0'
            },10)
        },
        exit() {
            bus.$emit('exit','')
            this.username=''
            if(!this.username){
                localStorage.removeItem('token')
            }
        }
    },
}

</script>

<style scoped>
.hd-box {
    background-color: #fff;
}
.username {
    max-width: 42px;
    overflow: hidden;
    display: inline-block;
    white-space: nowrap;
    text-overflow:ellipsis;
    vertical-align: bottom;
}
.hd {
    width: 1010px;
    margin: auto;
    height: 30px;
    line-height: 30px;
    padding: 38px 0;
    font-size: 14px;
}
.exit {
    cursor: pointer;
}
.exit:hover {
    color: #ee5044
}
.fl-left {
    float: left;
    width: 120px;
    cursor: pointer;
    overflow: hidden;
}

.fl-left span {
    float: left;
}

.fl-left .span1,
.fl-left .span3,
.fl-left .span2 {
    width: 4px;
    background: #ee5044;
    border-radius: 2px;
    height: 18px;
    margin: 6px 4px 0 0;
}

.fl-left .span2 {
    height: 30px;
    margin-top: 0;
}
.login span {
    cursor: pointer;
}
.login span:hover {
    color: #ee5044
}
.fl-left .span4 {
    margin-left: 15px;
}
.fl-left:hover .span4 {
    color:#ee5044
}
.list {
    float: left;
    width: 590px;
    text-align: center;
}

.list a {
    padding: 0 20px;
    color: #707070;
}
.list a:hover {
    color: #ee5044
}
.list .active {
    color: #ee5044
}
.fl-right {
    float: right;
    text-align: right;
}

.fl-right input {
    width: 125px;
    height: 16px;
    line-height: 16px;
    padding: 2px 20px 2px 5px;
    box-shadow: 1px 1px 1px rgba(0, 0, 0, .05);
    outline: none;
    border: none;
    background: transparent;
}

.fl-right button {
    width: 20px;
    height: 20px;
    background-color: #FFF;
    cursor: pointer;
    color: #999;
    outline: none;
    border: 0;
    margin-left: -26px;
    vertical-align: middle;
}

.fl-right p {
    font-size: 12px;
    display: inline-block;
    width: 90px;
    height: 20px;
    line-height: 20px;
    border-left: 1px dotted #ccc;
    margin-left: 20px;
}

.fl-right p span:last-child {
    padding-left: 20px;
}

.search {
    display: inline-block;
    width: 12px;
    height: 12px;
    background: url('../assets/search.png') center no-repeat;
    background-size: contain;
    margin: 4px;
}
</style>
