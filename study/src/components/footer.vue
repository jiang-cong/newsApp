<template>
  <div class="bootem">
    <footer>
        <nav>
            <ul>
              <li @click="luyou('HelloWorld')">
                <i class="el-icon-s-home" :class="number==1?'color':''"></i>
                <p :class="number==1?'color':''">首页</p>
              </li>
              <li @click="luyou('Search')">
                <i class="el-icon-search" :class="number==2?'color':''"></i>
                <p :class="number==2?'color':''">搜索</p>
              </li>
              <li @click="luyou('OneiroMancy')">
                <i class="el-icon-chat-line-round" :class="number==3?'color':''"></i>
                <p :class="number==3?'color':''">解梦</p>
              </li>
              <li>
                <i class="el-icon-user" :class="number==4?'color':''"></i>
                <p :class="number==4?'color':''">我的</p>
              </li>
            </ul>
        </nav>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'bootem',
  props:["number"],
  methods:{
    luyou(zhi){
      this.$router.push({
        name:zhi
      })
    }
  }
}
</script>

<style scoped lang="scss">
@function px2rem($px){
  $rem :37.5px;
  @return ($px/ $rem) + rem;
}

$color:#abcdef;
  footer{
    width: 100%;
    height: 100%;
    background: $color;
    nav{
    width: 100%;
    height: px2rem(50px);
    position: fixed;
    bottom: 0;
      ul{
        height: 100%;
        list-style: none;
        border-top: 1px solid #eee;
        padding-top: 3px;
        background: white;
        padding: 0;
        margin: 0;
        display: flex;
        justify-content: space-between;
        align-items: center;
          li{
            flex: 1;
            text-align: center;
            font-size: px2rem(15px);
              i{
                font-size: px2rem(20px);
              }
              .color{
                color: red;
              }
              p{
                margin: 0;
                padding: 0;
              }
          }
      }
    }
  }
</style>
