<template>
  <f7-page login-screen>
    <f7-navbar title="Login In" back-link="Back"></f7-navbar>
    <f7-block-title>Login in to your account</f7-block-title>
    <f7-list form>
      <f7-list-input
        label="Username"
        type="text"
        placeholder="Your username"
        :value="username"
        @input="username = $event.target.value"
      ></f7-list-input>
      <f7-list-input
        label="Password"
        type="password"
        placeholder="Your password"
        :value="password"
        @input="password = $event.target.value"
      ></f7-list-input>
    </f7-list>
    <f7-list>
      <f7-button fill color="red" @click="signIn" style="width: 100px; margin: 0 auto;">Sign-In</f7-button>
      <f7-block-footer>We collect information you provide to us directly when you use our app.</f7-block-footer>
    </f7-list>
  </f7-page>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      password: ""
    };
  },
  mounted() {
    setTimeout(() => {
      this.$utils.showLoader(1, this);
    }, 50);
  },
  methods: {
    signIn() {
      const self = this;
      const app = self.$f7;
      app.dialog.alert(
        `Username: ${self.username}<br>Password: ${self.password}`,
        () => {
          this.$router.push("/");
        }
      );
    }
  }
};
</script>
