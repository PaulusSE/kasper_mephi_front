import { createStore } from 'vuex'
import axios from "axios";

// Create a new store instance.
export default createStore({
    state () {
        return {
            type : '',
            checked_student_id:'',

        }
    },
    mutations: {

        setUserType(state, type){
            state.type = type
        },

        setUserId(state, id){
            state.user_id = id
        }

    },
    actions: {
        async checkIfLogined() {
            if (localStorage.length === 0) // Todo Поправить на проверку именно токена
                return false

            //Запрос на сервер на актуальность токена
            return true
        },

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
        }

    },
    modules : {

    }
})

