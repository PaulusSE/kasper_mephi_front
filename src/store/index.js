import { createStore } from 'vuex'
import axios from "axios";

// Create a new store instance.
export default createStore({
    state () {
        return {
            type : 'admin',
            user_id : 0,
            // localStorage(token)
            student_id:0,

        }
    },
    mutations: {

    },
    actions: {
        async checkIfLogined() {
            if (localStorage.length === 0)
                return false

            //Запрос на сервер на актуальность токена
            return true
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

