<template>
    <div id="gameLogin">
      <div class="nickWrap">
        <div class="nickBox">
          <p id="nickNotice">
            닉네임을 입력해 주세요
          </p>
          <form id="nickCheck">
            <p>
              <input
               id="nickCheckInput"
                type="text" maxlength="10" required autocomplete="off" v-model="myNick" v-on:keyup.enter="nickNameSet"
                />
              </p>
              <p>
                <button id="nickCheckSubmit" v-on:click="nickNameSet"> OK </button>
              </p>
            </form>
          </div>
        </div>
      </div>
</template>
<script>
  import { eventBus } from '../../main'
  export default {
    data() {
      return{
        myNick: '',
      }
    },
    methods:{
      nickNameSet() {
        var value = this.myNick
        if(value){
          eventBus.$emit('nickNameSet', value)
        }
        this.myNick=''
      }
    }
  }
</script>
<style>
 #gameLogin{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
 }
 .nickWrap{
	position: fixed; width: 100%; height: 100%; right: 0;
	bottom: 0; left: 0; top: 0; background-color: rgba(0,0,0,0.8); overflow: auto; z-index: 100;
	display: -webkit-box; display: -ms-flexbox;	display: flex;
	-webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;
	-webkit-box-align: center; -ms-flex-align: center; align-items: center;
  }
  .nickBox{
    position:relative; width: 320px; height:120px; padding:10px; border:2px outset #ccc; text-align:center;
    border-radius:10px;
  }

  .nickBox p {padding:2%; font-size:14px;}
  input:focus{
    outline:none
  }
  .nickBox #nickCheckSubmit{
    border-radius:4px; border:1px outset #ccc; background:#111; color:#fff; width:42px; height:25px;
   }
</style>
