<template>
  <div id="search">
    <top :topName=name></top>
    <!-- 搜索新闻页 -->
    <div class="sear">
    <el-input placeholder="请输入要搜索的新闻关键字" v-model="input" clearable @clear="clear()">
    <template slot="append"><i class="el-icon-search" @click="searData()"></i></template>
    </el-input>
    </div>
    <!-- 默认展示历史搜索 -->
    <div class="histoy" v-if="pdList==1">
      <div class="hisName">搜索历史:</div>
      <ul>
        <li v-for="(items,indexs) in localData" :key="indexs">
          <span @click="histoyList(items)">{{items}}</span>
          <i class="el-icon-circle-close" @click="clearLocal(indexs)"></i>
        </li>
      </ul>
    </div>
    <!-- 列表 -->
    <div class="list" v-if="pdList==2">
      <ul>
        <li v-for="(item,index) in listData" :key="index">
          <a href="#">
          <div class="li-left">
            <p>{{item.title}}</p>
            <span>{{item.pdate}}</span>
            <span>{{item.src}}</span>
          </div>
          <div class="li-right">
            <img :src=item.img alt="">
          </div>
          </a>
        </li>
      </ul>
    </div>
    <!-- 底部 -->
    <bottom :number=2></bottom>
  </div>
</template>

<script>
import top from './header';
import bottom from './footer'
import { MessageBox } from 'mint-ui';
  export default{
    name:'search',
    components:{
      top,
      bottom
    },
    data(){
      return{
        input:'',
        listData:null,
        newArr:[],
        localData:[],
        pdList:3,
        name:'搜索'
      }
    },
    methods:{
      searData(){//搜索的数据
      if(this.input != ''){
        this.$axios.get(`/ActNews/Query?key=cd1789c1a4c1419bb7fdc740b8f66fd6&keyword=${this.input}`).then(res=>{
          console.log(res);
          this.listData = res.data.result;
          this.pdList = 2;
          if(res.data.result == null){
            MessageBox({
              title: '提示',
              message: '暂时没有此类新闻!'
            });
          }
        })
        if(this.localData.indexOf(this.input) == -1){
          this.localData.push(this.input);
          localStorage.setItem('newArr',JSON.stringify(this.localData));
          console.log(this.localData);
        }
      }else{
        MessageBox({
          itle: '警告',
          message: '请输入关键字!'
        });
      }
      },
      clear(){//清空搜索框时执行
      if(this.localData.length == 0){
          this.pdList = 3;
        }else{
           this.pdList = 1;
        }
      },
      clearLocal(indexs){//清除历史搜索
        this.localData.splice(indexs,1);
        localStorage.setItem("newArr",JSON.stringify(this.localData));
        if(this.localData.length == 0){
          this.pdList = 3;
          console.log(this.pdList)
        }
      },
      histoyList(items){//点击历史记录显示
        this.input = items;
        this.searData();
      }
    },
    mounted(){
      if(localStorage.getItem('newArr') == null || localStorage.getItem('newArr') == ''){
        localStorage.setItem('newArr',JSON.stringify([]));
      }else{
      this.localData = JSON.parse(localStorage.getItem('newArr'));
      if(this.localData.length == 0){
          this.pdList = 3;
          console.log(this.pdList)
        }else{
          this.pdList = 1;
        }
      }
      console.log(this.pdList)
      // this.localData.push(this.input);
      // localStorage.setItem('newArr',JSON.stringify(this.localData));
    }
  }
</script>

<style scoped lang="scss">
@function px2rem($px){
  $rem :37.5px;
  @return ($px/ $rem) + rem;
}
  .sear{
    margin:px2rem(30px) 5px 5px 5px;
  }
  .list{
  ul{
    list-style: none;
    margin: 0 px2rem(10px);
    padding: 0;
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
                font-size: px2rem(16px);
                color: #000;
                margin: 0;
              }
              span{
                font-size: px2rem(12px);
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
// 默认搜索历史
.histoy{
  .hisName{
    font-size: px2rem(15px);
    margin-left: 5px;
    margin-bottom: 5px;
    color: coral;
  }
  ul{
    list-style: none;
    margin: 0;
    padding: 0;
      li{
        display: flex;
        margin: 0 5px;
        background: #eee;
        border-radius: 5px;
        margin-bottom: 5px;
        height: px2rem(40px);
        line-height: px2rem(40px);
        justify-content: space-between;
          span{
            font-size: px2rem(14px);
            margin-left: px2rem(10px);
            flex: 3;
          }
          i{
            width: px2rem(40px);
            text-align: center;
            font-size: px2rem(18px);
            line-height: px2rem(40px);
          }
      }
  }
}
</style>
