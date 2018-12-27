<template>
  <div id="gameSearching">
    <div id="searchingBox">
      <div id="gameSearchingText">게임찾는중...</div>
      <div id="gameSearchingVs">VS</div>
      <div class="searchInfoBox">
        <div id="searchingMyInfo">
          <p class="myNick" id="searching_myNick">{{myNick}}</p>
        </div>
        <div id="searchingEnemyInfo">
          <p class="enemyNick" id="searchingEnemyNick">{{enemyNick}}</p>
        </div>
      </div>
      <div id="gameSearchingCancle" @click="searchCancle">취소</div>
    </div>
  </div>
</template>
<script>
  export default {
    props:['myNick','enemy'],
    data() {
      return {
        enemyNick:'???'
      }
    },
    watch:{
      enemy(){
        this.enemyNick = this.enemy
      }
    },
    methods:{
      searchCancle(){
        this.$emit('searchCancle')
      }
    }
  }
</script>
<style scoped>
  #gameSearching{
		position:relative; width:100%; padding-bottom:60%;
		box-sizing:border-box; -webkit-box-sizing:border-box;
	}
	#gameSearching #searchingBox{
		position:absolute; top:8%; left:50%; margin-left:-155px;
		width:310px; height:70%;
		text-align:center; border:2px outset #fff;
	}
	#gameSearching #searchingBox #gameSearchingText{
		position:absolute;
		top:0%;
		width:200px; left:50%; margin-left:-100px;
    animation-duration: 1s;
    animation-name: peach;
    animation-iteration-count: infinite;
    animation-direction: alternate;
    animation-fill-mode: backwards;
    animation-timing-function: linear;
    -webkit-animation-duration: 1s;
    -webkit-animation-name: peach;
    -webkit-animation-iteration-count: infinite;
    -webkit-animation-direction: alternate;
    -webkit-animation-fill-mode: backwards;
    -webkit-animation-timing-function: linear;
    -moz-animation-duration: 1s;
    -moz-animation-name: peach;
    -moz-animation-iteration-count: infinite;
    -moz-animation-direction: alternate;
    -moz-animation-fill-mode: backwards;
    -moz-animation-timing-function: linear;
    }
	@-webkit-keyframes peach{
		0% {top: 0%;}100%{top: 3%;}
	}
	@-moz-keyframes peach{
		0% {top: 0%;}100%{top: 3%;}
	}
	@keyframes peach{
		0% {top: 0%;}100%{top: 3%;}
	}
	#gameSearching #searchingBox #gameSearchingVs
	{
		position:absolute; left:50%; width:50px; height:100%; margin-left:-25px;
		display: -webkit-box;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		align-items:center;
		-webkit-box-orient: vertical;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	.searchInfoBox{position:relative; display: -webkit-box; display: -ms-flexbox; display: flex; width:100%; height:100%;}
	#searchingMyInfo
	{
		position:relative; width:50%; height:100%;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		align-items:center;
		-webkit-box-orient: vertical;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	#searchingEnemyInfo
	{
		position:relative; width:50%; height:100%;
		display: -webkit-flex;
		display: -ms-flexbox;
		display: flex;
		-webkit-box-pack: center;
		-ms-flex-pack: center;
		justify-content: center;
		align-items:center;
		-webkit-box-orient: vertical;
		-ms-flex-direction: column;
		flex-direction: column;
	}
	#gameSearching #searchingBox #gameSearchingCancle{
    position:relative; top:10%; font-size:15px; cursor:pointer;
  }
</style>
