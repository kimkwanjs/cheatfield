<template>
  <div id="in_aigame">
    <div class="ai_ingame_user_info">
      <div id="ai_my_info">
        <span>{{propsdata}}</span>
        <div class="hpoint">
          <div class="hp" v-bind:style="{width : my_hp/3 + '%'}">{{ my_hp }}</div>
        </div>
      </div>
      <div id="ai_info">
        <span>관리봇</span>
        <div class="hpoint">
          <div class="hp" v-bind:style="{width : ai_hp/3 + '%'}">{{ ai_hp }}</div>
        </div>
      </div>
    </div>

    <div class="ai_playing_manager">
      <div class="playing_board">
        <div class="play_current">{{ my_selected }}</div>
        <div class="play_current">{{round_result}}</div>
        <div class="play_current">{{ ai_selected }}</div>
      </div>
      <div class="playing_board2">
        <span id="ai_game_current">카드를 선택해주세요</span>
        <span id="ai_select_time"> Round {{ round }} </span>
      </div>
    </div>

    <div class="ai_selectBox">
      <ul>
        <li class="aigame_pow_off" v-bind:class="{aigame_pow_on : my_pow}" @click="select_card" id="aigame_pow" data="pow">
          <span id="ai_pow_count">x{{my_pow}}</span><img src="../../assets/pow.png" border="0" alt="강펀치">
        </li>
        <li class="ai" @click="select_card" id="aigame_punch" data='punch'><img src="../../assets/punch.png" border="0" alt="펀치"></li>
        <li class="ai" @click="select_card" id="aigame_defence" data="defence"><img src="../../assets/defence.png" border="0" alt="디펜스"></li>
        <li class="ai" @click="select_card" id="aigame_luck" data="luck"><img src="../../assets/luck.png" border="0" alt="LUCK"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { eventBus } from '../../main'
  export default {
    props:['propsdata'],
    components:{
    },
    data() {
      return {
        ai_pow : 0 ,
        ai_hp : 300 ,
        ai_defence_counter : 0 ,
        ai_selected : '',
        my_pow : 0 ,
        my_hp : 300 ,
        my_defence_counter : 0 ,
        my_selected : '',
        ai : ['punch', 'punch', 'defence', 'defence', 'luck'],
        ai2 : ['pow','pow', 'punch', 'defence', 'luck', 'luck', 'luck'],
        round_result:'',
        round : 1 ,
      }
    },
    created(){},
    methods:{
      select_card(e){
        this.round++
        this.my_selected = e.currentTarget.getAttribute('data')
        var i = Math.floor(Math.random()*5)
        if(this.ai_pow<1){
          this.ai_selected = this.ai[i]
        } else if(this.ai_pow>=1){
          i = Math.floor(Math.random()*7)
          this.ai_selected = this.ai2[i]
        }
        if(this.my_selected == "punch" && this.ai_selected == "punch"){
          this.round_result = '[ 무 ]' ;
        }
        //무승부 디펜
        else if (this.my_selected == "defence" && this.ai_selected == "defence"){
          this.round_result = '[ 무 ]' ;
        }
        //무승부 luck
        else if (this.my_selected == "luck" && this.ai_selected == "luck"){
          this.round_result = '[ ㅎㅎ ]' ;
          this.my_pow++ ;
          this.ai_pow++ ;
        }
        //무승부 pow
        else if (this.my_selected == "pow" && this.ai_selected == "pow"){
          this.round_result = '[ 오; ]' ;
          this.my_pow-- ;
          this.ai_pow-- ;
        }
        //펀치 일반승
        else if (this.my_selected == "punch" && this.ai_selected == "luck"){
          this.round_result = '[ 승 ]' ;
          this.ai_hp -= 100;
        }
        //펀치 절반패
        else if (this.my_selected == "punch" && this.ai_selected == "defence"){
          this.round_result = '[ ㅠ.ㅠ ]' ;
          this.ai_defence_counter++ ;
          this.my_hp -= 50;
        }
        //펀치 강펀치패
        else if (this.my_selected == "punch" && this.ai_selected == "pow"){
          this.round_result = '[ ;; ]' ;
          this.ai_pow-- ;
          this.my_hp -= 150;
        }
        //디펜 절반승
        else if (this.my_selected == "defence" && this.ai_selected == "punch"){
          this.round_result = '[ 승 ]' ;
          this.my_defence_counter++ ;
          this.ai_hp -= 50;
        }
        //디펜 럭패
        else if (this.my_selected == "defence" && this.ai_selected == "luck"){
          this.round_result = '[ 패 ]' ;
          this.ai_pow++ ;
        }
        //디펜 강펀치패
        else if (this.my_selected == "defence" && this.ai_selected == "pow"){
          this.round_result = '[ 패 ]'
          this.ai_pow-- ;
          this.my_hp -= 50;
        }
        //럭 디펜승
        else if (this.my_selected == "luck" && this.ai_selected == "defence"){
          this.round_result = '[ 승 ]'
          this.my_pow++ ;
        }
        //럭 펀치패
        else if (this.my_selected == "luck" && this.ai_selected == "punch"){
          this.round_result = '[ 패 ]'
          this.my_hp -= 100 ;
        }
        //럭 강펀치패
        else if (this.my_selected == "luck" && this.ai_selected == "pow"){
          this.round_result = '[ 패 ]'
          this.ai_pow-- ;
          this.my_hp -= 100 ;
        }
        //pow 적펀치승
        else if (this.my_selected == "pow" && this.ai_selected == "punch"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.ai_hp -= 150 ;
        }
        //pow 적디펜승
        else if (this.my_selected == "pow" && this.ai_selected == "defence"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.ai_hp -= 50 ;
        }
        //pow 적럭승
        else if (this.my_selected == "pow" && this.ai_selected == "luck"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.ai_hp -= 100 ;
        }

        if(this.my_defence_counter == 3){
          this.my_pow++
          this.my_defence_counter = 0 ;
        }
        if(this.ai_defence_counter == 3){
          this.ai_pow++
          this.ai_defence_counter = 0 ;
        }

        //결과 ai승리
        if(this.my_hp<=0){
          alert('패배')
          this.ai_game_over();
        }
        else if(this.ai_hp<=0){
          alert('승리')
          this.ai_game_over();
        }

      }, // --카드선택--
      ai_game_over(){
        eventBus.$emit('aigame_over')
      },
    }
  }
