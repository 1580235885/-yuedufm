<template>
    <div class="box-shade" v-show="isLogin">
        <div class="login loginBox" v-if="isUser" style="left: -160%;">
            <h3>登录</h3>
            <div class="input">
                <input type="text" placeholder="邮箱" v-model="email">
                <input type="password" placeholder="密码" v-model="password">
            </div>
            <div class="remember">
                <label for="">
                   <input type="checkbox">下次自动登录 
                </label>
                <span>忘记密码</span>
            </div>
            <p v-show="errMsg" class="err">{{errMsg}}</p>
            <button type="button" @click="login">登录</button>
            <span title="关闭" @click="close">×</span>
        </div>
        <div class="login loginBox" v-else style="text-align: center;left:0">
            登陆成功！
            <br/><br/>
            两秒后自动关闭...
            <span title="关闭" @click="close">×</span>
        </div>
    </div>
</template>

<script>
import bus from '../bus'
export default {
    name: 'Login',
    data() {
        return {
            isLogin:false,
            email:'',
            password:'',
            errMsg: '',
            isUser:true
        }
    },
    created() {
        bus.$on('login',data=> { 
            this.isLogin=data
        }),
        bus.$on('exit',data=>{
            this.password=data
            this.isUser=true
        })
    },
    methods: {
        close() {
            const box=document.getElementsByClassName('loginBox')[0]
            box.style.left='110%'
            this.errMsg=''
            setTimeout(()=>{
                this.isLogin=false
            },500)
        },
        login() {
            this.axios.post('http://localhost:3000/api/user/login',{
                email: this.email,
                password: this.password
            }).then(res=>{
                if(res.data.res_code==200) {
                    this.errMsg=null;
                    bus.$emit('usermsg',res.data.res.user.nikiname)
                    bus.$emit('token',res.data.res.token)
                    this.isUser=false
                    setTimeout(()=>{
                        this.close()
                    },1500)
                }else {
                    this.errMsg=res.data.res_msg
                    this.isUser=true
                }
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    }
}
</script>

<style scoped>
.box-shade {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,.5);
    z-index: 999;
    overflow: hidden;
}
.login {
    position: absolute;
    display: inline-block;
    width: 380px;
    height: 300px;
    top: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #FFF;
    padding: 30px 50px 50px;
    box-sizing: border-box;
   transition: all .5s;
}
.login h3 {
    font-size: 24px;
    margin-bottom: 20px;
    line-height: 24px;
    font-weight: normal;
}
.login>span {
    position: absolute;
    top: -15px;
    right: -15px;
    width: 30px;
    line-height: 30px;
    text-align: center;
    background: #444;
    color: #CCC;
    font-size: 24px;
    border-radius: 50%;
    cursor: pointer;
}
.err {
    font-size: 12px;
    color: #eb4235
}
.login>span:hover {
    background-color: #000;
}
.input {
    border: 1px solid #dcdcdc;
    padding: 0 15px;
}
.input input {
    height: 20px;
    width: 100%;
    display: block;
    padding: 10px 0;
    border: 0;
    outline: none
}
.input input:first-child {
    border-bottom: 1px solid #dcdcdc
}
.login button {
    width: 100%;
    height: 45px;
    background: #eb4235;
    color: #FFF;
    text-align: center;
    cursor: pointer;
    font-size: 14px;
    outline: none;
    border: 0
}
.remember {
    padding: 15px 5px;
    font-size: 12px;
    display: flex;
    justify-content: space-between
}
.remember span {
    color: #eb4235
}
</style>