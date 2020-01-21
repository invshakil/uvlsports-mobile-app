<template>
  <f7-page v-if="!offline" login-screen>
    <f7-navbar title="Login In" back-link="Back"/>
    <f7-block-title>Login in to your account</f7-block-title>
    <f7-list form>
      <f7-list-input
              label="Username"
              type="text"
              placeholder="Your username"
              :value="email"
              @input="email = $event.target.value"
              :class="{'has-error': errors.email.length > 0}"
              @change="checkValidation('email')"
      />
      <f7-list-input
              label="Password"
              type="password"
              placeholder="Your password"
              :value="password"
              @input="password = $event.target.value"
              @change="checkValidation('password')"
      />
    </f7-list>
    <f7-list>
      <f7-button fill color="red" @click="login" style="width: 100px; margin: 0 auto;">Sign-In</f7-button>
      <f7-block-footer>We collect information you provide to us directly when you use our app.</f7-block-footer>
    </f7-list>
  </f7-page>
  <f7-page v-else>
    <offline-card/>
  </f7-page>
</template>

<script>
import OfflineCard from "../components/offline-card";

export default {
  components: {
    OfflineCard
  },
  data() {
    return {
      email: "",
      password: "",
      errors: {
        email: [],
        password: []
      },
      error: false,
      offline: false
    };
  },
  mounted() {},
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
    },
    checkValidation(input = false) {
      if (input === "email" || !input) {
        if (this.email === "") {
          let obj = {
            title: "Validation Error",
            text: "Please enter your email"
          };
          this.errors.email.push(obj.text);
          this.$utils.showMessage(obj, this, 2);
        } else if (this.validateEmail(this.email) === false) {
          let obj = {
            title: "Validation Error",
            text: "Please enter valid email address."
          };
          this.errors.email.push(obj.text);
          this.$utils.showMessage(obj, this, 2);
        } else {
          this.errors.email = [];
        }
      }
      if (input === "password" || !input) {
        if (this.password === "") {
          let obj = {
            title: "Validation Error",
            text: "Please enter your password."
          };
          this.errors.email.push(obj.text);
          this.$utils.showMessage(obj, this, 2);
        } else {
          this.errors.password = [];
        }
      }

      if (this.errors.email.length === 0 && this.errors.password.length === 0) {
        return true;
      } else {
        return false;
      }
    },

    validateEmail(mail) {
      if (/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return true;
      }
      return false;
    },

    login() {
      this.offline = false;
      var app = this;
      if (this.checkValidation(false)) {
        let data = {
          email: app.email,
          password: app.password
        };
        this.$f7.preloader.show();
        let vm = this;
        this.$auth.login({
          params: data,
          success: function() {
            // console.log(response);
            vm.$f7.preloader.hide();
            let obj = {
              title: "Success!",
              text: "Loging in..."
            };
            vm.$utils.showMessage(obj, vm);
            //vm.$router.push({name: 'home'});
          },
          error: function(error) {
            if (error.response) {
              if (error.response.status === 401) {
                let obj = {
                  title: "Login Failed!",
                  text: error.response.data.msg
                };
                this.$utils.showMessage(obj, this, 3);
              }
            } else {
              let obj = {
                title: "Network Error!",
                text: "Your device seems to be in offline"
              };
              this.$utils.showMessage(obj, this, 5);
              this.offline = true;
            }
            this.$f7.preloader.hide();
            // else if (error.request) {
            //   console.log(error.request);
            // } else {
            //   console.log("Error", error.message);
            // }
          },
          rememberMe: true
        });
      }
    }
  }
};
</script>
