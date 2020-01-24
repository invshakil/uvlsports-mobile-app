const routes = [
    {name: 'Home', banglaName: ' হোম', icon: 'home', url: '/', subs: []},
    {
        name: 'League_Categories',
        banglaName: 'লীগ ক্যাটাগরি সমূহ',
        icon: 'turned_in_not',
        url: '#',
        subs: []
    },
    {
        name: 'FFBD_Special',
        banglaName: 'বিশেষ ক্যাটাগরি সমূহ',
        icon: 'turned_in',
        url: '#',
        subs: []
    },
    {name: 'Tweets', banglaName: 'টুইট সমূহ', icon: 'book', url: '/tweets', subs: []},
    {name: 'Login', banglaName: 'লগিন', icon: 'lock', url: '/login', isLoginPage: true, subs: []},
    {
        name: 'Account',
        banglaName: 'একাউন্ট',
        icon: 'person',
        url: '#',
        shouldAuthCheck: true,
        subs: [
            {name: 'Dashboard', banglaName: 'ড্যাশবোর্ড', icon: 'home', url: '/account/home'},
            {
                name: 'Create Tweet',
                banglaName: 'নতুন টুইট',
                icon: 'create',
                url: '/account/create-tweet',
                isTweetCreate: true
            },
        ]
    },
]

export default routes