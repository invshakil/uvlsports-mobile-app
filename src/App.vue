<template>
  <!-- App -->
  <f7-app>
    <navbar></navbar>
    <sidemenu></sidemenu>
    <router-view id="page-wrap"></router-view>
    <a class="footer">
      Developed By Shakil
      <img
        src="./assets/copyright.png"
        style="background: transparent; height: 10px; color: #fff"
        alt
      />
      &nbsp; 2017 - {{ new Date().getFullYear() }}
    </a>
  </f7-app>
</template>

<script>
// Import Routes
import navbar from "./components/navbar";
import sidemenu from "./components/menu";

export default {
  components: {
    sidemenu,
    navbar
    // sidebar
  }
};
</script>
<style lang="scss">
@import "./styles/main.scss";
</style>
