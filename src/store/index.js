import { createStore } from 'vuex'
import axios from "axios";

// Create a new store instance.
export default createStore({
    state () {
        return {
            type : '',
            user_id : ''

        }
    },
    mutations: {

        setUserType(state, type){
            state.type = type
            console.log("Type is changed")
        },

        setUserId(state, id){
            state.user_id = id
        }

    },
    actions: {

        async updateUserType(ctx, type) {

            await ctx.commit("setUserType", type)
        },

        async updateUserId(ctx, id) {
            await ctx.commit("setUserId", id)
        }



    },
    getters : {
        getType(state) {
            return state.type
        },
        getuserId(state) {
            return state.user_id
        }

    },
    modules : {

    }
})

