<template>
  <div id="app">
    <header>
      <div>{{topName}}</div>
    </header>
  </div>
</template>

<script>
  export default{
    name:"top",
    props:["topName"]
  }
</script>

<style scoped lang="scss">
@function px2rem($px){
  $rem :37.5px;
  @return ($px/ $rem) + rem;
}
  header{
    position: fixed;
    top: 0;
    width: 100%;
    z-index: 100;
    height: px2rem(40px);
    background: #abcdef;
    display: flex;
    justify-content: center;
    align-items: center;
      div{
        font-size: px2rem(17px);
        color: white;
      }
  }
</style>
