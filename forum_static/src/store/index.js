import { createStore } from "vuex";

const state = ()=>{
    return {
        user: JSON.parse(sessionStorage.getItem('user'))
    }
}

const actions = {
    
}

const mutations = {
    CHANGEUSER(state, user){
        state.user = user
    }
}


const store = createStore({
    state,
    actions,
    mutations
})

export default store