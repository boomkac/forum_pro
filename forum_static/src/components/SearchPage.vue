<template>
  <div class="main_area" @click="closeSearch">
    <div class="center">
      <img src="../assets/hsq.png" alt="">
      <div class="search_box">
        <div>
          <input type="text" v-model="keyword">
        </div>
        <div class="btn" @click="search">搜索</div>
      </div>
      <div :class="['like', hidden ? 'hidden' : '']">
        <router-link :to="{
          path: '/main',
          query: {
            keyword: item.title
          }
        }" v-for="(item, index) in currentData" :key="index">
          <div class="li">
            &nbsp;&nbsp;{{item.title}}
          </div>
        </router-link>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from '@vue/reactivity'
import axios from 'axios'
import { debounce } from '../controller/debounce'
import { useRouter } from 'vue-router'
import { watch } from '@vue/runtime-core'
export default {
    name:'SearchPage',
    setup(){
      let keyword = ref('')
      const router = useRouter()

      let currentData = reactive([])

      //点击搜索
      const search = ()=>{
        router.push(`/main?keyword=${keyword.value}`)
      }

      //实时搜索
      const searchCurrent = debounce(1200,()=>{
        axios.get(`/api/search_current?keyword=${keyword.value}`)
        .then(val=>{
          for(let i = 0;i<10;i++){
            currentData.pop()
          }
          val.data.forEach(element => {
            currentData.push(element)
          });
          showSearch()
        })
      })

      watch(keyword, (keyword, preValue)=>{
        if(keyword){
          searchCurrent()
        }
      })

      //实时搜索内容的展示和收起
      let hidden = ref(true)

      const showSearch = ()=>{
        hidden.value = false
      }

      const closeSearch = ()=>{
        hidden.value = true
      }

      return {
        keyword,
        search,
        hidden,
        showSearch,
        closeSearch,
        currentData
      }
    }
}
</script>

<style lang="less" scoped>
  .main_area{
    overflow: hidden;
    .center{
      position: relative;
      width: 1000px;
      height: 800px;
      margin: 200px auto auto auto;
      img{
        width: 160px;
        height: 100px;
        display: block;
        margin: auto;
      }
      .search_box{
        margin: 40px auto;
        width: 920px;
        height:66px;
        background-color: #fff;
        border-radius: 50px;
        display: flex;
        overflow: hidden;
        padding: 0px;
        input{
          display: block;
          width: 720px;
          border: none;
          outline: none;
          margin-left: 40px;
          font-size: 20px;
          line-height: 60px;
        }
        .btn{
          width: 180px;
          line-height: 60px;
          background-color: #9affe2;
          font-size: 24px;
          text-align: center;
          font-family: '宋体', 'Arial Narrow', Arial, sans-serif;
          font-weight: 600;
          cursor: pointer;
          &:hover{
            background-color: #81ffdb;
          }
        }
      }
      .like{
        position: absolute;
        left: 80px;
        top: 206px;
        a{
          display: block;
        }
        .li{
          border-top: 1px solid #eee;
          width: 600px;
          height: 36px;
          background-color: white;
          line-height: 36px;
          cursor: pointer;
          &:hover{
            background-color: #eee;
          }
        }
      }
      .hidden{
        display: none;
      }
    }
  }
</style>