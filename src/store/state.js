const state = {
    systemName: 'ইউভিএল স্পোর্টস',
    systemLogo: 'http://uvlsports.com/image_upload/system_logo.png',
    userInfo: getUserInfo(),
    windowWidth: null,
    categories: []
}


function getUserInfo() {
    const userInfoLocalStorage = localStorage.getItem("userInfo") ? JSON.parse(localStorage.getItem("userInfo")) : {};
    let userInfo = {};

    // Include properties from localStorage
    Object.keys(userInfoLocalStorage).forEach((key) => {
        if (userInfo[key] === undefined && userInfoLocalStorage[key] != null) userInfo[key] = userInfoLocalStorage[key]
    });

    return userInfo
}

export default state