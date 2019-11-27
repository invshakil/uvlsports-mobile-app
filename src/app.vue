<template>
  <!-- App -->
  <f7-app>
    <navbar></navbar>
    <sidemenu></sidemenu>
    <router-view id="page-wrap"></router-view>
    <cfooter></cfooter>
  </f7-app>
</template>

<script>
// Import Routes
import navbar from "./layouts/navbar";
import sidemenu from "./layouts/menu";
import cfooter from "./layouts/footer";

export default {
  components: {
    sidemenu,
    navbar,
    cfooter,
  },
  data() {
    return {};
  }
};
</script>
<style lang="scss">
@import "./styles/main.scss";
</style>
