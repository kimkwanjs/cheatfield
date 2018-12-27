<template>
    <div id="gameLobby">
      <div class="gameNavi gameNavi_1">
        <div class="btnLeft">
          <p class="lobbyBox" id="idSet" @click="showLogin = !showLogin" v-if="propsData">{{ propsData }}</p>
          <p class="lobbyBox" id="idSet" @click="showLogin = !showLogin" v-else>닉네임설정</p>
        </div>
        <div class="btnRight">
          <p class="lobbyBox" @click="showGuide = !showGuide">가이드</p>
        </div>
      </div>
      <div class="gameNavi gameNavi_2">
        <div class="btnLeft">
          <p class="lobbyBox" id="gameStart" @click="gameStart">게임시작</p>
        </div>
        <div class="btnRight">
          <p class="lobbyBox" id="aiStart" @click="aigameStart">A.I 대전</p>
        </div>
      </div>
      <cfLogin v-if="showLogin"></cfLogin>
      <cfGuide v-if="showGuide" @close="showGuide = false"></cfGuide>
    </div>
</template>
<script>
  import cfLogin from './cf-login.vue'
  import cfGuide from './cf-guide.vue'
  export default {
    props:['propsData'],
    components:{
      cfLogin:cfLogin,
      cfGuide:cfGuide
    },
    data() {
      return {
        showLogin:false,
        showGuide:false,
        myNick:''
      }
    },
    created(){
      this.myNick = this.propsData
    },
    methods:{
      gameStart(){
        if(!this.myNick){
          this.showLogin = true ;
        }else{
          this.showLobby = false ;
          this.$emit('gameSearch')
        }
      },
      aigameStart(){
        if(!this.myNick){
          this.showLogin = true ;
        }else{
          this.$emit('aigameStart')
        }
      }
    }
  }
</script>
<style>
 #gameLobby{position:relative; width:100%; padding-bottom:5%;}
 .gameNavi{overflow:hidden;}
 .gameNavi_1{position:relative; margin-top:11%; width:100%; overflow:hidden; text-align:center;}
 .gameNavi_2{margin-bottom:8%;}
 .btnLeft{
   width:50%; padding:1%; float:left; box-sizing:border-box;
  }
 .btnRight{
   width:50%; padding:1%; float:right; box-sizing:border-box;
 }
 .lobbyBox
 {
   display: -webkit-flex; display: -ms-flexbox;	display: flex;
  -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;
  -webkit-box-align: center; -ms-flex-align: center; align-items: center;
  width:120px; height:47px; border:2px outset #e5e5e5; background:#222;
  border-radius:10px; cursor:pointer; overflow:hidden;
}
 #idSet{
   float:right;
 }
 #gameStart{
   float:right;
}
</style>
