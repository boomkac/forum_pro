<template>
  <div class="main_body ">
        <div class="center_top clearfix">
            <div>欢迎访问SCForum</div>
        </div>
        <div class="center_body clearfix">
            <ul>
                <li v-for="message in messages" :key="message.ID">
                    <div class="message_list">
                        <div class="message_title">
                            <p><router-link :to="{
                                path: '/message',
                                query: {
                                    ID: message.ID,
                                }
                            }">
                                {{message.title}}
                            </router-link></p>
                        </div>
                        <div class="message_omit">
                            <!-- <p><a href="/message?ID={{$value.ID}}&userID={{$value.userID}}">{{$value.content}}</a></p> -->
                            <p><router-link :to="{
                                path: '/message',
                                query: {
                                    ID: message.ID,
                                }
                            }">
                                {{message.content}}
                            </router-link></p>
    
                        </div>
                        <div class="message_operate">
                            <div class="like">
                                <button id="like_btn" class="like_btn"><i
                                        class="iconfont icon-dianzan"></i>&nbsp;点赞&nbsp;</button>
                            </div>
                            <div class="another">
                                <div><a href="">转发</a></div>
                                <div><button class="collect_btn"><i class="iconfont icon-shoucang1"></i>收藏</button>
                                </div>
                            </div>
                            <div class="another_small">
                                <div><a href=""><i class="iconfont icon-pinglun"></i></a></div>
                                <div><a href=""><i class="iconfont icon-31zhuanfa"></i></a></div>
                                <div><button class="collect_btn"><i class="iconfont icon-shoucang1"></i>收藏</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
  </div>
</template>

<script>
import {onBeforeMount, reactive} from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'
export default {
    name: 'MainPage',
    setup(){

        const route = useRoute()

        const keyword = route.query.keyword

        let messages = reactive([])

        const getMessages = ()=>{
            if(!keyword){
                axios.get('/api/main').then(res=>{
                    messages.push(...res.data)
                })
            }else{
                axios.get(`/api/main?keyword=${keyword}`).then(res=>{
                    messages.push(...res.data)
                })
            }
            
        }

        onBeforeMount(()=>{
            getMessages()
        })

        return {
            messages
        }
    }
}
</script>

<style>
.main_body{
    width: 60%;
    margin: auto;
    background-color: rgb(245, 255, 245);
    padding-top: 50px;
}

.center_top{
    font-family: "宋体",微软雅黑;
    font-weight: 700;
    height: 200px;
    text-align: center;
    line-height: 200px;
    font-size: 80px;
    background-image: linear-gradient(white,rgb(90,200,170));
    margin-bottom: 20px;
}

.center_body{
    width: 80%;
    margin: auto;
    background-color: rgb(245, 254, 245);
    padding-bottom: 200px;
    min-height: 490px;
}


.center_body ul li{
    border-top: 1px solid rgb(200,200,200);
}

.message_list{
    height: 160px;
    width: 96%;
    margin:auto;
}

.message_title{
    height: 50px;
    line-height: 50px;
    font-size: 24px;
    font-weight: 500;
    overflow: hidden;
}

.message_omit{
    margin-top: -5px;
    height: 50px;
    line-height: 25px;
    display: -webkit-box;  
    /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
    -webkit-box-orient: vertical; 
    /* -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
    -webkit-line-clamp: 2; 
    /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
    overflow: hidden;
}

.message_operate{
    margin-top: 10px;
    height: 40px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* border: 1px solid springgreen; */
}

.like{
    margin-left: 20px;
}
.like>button{
    height: 24px;
    background-color: rgb(255,255,255);
    border: 1px solid black;
    border-radius: 10px;
}

.another{
    display: flex;
    text-align: center;
    line-height: 40px;
}
.another>div{
    margin-right: 20px;
}
.collect_btn{
    height: 24px;
    background-color: rgb(255,255,255);
    border: 1px solid black;
    border-radius: 10px;
}

.another_small{
    display: none;
    text-align: center;
    line-height: 40px;
}
.another_small>div{
    margin-right: 20px;
}

@media screen and (min-width:960px){
    .main_body{
        min-width: 1100px;
    }
}

@media screen and (max-width:960px) and (min-width:720px) {
    .main_body{
        width: 100%;
    }
    .center_top{
        font-size: 50px;
    }
}

@media screen and (max-width:720px) {
    .main_body{
        width: 100%;
    }
    .center_top{
        font-size: 40px;
        height: 160px;
        line-height: 160px;
        vertical-align: middle;
    }
    .another{
        display: none;
    }
    .another_small{
        display: flex;
    }
}
</style>