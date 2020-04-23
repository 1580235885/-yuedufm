<template>
    <div class="box-shade" v-show="isEnroll">
        <div class="login enrollBox" v-if="msg" style="text-align: center;left:0%">
            {{msg}}!
            <br/><br/>
            两秒后自动关闭...
            <span title="关闭" @click="close">×</span>
        </div>
        <div class="login enrollBox" v-else style="left:-160%">
            <h3>注册</h3>
            <div class="input">
                <input type="text" placeholder="昵称" v-model="niki" maxlength="10">
                <input type="email" placeholder="邮箱" v-model="email">
                <input type="password" placeholder="密码" v-model="password" maxlength="12">
                <input type="password" placeholder="确认密码" v-model="isPassword" maxlength="12">
            </div>
            <div class="remember">
                <label for="">
                   <input type="checkbox" class="read"> 我已认真阅读并同意悦读FM的 
                </label>
                <span>《使用协议》</span>
            </div>
            <p class="err" v-if="errMsg">{{errMsg}}</p>
            <button type="submit" @click="enroll">注册</button>
            <span title="关闭" @click="close">×</span>
        </div>
    </div>
</template>
<script>
import bus from '../bus'
export default {
    name:'Enroll',
    data() {
        return {
            email:'',
            password:'',
            isPassword:'',
            niki:'',
            errMsg:'',
            isEnroll:false,
            msg:''
        }
    },
    created() {
        bus.$on('enroll',data=>{
            this.isEnroll=true
        })
    },
    methods: {
        close() {
            this.password=''
            this.isPassword=''
            this.niki=''
            this.email=''
            this.errMsg=''
            const box1=document.getElementsByClassName('enrollBox')[0]
            box1.style.left='120%'
            setTimeout(()=>{
                this.msg=''
                this.isEnroll=false
            },500)
        },
        enroll() {
            if(!this.niki.trim()) {
                this.errMsg='昵称为1-10位'
            }else if(!/^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/.test(this.email)) {
                this.errMsg='邮箱格式不正确'
            }else if(!/^[a-zA-Z0-9]{6,12}$/.test(this.password)) {
                this.errMsg='密码为6-12位数字或字母'
            }else if(this.password!=this.isPassword) {
                this.errMsg='两次输入的密码不一致'
            }else {
                this.axios.post('http://localhost:3000/api/user',{
                    email:this.email,
                    password:this.password,
                    username:this.niki.trim(),
                    nikiname:this.niki.trim()
                }).then(res=>{
                    if(res.data.res_code==200) {
                        this.msg=res.data.res
                        setTimeout(()=>{
                            this.close()
                        },1500)
                    }
                }).catch(function (error) {
                    console.log(error);
                })
            }
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
    height: 382px;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
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
.input input {
    border-top: 1px solid #dcdcdc
}
.input input:first-child {
    border: none
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
}
.remember span {
    color: #eb4235
}
</style>