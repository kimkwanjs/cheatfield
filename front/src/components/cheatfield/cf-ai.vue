<template>
  <div id="inAigame">
    <div class="aiIngameUserInfo">
      <div id="aiMyInfo">
        <span>{{myNick}}</span>
        <div class="hPoint">
          <div class="hp" v-bind:style="{width : myHp/3 + '%'}">{{ myHp }}</div>
        </div>
      </div>
      <div id="aiInfo">
        <span>관리봇</span>
        <div class="hPoint">
          <div class="hp" v-bind:style="{width : aiHp/3 + '%'}">{{ aiHp }}</div>
        </div>
      </div>
    </div>

    <div class="aiPlayingManager">
      <div class="playingBoard">
        <div class="playCurrent">{{ mySelected }}</div>
        <div class="playCurrent">{{ roundResult }}</div>
        <div class="playCurrent">{{ aiSelected }}</div>
      </div>
      <div class="playingBoard2">
        <span id="aiGameCurrent">카드를 선택해주세요</span>
        <span id="aiSelectTime"> Round {{ round }} </span>
      </div>
    </div>

    <div class="aiSelectBox">
      <ul>
        <li class="aigamePowOff" v-bind:class="{aigamePowOn : myPow}" @click="selectCard" id="aigamePow" data="pow">
          <span id="aiPowCount">x{{myPow}}</span><img src="../../assets/pow.png" border="0" alt="강펀치">
        </li>
        <li class="ai" @click="selectCard" id="aigamePunch" data='punch'><img src="../../assets/punch.png" border="0" alt="펀치"></li>
        <li class="ai" @click="selectCard" id="aigameDefence" data="defence"><img src="../../assets/defence.png" border="0" alt="디펜스"></li>
        <li class="ai" @click="selectCard" id="aigameLuck" data="luck"><img src="../../assets/luck.png" border="0" alt="LUCK"></li>
      </ul>
    </div>
  </div>
</template>
<script>
  import { eventBus } from '../../main'
  export default {
    props:['myNick'],
    components:{
    },
    data() {
      return {
        aiPow : 0 ,
        aiHp : 300 ,
        aiDefenceCounter : 0 ,
        aiSelected : '',
        myPow : 0 ,
        myHp : 300 ,
        myDefenceCounter : 0 ,
        mySelected : '',
        ai : ['punch', 'punch', 'defence', 'defence', 'luck'],
        ai2 : ['pow','pow', 'punch', 'defence', 'luck', 'luck', 'luck'],
        roundResult:'',
        round : 1 ,
      }
    },
    created(){},
    methods:{
      selectCard(e){
        this.round++
        this.mySelected = e.currentTarget.getAttribute('data')
        var i = Math.floor(Math.random()*5)
        if(this.aiPow<1){
          this.aiSelected = this.ai[i]
        } else if(this.aiPow>=1){
          i = Math.floor(Math.random()*7)
          this.aiSelected = this.ai2[i]
        }
        if(this.mySelected == "punch" && this.aiSelected == "punch"){
          this.roundResult = '[ 무 ]' ;
        }
        //무승부 디펜
        else if (this.mySelected == "defence" && this.aiSelected == "defence"){
          this.roundResult = '[ 무 ]' ;
        }
        //무승부 luck
        else if (this.mySelected == "luck" && this.aiSelected == "luck"){
          this.roundResult = '[ ㅎㅎ ]' ;
          this.myPow++ ;
          this.aiPow++ ;
        }
        //무승부 pow
        else if (this.mySelected == "pow" && this.aiSelected == "pow"){
          this.roundResult = '[ 오; ]' ;
          this.myPow-- ;
          this.aiPow-- ;
        }
        //펀치 일반승
        else if (this.mySelected == "punch" && this.aiSelected == "luck"){
          this.roundResult = '[ 승 ]' ;
          this.aiHp -= 100;
        }
        //펀치 절반패
        else if (this.mySelected == "punch" && this.aiSelected == "defence"){
          this.roundResult = '[ ㅠ.ㅠ ]' ;
          this.aiDefenceCounter++ ;
          this.myHp -= 50;
        }
        //펀치 강펀치패
        else if (this.mySelected == "punch" && this.aiSelected == "pow"){
          this.roundResult = '[ ;; ]' ;
          this.aiPow-- ;
          this.myHp -= 150;
        }
        //디펜 절반승
        else if (this.mySelected == "defence" && this.aiSelected == "punch"){
          this.roundResult = '[ 승 ]' ;
          this.myDefenceCounter++ ;
          this.aiHp -= 50;
        }
        //디펜 럭패
        else if (this.mySelected == "defence" && this.aiSelected == "luck"){
          this.roundResult = '[ 패 ]' ;
          this.aiPow++ ;
        }
        //디펜 강펀치패
        else if (this.mySelected == "defence" && this.aiSelected == "pow"){
          this.roundResult = '[ 패 ]'
          this.aiPow-- ;
          this.myHp -= 50;
        }
        //럭 디펜승
        else if (this.mySelected == "luck" && this.aiSelected == "defence"){
          this.roundResult = '[ 승 ]'
          this.myPow++ ;
        }
        //럭 펀치패
        else if (this.mySelected == "luck" && this.aiSelected == "punch"){
          this.roundResult = '[ 패 ]'
          this.myHp -= 100 ;
        }
        //럭 강펀치패
        else if (this.mySelected == "luck" && this.aiSelected == "pow"){
          this.roundResult = '[ 패 ]'
          this.aiPow-- ;
          this.myHp -= 100 ;
        }
        //pow 적펀치승
        else if (this.mySelected == "pow" && this.aiSelected == "punch"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.aiHp -= 150 ;
        }
        //pow 적디펜승
        else if (this.mySelected == "pow" && this.aiSelected == "defence"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.aiHp -= 50 ;
        }
        //pow 적럭승
        else if (this.mySelected == "pow" && this.aiSelected == "luck"){
          this.roundResult = '[ 승 ]'
          this.myPow-- ;
          this.aiHp -= 100 ;
        }

        if(this.myDefenceCounter == 3){
          this.myPow++
          this.myDefenceCounter = 0 ;
        }
        if(this.aiDefenceCounter == 3){
          this.aiPow++
          this.aiDefenceCounter = 0 ;
        }

        //결과 ai승리
        if(this.myHp<=0){
          alert('패배')
          this.aiGameOver();
        }
        else if(this.aiHp<=0){
          alert('승리')
          this.aiGameOver();
        }

      }, // --카드선택--
      aiGameOver(){
        eventBus.$emit('aigameOver')
      },
    }
  }
