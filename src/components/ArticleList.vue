<template>
    <ul class="list">
        <li v-for='(list,index) in lists' :key="index">
            <img :src="list.img_url">
            <div class="txt">
                <router-link :to='"/article/"+list.id'>{{list.title}}</router-link>
                <p class="text">
                    <span>{{list.author}}</span>
                    <span>{{list.podcast}}</span>
                    <span>{{list.duration}}</span>
                    <span>{{list.play_time}}次</span>
                </p>
                <div>{{list.content.slice(0,55)}}... </div>
            </div>
        </li>
    </ul>
</template>

<script>
import bus from '../bus'
export default {
    name: 'ArticleList',
    data() {
        return {
            lists: [],
            count: null,
        }
    },
    created() {
        this.getData()
    },
    methods: {
        getData() {
            this.axios.get('http://localhost:3000/api/articles/'+this.$route.params.num+'/page/'+this.$route.params.page)
            .then(res =>{
                this.lists=[]
                this.count=res.data.res.count
                this.lists=this.lists.concat(res.data.res.articles)
                bus.$emit('sendPage',this.count)  
            })
            .catch(function (error) {
                console.log(error);
            })
        }
    },
    watch: {
      '$route'(to,old) {
        this.getData()
      }
    }

}
</script>

<style scoped>
.list {
    width: 100%
}
.list li{
    overflow: hidden;
    width: 620px;
    height: 210px;
    position: relative;
    margin-bottom: 30px;
    background: #FFF;
}
img {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 0;
    width: 315px;
    height: 210px;
}
.txt {
    position: absolute;
    right: 0;
    top: 0;
    padding: 30px;
    z-index: 1;
    width: 350px;
    height: 150px;
    background: #FFF;
}
a {
    display: block;
    text-decoration: none;
    letter-spacing: 1px;
    line-height: 25px;
    font-size: 18px;
    margin-bottom: 10px;
    color: #707070;
    font-weight: 600;
    cursor: pointer;
}
a:hover {
    color: #ee5044;
}
.text {
    font-size: 12px;
    height: 18px;
    line-height: 18px;
    margin-bottom: 25px;
    color: #999;
}
span {
    position: relative;
    margin-right: 15px;
    padding-left: 15px;
}

.txt>div {
    margin: 0;
    font-size: 12px;
    color: #707070;
    line-height: 22px;
    letter-spacing: 1px;
}
.content {
    width: 100%;
    height: 100%;
    padding-top: 50px;
    background: #f5f5f5;
}
.text>span:before {
    content: '';
    position: absolute;
    top: 2px;
    left: 0;
    width: 12px;
    height: 12px;
    background-size: 100%;
}
.text>span:nth-child(1):before{
    background-image: url('../assets/pen.png');
}
.text>span:nth-child(2):before {
    background-image: url('../assets/song.png');
}
.text>span:nth-child(3):before {
    background-image: url('../assets/time.png');
}
.text>span:nth-child(4):before {
    background-image: url('../assets/listen.png');
}
#page {
    width: 620px;
    height: 50px;
    line-height: 50px;
    font-size: 16px;
    color: #666;
    margin: auto;
    text-align: center;
}
#page span {
    display: inline-block;
    width: 50px;
    padding: 0;
    margin: 0;
    cursor: pointer;
}
.change_color {
    color: #ee5044;
}
button {
    background-color: #fff;
    outline: none;
    border: none;
    cursor: pointer;
}
button:active {
    color: #ee5044;
}
</style>