<template>
    <div class="gameTitle">
        CHEAT
        <br/>
        FIELD
        <!-- <span>instance</span> -->
    </div>
</template>
<script>
  export default {

  }
</script>
<style scoped>
  .gameTitle{
    position:relative; width:100%;
    text-align:center;z-index:100;
    color: white;
    top:50px;
    font-family: arvo;
    text-shadow:
    -3px -3px 0 #222,
    3px -3px 0 #222,
    -3px 3px 0 #222,
    3px 3px 0 #222,
    4px 4px 0 #fff,
    5px 5px 0 #111,
    6px 6px 0 #fff,
    7px 7px 0 #fff;
    line-height: 0.92em;
    letter-spacing: 0.06em;
    transform: scaleY(0.9);
    -webkit-transform: scaleY(0.9);
    font-size:102px;
    animation: titleAnimation 1.5s forwards;
    -webkit-animation: titleAnimation 1.5s forwards;
  }
  @keyframes titleAnimation{
  from {
      top:50px
  }
  to {
      top:0px
    }
  }

  @-webkit-keyframes titleAnimation{
  from {
      top:50px
  }
  to {
      top:0px
    }
  }

  @media (max-width:578px){
    .gameTitle{font-size:96px;}
  }

  @media (max-width:485px){
    .gameTitle{font-size:76px;}
  }

  @media (max-width:360px){
    .gameTitle{
      font-size:56px;
    }
  }
</style>
