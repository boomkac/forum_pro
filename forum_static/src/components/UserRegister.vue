<template>
    <div class="main clearfix">
        <div>
            <div class="username_div">
                <div class="username">
                    <span>&#12288;用户名：</span>
                    <div>
                        <input type="text" id="username" name="username" placeholder="请输入用户名" v-model="username">
                    </div>    
                </div>
            </div>
            <div class="user_div">
                <div class="phone">
                    <span>&#12288;手机号：</span>
                    <div>
                        <input type="tel" id="phone" name="phone" placeholder="请输入手机号" v-model="phone">
                    </div>    
                </div>
            </div>
            <div class="password">
                <span>&#12288;密&#12288;码：</span>
                <div>
                    <input type="password" id="password" name="password" placeholder="请输入密码" v-model="password">
                </div>    
            </div>
                
            <div class="confirm">
                <span>确认密码：</span>
                <div>
                    <input type="password" id="confirm" name="confirm" placeholder="请输入密码" v-model="confirm">
                </div>    
            </div>

            <div class="btn_div">
                <button id="btn" @click="register"><span>注册</span></button>
            </div>
            <div class="to_login">
                <router-link to="/login">
                    已有账户？点击登录
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { ref } from '@vue/reactivity'
import axios from 'axios'
export default {    
    name: 'UserRegister',
    setup(){
        const router = useRouter()

        let phone = ref('')
        let password = ref('')
        let username = ref('')
        let confirm = ref('')

        const register = async ()=>{
            if(!/^\d{11}$/.test(phone.value)){
                return alert('请输入正确格式的手机号')
            }
            if(!username.value){
                return alert('请输入用户名')
            }
            if(!password.value){
                return alert('请输入密码')
            }
            if(password.value !== confirm.value){
                return alert('两次密码不一致')
            }

            try{    
                const response = await axios.post('/api/register',{
                    phone: phone.value,
                    password: password.value,
                    username: username.value
                })
                if(response.data === 'PHONE_HAS_BEEN_REGISTERED'){
                    return alert('手机号已注册')
                }
                
                if(response.data === 'USERNAME_HAS_BEEN_REGISTERED'){
                    return alert('用户名已被注册')
                }

                alert('注册成功')
                router.push('/main')
            }catch{
                alert('服务器错误,稍后重试')
            }
        }

        return {
            phone,
            password,
            username,
            confirm,
            register
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
.password,
.confirm,
.username{
    display: flex;
    justify-content: center;
    margin-top: 60px;
}
.phone>span,
.password>span,
.confirm>span,
.username>span{
    line-height: 35px;
}
.phone>div,
.password>div,
.confirm>div,
.username>div{
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
.password>div>input,
.confirm>div>input,
.username>div>input{
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
.password>div>input:-internal-autofill-selected,
.confirm>div>input:-internal-autofill-previewed,
.confirm>div>input:-internal-autofill-selected,
.username>div>input:-internal-autofill-previewed,
.username>div>input:-internal-autofill-selected {
    -webkit-text-fill-color: rgb(50,50,50) !important;
    transition: background-color 5000s ease-in-out 0s !important;
}

#btn{
    width: 20%;
    margin-top: 80px;
    margin-left: 20px;
    height: 40px;
    border: 1px rgb(32, 216, 201);
    border-radius: 20px;
    background-color: white;
}
#btn:hover{
    background-image: linear-gradient(white,rgb(120,220,200));
}


.to_login{
    margin-top: 25px;
    text-align: right;
}

.to_login>a{
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