<template>
    <f7-page v-if="!offline" login-screen>
        <f7-navbar title="Login In" back-link="Back"/>
        <f7-block-title>Login in to your account</f7-block-title>

        <f7-list>
            <f7-list-item v-for="(error, i) in errors"
                          :key="i"
                          class="validation-error-message"
                          v-if="error.length"
                          :title="error[0]">
                <f7-icon slot="media" md="material:error" color="red"/>
            </f7-list-item>
            <f7-list-item v-for="(error, i) in serverVErrors"
                          :key="i"
                          class="validation-error-message"
                          v-if="error.length"
                          :title="error[0]">
                <f7-icon slot="media" md="material:error" color="red"/>
            </f7-list-item>
        </f7-list>

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
                serverVErrors: [],
                error: false,
                offline: false
            };
        },
        mounted() {
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

                return this.errors.email.length === 0 && this.errors.password.length === 0;
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
                        success: function (response) {
                            vm.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Logged in successfully..."
                            };
                            vm.$utils.showMessage(obj, vm);
                            if (response.data.userInfo) {
                                this.$store.dispatch('updateUserInfo', response.data.userInfo);
                            }
                        },
                        error: function (error) {
                            vm.offline = vm.$utils.errorHandle(error, vm).offline;
                            vm.serverVErrors = vm.$utils.errorHandle(error, vm).vErrors;
                            vm.$f7.preloader.hide();
                        },
                        rememberMe: true
                    });
                }
            }
        }
    };
</script>
