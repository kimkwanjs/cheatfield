<template>
    <div id="app">
      <appHeader></appHeader>
      <router-view/>
    </div>
</template>
<script>
  import appHeader from './components/header.vue'
  export default {
    components:{
      appHeader : appHeader,
    },
  }
</script>

<style>
@import url(https://fonts.googleapis.com/css?family=Arvo:700|Do+Hyeon|Nanum+Gothic);
html,body{
  font-family: 'Do Hyeon', sans-serif;
  text-overflow: ellipsis;
  color:#fff;
}
a{text-decoration:none; color:#000;}
*{
  margin:0; padding:0;
  -webkit-box-sizing: border-box;
	-moz-box-sizing: border-box;
	box-sizing: border-box;
}
ul li{list-style:none;}

</style>
