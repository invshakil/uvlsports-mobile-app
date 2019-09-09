<template>
  <Slide width="200">
    <a
      :class="{'active': $route.path === '/'}"
      @click="$route.path !== '/' ? $router.push('/') : null"
    >Home</a>
    <a
      :class="{'active': $route.path === '/tweets'}"
      @click="$route.path !== '/tweets' ? $router.push('/tweets') : null"
    >Tweets</a>
    <a
      v-if="!$auth.check()"
      :class="{'active': $route.path === '/login'}"
      @click="$route.path !== '/login' ? $router.push('/login') : null"
    >Login</a>
    <a v-if="$auth.check()" @click="$auth.logout()">Logout</a>
  </Slide>
</template>

<script>
import { Slide } from "vue-burger-menu"; // import the CSS transitions you wish to use, in this case we are using `Slide`

export default {
  components: {
    Slide // Register your component
  },
  methods: {}
};
</script>

<style lang="css" >
</style>