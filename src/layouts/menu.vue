<template>
    <Slide width="200" id="bm-menu">
        <img class="logo" :src="$store.state.systemLogo" height="50" :alt="$store.state.systemName">

        <ul class="main-navigation-area">
            <li class="main-menu" v-for="(route, i) in filteredRoutes" :key="i"
                @click="openUrl(route)"
                :class="{'has-sub': route.subs.length > 0, 'active': isActive && activeRoute === route.name}"
            >
                <a href="#" :class="{'link': true,'active': $route.path === route.url}">
                    <f7-icon :material="route.icon" color="white"/>
                    {{ route.banglaName }}
                    <f7-icon
                            v-if="route.showArrowIcon"
                            :f7="isActive && activeRoute === route.name ? 'arrowtriangle_down' : 'arrowtriangle_right'"
                            class="has-sub-arrow-icon" color="white"/>
                </a>

                <ul class="has-sub-menu"
                    v-if="route.subs.length && (isActive && activeRoute === route.name)">
                    <li class="sub-menu" v-for="(subRoute, j) in route.subs" :key="i+j"
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
    import routes from '../navigation'

    export default {
        components: {
            Slide
        },
        async mounted() {
            let categories = localStorage.getItem("categories");
            if (categories === null || categories === undefined) {
                await this.fetchCategories();
            } else {
                await this.storeCategoriesToStore(JSON.parse(categories));
            }
        },
        computed: {
            filteredRoutes() {
                let lCategories = [];
                let sCategories = [];

                this.$store.state.categories.forEach(item => (parseInt(item.is_league) === 1) ? lCategories.push(item) : sCategories.push(item));

                return routes.filter(route => {
                    // Attaching subs menu for two different type category
                    if (route.name === 'League_Categories') {
                        route.subs = lCategories;
                    } else if (route.name === 'FFBD_Special') {
                        route.subs = sCategories;
                    }
                    // 1st condition which one is public routes
                    // 2nd condition if it is login page and user is logged in or not
                    // 3rd condition if user is logged in
                    if ((route.isLoginPage === undefined && route.shouldAuthCheck === undefined)
                        || (route.isLoginPage === true && !this.$auth.check())
                        || (route.isLoginPage === undefined && this.$auth.check())) {
                        route.showArrowIcon = !!(route.subs.length && (route.shouldAuthCheck === undefined || (route.shouldAuthCheck === true && this.$auth.check())));

                        // Checking if sub route list is public or needs logged in
                        if ((route.shouldAuthCheck === undefined || (route.shouldAuthCheck === true && this.$auth.check()))) {
                            // Filtering sub route
                            // 1st condition: as it is sub route, auth check not needed, auth checked in parent route
                            // 2nd ondition: if it is tweet create route, then check if user has access to this page
                            route.subs = route.subs.filter(subRoute =>
                                (subRoute.shouldAuthCheck === undefined) || (subRoute.isTweetCreate === true && this.$store.state.userInfo.hasTweetAccess)
                            )
                        } else {
                            route.subs = [];
                        }
                        return route;
                    }
                })
            }
        },
        data() {
            return {
                isActive: false,
                activeRoute: 'Home',
                routes: []
            }
        },
        methods: {
            async fetchCategories() {
                await this.$http.get('/get-categories')
                    .then(response => {
                        this.storeCategoriesToStore(response.data)
                    })
                    .catch(e => {
                        this.offline = this.$utils.errorHandle(e, this).offline;
                        this.serverVErrors = this.$utils.errorHandle(e, this).vErrors;
                        this.$f7.preloader.hide();
                    })
            },
            async storeCategoriesToStore(data) {
                await this.$store.dispatch('storeCategories', data);
            },
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