import {createStore} from "vuex";
import {authModule} from "@/store/authModule";

export default createStore({
    state: {
        isAuth: false,
    },
    modules: {
        authModule: authModule
    }

})