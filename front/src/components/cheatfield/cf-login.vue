<template>
    <div id="gameLogin">
      <div class="nick_wrap">
        <div class="nick_box">
          <p id="nick_notice">
            닉네임을 입력해 주세요
          </p>
          <form id="nick_check">
            <p>
              <input
               id="nick_check_input"
                type="text" maxlength="10" required autocomplete="off" v-model="mynick" v-on:keyup.enter="nickname_set"
                />
              </p>
              <p>
                <button id="nick_check_submit" v-on:click="nickname_set"> OK </button>
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
        mynick: '',
      }
    },
    methods:{
      nickname_set() {
        var value = this.mynick
        if(value){
          eventBus.$emit('nickname_set', value)
        }
        this.mynick=''
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
 .nick_wrap{
	position: fixed; width: 100%; height: 100%; right: 0;
	bottom: 0; left: 0; top: 0; background-color: rgba(0,0,0,0.8); overflow: auto; z-index: 100;
	display: -webkit-box; display: -ms-flexbox;	display: flex;
	-webkit-box-pack: center; -ms-flex-pack: center; justify-content: center;
	-webkit-box-align: center; -ms-flex-align: center; align-items: center;
  }
  .nick_box{
    position:relative; width: 320px; height:120px; padding:10px; border:2px outset #ccc; text-align:center;
    border-radius:10px;
  }

  .nick_box p {padding:2%; font-size:14px;}
  input:focus{
    outline:none
  }
  .nick_box #nick_check_submit{
    border-radius:4px; border:1px outset #ccc; background:#111; color:#fff; width:42px; height:25px;
   }
</style>
