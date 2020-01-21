<template>
  <Slide width="200">
    <a
      :class="{'active': $route.path === '/'}"
      @click="$route.path !== '/' ? $router.push('/') : null"
    >
      <f7-icon fa="home"/>Home
    </a>
    <a
      :class="{'active': $route.path === '/tweets'}"
      @click="$route.path !== '/tweets' ? $router.push('/tweets') : null"
    >
      <f7-icon fa="comment"/>Tweets
    </a>
    <a @click="clearCache()">
      <f7-icon fa="refresh"/>Clear Cache
    </a>
    <a
      v-if="!$auth.check()"
      :class="{'active': $route.path === '/login'}"
      @click="$route.path !== '/login' ? $router.push('/login') : null"
    >
      <f7-icon fa="sign-in-alt"/>Login
    </a>
    <a v-if="$auth.check() && $auth.user().isAllowed" 
    :class="{'active': $route.path === '/account/create-tweet'}"
    @click="$router.push('/account/create-tweet')">
      <f7-icon fa="sign-out-alt"/>Create Tweet
    </a>
    <a v-if="$auth.check()" @click="$auth.logout()">
      <f7-icon fa="sign-out-alt"/>Logout
    </a>
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu";
export default {
  components: {
    Slide
  },
  mounted(){
  },
  methods: {
    clearCache() {
      localStorage.clear();
      let obj = {
        title: "Success!",
        text: "Cache Cleared..."
      };
      this.$utils.showMessage(obj, this);
    }
  }
};
</script>

<style lang="css" >
</style>