</script>
<style>
  #inAigame .aiIngameUserInfo{
    position:relative; margin-top:5%; width:100%; height:100%;
    padding-bottom:40%; z-index:2;
  }
  #inAigame .aiIngameUserInfo #aiMyInfo{
    position:absolute; left:2%; overflow:hidden; font-size:24px; color:#CEF279;
  }
  #inAigame .aiIngameUserInfo .hPoint{
    font-size:14px; position:relative; width:80px; border:2px outset #f1f1f1;
  }
  #inAigame .aiIngameUserInfo .hPoint .hp{
    background:crimson; width:100%; color:#fff; padding-left:10%;
  }
  #inAigame .aiIngameUserInfo #aiInfo{
    position:absolute; right:2%; overflow:hidden; font-size:24px;
  }

  #inAigame .aiPlayingManager{
    position:relative; width:300px; height:100px; margin:0 auto; overflow:hidden; text-align:center;
  }
  #inAigame .aiPlayingManager .playingBoard{
    position:relative; width:100%;
    padding:4%; overflow:hidden;
  }
  #inAigame .aiPlayingManager .playingBoard .playCurrent{
    position:relative; width:33%; float:left;
  }
  #inAigame .aiPlayingManager .playingBoard2{
    position:relative; width:100%; line-height:50px; overflow:hidden;
    width:300px; height:50px; border:1.5px outset #fbfbfb; text-align:center; border-radius:5px;
  }

  #inAigame .aiSelectBox{position:relative; width:320px; height:50px; margin:2% auto 10%; }
  #inAigame .aiSelectBox ul{}
  #inAigame .aiSelectBox ul li{
    position: relative; float:left; width:64px; height:64px; cursor:pointer;
    margin-left:12px; background:#f1f1f1; border-radius:10px;
  }
  #inAigame .aiSelectBox ul li img{width:64px; height:64px;}
  #inAigame .aiSelectBox ul .aigamePowOff{opacity:0.2; pointer-events: none; }
  #inAigame .aiSelectBox ul .aigamePowOn{opacity:1; pointer-events: auto; }
  #inAigame .aiSelectBox ul #aigamePow #aiPowCount{
    color:#000; font-weight:bold; font-size:14px; background:orange; width:18px; height:18px;
    position:absolute; right:-8px; bottom:0; border-radius:5px; text-align:center;
  }
</style>
