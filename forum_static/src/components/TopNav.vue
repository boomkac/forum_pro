<template>
  <div class="top">
        <div class="top_main">
            <div class="left_nav">
                <ul class="nav_ul">
                    <div class="our_icon">SCForum</div>
                    <li><router-link to="/">首页</router-link></li>
                    <li><span>|</span></li>
                    <li><router-link to="/main">推荐</router-link></li>
                    <li><span>|</span></li>
                    <li><router-link to="/search">搜索</router-link></li>
                    <li><span>|</span></li>
                    <li><a href="#">关注</a></li>
                    <li><span>|</span></li>
                    <li><a href="#">板块</a></li>
                    <li><span>|</span></li>
                    <li><a href="#">下载app</a></li>
                    <li><span>|</span></li>
                    <li class="more_list">
                        <a class="more" onclick="display('more_shange')">更多</a>
                        <div class="more_change" id="more_change">
                            <ul>
                                <li><a href="#">&nbsp;话题</a></li>
                                <li><a href="#">&nbsp;附近</a></li>
                                <li><a href="#">&nbsp;体育</a></li>
                                <li><a href="#">&nbsp;影视</a></li>
                                <li><a href="#">&nbsp;生活</a></li>
                            </ul>
                        </div>
                    </li>
                </ul>
            </div>
            <div class="right_nav">
                <div class="new_message">
                    <router-link to="/new_message">发表文章</router-link>
                </div>
                <div class="more_small">
                    <div onclick="display('menu')" class="menu_btn"><i class="iconfont icon-liebiao"></i></div>
                    <div id="menu">
                        <ul>
                            <li><a href="/login">&nbsp;登录</a></li>
                            <li><a href="/">&nbsp;首页</a></li>
                            <li><a href="/main">&nbsp;推荐</a></li>
                            <li><a href="#">&nbsp;热门</a></li>
                            <li><a href="#">&nbsp;关注</a></li>
                            <li><a href="#">&nbsp;板块</a></li>
                            <li><a href="#">&nbsp;下载</a>app</li>
                            <li><a href="#">&nbsp;话题</a></li>
                            <li><a href="#">&nbsp;附近</a></li>
                            <li><a href="#">&nbsp;更多</a></li>
                        </ul>
                    </div>
                </div>
                <ul>
                    <template v-if="!user">
                        <div>欢迎！请登录</div>
                        <li><router-link to="/login">&nbsp;&nbsp;登录&nbsp;&nbsp;</router-link></li>
                        <li><router-link to="/register">&nbsp;&nbsp;注册&nbsp;&nbsp;</router-link></li>
                    </template>
                    <template v-else>
                        <div>欢迎！<span @click="chang">{{user.username}}</span></div>
                        <li><span @click="logout" class="logout">&nbsp;&nbsp;退出&nbsp;&nbsp;</span></li>
                    </template>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import {useStore} from 'vuex'
import {computed,} from 'vue'
import { useRouter} from 'vue-router'
// import {toRef} from 'vue'
export default {
    name: 'TopNav',
    setup(){

        //mapState 写法
        // const store = useStore()
        // let storeState = mapState(['user'])
        //mapState结构出来是一个个函数，在vue2中能用是因为computed中采用了简写的形式
        // let resultStoreState = {}
        // Object.keys(storeState).map(index=>{
        //     const func = storeState[index]
        //computed处理，并且因为setup没有this.$store,所以要改变this的指向，下面的写法将this指向{$store:store},所以this.$store就是store
        //     resultStoreState[index] = computed(func.bind({$store: store}))
        // })
        // const {user} = resultStoreState

        const store = useStore()
        const user = computed(()=>store.state.user)
        const router = useRouter()

        const logout = ()=>{
            const confirm = window.confirm('确认退出？')
            if(confirm){
                sessionStorage.removeItem('user')
                store.commit('CHANGEUSER',null)
                router.push('/')
            }
        }

        return {
            user,
            logout,
        }
    }
}
</script>

<style>
a{
    text-decoration: none;
    color: rgb(30,30,30);;
}

