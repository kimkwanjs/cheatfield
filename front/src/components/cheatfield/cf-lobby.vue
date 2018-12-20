<template>
    <div id="gameLobby">
      <div class="game_navi game_navi_1">
        <div class="btn_left">
          <p class="lobby_box" id="game_guide" @click="showLogin = !showLogin" v-if="propsdata">{{ propsdata }}</p>
          <p class="lobby_box" id="game_guide" @click="showLogin = !showLogin" v-else>닉네임설정</p>
        </div>
        <div class="btn_right">
          <p class="lobby_box" @click="showGuide = !showGuide">가이드</p>
        </div>
      </div>
      <div class="game_navi game_navi_2">
        <div class="btn_left">
          <p class="lobby_box" id="game_start" @click="gameStart">게임시작</p>
        </div>
        <div class="btn_right">
          <p class="lobby_box" id="ai_start" @click="aigameStart">A.I 대전</p>
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
    props:['propsdata'],
    components:{
      cfLogin:cfLogin,
      cfGuide:cfGuide
    },
    data() {
      return {
        showLogin:false,
        showGuide:false,
        mynick:''
      }
    },
    created(){
      this.mynick = this.propsdata
    },
    methods:{
      gameStart(){
        if(!this.mynick){
          this.showLogin = true ;
        }else{
          this.showLobby = false ;
          this.$emit('gameSearch')
        }
      },
      aigameStart(){
        if(!this.mynick){
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
 .game_navi{overflow:hidden;}
 .game_navi_1{position:relative; margin-top:11%; width:100%; overflow:hidden; text-align:center;}
 .game_navi_2{margin-bottom:8%;}
 .btn_left{
   width:50%; padding:1%; float:left; box-sizing:border-box;
  }
 .btn_right{
   width:50%; padding:1%; float:right; box-sizing:border-box;
 }
 .lobby_box
 {
   display: -webkit-flex; display: -ms-flexbox;	display: flex;
  -webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;
  -webkit-box-align: center; -ms-flex-align: center; align-items: center;
  width:120px; height:47px; border:2px outset #e5e5e5; background:#222;
  border-radius:10px; cursor:pointer; overflow:hidden;
}
 #game_guide{
   float:right;
 }
 #game_start{
   float:right;
}
</style>
