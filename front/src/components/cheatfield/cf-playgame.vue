<template>
  <div id="inGame">
    <div class="ingame_userInfo">
      <div id="myInfo">
        <span>{{myNick}}</span>
        <div class="hPoint">
          <div class="hp" v-bind:style="{width : myHp/3 + '%'}">{{ myHp }}</div>
        </div>
      </div>
      <div id="enemyInfo">
        <span>{{enemyNick}}</span>
        <div class="hPoint">
          <div class="hp" v-bind:style="{width : enemyHp/3 + '%'}">{{ enemyHp }}</div>
        </div>
      </div>
    </div>

    <div class="playingManager">
      <div class="playingBoard">
        <div class="playCurrent myCurrent" v-if="myCard">
          <img v-bind:src="'http://cheatfield.cafe24app.com/img/'+myCard+'.png'" />
        </div>
        <div class="roundResult">{{ roundResult }}</div>
        <div class="playCurrent enemyCurrent" v-if="enemyCard">
          <img v-bind:src="'http://cheatfield.cafe24app.com/img/'+enemyCard+'.png'" />
        </div>
      </div>
      <div class="playingBoard2">
        <span id="gameCurrent">{{gameCurrent}}</span>
        <span id="selectTime"></span>
      </div>
    </div>

    <div class="selectBox" v-if="selectBox">
      <ul>
        <li class="gamePowOff" id="gamePow" v-bind:class="{gamePowOn : myPow}" @click="selectCard" data="pow">
          <span id="powCount">x{{myPow}}</span><img src="../../assets/pow.png" border="0" alt="강펀치">
        </li>
        <li @click="selectCard" id="gamePunch" data='punch'><img src="../../assets/punch.png" border="0" alt="펀치"></li>
        <li @click="selectCard" id="gameDefence" data="defence"><img src="../../assets/defence.png" border="0" alt="디펜스"></li>
        <li @click="selectCard" id="gameLuck" data="luck"><img src="../../assets/luck.png" border="0" alt="LUCK"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { eventBus } from '../../main'
  export default {
    props:['myNick','enemyNick'],
    data() {
      return {
        enemyPow : 0 ,
        enemyHp : 300 ,
        enemySelected : '',
        myPow : 0 ,
        myHp : 300 ,
        myDefenceCounter : 0 ,
        mySelected : '',
        roundResult:'',
        myCard:'',
        enemyCard:'',
        gameCurrent:'카드를 선택해주세요',
        playerStatusMy:'',
        playerStatusEnemy:'',
        selectBox:true
      }
    },
    beforeDestroy(){
      this.$socket.emit('disconnectUser')
    },
    sockets: {
        enemySelect: function (enemyCard) {
          this.playerStatusEnemy = enemyCard
          this.gameplayManager()
        },
        gamePlayDestroy: function(){
          alert('상대방나감 : 승리!!')
          this.gameOver();
        }
    },
    methods:{
      selectCard(e){
        this.selectBox = false
        this.mySelected = e.currentTarget.getAttribute('data')
        this.playerStatusMy = this.mySelected
        this.gameplayManager()
        this.$socket.emit('cardSelect', this.enemyNick, this.mySelected)
      },
      gameplayManager(){
        if(this.playerStatusMy && this.playerStatusEnemy){
          this.gameCurrent = ''
          this.allselected(this.playerStatusMy,this.playerStatusEnemy)
        }else if(this.playerStatusMy && !this.playerStatusEnemy){
          this.gameCurrent = '상대방의 선택을 기다립니다.'
          this.myCard = 'qm'
        }else{
          this.gameCurrent = '상대방 선택완료!'
          this.enemyCard = 'qm'
        }
      },
      playStatusInit(){
          this.gameCurrent='카드를 선택해주세요'
          this.playerStatusMy = ''
          this.playerStatusEnemy = ''
          this.selectBox = true
          this.roundResult = ''
          this.myCard = ''
          this.enemyCard = ''
      },
      allselected(myCard,enemyCard){
        this.myCard = myCard
        this.enemyCard = enemyCard
        if(myCard == "punch" && enemyCard == "punch"){
          this.roundResult = '[ 무 ]' ;
          this.gameCurrent='상대카드 - punch'
        }
        //무승부 디펜
        else if (myCard == "defence" && enemyCard == "defence"){
          this.roundResult = '[ 무 ]' ;
          this.gameCurrent='상대카드 - defence'
        }
        //무승부 luck
        else if (myCard == "luck" && enemyCard == "luck"){
          this.roundResult = '[ ㅎㅎ ]' ;
          this.myPow++ ;
          this.enemyPow++ ;
          this.gameCurrent='상대카드 - luck'
        }
        //무승부 pow
        else if (myCard == "pow" && enemyCard == "pow"){
          this.roundResult = '[ 오; ]' ;
          this.myPow-- ;
          this.enemyPow-- ;
          this.gameCurrent='상대카드 - power'
        }
        //펀치 일반승
        else if (myCard == "punch" && enemyCard == "luck"){
          this.roundResult = '[ 승 ]' ;
          this.enemyHp -= 100;
          this.gameCurrent='상대카드 - luck'
        }
        //펀치 절반패
        else if (myCard == "punch" && enemyCard == "defence"){
          this.roundResult = '[ ㅠ.ㅠ ]' ;
          this.enemyDefenceCounter++ ;
          this.myHp -= 50;
          this.gameCurrent='상대카드 - defence'
        }
        //펀치 강펀치패
        else if (myCard == "punch" && enemyCard == "pow"){
          this.roundResult = '[ ;; ]' ;
          this.enemyPow-- ;
          this.myHp -= 150;
          this.gameCurrent='상대카드 - power'
        }
        //디펜 절반승
        else if (myCard == "defence" && enemyCard == "punch"){
          this.roundResult = '[ 승 ]' ;
          this.myDefenceCounter++ ;
          this.enemyHp -= 50;
          this.gameCurrent='방어 '+this.myDefenceCounter+' 번 성공 !'
        }
        //디펜 럭패
        else if (myCard == "defence" && enemyCard == "luck"){
          this.roundResult = '[ 패 ]' ;
          this.enemyPow++ ;
          this.gameCurrent='상대카드 - punch'
        }
        //디펜 강펀치패
        else if (myCard == "defence" && enemyCard == "pow"){
          this.roundResult = '[ 패 ]'
          this.enemyPow-- ;
          this.myHp -= 50;
          this.gameCurrent='상대카드 - punch'
        }
        //럭 디펜승
        else if (myCard == "luck" && enemyCard == "defence"){
          this.roundResult = '[ 승 ]'
          this.myPow++ ;
          this.gameCurrent='상대카드 - punch'
        }
        //럭 펀치패
        else if (myCard == "luck" && enemyCard == "punch"){
          this.roundResult = '[ 패 ]'
          this.myHp -= 100 ;
          this.gameCurrent='상대카드 - punch'
        }
        //럭 강펀치패
        else if (myCard == "luck" && enemyCard == "pow"){
          this.roundResult = '[ 패 ]'
          this.enemyPow-- ;
          this.myHp -= 100 ;
          this.gameCurrent='상대카드 - power'
        }
        //pow 적펀치승
        else if (myCard == "pow" && enemyCard == "punch"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.enemyHp -= 150 ;
          this.gameCurrent='상대카드 - punch'
        }
        //pow 적디펜승
        else if (myCard == "pow" && enemyCard == "defence"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.enemyHp -= 50 ;
          this.gameCurrent='상대카드 - defence'
        }
        //pow 적럭승
        else if (myCard == "pow" && enemyCard == "luck"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.enemyHp -= 100 ;
          this.gameCurrent='상대카드 - luck'
        }

        if(this.myDefenceCounter == 3){
          this.myPow++
          this.myDefenceCounter = 0 ;
          this.gameCurrent='방어3번성공 - power획득!'
        }

        //결과 적승리
        if(this.myHp<=0){
          alert('패배')
          this.gameOver();
        }
        else if(this.enemyHp<=0){
          alert('승리')
          this.gameOver();
        }else if(this.myHp > 0 && this.enemyHp > 0){
          setTimeout(()=>{
            this.playStatusInit();
          },3000)
        }
      }, // --카드선택--
      gameOver(){
        eventBus.$emit('gameOver')
      },
    }
  }
