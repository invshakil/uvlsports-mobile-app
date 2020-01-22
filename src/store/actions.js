const actions = {
    updateSystemSettings({commit}, val) {
        commit('UPDATE_SYSTEM_SETTINGS', val)
    },

    // UPDATE USER INFO
    updateUserInfo({commit}, payload) {
        commit('UPDATE_USER_INFO', payload)
    },
};

export default actions
