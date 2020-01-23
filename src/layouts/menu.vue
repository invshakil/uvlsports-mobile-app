<template>
    <Slide width="200" id="bm-menu">
        <img class="logo" :src="$store.state.systemLogo" height="50" :alt="$store.state.systemName">

        <ul class="main-navigation-area">
            <li class="main-menu" v-for="(route, i) in routes" :key="i"
                v-if="(route.isLoginPage === undefined && route.shouldAuthCheck === undefined)
                ||  (route.isLoginPage === true && !$auth.check())
                || (route.isLoginPage === undefined && $auth.check())"
                @click="openUrl(route)"
                :class="{'has-sub': route.subs.length > 0, 'active': isActive && activeRoute === route.name}"
            >
                <a href="#"
                   :class="{'link': true,'active': $route.path === route.url}"
                >
                    <f7-icon :material="route.icon" color="white"/>
                    {{ route.banglaName }}
                    <f7-icon
                            v-if="route.subs.length && (route.shouldAuthCheck === undefined || (route.shouldAuthCheck === true && $auth.check()))"
                            :f7="isActive && activeRoute === route.name ? 'arrowtriangle_down' : 'arrowtriangle_right'"
                            class="has-sub-arrow-icon" color="white"/>
                </a>

                <ul class="has-sub-menu"
                    v-if="route.subs.length && (isActive && activeRoute === route.name) && ( route.shouldAuthCheck === undefined || (route.shouldAuthCheck === true && $auth.check()) )">
                    <li class="sub-menu" v-for="(subRoute, j) in route.subs" :key="i+j"
                        v-if="($auth.check() && subRoute.isTweetCreate === undefined) || (subRoute.isTweetCreate === true && $store.state.userInfo.hasTweetAccess)"
                        @click="visitUrlAndcloseMenu(subRoute.url)">
                        <a href="#" :class="{'link': true,'active': $route.path === subRoute.url}">
                            <f7-icon :material="subRoute.icon" color="white"/>
                            {{ subRoute.banglaName }}
                        </a>
                    </li>
                </ul>
            </li>
        </ul>

        <div class="group-icons-bottom">
            <a v-if="$auth.check()" @click="logout()" title="Logout">
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
                isActive: false,
                activeRoute: 'Home',
                routes: [
                    {name: 'Home', banglaName: ' হোম', icon: 'home', url: '/', subs: []},
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
                                icon: 'plus_one',
                                url: '/account/create-tweet',
                                isTweetCreate: true
                            },
                        ]
                    },
                    // {
                    //     name: 'About Us',
                    //     icon: 'person',
                    //     url: '#',
                    //     subs: [
                    //         {name: 'Dashboard', icon: 'home', url: '/account/home'},
                    //         {name: 'Create Tweet', icon: 'plus_one', url: '/account/create-tweet'},
                    //     ]
                    // },
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
                this.activeRoute === route.name ? this.isActive = !this.isActive : this.isActive = true;
                this.activeRoute = route.name;
                if (route.subs.length) {
                    this.keepMenuOpen();

                } else {
                    if (this.$route.path !== route.url) {
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
                if (this.$route.path !== url) {
                    this.$router.push(url);
                    let app = this;
                    setTimeout(() => {
                        app.isActive = true;
                    }, 30)
                }

                setTimeout(() => {
                    document.body.classList.remove('bm-overlay');
                    var elm = document.getElementsByClassName("bm-menu");
                    for (var i = 0; i < elm.length; i++) {
                        elm[i].setAttribute('style', 'width: 0px');
                    }
                }, 100)
            },
            logout() {
                this.$auth.logout();
                this.$store.dispatch('updateUserInfo', null)
            }
        }
    };
</script>

<style lang="css">
</style>