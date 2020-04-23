<template>
    <div class="img-list">
        <h3>
            其他相关节目
            <span>
                <i class="arrows left" @click="left" :class="{change:num==0}"></i>
                <i class="arrows right" @click="right" :class="{change:num==-4}"></i>
            </span>
        </h3>
        <div>
            <ul class="loop">
                <li v-for="(list,index) in lists" :key="index" @click="jump(list.id)">
                    <img :src="list.img_url" alt="">
                    <p>{{list.title}}</p>
                </li>
            </ul>
        </div>
    </div>
</template>
<script>
export default {
    name: 'ImgList',
    data(){
        return {
            lists:[],
            num:0
        }
    },
    created() {
        this.getData()
    },
    watch:{
        '$route'(){
            this.getData()
        }
    },
    methods: {
        getData() {
            this.axios.get('http://localhost:3000/api/articles/rand')
            .then(res =>{
                this.lists=[]
                this.lists=this.lists.concat(res.data.res)
            })
            .catch(function (error) {
                console.log(error);
            })
        },
        jump(id) {
            this.$router.push({path:'/article/'+id})
        },
        left() {
            const ul = document.getElementsByClassName('loop')[0]
            if(this.num>=0) {
                this.num=0
            }else {
                this.num++
                ul.style.left=330*this.num+'px'
            }
        },
        right() {
            const ul = document.getElementsByClassName('loop')[0]
            if(this.num<=-4) {
                this.num=-4
            }else {
                this.num--
                ul.style.left=330*this.num+'px'
            }
        }
    }
}
</script>
<style scoped>
.arrows {
    display: inline-block;
    width: 18px;
    height: 18px;
    background: url('../assets/arrows.png') center no-repeat;
    background-size: contain;
    vertical-align: bottom;
    transform: rotate(-90deg)
}
.change {
    opacity: .5;
    cursor: no-drop;
}
.img-list {
    background: #FFF;
    height: 314px;
    margin: 30px 0;
    padding: 30px;
    overflow: hidden;
}
.img-list>div {
    position: relative;
    width: 300px;
    height: 288px;
    overflow: hidden;
}
.img-list h3, .text-list h3 {
    font-size: 14px;
    border-left: 3px solid #ee5044;
    padding-left: 8px;
    line-height: 16px;
    overflow: hidden;
}
.img-list h3 span {
    float: right;
    vertical-align: middle;
    margin-left: 5px;
    font-size: 12px;
    font-weight: normal;
    cursor: pointer;
}
.img-list h3 span .left {
    transform: rotate(90deg);
}
.img-list h3 span .right,.text-list h3 span .right{
    transform: rotate(-90deg);
}
.img-list ul {
    overflow: hidden;
    width: 1650px;
    height: 288px;
    position: absolute;
    top: 0;
    left: 0;
    transition: left .5s;

}
.img-list li {
    padding-top: 30px;
    width: 135px;
    margin-right: 30px;
    float: left;
    cursor: pointer;
}
.img-list li img {
    width: 100%
}
.img-list li p {
    margin-top: -4px;
    letter-spacing: 1px;
    padding-top: 10px;
    line-height: 14px;
    font-size: 12px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
}
</style>