<template>
  <div class="main_body clearfix">
        <div class="message_top">
            <div class="title">
            </div>
        </div>
        <div class="comment_body">
            <div class="new_title">
                <div>标题：</div>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div class="comment_content">
                <div>
                    <p>发表文章：</p>
                </div>
                <textarea name="content" id="content" v-model="message"></textarea>
            </div>
            <div class="comment_operate">
                <button @click="submitMessage">发表</button>
                <div>
                    <!-- <img src="/public/img/表情.png"> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ref } from '@vue/reactivity'
import { onBeforeMount } from '@vue/runtime-core'
export default {
    name: 'NewMessage',
    setup(){
        const router = useRouter()
        const store = useStore()

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
        
        //发表提交
        let title = ref('')
        let message = ref('')
        const submitMessage = ()=>{
            axios.post('/api/new_message',{
                title: title.value,
                content: message.value
            })
            .then(value=>{
                console.log(value.data)
                alert('发表成功')
                router.push('/main')

            })
            .catch(err => alert('发表失败，请稍后重试'))
        }

        return {
            title,
            message,
            submitMessage
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
    font-size: 40px;
    text-align: left;
    line-height: 80px;
    padding: 0 20px;
}

.comment_content{
    width: 98%;
    margin: auto;
    margin-top: 20px;
}

.comment_body{
    width: 90%;
    /* background-color: red; */
    margin: auto;
    margin-top: 100px;
}

.new_title{
    width: 98%;
    margin: auto;
    margin-bottom: 20px;
}
.new_title>div{
    height: 30px;
    line-height: 30px;
}
.new_title>input{
    height: 40px;
    width: 100%;
    border: 1px solid rgb(89, 216, 210);
    outline-style: none;
    font-size: 24px;
    line-height: 38px;
}

.comment_content{
    margin: auto;
    margin-bottom: 32px;
}
.comment_content>div{
    height: 30px;
    line-height: 30px;
}
.comment_content>textarea{
    height: 400px;
    width: 100%;
    border: 1px solid rgb(89, 216, 210);
    outline-style: none;
    font-size: 24px;
    line-height: 38px;
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