<template>
  <div class="main clearfix">
        <div>
            <!-- <form action="/api/login" method="post"> -->
                <div class="user_div">
                    <div class="phone">
                        <span>手机号：</span>
                        <div>
                            <input type="tel" id="phone" v-model="phone" placeholder="请输入手机号">
                        </div>    
                    </div>
                </div>
                <div class="pwd_div"></div>
                    
                <div class="password">
                    <span>密&#12288;码：</span>
                    <div>
                        <input type="password" id="password" v-model="password" placeholder="请输入密码" @keypress.enter="login">
                    </div>    
                </div>
                <div class="btn_div">
                    <button id="btn" @click="login"><span>登录</span></button>
                </div>
                <div class="to_register">
                    <router-link to="/register">
                        没有账户？点击注册
                    </router-link>
                </div>
            <!-- </form> -->
        </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'
import axios from 'axios'
export default {
    name: 'UserLogin',
    setup(){
        const store = useStore()
        const router = useRouter()

        let phone = ref(null)
        let password = ref('')
        const login = ()=>{
            if(!phone.value){
                return alert('请输入手机号码')
            }
            if(!password.value){
                return alert('请输入密码')
            }
            if(!/^\d{11}$/.test(phone.value)){
                return alert('请输入正确格式的手机号码！')
            }


            //{withCredentials: true}
            axios({
                method: 'post',
                url: '/api/login',
                data: {
                    phone: phone.value,
                    password: password.value
                },
                //允许请求携带cookie
                withCredentials: true
            })
            .then(value=>{
                const user = value.data
                if(user === 'LOGINFAIL') return alert('账号或密码错误')
                sessionStorage.setItem('user', JSON.stringify(user))
                alert('登录成功')
                store.commit('CHANGEUSER', user)
                router.go(-1)
            })
            .catch(()=>{
                alert('服务器错误')
            })

        }

        return {
            phone,
            password,
            login
        }
    }
}
</script>

<style>
.main{
    width: 40%;
    margin: auto;
    text-align: center;
}

.main>div{
    margin-top: 200px;
    background-image: linear-gradient(-45deg,rgb(90,200,160),rgb(240,240,240));
    padding-bottom: 20px;
    border: 1px solid rgb(90,200,160);
    border-radius: 10px;
    box-shadow: 40px 10px 100px 20px rgba(90,200,160,.6);
}

.main>div>form span{
    font-weight: 500;
    font-size: 24px;
    color: rgb(32, 216, 201);
    font-family: 微软雅黑;
}

.phone,
.password{
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
.phone>span,
.password>span{
    line-height: 35px;
}
.phone>div,
.password>div{
    width: 50%;
    height: 35px;
    border: 1px solid rgb(32, 216, 201);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(240,255,240);
}
.phone>div>input,
.password>div>input{
    width: 70%;
    height: inherit;
    background-color: transparent;
    border: none;
    outline-style: none;
    outline: 0;
}
.phone>div>input:-internal-autofill-previewed,
.phone>div>input:-internal-autofill-selected,
.password>div>input:-internal-autofill-previewed,
.password>div>input:-internal-autofill-selected{
    -webkit-text-fill-color: rgb(50,50,50) !important;
    transition: background-color 5000s ease-in-out 0s !important;
}
/**
.password{
    display: flex;
    justify-content: center;
    margin-top: 100px;
}
.password>span{
    line-height: 35px;
}
.password>div{
    width: 50%;
    height: 35px;
    border: 1px solid rgb(32, 216, 201);
    border-radius: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(240,255,240);
}
.password>div>input{
    width: 70%;
    height: inherit;
    background-color: transparent;
    border: none;
    outline-style: none;
}
*/
/*********/
#btn{
    width: 20%;
    margin-top: 80px;
    margin-left: 20px;
    height: 40px;
    border: 1px rgb(32, 216, 201);
    border-radius: 20px;
    background-color: white;
    cursor: pointer;
}
#btn:hover{
    background-image: linear-gradient(white,rgb(120,220,200));
}


.to_register{
    margin-top: 25px;
    text-align: right;
}

.to_register>a{
    margin-right: 35px;
    font-weight: 100;
    text-decoration: none;
    color: rgb(5, 160, 207);
}


@media screen and (min-width:960px) {
    .main{
        min-width: 640px;
    }
}

@media screen and (max-width:960px) and (min-width:720px) {
    .main{
        width: 80%;
    }
}

@media screen and (max-width:720px){
    .main{
        width: 96%;
    }
    .main>div{
        margin-top: 150px;
    }
    #btn{
        width: 35%;
    }
}
</style>