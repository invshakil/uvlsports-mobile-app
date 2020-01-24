const mutations = {

    // Update System Settings
    UPDATE_SYSTEM_SETTINGS(state, payload) {
        let systemInfo = {};
        state.appName = payload.system_name;
        systemInfo.appName = payload.system_name;

        // Store data in localStorage
        localStorage.setItem("systemInfo", JSON.stringify(systemInfo))
    },

    //Store Categories
    STORE_CATEGORIS(state, payload) {
        payload = payload.map(item => {
            item.icon = 'done';
            item.url = '/categories/' + item.id;
            item.banglaName = item.bangla_name;
            return item;
        });
        state.categories = payload;

        // Store data in localStorage
        localStorage.setItem("categories", JSON.stringify(payload))
    },

    // Updates user info in state and localstorage
    UPDATE_USER_INFO(state, payload) {
        if (payload !== null) {
            // Get Data localStorage
            let userInfo = JSON.parse(localStorage.getItem("userInfo")) || state.userInfo;

            for (const property of Object.keys(payload)) {
                if (payload[property] != null) userInfo[property] = payload[property]
            }
            if (userInfo.image === undefined || userInfo.image === null) userInfo.image = require('../assets/demo-user.jpeg');
            // Store data in localStorage
            localStorage.setItem("userInfo", JSON.stringify(userInfo))
        } else {
            localStorage.removeItem('userInfo');
            state.userInfo = {};
        }
    },
};

export default mutations

