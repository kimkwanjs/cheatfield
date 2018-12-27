<template>
  <div>
    <div class="gameWrap">
      <cfTitle></cfTitle>
      <cfLobby v-on:gameSearch="gameSearch" v-on:aigameStart="aigameStart" v-bind:propsData="myNick" v-if="lobbyView"></cfLobby>
      <cfSearch v-on:gameStart="gameStart" v-on:searchCancle="searchCancle" v-bind:myNick="myNick" v-bind:enemy="enemyNick" v-if="searchView"></cfSearch>
      <div class="gameWindow" v-if="playgameView">
        <cfPlaygame v-bind:myNick="myNick" v-bind:enemyNick="enemyNick"></cfPlaygame>
      </div>
      <div class="gameWindow" v-if="aiView">
        <cfAi v-bind:myNick="myNick"></cfAi>
      </div>
    </div>
    <div class="gameInfo">
        1인개발 HTML 5 기반 웹게임(실시간 심리전게임)
        <br />
        - 서버 : Node.js (Express , Socket.io)
        <br />
        - 클라이언트 : Vue.js
        <br /><br />
        포트폴리오 용 으로 제작한 인스턴트버전입니다.
        <br /><br />
        게임모드 는 유저간 1:1 실시간 대전모드 와 A.I 대전모드 가 있습니다.
        <br /><br />
        유저간 통신은 socket.io 를 활용한 실시간 소켓 통신을 구현하였습니다. 유저를 구별할 수 있는 아이디는
        세션스토리지에 담아 서버에서 서로에게 보내 구별하고 있습니다. 게임은 턴방식으로 진행되며 턴 마다 서로 카드를 하나씩 고른뒤
        비교하여 승,패 를 결정합니다. 최종 상대방의 체력을 0 이하로 만들 시 게임은 종료됩니다.
    </div>
  </div>
</template>
<script>
  import cfTitle from '../components/cheatfield/cf-title.vue'
  import cfLobby from '../components/cheatfield/cf-lobby.vue'
  import cfSearch from '../components/cheatfield/cf-search.vue'
  import cfPlaygame from '../components/cheatfield/cf-playgame.vue'
  import cfAi from '../components/cheatfield/cf-ai.vue'
  import { eventBus } from '../main'
  export default {
    components:{
      cfTitle:cfTitle,
      cfLobby:cfLobby,
      cfSearch:cfSearch,
      cfPlaygame:cfPlaygame,
      cfAi:cfAi,
    },
    data(){
      return{
        myNick:'',
        enemyNick:'',
        lobbyView:true,
        searchView:false,
        playgameView:false,
        aiView:false,
      }
    },
    sockets: {
        readyOk: function (enemyNick) {
          this.enemyNick = enemyNick
          setTimeout(()=>{
            this.gameStart()
          },3000)
        }
    },
    created(){
      eventBus.$on('nickNameSet', (nick) => {
        sessionStorage.setItem('myNick', nick)
      })
      eventBus.$on('aigameOver', () => {
        this.lobbyView=true;
        this.aiView=false;
      })
      eventBus.$on('gameOver', () => {
        this.lobbyView=true;
        this.playgameView=false;
        location.reload();
      })
      this.myNick = sessionStorage.getItem('myNick')
    },
    methods:{
      gameSearch(){
        this.searchView = true;
        this.lobbyView = false;
        this.$socket.emit('gameSearch', this.myNick)
      },
      aigameStart(){
        this.lobbyView = false;
        this.aiView = true;
      },
      gameStart(){
        this.searchView = false;
        this.playgameView = true;
      },
      searchCancle(){
        this.searchView = false;
        this.lobbyView = true;
        this.$socket.emit('gameSearchCancle')
      }
    },
    watch:{

    }
  }
</script>
<style scoped>
  .gameWrap{
    max-width:640px;
    min-width:320px;
    height:100%;
    margin:20px auto;
    padding:1% 2%;
    border-radius:20px;
    border:4px outset #fff;
    box-shadow: 5px 5px 20px #03303c;
    box-sizing: border-box;
    background:#111;
  }

  .gameInfo{
    max-width:640px;
    min-width:320px;
    height:100%;
    margin:20px auto;
    padding:4% 4% 8%;
    border-radius: 20px;
    border:4px outset #fff;
    box-shadow: 5px 5px 20px #03303c;
    box-sizing: border-box;
    background:#111;
    font-family: 'Nanum Gothic', sans-serif;
    line-height:1.8rem
  }
</style>
