<template>
  <div id="myApp">
    <!-- 对应的组件内容渲染到router-view中 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  created() {
    /*//防止页面刷新时vuex丢失
    //在页面加载时读取sessionStorage里的状态信息 (保证页面刷新时store的state数据不丢失)
    if (sessionStorage.getItem("store")) {
      this.$store.replaceState(Object.assign({},this.$store.state,JSON.parse(sessionStorage.getItem("store"))));
    }
    //在页面刷新时（或者关闭）将vuex里的信息保存到sessionStorage里
    window.addEventListener("beforeunload",()=>{
      sessionStorage.setItem("store",JSON.stringify(this.$store.state));
    })*/

  }
}
</script>

<style>
body{
  margin: 0;
}
#myApp {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /*margin-top: 60px;*/
}
</style>
