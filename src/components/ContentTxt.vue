<template>
  <div class="constentTxt" v-show="isData">
    <div class="item">
      <h2>{{lists.title}}</h2>
      <div class="author">
        <ul>
          <li>
            <i class="pen"></i>
            <span>{{lists.author}}</span>
          </li>
          <li>
            <i class="song"></i>
            <span>{{lists.podcast}}</span>
          </li>
          <li>
            <i class="time"></i>
            <span>{{lists.duration}}</span>
          </li>
        </ul>
        <p>
          播放
          <span>{{lists.play_time}}</span>次
        </p>
      </div>
      <img :src="lists.img_url" alt='' />
      <div class="play">
        <i @click="showMp3"  v-if='show' class="play"></i>
        <i @click="showMp3" v-else class="playing"></i>
        <div>
          <p style="width:0%" class="progress"></p>
        </div>
        <span>{{playTime | changeTime}}</span>
      </div>
      <audio class="audio">
        <source :src="lists.mp3_url">
      </audio>
    </div>
    <div class="txt">
      <div v-html='lists.content' class="showTxt" style="height:284px">
      </div>
      <span @click="showTxt">
        <span class="up">展开全文</span>
        <i class="arrows rotate" style=""></i>
      </span>
    </div>
    <div class="item-tag">
      <div>
        <strong>标签：</strong>
        <a href="javascript:void(0)" v-for="(lab,index) in gteLab" :key="index">{{lab}}</a>
      </div>
      <div class="item-share">
        <i></i>
        <i></i>
        <i></i>
        <i></i>
      </div>
    </div>
    <div class="page">
      <span @click="pageUp" v-show="$route.params.id>1||$route.params.id==undefined">
        <i class="arrows"></i>上一篇
      </span>
      <span @click="pageDown" v-show="$route.params.id<1025">
        下一篇<i class="arrows right"></i>
      </span>
    </div>
  </div>
</template>
<script>
import bus from '../bus'