/*top部分*/
.top{
    height: 50px;
    width: 100%;
    position: fixed;
    background-color:rgb(245, 255, 245);
    box-shadow: 0px 5px 10px white;
    z-index: 999;
}

.top_main{
    display: flex;
    justify-content: space-between;
    width: 80%;
    margin: 0 auto;
    /* border: 1px solid red; */
}


.left_nav>ul{
    display: flex;
}

.our_icon{
    line-height: 50px;
    font-family: "Courier New";
    font-size: 28px;
    font-weight: bolder;
    margin-right: 40px;
    margin-left: 20px;
}

.left_nav>ul>li{
    line-height: 50px;
    font-size: 18px;
    margin-left: 20px;
}

.left_nav>ul>li>a{
    text-decoration: none;
    color: rgb(30,30,30);
    font-weight: bold;
}

.left_nav>ul>li>span{
    color: gray;
}


.more_list{
    position: relative;
}

.more_change{
    display: none;
    background-color: rgb(245, 255, 245);
    margin-left: -20px;
    width: 150px;
    position: absolute;
}

.more_change>ul{
    padding-top: 5px;
    display: flex;
    flex-direction: column;
    line-height: 40px;
}

.more_change>ul>li:hover{
    background-color: rgb(200,200,200);
}



/*top_main_right*/

.right_nav{
    display: flex;
}


.new_message{
    font-weight: 600;
    line-height: 42px;
    width: 100px;
    height: 50px;
    margin-top: 5px;
}
.new_message>a{
    background-color: bisque;
    border-radius: 50px;
    padding-right: 10px;
    padding-left: 10px;
    background-color: bisque;
    border: 2px solid rgb(120,190,170);
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
}
.new_message>a:hover{
    background-color: rgb(230, 255, 230);
}

.more_small{
    line-height: 50px;
    margin-right: 20px;
    display: none;
}

.login_small{
    display: block;
    color: rgb(30,30,30);
    text-decoration: none;
    background-color: white;
    border: 2px solid rgb(120,190,170);
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
}

.menu_btn{
    position: relative;
}

#menu{
    margin-top: -5px;   
    margin-left: -5px;
    background-color:rgb(245, 255, 245);
    display: none;
    position: absolute;
}

#menu>ul{
    margin-top: 10px;
    margin-bottom: 5px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    line-height: 28px;
    font-size: 18px;
    font-weight: 700;
    width: 200px;
}

#menu>ul>li{
    margin-left: 10px;
    width: 90%;
}

#menu>ul>li:hover{
    background-color: rgb(200,200,200);
}

.right_nav>ul{
    display: flex;
    line-height: 50px;
    margin-left: auto;
}

.right_nav>ul>div{
    margin-right: 10px;
}

.right_nav>ul>li{
    margin-right: 15px;
}

.right_nav>ul>li>a{
    color: rgb(30,30,30);
    text-decoration: none;
    background-color: white;
    border: 2px solid rgb(120,190,170);
    border-radius: 20px;
    font-size: 16px;
    font-weight: 700;
}

.right_nav>ul>li>a:hover{
    background-color: rgb(230, 255, 230);
}

.right_nav>ul div{
    line-height: 42px;
    width: 160px;
    height: 50px;
    margin-top: 5px;
    overflow: hidden;
    text-overflow:ellipsis;
    white-space:nowrap
}

.logout{
    cursor: pointer;
}
.logout:hover{
    color: rgb(0, 162, 255);
}

@media screen and (min-width:960px) {
    /*头部top*/
    .top_main{
        min-width:1200px;
    }
    .more_list:hover > .more_change,
    .more_change:hover{
        display: block;
    }
}

@media screen and (max-width:960px) and (min-width:720px) {
    /*头部top*/
    .top_main{
        width: 100%;
    }
    .left_nav>ul>li{
        display: none;
    }
    .more_small{
        display: block;
    }
}


@media screen and (max-width:720px) {
    /*头部top*/
    .left_nav>ul>li{
        display: none;
    }
    .more_small{
        display: block;
    }
    .right_nav>ul{
        display: none;
    }
    #menu{
        margin-left: -50px;
    }
}


</style>