<template>
  <div>
    <div class="gameWrap">
      <cfTitle></cfTitle>
      <cfLobby v-on:gameSearch="gameSearch" v-on:aigameStart="aigameStart" v-bind:propsdata="mynick" v-if="lobbyView"></cfLobby>
      <cfSearch v-on:gameStart="gameStart" v-on:searchCancle="searchCancle" v-bind:mynick="mynick" v-bind:enemy="enemynick" v-if="searchView"></cfSearch>
      <div class="gameWindow" v-if="playgameView">
        <cfPlaygame v-bind:mynick="mynick" v-bind:enemynick="enemynick"></cfPlaygame>
      </div>
      <div class="gameWindow" v-if="aiView">
        <cfAi v-bind:propsdata="mynick"></cfAi>
      </div>
    </div>
    <div class="game_info">
        - CHEAT FIELD(Instant) - <br />
        <br />
        1인개발 HTML 5 기반 웹게임(심리전카드게임)
        <br />
        - 서버 : Node.js (Express , Socket.io)
        <br />
        - 클라이언트 : Vue.js
        <br /><br />
        포트폴리오 용 으로 제작한 인스턴트버전입니다.
        <br /><br />
        게임모드 는 유저간 1:1 실시간 대전모드 와 A.I 대전모드 가 있으며 게임방법 은 가이드란을 참고 하시면 됩니다.
        <br /><br />
        게임의 흐름은 최초 닉네임설정 을 통해 유저 를 구별합니다, 유저가 게임시작 버튼을 눌러 대기인원이 있을시 게임이시작되고
        대기실은 사라집니다, 대기인원이 없을시 대기실에서 상대방을 기다립니다. 게임이 끝난뒤 유저들은 방에서 나오게되고 게임데이터는 리셋됩니다.
        웹페이지마다 유저등록이 가능해 여러 웹페이지를 통해 테스트 하기 쉽게 구현하였습니다.
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
        mynick:'',
        enemynick:'',
        lobbyView:true,
        searchView:false,
        playgameView:false,
        aiView:false,
      }
    },
    sockets: {
        ready_ok: function (enemynick) {
          this.enemynick = enemynick
          setTimeout(()=>{
            this.gameStart()
          },3000)
        }
    },
    created(){
      eventBus.$on('nickname_set', (nick) => {
        sessionStorage.setItem('mynick', nick)
      })
      eventBus.$on('aigame_over', () => {
        this.lobbyView=true;
        this.aiView=false;
      })
      eventBus.$on('game_over', () => {
        this.lobbyView=true;
        this.playgameView=false;
        location.reload();
      })
      this.mynick = sessionStorage.getItem('mynick')
    },
    methods:{
      gameSearch(){
        this.searchView = true;
        this.lobbyView = false;
        this.$socket.emit('gamerSearch', this.mynick)
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
        this.$socket.emit('game_search_cancle')
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

  .game_info{
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
