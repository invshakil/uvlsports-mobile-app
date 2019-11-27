import axios from 'axios';
import Vue from 'vue';
import VueAxios from 'vue-axios';
import VueRouter from 'vue-router';
import NotFoundPage from './views/pages/not-found.vue';
import HomePage from './views/home.vue';
import LoginPage from './views/login.vue';
import ArticleDetails from './views/posts/_id/index.vue';
import TweetsPage from './views/tweets/index.vue';


Vue.use(VueRouter)
Vue.use(VueAxios, axios);

const routes = [
  {
    path: '/',
    name: 'home',
    component: HomePage
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
]

// axios.defaults.baseURL = 'http://localhost:8000/api';
axios.defaults.baseURL = 'http://uvlsports.com/api';

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
  loginData: { url: 'auth/login', method: 'post', redirect: '/', fetchUser: true },
  logoutData: { url: 'auth/logout', method: 'post', redirect: '/', makeRequest: true },
  fetchData: { url: 'auth/user', method: 'get', enable: true },
  refreshData: { url: 'auth/refresh', method: 'get', enable: false, interval: 30 },
});

export default router