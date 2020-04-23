<template>
  <div id="app">
    <yd-header></yd-header>
    <div class="content">
        <router-view name='a'></router-view>
        <router-view name='b'></router-view>
    </div> 
    <yd-footer></yd-footer>
    <login></login>
    <enroll></enroll>
  </div>
</template>
<script>
  import Header from './components/Header.vue';
  import Footer from './components/Footer.vue';
  import bus from './bus.js'
  import Login from './components/Login'
  import Enroll from './components/Enroll'

export default {
  name: 'app',
  data() {
    return {
      type:0
    }
  },
	components: {
    'yd-header': Header,
    'yd-footer': Footer,
    Login,
    Enroll
  },
  watch: {
    '$route'(to) {
      this.type=to.params.num>0?to.params.num:this.type
      bus.$on('typeid',type=> {
          this.type=type
      })
      bus.$emit('sendType',this.type)
    }
  }
}

</script>
<style scoped>
  .content {
    width: 1010px;
    margin: 40px auto;
    overflow: hidden;
}
</style>
