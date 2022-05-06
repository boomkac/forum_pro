<template>
   <div class="main_body clearfix">
        <div class="message_top">
            <div class="title">
                <p>{{title}}</p>
            </div>
        </div>
        <!-- <input name="messageID" style="display: none;" value="{{message.ID}}">
        <input name="userID" style="display: none;" value="{{message.userID}}"> -->
        <div class="comment_body">
            <div><p>&nbsp;&nbsp;发表评论：</p></div>
            <div class="comment_content">
                <textarea name="content" v-model="content"></textarea>
            </div>
            <div class="comment_operate">
                <button @click="postComment">发表</button>
                <div>
                    <img src="/public/img/表情.png">
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRoute, useRouter } from 'vue-router'
import { useStore} from 'vuex'
import axios from 'axios'
import { onBeforeMount } from '@vue/runtime-core'

export default {
    name: 'NewComment',
    setup(){
            
        const store = useStore()
        const router = useRouter()
        const route = useRoute()
        const messageID = route.query.messageID
        
        //判断是否登录
        onBeforeMount(()=>{
            axios.get('/api/isLogin')
            .then(value=>{
                if(value.data === 'YES') return
                sessionStorage.removeItem('user')
                store.commit('CHANGEUSER', null)
                alert('请登录')
                router.push('/login')
            })
            .catch(reason=>{
                alert('服务器错误')
                router.go(-1)
            })
        })

        const title = route.query.title

        let content = ref('')

        const postComment = ()=>{
            axios.post('/api/new_comment',{
                messageID,
                content: content.value
            })
            .then(value=>{
                alert('发表成功')
                router.push(`/message?ID=${messageID}`)
            })
            .catch(reason=>{
                alert('发表失败，稍后重试')
            })
        }

        
        const user = store.state.user
        if(!user){
            alert('请登录')
            router.push('/login')
        }

        return {
            postComment,
            title,
            content
        }
    },
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
    text-overflow: ellipsis;
}

.comment_body{
    width: 90%;
    /* background-color: red; */
    margin: auto;
    margin-top: 100px;
}
.comment_content{
    width: 98%;
    margin: auto;
    margin-top: 20px;
}
.comment_content>div{
    width: 100%;
    margin: auto;
    background-color: rgb(90,200,170);
}
.comment_content>textarea{
    width: 100%;
    margin: auto;
    min-height: 400px;
    margin-bottom: 30px;
    border: 1px solid rgb(123, 226, 218);
    outline-style: none;
    font-size: 26px;
}

.comment_operate{
    margin-bottom: 100px;
}
.comment_operate>button{
    float: right;
    margin-right: 40px;
    width: 20%;
    height: 40px;
    font-size: 24px;
    line-height: 40px;
    border-radius: 20px;
    border: 1px solid rgb(104, 230, 167);
    background-color: white;
}
.comment_operate>div{
    float: right;
    width: 40px;
    height: 40px;
    margin-right: 20px;
}
.comment_operate>div>img{
    width: 40px;
}
.comment_operate>button:hover{
    background-image: linear-gradient(white,rgb(120, 230, 178));
}

@media screen and (min-width:960px) {
    .main_body{
        min-width: 960px;
    }
    .message_top{
        min-width: 960px;
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
}
</style>