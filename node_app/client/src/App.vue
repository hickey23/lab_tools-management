<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import Login from './components/Login.vue'
  import Device from './components/Device.vue'
  import User from './components/User.vue'
  export default {
    name: 'App',
    components: {Login},
  }
</script>

<style lang="less" scoped>
//加背景图片一定要把APP.vue里面的盒子高度设置为100%
    #app{
      height: 100%;
      margin: 0;
      padding: 0;
    }

</style>
