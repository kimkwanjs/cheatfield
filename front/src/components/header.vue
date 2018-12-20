<template>
  <div>
    <div id="nav">
      <div class="logo">
        <router-link to="/">KIMKWAN<span v-bind:style="{color:fontColor}">JS</span></router-link>
      </div>
      <ul class="nav">
        <li><router-link to="/">ABOUT</router-link></li>
        <li><router-link to="/cheatfield">PORTFOLIO</router-link></li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fontColor : 'red'
    }
  }
}
</script>

<style>
#nav{
  position:relative;
  max-width:100%;
  min-width:320px;
  height:80px;
  box-shadow: 0px 3px 1px #7a7a7a;
  line-height: 80px;
}
.nav{
  display:flex;
  display:-webkit-flex;
  -webkit-align-items: center;
  align-items: center;
  -webkit-justify-content:center;
  justify-content:center;
  margin:0 auto;
  font-size:18px;
}

.nav>li:last-child{
  margin-left:20px;
}
.nav>li a:hover{
  color:orange;
  font-size:28px;
}

.logo{
  position:absolute;
  top:0;
  left:40px;
  color:#111;
  font-weight:bold;
  font-size:24px;
}
.logo > span{
  color:crimson;
}
@media (max-width:600px){
  #nav{
    position:relative;
    width:100%;
    height:160px;
    box-shadow: 0px 1px 1px #7a7a7a;
    line-height:40px;
    display:flex;
		display:-webkit-flex;
		-webkit-align-items: center;
    align-items: center;
  }
  .logo{
    position:relative;
  }
  .nav{
    display:block;
    text-align:center;
  }
  .nav>li:last-child{
    margin-left:0px;
  }
}
</style>
