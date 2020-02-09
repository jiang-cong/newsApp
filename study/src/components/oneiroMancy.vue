<template>
  <div class="oneiroMancy">
    <!-- 头部 -->
    <top :topName=name></top>
    <!-- 中间部分 -->
    <!-- 输入关键字 -->
    <div class="sear">
    <el-input placeholder="请输入要解的梦～比如梦见XXX" v-model="input" clearable @clear="clear()">
    <template slot="append"><i class="el-icon-search" @click="listData()"></i></template>
    </el-input>
    </div>

    <div class="tag">
      <div class="tag-tab">
        <ul>
          <li @click="tab(index)" v-for="(item,index) in newArr" :key="index">{{item}}</li>
        </ul>
      </div>

      <mt-tab-container v-model="active" :swipeable=true>
  <mt-tab-container-item :id=indexs v-for="(items,indexs) in listArr" :key="indexs">
    <mt-cell>
      <div class="tab-box" v-for="(items2,indexs2) in items" :key="indexs2">
        <p>{{items2.title}}</p>
        <div v-html="items2.content">{{items2.content}}</div>
      </div>
    </mt-cell>
  </mt-tab-container-item>
</mt-tab-container>
    </div>
    <!-- 底部 -->
    <bottom :number=3></bottom>
  </div>
</template>

<script>
import top from './header'
import bottom from './footer'
import { MessageBox } from 'mint-ui';
  export default{
    name:'oneiroMancy',
    components:{
      top,
      bottom
    },
    data(){
      return{
        name:'周公解梦',
        active:0,
        input:'',
        newArr:[],
        listArr:[]
      }
    },
    methods:{
      tab(tab){
        this.active = tab;
      },
      listData(){
        this.$axios.get(`/ActNews/ZhouGongJieMeng/LookUp?key=c4696335c27946358837ed9b34562a1e&keyword=${this.input}`).then(res=>{
          console.log(res);
          let arr = res.data.result;
          if(res.data.total == 0 || arr == null){
            MessageBox({
              title: '提示',
              message: '请换个词语查询,如梦见XXX!'
            });
          }
          if(res.data.total == 0){
            MessageBox({
              title: '提示',
              message: '暂无数据,换个词语吧!'
            });
          }
          this.newArr = [];
          this.listArr = [];
          arr.forEach((item,index,arr)=>{
            if(this.newArr.indexOf(item.type) == -1){
              this.newArr.push(item.type);
            }
          })
          //数组包数组格式 [[],[],[]]
            for(let i = 0;i<this.newArr.length;i++){
               let ai = [];
            for(let j = 0;j<arr.length;j++){
              if(this.newArr[i] == arr[j].type){
                ai.push(arr[j])
              }
            }
            this.listArr.push(ai);
            }
            console.log(this.listArr)
        })
      },
      clear(){
        this.newArr = [];
        this.listArr = [];
      }
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
.tag{
  margin: 0 10px;
  margin-bottom: px2rem(50px);
    .tag-tab{
      ul{
        list-style: none;
         display: flex;
         justify-content: space-between;
         flex-wrap: wrap;
          li{
            font-size: px2rem(14px);
            background: #C87D67;
            padding: px2rem(8px) px2rem(12px);
            color: white;
            font-weight: bold;
            border-radius: 5px;
            margin-bottom: 5px;
          }
      }
    }
}
.sear{
    margin:px2rem(30px) 5px 5px 5px;
  }
  .tab-box{
    background: #CBB793;
    color: white;
    width: 100%;
    padding: px2rem(10px);
    margin-bottom: 5px;
    border-radius: 8px;
      p{
        font-size: px2rem(20px);
        font-weight: bold;
        margin: px2rem(10px) auto;
        margin-top: 0;
        text-align: center;
      }
      div{
        font-size: px2rem(15px);
        padding-bottom: px2rem(10px);
      }
  }
</style>
<style>
  .mint-cell-value{
   flex-wrap: wrap;
   width: 100%;
 }
 .mint-cell-wrapper{
   padding: 0;
 }
</style>
