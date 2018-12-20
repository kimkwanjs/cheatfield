<template>
  <div id="in_game">
    <div class="ingame_user_info">
      <div id="my_info">
        <span>{{mynick}}</span>
        <div class="hpoint">
          <div class="hp" v-bind:style="{width : my_hp/3 + '%'}">{{ my_hp }}</div>
        </div>
      </div>
      <div id="enemy_info">
        <span>{{enemynick}}</span>
        <div class="hpoint">
          <div class="hp" v-bind:style="{width : enemy_hp/3 + '%'}">{{ enemy_hp }}</div>
        </div>
      </div>
    </div>

    <div class="playing_manager">
      <div class="playing_board">
        <div class="play_current my_current" v-if="my_card">
          <img v-bind:src="'http://cheatfield.cafe24app.com/img/'+my_card+'.png'" />
        </div>
        <div class="round_result">{{ round_result }}</div>
        <div class="play_current enemy_current" v-if="enemy_card">
          <img v-bind:src="'http://cheatfield.cafe24app.com/img/'+enemy_card+'.png'" />
        </div>
      </div>
      <div class="playing_board2">
        <span id="game_current">{{game_current}}</span>
        <span id="select_time"></span>
      </div>
    </div>

    <div class="selectBox" v-if="selectBox">
      <ul>
        <li class="game_pow_off" id="game_pow" v-bind:class="{game_pow_on : my_pow}" @click="select_card" data="pow">
          <span id="pow_count">x{{my_pow}}</span><img src="../../assets/pow.png" border="0" alt="강펀치">
        </li>
        <li @click="select_card" id="game_punch" data='punch'><img src="../../assets/punch.png" border="0" alt="펀치"></li>
        <li @click="select_card" id="game_defence" data="defence"><img src="../../assets/defence.png" border="0" alt="디펜스"></li>
        <li @click="select_card" id="game_luck" data="luck"><img src="../../assets/luck.png" border="0" alt="LUCK"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { eventBus } from '../../main'
  export default {
    props:['mynick','enemynick'],
    data() {
      return {
        enemy_pow : 0 ,
        enemy_hp : 300 ,
        enemy_selected : '',
        my_pow : 0 ,
        my_hp : 300 ,
        my_defence_counter : 0 ,
        my_selected : '',
        round_result:'',
        my_card:'',
        enemy_card:'',
        game_current:'카드를 선택해주세요',
        player_status_my:'',
        player_status_enemy:'',
        selectBox:true
      }
    },
    beforeDestroy(){
      this.$socket.emit('disconnect_user')
    },
    sockets: {
        enemy_select: function (enemycard) {
          this.player_status_enemy = enemycard
          this.gameplay_manager()
        },
        game_play_destroy: function(){
          alert('상대방나감 : 승리!!')
        }
    },
    methods:{
      select_card(e){
        this.selectBox = false
        this.my_selected = e.currentTarget.getAttribute('data')
        this.player_status_my = this.my_selected
        this.gameplay_manager()
        this.$socket.emit('card_select', this.enemynick, this.my_selected)
      },
      gameplay_manager(){
        if(this.player_status_my && this.player_status_enemy){
          this.game_current = ''
          this.allselected(this.player_status_my,this.player_status_enemy)
        }else if(this.player_status_my && !this.player_status_enemy){
          this.game_current = '상대방의 선택을 기다립니다.'
          this.my_card = 'qm'
        }else{
          this.game_current = '상대방 선택완료!'
          this.enemy_card = 'qm'
        }
      },
      play_status_init(){
          this.game_current='카드를 선택해주세요'
          this.player_status_my = ''
          this.player_status_enemy = ''
          this.selectBox = true
          this.round_result = ''
          this.my_card = ''
          this.enemy_card = ''
      },
      allselected(my_card,enemy_card){
        this.my_card = my_card
        this.enemy_card = enemy_card
        if(my_card == "punch" && enemy_card == "punch"){
          this.round_result = '[ 무 ]' ;
          this.game_current='상대카드 - punch'
        }
        //무승부 디펜
        else if (my_card == "defence" && enemy_card == "defence"){
          this.round_result = '[ 무 ]' ;
          this.game_current='상대카드 - defence'
        }
        //무승부 luck
        else if (my_card == "luck" && enemy_card == "luck"){
          this.round_result = '[ ㅎㅎ ]' ;
          this.my_pow++ ;
          this.enemy_pow++ ;
          this.game_current='상대카드 - luck'
        }
        //무승부 pow
        else if (my_card == "pow" && enemy_card == "pow"){
          this.round_result = '[ 오; ]' ;
          this.my_pow-- ;
          this.enemy_pow-- ;
          this.game_current='상대카드 - power'
        }
        //펀치 일반승
        else if (my_card == "punch" && enemy_card == "luck"){
          this.round_result = '[ 승 ]' ;
          this.enemy_hp -= 100;
          this.game_current='상대카드 - luck'
        }
        //펀치 절반패
        else if (my_card == "punch" && enemy_card == "defence"){
          this.round_result = '[ ㅠ.ㅠ ]' ;
          this.enemy_defence_counter++ ;
          this.my_hp -= 50;
          this.game_current='상대카드 - defence'
        }
        //펀치 강펀치패
        else if (my_card == "punch" && enemy_card == "pow"){
          this.round_result = '[ ;; ]' ;
          this.enemy_pow-- ;
          this.my_hp -= 150;
          this.game_current='상대카드 - power'
        }
        //디펜 절반승
        else if (my_card == "defence" && enemy_card == "punch"){
          this.round_result = '[ 승 ]' ;
          this.my_defence_counter++ ;
          this.enemy_hp -= 50;
          this.game_current='방어 '+this.my_defence_counter+' 번 성공 !'
        }
        //디펜 럭패
        else if (my_card == "defence" && enemy_card == "luck"){
          this.round_result = '[ 패 ]' ;
          this.enemy_pow++ ;
          this.game_current='상대카드 - punch'
        }
        //디펜 강펀치패
        else if (my_card == "defence" && enemy_card == "pow"){
          this.round_result = '[ 패 ]'
          this.enemy_pow-- ;
          this.my_hp -= 50;
          this.game_current='상대카드 - punch'
        }
        //럭 디펜승
        else if (my_card == "luck" && enemy_card == "defence"){
          this.round_result = '[ 승 ]'
          this.my_pow++ ;
          this.game_current='상대카드 - punch'
        }
        //럭 펀치패
        else if (my_card == "luck" && enemy_card == "punch"){
          this.round_result = '[ 패 ]'
          this.my_hp -= 100 ;
          this.game_current='상대카드 - punch'
        }
        //럭 강펀치패
        else if (my_card == "luck" && enemy_card == "pow"){
          this.round_result = '[ 패 ]'
          this.enemy_pow-- ;
          this.my_hp -= 100 ;
          this.game_current='상대카드 - power'
        }
        //pow 적펀치승
        else if (my_card == "pow" && enemy_card == "punch"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.enemy_hp -= 150 ;
          this.game_current='상대카드 - punch'
        }
        //pow 적디펜승
        else if (my_card == "pow" && enemy_card == "defence"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.enemy_hp -= 50 ;
          this.game_current='상대카드 - defence'
        }
        //pow 적럭승
        else if (my_card == "pow" && enemy_card == "luck"){
          this.round_result = '[ 승 ]'
          this.my_pow-- ;
          this.enemy_hp -= 100 ;
          this.game_current='상대카드 - luck'
        }

        if(this.my_defence_counter == 3){
          this.my_pow++
          this.my_defence_counter = 0 ;
          this.game_current='방어3번성공 - power획득!'
        }

        //결과 적승리
        if(this.my_hp<=0){
          alert('패배')
          this.game_over();
        }
        else if(this.enemy_hp<=0){
          alert('승리')
          this.game_over();
        }else if(this.my_hp > 0 && this.enemy_hp > 0){
          setTimeout(()=>{
            this.play_status_init();
          },3000)
        }
      }, // --카드선택--
      game_over(){
        eventBus.$emit('game_over')
      },
    }
  }