export default {
    name: 'ContentTxt',
    data() {
      return {
        lists:'',
        show: true,
        txt: true,
        playTime: '',
        isData:false
      }
    },
    created() {
      this.getData(this.$route.params.id)
      this.show=true
      bus.$emit('typeid',this.lists.type_id)
      bus.$on('upData',data=>{
        this.getData(this.$route.params.id)
      })
      bus.$on('token',data=>{
        this.getData(this.$route.params.id)
      })
      bus.$on('exit',data=>{
        this.getData(this.$route.params.id)
      })
    },
    methods: {
      getData(id=1025) {
        this.axios.get('http://localhost:3000/api/article/'+id,{
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`
            }
        })
        .then(res =>{
          this.isData=true
          this.lists=res.data.res
          bus.$emit('typeid',this.lists.type_id)
          bus.$emit('user',this.lists.podcast)
          bus.$emit('liked',res.data.res.isLiked,res.data.res.like_count)
          const audio=document.getElementsByClassName('audio')[0]
          audio.load()
        })
        .catch(function (error) {
            console.log(error);
        })
      },
      pageUp() {
        if(this.$route.params.id==undefined) {
          this.$router.push('/article/1024')
        }else {
          this.$router.push('/article/'+(this.$route.params.id-1))
        }
      },
      pageDown() {
        this.$router.push('/article/'+eval(this.$route.params.id+'+'+1))
      },
      showMp3() {
        this.show=!this.show
        const progress=document.getElementsByClassName('progress')[0]
        const audio=document.getElementsByClassName('audio')[0]
        this.isPlay=audio.currentTime
        this.lists.duration.split(':')
        audio.play()
        if(this.show) {
          audio.pause()
        }else{
        setTimeout(()=>{
              progress.style.width=audio.currentTime/(this.lists.duration.split(':')[0]*60+parseInt(this.lists.duration.split(':')[1]))*100+"%"
              this.playTime=(this.lists.duration.split(':')[0]*60+parseInt(this.lists.duration.split(':')[1]))-audio.currentTime
          },200)
        }
      },
      showTxt() {
        const txt=document.getElementsByClassName('showTxt')[0]
        const up = document.getElementsByClassName('up')[0]
        const arrows = document.getElementsByClassName('rotate')[0]
        this.txt=!this.txt
        if(this.txt) {
          txt.style.height='284px'
          up.innerHTML='展开全文'
          arrows.style.transform='rotate(0)'
        }else {
          txt.style.height=''
          up.innerHTML='收起'
          arrows.style.transform='rotate(180deg)'
        }
      }
    },
    computed: {
      gteLab() {
        return (this.lists.labels || '').split(',')
      }
    },
    watch: {
      '$route'() {
        this.getData(this.$route.params.id)
        const progress=document.getElementsByClassName('progress')[0]
        progress.style.width='0%'
        this.show=true
        this.txt=false
        this.playTime=''
        this.showTxt()
      },
      'playTime'(){
        setTimeout(()=>{
          const progress=document.getElementsByClassName('progress')[0]
          const audio=document.getElementsByClassName('audio')[0]
          if(audio.ended){
            this.show=true
          }
          if(!this.show){
            progress.style.width=audio.currentTime/(this.lists.duration.split(':')[0]*60+parseInt(this.lists.duration.split(':')[1]))*100+"%"
            this.playTime=(this.lists.duration.split(':')[0]*60+parseInt(this.lists.duration.split(':')[1]))-audio.currentTime
          }
        },200)
      }
    },
    filters: {
      changeTime(time){
        return time==''?'00:00':('-'+(Math.floor(time)/60>0?Math.floor(Math.floor(time)/60)+':'+(Math.floor(time)-Math.floor(Math.floor(time)/60)*60):'00'+':'+(Math.ceil(time)==NaN?'00':Math.ceil(time)+'0')))
      }
    }
}
</script>

<style scoped>

.item {
    padding: 30px;
    margin-bottom: 30px;
    background-color: #fff;
}
.item>h2 {
    font-weight: 400;
    margin-bottom: 8px;
}
audio {
  width: 100%;
  outline: none;
  height: 33px;
  padding-top: 30px;
}
source {
  background-color: #fff;
}
.author {
    display: flex;
    justify-content: space-between;
    height: 20px;
    line-height: 20px;
    margin-bottom: 25px;
    color: #999;
    font-size: 12px;
}

.author ul {
    overflow: hidden;
}

.author li {
    float: left;
    margin-right: 20px;
}

.author>p span {
    font-size: 16px;
    margin: 0 4px;
}
.author li i {
    display: inline-block;
    width: 12px;
    height: 12px;
    vertical-align: inherit;
    margin-right: 4px;
    background-size: contain;
}
.pen {
    background: url('../assets/pen.png') center no-repeat;
}
.song {
    background: url('../assets/song.png') center no-repeat;
}
.time {
    background: url('../assets/time.png') center no-repeat;
}
.play {
    padding-top: 30px;
    height: 36px;
    line-height: 36px;
}

.play i {
    float: left;
    width: 36px;
    height: 36px;
    padding: 8px;
    box-sizing: border-box;
    cursor: pointer;
    opacity: .8;
}
.play i:hover {
  opacity: 1;
}
.play>div {
    float: left;
    width: 455px;
    height: 2px;
    background-color: #f2f2f2;
    margin: 17px 0 0 9px;
}
.play>div p {
  width: 50%;
  height: 2px;
  background-color: #ee5044;
}
.play span {
    float: right;
    width: 50px;
    color: #a8a8a8;
    font-size: 14px;
    text-align: center;
}
.play .play {
    width: 0;
    height: 0;
    border-left: 17px solid #ee2f22;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    padding: 0;
    margin: 8px;
}

.play .playing {
    width: 17px;
    height: 20px;
    border: 0;
    border-left: 7px solid #ee2f22;
    border-right: 7px solid #ee2f22;
    padding: 0;
    margin: 8px;
    background-color: #fff;
}
.txt {
    padding: 20px 30px;
    background: #fff;
    margin-bottom: 30px;
    font-size: 12px;
    position: relative;
    line-height: 22px;
    letter-spacing: 1px;
    text-align: right;
}
.page {
  overflow: hidden;
  justify-content: space-between
}
.page span {
  float: right
}
.page span:first-child{
  float: left;
}
.txt>span:hover,.item-tag a:hover,.page span:hover {
    color: #ee5044;
    cursor: pointer;
}
.page .right {
  transform: rotate(-90deg);
}
.showTxt {
    overflow: hidden;
    text-align: justify;
}
.item-tag {
    display: flex;
    justify-content: space-between;
    padding: 5px 30px;
    background: #FFF;
    margin-bottom: 30px;
    line-height: 28px;
    font-size: 12px;
    color: #707070;
}

.item-tag a {
    color: #707070;
    margin-right: 10px;
}
.item-tag {
    display: flex;
    justify-content: space-between;
    padding: 5px 30px;
    background: #FFF;
    margin-bottom: 30px;
    line-height: 28px;
    font-size: 12px;
    color: #707070;
}

.item-tag a {
    color: #707070;
    margin-right: 10px;
}
.item-share {
    overflow: hidden;
}
.item-share i {
    float: left;
    width: 17px;
    height: 16px;
    background: url('http://bdimg.share.baidu.com/static/api/img/share/icons_0_16.png?v=d754dcc0.png') center no-repeat;
    margin: 6px 6px 6px 0;
}
.item-share i:first-child {
    background-position: 0 -104px;
}
.item-share i:nth-child(2) {
    background-position: 0 -468px;
}
.item-share i:nth-child(3) {
    background-position: 0 -52px;
}
.item-share i:nth-child(4) {
    background-position: 0 -1612px;
}
.page {
    font-size: 14px;
    padding: 0 30px;
    margin-bottom: 30px;
    line-height: 21px;
}
.arrows {
    display: inline-block;
    width: 14px;
    height: 14px;
    background: url('../assets/arrows.png') center no-repeat;
    background-size: contain;
    vertical-align: middle;
}
.page i {
    transform: rotate(90deg);
}
</style>