</script>
<style>
  #in_aigame .ai_ingame_user_info{
    position:relative; margin-top:5%; width:100%; height:100%;
    padding-bottom:40%; z-index:2;
  }
  #in_aigame .ai_ingame_user_info #ai_my_info{
    position:absolute; left:2%; overflow:hidden; font-size:24px; color:#CEF279;
  }
  #in_aigame .ai_ingame_user_info .hpoint{
    font-size:14px; position:relative; width:80px; border:2px outset #f1f1f1;
  }
  #in_aigame .ai_ingame_user_info .hpoint .hp{
    background:crimson; width:100%; color:#fff; padding-left:10%;
  }
  #in_aigame .ai_ingame_user_info #ai_info{
    position:absolute; right:2%; overflow:hidden; font-size:24px;
  }

  #in_aigame .ai_playing_manager{
    position:relative; width:300px; height:100px; margin:0 auto; overflow:hidden; text-align:center;
  }
  #in_aigame .ai_playing_manager .playing_board{
    position:relative; width:100%;
    padding:4%; overflow:hidden;
  }
  #in_aigame .ai_playing_manager .playing_board .play_current{
    position:relative; width:33%; float:left;
  }
  #in_aigame .ai_playing_manager .playing_board2{
    position:relative; width:100%; line-height:50px; overflow:hidden;
    width:300px; height:50px; border:1.5px outset #fbfbfb; text-align:center; border-radius:5px;
  }

  #in_aigame .ai_selectBox{position:relative; width:320px; height:50px; margin:2% auto 10%; }
  #in_aigame .ai_selectBox ul{}
  #in_aigame .ai_selectBox ul li{
    position: relative; float:left; width:64px; height:64px; cursor:pointer;
    margin-left:12px; background:#f1f1f1; border-radius:10px;
  }
  #in_aigame .ai_selectBox ul li img{width:64px; height:64px;}
  #in_aigame .ai_selectBox ul .aigame_pow_off{opacity:0.2; pointer-events: none; }
  #in_aigame .ai_selectBox ul .aigame_pow_on{opacity:1; pointer-events: auto; }
  #in_aigame .ai_selectBox ul #aigame_pow #ai_pow_count{
    color:#000; font-weight:bold; font-size:14px; background:orange; width:18px; height:18px;
    position:absolute; right:-8px; bottom:0; border-radius:5px; text-align:center;
  }
</style>