</script>
<style scoped>
  #in_game .ingame_user_info{
    position:relative; margin-top:5%; width:100%;
    padding-bottom:30%; z-index:2;
  }
  #in_game .ingame_user_info #my_info{
    position:absolute; left:2%; overflow:hidden; font-size:24px; color:#CEF279;
  }
  #in_game .ingame_user_info #enemy_info{
    position:absolute; right:2%; overflow:hidden; font-size:24px;
  }
  #in_game .ingame_user_info .hpoint{
    font-size:14px; position:relative; width:80px; border:2px outset #f1f1f1;
  }
  #in_game .ingame_user_info .hpoint .hp{
    background:crimson; width:100%; color:#fff; padding-left:10%;
  }
  #in_game .playing_manager{
    position:relative; width:300px; height:150px; margin:0 auto; overflow:hidden; text-align:center;
  }
  #in_game .playing_manager .playing_board{
    position:relative; width:100%; height:80px;
		display:flex; padding:2%;
		display:-webkit-flex;
		display: -ms-flexbox;
		-webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  #in_game .playing_manager .playing_board .play_current{
    position:relative;
		width:32px; height:32px; background:#f1f1f1;
		box-sizing:border-box; border-radius:4px;
  }
  #in_game .playing_manager .playing_board .play_current>img{width:32px; height:32px;}

  #in_game .playing_manager .playing_board2{
    position:relative; width:100%; line-height:50px; overflow:hidden;
    width:300px; height:50px; border:1.5px outset #fbfbfb; text-align:center; border-radius:5px;
  }

  #in_game .selectBox{position:relative; width:320px; height:50px; margin:2% auto 10%; }
  #in_game .selectBox ul{}
  #in_game .selectBox ul li{
    position: relative; float:left; width:64px; height:64px; cursor:pointer;
    margin-left:12px; background:#f1f1f1; border-radius:10px;
  }
  #in_game .selectBox ul li img{width:64px; height:64px;}
  #in_game .selectBox ul .game_pow_off{opacity:0.2; pointer-events: none; }
  #in_game .selectBox ul .game_pow_on{opacity:1; pointer-events: auto; }
  #in_game .selectBox ul #game_pow #pow_count{
    color:#000; font-weight:bold; font-size:14px; background:orange; width:18px; height:18px;
    position:absolute; right:-8px; bottom:0; border-radius:5px; text-align:center;
  }
</style>