</script>
<style scoped>
  #inGame .ingame_userInfo{
    position:relative; margin-top:5%; width:100%;
    padding-bottom:30%; z-index:2;
  }
  #inGame .ingame_userInfo #myInfo{
    position:absolute; left:2%; overflow:hidden; font-size:24px; color:#CEF279;
  }
  #inGame .ingame_userInfo #enemyInfo{
    position:absolute; right:2%; overflow:hidden; font-size:24px;
  }
  #inGame .ingame_userInfo .hPoint{
    font-size:14px; position:relative; width:80px; border:2px outset #f1f1f1;
  }
  #inGame .ingame_userInfo .hPoint .hp{
    background:crimson; width:100%; color:#fff; padding-left:10%;
    transition: all .2s ease-in;
  }
  #inGame .playingManager{
    position:relative; width:300px; height:150px; margin:0 auto; overflow:hidden; text-align:center;
  }
  #inGame .playingManager .playingBoard{
    position:relative; width:100%; height:80px;
		display:flex; padding:2%;
		display:-webkit-flex;
		display: -ms-flexbox;
		-webkit-align-items: center;
    align-items: center;
    -webkit-justify-content: space-between;
    justify-content: space-between;
  }
  #inGame .playingManager .playingBoard .playCurrent{
    position:relative;
		width:32px; height:32px; background:#f1f1f1;
		box-sizing:border-box; border-radius:4px;
  }
  #inGame .playingManager .playingBoard .playCurrent>img{width:32px; height:32px;}

  #inGame .playingManager .playingBoard2{
    position:relative; width:100%; line-height:50px; overflow:hidden;
    width:300px; height:50px; border:1.5px outset #fbfbfb; text-align:center; border-radius:5px;
  }

  #inGame .selectBox{position:relative; width:320px; height:50px; margin:2% auto 10%; }
  #inGame .selectBox ul li{
    position: relative; float:left; width:64px; height:64px; cursor:pointer;
    margin-left:12px; background:#f1f1f1; border-radius:10px;
  }
  #inGame .selectBox ul li:hover{
    transform: translateY(2px)
  }
   #inGame .selectBox ul li:active{
    transform: translateY(2px)
  }
  #inGame .selectBox ul li img{width:64px; height:64px;}
  #inGame .selectBox ul .gamePowOff{opacity:0.2; pointer-events: none; }
  #inGame .selectBox ul .gamePowOn{opacity:1; pointer-events: auto; }
  #inGame .selectBox ul #gamePow #powCount{
    color:#000; font-weight:bold; font-size:14px; background:orange; width:18px; height:18px;
    position:absolute; right:-8px; bottom:0; border-radius:5px; text-align:center;
  }
</style>
