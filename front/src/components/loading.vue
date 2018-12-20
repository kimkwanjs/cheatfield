<template>
  <div class="loading">
    잠시만기다려주세요
  </div>
</template>

<script>
export default {
  data() {
    return {
    }
  }
}
</script>

<style>
  .loading{
    position: fixed;
    width: 100%;
    height: 100%;
    background:#eee;
    text-align:center;
    color:#000;
    z-index:10000;
  }
</style>
