const mutations = {

    // Update System Settings
    UPDATE_SYSTEM_SETTINGS(state, payload) {
        let systemInfo = {};
        state.appName = payload.system_name;
        systemInfo.appName = payload.system_name;

        // Store data in localStorage
        localStorage.setItem("systemInfo", JSON.stringify(systemInfo))
    },


    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {
        if (payload !== null) {
            // Get Data localStorage
            let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.userInfo;

            for (const property of Object.keys(payload)) {
                if (payload[property] != null) userInfo[property] = payload[property]
            }
            // Store data in localStorage
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        } else {
            localStorage.removeItem('userInfo');
            state.userInfo = {};
        }
    },
};

export default mutations

