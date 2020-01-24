const actions = {
    updateSystemSettings({commit}, payload) {
        commit('UPDATE_SYSTEM_SETTINGS', payload)
    },

    storeCategories({commit}, payload){
       commit('STORE_CATEGORIS', payload)
    },

    // UPDATE USER INFO
    updateUserInfo({commit}, payload) {
        commit('UPDATE_USER_INFO', payload)
    },
};

export default actions
