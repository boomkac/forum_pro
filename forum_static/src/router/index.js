import { createRouter, createWebHistory, createWebHashHistory } from "vue-router";

export default createRouter({
    // history: createWebHistory(),
    history: createWebHashHistory(),
    routes:[
        {
            path: '/',
            component: ()=>import('../components/IndexPage')
        },
        {
            path: '/main',
            component: ()=>import('../components/MainPage')
        },
        {
            path: '/login',
            component: ()=>import('../components/UserLogin')
        },
        {
            path: '/register',
            component: ()=>import('../components/UserRegister')
        },
        {
            path: '/message',
            component: ()=>import('../components/MessagePage')
        },
        {
            path: '/new_message',
            component: ()=>import('../components/NewMessage')
        },
        {
            path: '/new_comment',
            component: ()=>import('../components/NewComment')
        },
        {
            path: '/search',
            component: ()=>import('../components/SearchPage')
        }
    ]
})