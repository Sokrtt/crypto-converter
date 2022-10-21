export const authModule = {
    state: () => ({
        isAuth: false,
        isShowModalForm: false,
    }),
    getters: {

    },
    mutations: {
        setIsAuth(state, isAuth) {
            debugger
            state.isAuth = isAuth;
        },
        setIsShowModalForm(state, isShowModalForm) {
            debugger
            state.isShowModalForm = isShowModalForm;
        },
    },
    actions: {

    },
    namespaced: true
}
