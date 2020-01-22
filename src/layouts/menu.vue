<template>
    <Slide width="200" id="bm-menu">
        <img class="logo" src="http://uvlsports.com/image_upload/system_logo.png" height="50" alt="UVL SPORTS">

        <ul class="main-navigation-area">
            <li class="main-menu" v-for="(route, i) in routes" :key="i"
                v-if="(route.isLoginPage === false && route.shouldAuthCheck === undefined) ||  (route.isLoginPage === true && !$auth.check()) || ($auth.check() && $auth.isAllowed)"
                @click="openUrl(route)"
            >
                <router-link :to="route.url"
                             :class="{'link': true,'active': $route.path === route.url}"
                >
                    <f7-icon :material="route.icon" color="white"/>
                    {{ route.name }}
                    <f7-icon
                            v-if="route.subs.length && (route.shouldAuthCheck === undefined || (route.shouldAuthCheck === true && $auth.check()))"
                            :f7="isActive && activeRoute === route.name ? 'arrowtriangle_down' : 'arrowtriangle_right'"
                            class="has-sub-arrow-icon" color="white"/>
                </router-link>
                <ul class="has-sub-menu"
                    v-if="route.subs.length && isActive && activeRoute === route.name && $auth.check()">
                    <li class="sub-menu" v-for="(subRoute, j) in route.subs" :key="i+j"
                        v-if="$auth.check() && $auth.isAllowed"
                        @click="visitUrlAndcloseMenu(subRoute.url)">
                        <router-link class="link" :to="subRoute.url">
                            <f7-icon :material="subRoute.icon" color="white"/>
                            {{ subRoute.name }}
                        </router-link>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="group-icons-bottom">
            <a v-if="$auth.check()" @click="$auth.logout()" title="Logout">
                <f7-icon material="power_settings_new"/>
            </a>

            <a @click="clearCache()" title="refresh">
                <f7-icon material="refresh"/>
            </a>
        </div>
    </Slide>

</template>

<script>
    import {Slide} from "vue-burger-menu";

    export default {
        components: {
            Slide
        },
        mounted() {
        },
        data() {
            return {
                isActive: null,
                activeRoute: null,
                routes: [
                    {name: 'Home', icon: 'home', url: '/', isLoginPage: false, subs: []},
                    {name: 'Tweets', icon: 'book', url: '/tweets', isLoginPage: false, subs: []},
                    {name: 'Login', icon: 'lock', url: '/login', isLoginPage: true, subs: []},
                    {
                        name: 'Account',
                        icon: 'person',
                        url: '#',
                        isLoginPage: false,
                        shouldAuthCheck: true,
                        subs: [
                            {name: 'Create Tweet', icon: 'plus_one', url: '/account/create-tweet'},
                        ]
                    },
                ]
            }
        },
        methods: {
            clearCache() {
                localStorage.clear();
                let obj = {
                    title: "Success!",
                    text: "Cache Cleared..."
                };
                this.$utils.showMessage(obj, this);
            },
            openUrl(route) {
                this.activeRoute = route.name;
                console.log(this.$router.path, route.url)
                if (route.subs.length) {
                    this.isActive = !this.isActive;
                    this.keepMenuOpen();

                } else {
                    if (this.$router.path !== route.url) {
                        this.$router.push(route.url);
                    }
                }
            },
            keepMenuOpen() {
                setTimeout(() => {
                    document.body.classList.add('bm-overlay');
                    var elm = document.getElementsByClassName("bm-menu");
                    for (var i = 0; i < elm.length; i++) {
                        elm[i].setAttribute('style', 'width:200px');
                    }
                }, 10)
            },
            visitUrlAndcloseMenu(url) {
                if (this.$router.path !== url) {
                    this.$router.push(url);
                }
                console.log(this.$router.path, url)
                setTimeout(() => {
                    document.body.classList.remove('bm-overlay');
                    var elm = document.getElementsByClassName("bm-menu");
                    for (var i = 0; i < elm.length; i++) {
                        elm[i].setAttribute('style', 'width: 0px');
                    }
                }, 100)
            }
        }
    };
</script>

<style lang="css">
</style>