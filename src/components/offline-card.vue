<template>
  <div>
    <f7-card class="demo-card-header-pic" id="offline-card">
      <f7-card-header class="no-border" valign="bottom">
        <img src="../assets/no-internet.png" />
      </f7-card-header>
      <f7-card-content>
        <b class="title text-center">Your Device is offline!</b>
        <f7-button
          outline
          color="red"
          @click="reload()"
          style="width: 150px; margin: 0 auto; margin-top: 50px;"
        >Retry Again</f7-button>
      </f7-card-content>
    </f7-card>
  </div>
</template>

<script>
export default {
  methods: {
    reload() {
      window.location.reload();
    }
  }
};
</script>

<style lang="css">
#offline-card {
  margin-top: 30%;
}
</style>