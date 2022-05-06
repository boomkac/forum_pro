<template>
  <div class="main_body clearfix">
        <div class="message_top">
            <div class="title">
                <p>{{message.title}}</p>
            </div>
            <div class="message_operate">
                <div class="like">
                    <button id="like_btn" class="like_btn" @click="keepLike">
                        <i class="iconfont icon-dianzan"></i>&nbsp;&nbsp;点赞&nbsp;&nbsp;
                    </button>
                </div>
                <div class="another">
                    <div><router-link :to="{
                            path: '/new_comment',
                            query: {
                                messageID : message.ID,
                                title: message.title
                            }
                        }">评论</router-link></div>
                    <div><a href="">转发</a></div>
                    <div><button class="collect_btn"><i class="iconfont icon-shoucang1"></i>收藏</button></div>
                </div>
                <div class="another_small">
                    <div><a href=""><i class="iconfont icon-pinglun"></i></a></div>
                    <div><a href=""><i class="iconfont icon-31zhuanfa"></i></a></div>
                    <div><button class="collect_btn"><i class="iconfont icon-shoucang1"></i>收藏</button></div>
                </div>
            </div>
        </div>
        <div class="message_body">
            <div class="left_body">
                <p>
                    {{message.content}}
                </p>
            </div>
            <div class="right_body">
                <div class="user_img">
                    <img src="../assets/hsq.png">
                </div>
                <div class="user_name">
                    {{user.username}}
                </div>
                <div class="user_introduce">
                    <p>
                        
                    </p>
                </div>
            </div>
        </div>
        <div class="comment">
            <div class="pinglun">评论:</div>
            <div v-for="comment in comments" :key="comment.ID">
                <div class="commenter">
                    <div class="com_img"><img src="../assets/hsq.png"></div>
                    <div class="com_name">{{ comment.username }}</div>
                </div>
                <div class="comment_content">
                    <p>{{ comment.content }}</p>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import { onBeforeMount, ref } from '@vue/runtime-core'
import {useRoute, } from 'vue-router'
export default {
    name: 'MessagePage',
    setup(){
        const route = useRoute()

        //获取数据
        let message = ref({})
        let comments = ref([])
        let user = ref({})

        const getData = (params)=>{
            axios.get(`/api/message?ID=${params.ID}`)
            .then(val=>{
                const data = val.data
                message.value = data.message                
                user.value = data.user
                comments.value = data.comments
            })
        }

        onBeforeMount(()=>{
            getData(route.query)
        })



        return {
            message,
            comments,
            user
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
    position: relative;
}
.message_top{
    position: fixed;
    width: 60%;
    background-image: linear-gradient(rgb(245, 255, 245),rgb(90,200,170));
}
.title{
    height: 80px;
    font-size: 30px;
    text-align: left;
    line-height: 80px;
    padding: 0 20px;
}
.title>p{
    overflow: hidden;
}
.message_operate{
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

.message_body{
    display: flex;
    width: 94%;
    margin: 136px auto auto;
}
.left_body{
    width: 74%;
    background-color: rgb(250,253,250);
    font-size: 20px;
    font-family: "宋体","微软雅黑";
    padding: 20px;
    padding-top: 40px;
    white-space: pre-line;
}
.right_body{
    width: 24%;
    margin-left: 1%;
    background-image: linear-gradient(-90deg,rgb(245, 255, 245),rgb(90,200,170));
}
.user_img{
    width: 50px;
    border-radius: 50px;
    margin: 10px 10px;
    background-color: blanchedalmond;
}
.user_img>img{
    width: 50px;
}
.user_name{
    width: 70%;
    height: 24px;
    margin-left: 10px;
    font-size: 20px;
    font-weight: 700;
    font-family: "宋体","微软雅黑";
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
}
.user_introduce{
    margin-left: 10px;
}
.user_introduce{
    line-height: 18px;
    display: -webkit-box;  
    /*  display: -webkit-box; 必须结合的属性 ，将对象作为弹性伸缩盒子模型显示  */
    -webkit-box-orient: vertical; 
    /* -webkit-box-orient 必须结合的属性 ，设置或检索伸缩盒对象的子元素的排列方式  */
    -webkit-line-clamp: 12; 
    /*  -webkit-line-clamp用来限制在一个块元素显示的文本的行数 */
    overflow: hidden;
    margin-bottom: 10px;
}

.comment{
    width: 70%;
    margin-top: 10px;
    margin-left: 40px;
    min-height: 500px;
    background-color: rgb(250,253,250);
    font-family: "宋体","微软雅黑";
    margin-bottom: 100px;
}
.pinglun{
    margin-left: 20px;
    font-size: 20px;
    color: seagreen;
    font-weight: 600;
    height: 40px;
    line-height: 32px;
}
.commenter{
    border-top: 1px solid rgb(240,240,240);
    height: 30px;   
    width: 96%;
    margin: auto;
    font-size: 18px;
    line-height: 26px;
    background-color: transparent;
    display: flex;
}
.com_img{
    height: 20px;
    width: 20px;
    border-radius: 30px;
    background-color: white;
    margin: 5px 10px;
}
.com_img>img{
    height: 100%;
}
.com_name{
    height: 30px;
    line-height: 28px;
}
.comment_content{
    width: 96%;
    margin: 0 auto 6px auto;
    background-color: transparent;
    white-space: pre-line;
    line-height: 18px;
}
.comment_content>p{
    margin-left: 10px;
}

@media screen and (min-width:960px) {
    .main_body{
        min-width: 960px;
    }
    .message_top{
        min-width: 960px
    }
}

@media screen and (max-width:960px) {
    .main_body{
        width: 96%;
    }
    .message_top{
        width: 96%;
    }
}
@media screen and (max-width:720px) {
    .left_body{
        width: 98%;
    }
    .right_body{
        display: none;
    }
    .title>p{
        font-size: 18px;
    }
    .message_top{
        position: relative;
        width: 100%;
    }
    .message_body{
        margin: 0px auto auto;
    }
}
</style>