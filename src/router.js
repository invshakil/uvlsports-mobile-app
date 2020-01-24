import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import NotFoundPage from './views/pages/not-found.vue';
import HomePage from './views/home.vue';
import ArticlePage from './views/pages/category';
import LoginPage from './views/login.vue';
import ArticleDetails from './views/posts/_id/index.vue';
import TweetsPage from './views/tweets/index.vue';
import Dashboard from './views/account/dashboard/index';
import TweetForm from './views/account/tweet/form';


Vue.use(VueRouter)
Vue.use(VueAxios, axios);

const routes = [
    {
        path: '/',
        name: 'home',
        component: HomePage
    },
    {
        path: '/categories/:id',
        component: ArticlePage,
        name: 'Category'
    },
    {
        path: '/article-details/:id',
        component: ArticleDetails,
    },
    {
        path: '/tweets',
        name: 'tweets',
        component: TweetsPage,
    },
    {
        path: '/login',
        component: LoginPage,
    },
    {
        path: '*',
        component: NotFoundPage,
    },

    // ACCOUNT ROUTES
    {
        path: '/account/create-tweet',
        name: 'createTweet',
        component: TweetForm,
        meta: {auth: true}
    },
    {
        path: '/account/update-tweet/:id',
        name: 'updateTweet',
        component: TweetForm,
        meta: {auth: true}
    },
    {
        path: '/account/home',
        name: 'userDashboard',
        component: Dashboard,
        meta: {auth: true}

    },

]

axios.defaults.baseURL = 'http://localhost:8000/api';
// axios.defaults.baseURL = 'http://uvlsports.com/api';

Vue.config.productionTip = false

const router = new VueRouter({
    mode: 'hash',
    routes
});

Vue.router = router
Vue.use(require('@websanova/vue-auth'), {
    auth: require('@websanova/vue-auth/drivers/auth/bearer.js'),
    http: require('@websanova/vue-auth/drivers/http/axios.1.x.js'),
    router: require('@websanova/vue-auth/drivers/router/vue-router.2.x.js'),
    authRedirect: '/login',
    tokenDefaultName: 'uvlsports-auth',
    tokenStore: ['localStorage'],
    loginData: {url: 'auth/login', method: 'post', redirect: '/account/home', fetchUser: true},
    logoutData: {url: 'auth/logout', method: 'post', redirect: '/login', makeRequest: true},
    fetchData: {url: 'auth/user', method: 'get', enable: false},
    refreshData: {url: 'auth/refresh', method: 'get', enable: false, interval: 30},
});

// router.beforeEach((to, from, next) => {
//     axios.get('/auth/user').then(response => {
//         next();
//     }).catch(error => {
//         next('/login')
//         localStorage.removeItem('userInfo');
//     })
// });

export default router