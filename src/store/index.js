import { createStore } from 'vuex'
import axios from "axios";

// Create a new store instance.
export default createStore({
    state () {
        return {
            type : 'student',
            checked_student_id:'',

        }
    },
    mutations: {

        setUserType(state, type){
            if (type === '1')
                state.type = "admin"
            if (type === '2')
                state.type = "student"
            if (type === '3')
                state.type = "teacher"
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

