import { createStore } from 'vuex'

// Create a new store instance.
export default createStore({
    state () {
        return {
            type : 'student',
            user_id : 0,
            // localStorage(token)

        }
    },
    mutations: {

    },
    actions: {

    },
    getters : {
        getType(state) {
            return state.type
        }

    },
    modules : {

    }
})

