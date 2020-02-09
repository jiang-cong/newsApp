<template>
  <div class="hello">
    <!-- 头部 -->
    <top :topName=name></top>
    <!-- 首页展示的新闻 -->
    <div class="list">
      <mt-loadmore :top-method="loadTop" ref="loadmore">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <a :href=item.url>
            <div class="li-left">
              <p>{{item.title}}</p>
              <span>{{item.source}}</span>
              <span>{{item.votecount}}跟帖</span>
            </div>
            <div class="li-right">
              <img :src=item.imgsrc alt="">
            </div>
            </a>
        </li>
      </ul>
      </mt-loadmore>
    </div>
    <!-- 尾部 -->
    <bootem :number=1></bootem>
  </div>
</template>

<script>
import top from './header'
import bootem from './footer';
export default {
  name: 'HelloWorld',
  components:{
    top,
    bootem
  },
  data(){
    return{
      listData:null,
      name:"首页"
    }
  },
  methods:{
    newsData(){//新闻列表数据
        this.$axios.get('/nc/article/headline/T1348649580692/0-40.html').then(res=>{
          console.log(res);
          this.listData = res.data.T1348649580692;
          this.$refs.loadmore.onTopLoaded();
          this.$message({
          message: "加载成功",
          type: 'success',
          customClass:'message',
          center: true
        });
        }).catch(error=>{
          this.$message.error('网络错误,请刷新后重试!');
        })
    },
    loadTop() {
      this.newsData();

  }
  },
  mounted(){
      this.newsData();
  }
}
</script>

<style scoped lang="scss">
@function px2rem($px){
  $rem :37.5px;
  @return ($px/ $rem) + rem;
}
*{
  margin: 0;
  padding: 0;
}
.list{
  margin-top: px2rem(40px);
  margin-bottom: px2rem(40px);
  ul{
    list-style: none;
    margin: 0 px2rem(10px);
      li{
        width: 100%;
        border-bottom: 1px solid #eee;
        padding-bottom: 5px;
        margin-bottom: 5px;
        margin-top: 5px;
        a{
          display: flex;
          text-decoration: none;
          .li-left{
            flex: 2;
              p{
                font-size: px2rem(18px);
                color: #000;
              }
              span{
                font-size: px2rem(14px);
                color: #999;
              }
          }
          .li-right{
            flex: 1;
              img{
                width: 100%;
                height: 100%;
              }
          }
          }
      }
  }
}
</style>
<style>
.message{
  min-width: 8rem;
  padding: 0.3rem;
}
.el-message .el-icon-success{
  font-size: 0.6rem;
}
.mint-loadmore-text{
  font-size: 0.5rem;
}
</style>
