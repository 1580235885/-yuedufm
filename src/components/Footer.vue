<template>
    <div class="footer">
        <div class="ft-left">
            <p>
                <span>关于我们</span>
                <i></i>
                <span>加入我们</span>
            </p>
            <p>
                © 2010-2016 Yuedu.fm All rights reserved &nbsp; 粤ICP备14076392号
            </p>
        </div>
        <div class="ft-right">
            <span>捐</span>
            <span><i class="weixin"></i></span>
            <span><i class="weibo"></i></span>
        </div>
    </div>
</template>
<script>
export default {
    name: 'Footer'
}

</script>

<style scoped>
.footer {
    padding-bottom: 40px;
    color: #aaa;
    width: 1010px;
    margin: auto;
    overflow: hidden;
}
.footer .ft-left {
    float: left;
}
.footer .ft-left p {
    padding-bottom: 8px;
    font-size: 12px;
}
.footer .ft-left p span {
    color: #707070;
    cursor: pointer;
}
.footer .ft-left p span:hover {
    color: #ee5044
}
.footer .ft-left p i {
    display: inline-block;
    border-left: 1px solid #aaa;
    height: 12px;
    margin: 0 5px;
}
.ft-right {
    float: right;
}
.ft-right span {
    display: inline-block;
    width: 40px;
    height: 40px;
    line-height: 40px;
    text-align: center;
    position: relative;
    border-radius: 50%;
    background: #DDD;
    font-size: 20px;
    margin-left: 10px;
    color: #707070;
}
.ft-right span i {
    display: inline-block;
    width: 23px;
    height: 20px;
    vertical-align: middle;
}
.ft-right .weixin {
    background: url('../assets/weixin.png') center no-repeat;
    background-size: contain;
}
.ft-right .weibo {
    background: url('../assets/weibo.png') center no-repeat;
    background-size: contain;
    opacity: .5;
}
</style>