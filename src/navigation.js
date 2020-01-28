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
    //ভিতে সরাসরি সম্প্রচারিত খেলার সূচী
    {name: 'Tv_Schedules', banglaName: 'খেলার সময় সূচী', icon: 'book', url: '/tv-schedule', subs: []},
    {
        name: 'About_Us',
        banglaName: 'আমাদের সম্পর্কে',
        icon: 'description',
        url: '#',
        subs: [
            {name: 'About_US_Info', banglaName: 'আমরা কারা?', icon: 'assignment_late', url: '/about-us'},
            {name: 'Our_team', banglaName: 'আমাদের টিম', icon: 'view_comfy', url: '/our-team'},
        ]
    },
    {name: 'Contact', banglaName: 'যোগাযোগ', icon: 'email', url: '/contact-us', subs: []},
    {name: 'Login', banglaName: 'লগিন', icon: 'lock', url: '/login', isLoginPage: true, subs: []},
    {
        name: 'Account',
        banglaName: 'একাউন্ট',
        icon: 'person',
        url: '#',
        shouldAuthCheck: true,
        subs: [
            {name: 'Dashboard', banglaName: 'ড্যাশবোর্ড', icon: 'dashboard', url: '/account/home'},
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