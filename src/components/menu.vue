<template>
  <Slide width="200">
    <a
      :class="{'active': $route.path === '/'}"
      @click="$route.path !== '/' ? $router.push('/') : null"
    >
      <f7-icon fa="home"></f7-icon>Home
    </a>
    <a
      :class="{'active': $route.path === '/tweets'}"
      @click="$route.path !== '/tweets' ? $router.push('/tweets') : null"
    >
      <f7-icon fa="comment"></f7-icon>Tweets
    </a>
    <a @click="clearCache()">
      <f7-icon fa="refresh"></f7-icon>Clear Cache
    </a>
    <a
      v-if="!$auth.check()"
      :class="{'active': $route.path === '/login'}"
      @click="$route.path !== '/login' ? $router.push('/login') : null"
    >
      <f7-icon fa="sign-in-alt"></f7-icon>Login
    </a>
    <a v-if="$auth.check()" @click="$auth.logout()">
      <f7-icon fa="sign-out-alt"></f7-icon>Logout
    </a>
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu"; // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
  components: {
    Slide // Register your component
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