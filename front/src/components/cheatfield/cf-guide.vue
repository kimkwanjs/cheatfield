<template>
    <div id="gameGuide">
        <div class="guide_wrap">
            <div class="guide_box">
              <p class="close_pop" @click="$emit('close')">X</p>
              <img src="../../assets/game_guide.png" border="0" alt="게임가이드"/>
            </div>
        </div>
    </div>
</template>
<script>
  // import { eventBus } from '../../main'
  export default {

  }
</script>
<style>
 #gameGuide{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, .8);
    overflow: auto;
 }
 .guide_wrap{
    margin:0 auto;
    max-width:640px;
    min-width:320px;
 }
 .guide_wrap img{
    width:100%;
 }
 .close_pop{
   cursor:pointer; text-align:center; color:#fff; position:fixed; top: 10px; right:5%;
   border:2px outset #000; padding:10px; border-radius:4px; background:rgb(0, 0, 0, .7);
 }
</style>
