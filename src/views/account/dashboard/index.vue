<template>
    <f7-page v-if="!offline">
        <f7-navbar title="Profile" back-link="Back"/>

        <f7-card class="form-design">
            <f7-card-header>Your Profile</f7-card-header>
            <f7-card-content>
                <f7-list>
                    <validation-error-display :errors="errors" :server_errors="serverVErrors"/>
                </f7-list>
                <f7-list form>
                    <f7-list-input
                            clear-button
                            label="Name *"
                            type="text"
                            placeholder="Enter your Name..."
                            :value="form.name"
                            @input="form.name = $event.target.value"
                            :class="{'has-error': errors.name.length > 0}"
                            @change="checkValidation('name')"
                    />

                    <f7-list-input
                            clear-button
                            label="Description"
                            type="textarea"
                            placeholder="Description of the tweet..."
                            :value="form.bio"
                            @input="form.bio = $event.target.value"
                            :class="{'has-error': errors.bio.length > 0}"
                            @change="checkValidation('bio')"
                    />

                    <f7-list-input
                            clear-button
                            label="Facebook Url (optional)"
                            type="text"
                            placeholder="e.g. https://www.facebook.com/inverse.shakil"
                            :value="form.user_fb"
                            @input="form.user_fb = $event.target.value"
                            :class="{'has-error': errors.user_fb.length > 0}"
                            @change="checkValidation('user_fb')"
                    />

                    <f7-list-input
                            clear-button
                            label="Twitter Url (optional)"
                            type="text"
                            placeholder="e.g. https://twitter.com/inverse_shakil"
                            :value="form.user_tw"
                            @input="form.user_tw = $event.target.value"
                            :class="{'has-error': errors.user_tw.length > 0}"
                            @change="checkValidation('user_tw')"
                    />

                    <f7-button fill color="red" :disabled="!isSubmitEnabled" @click="save"
                               style="width: 100px; margin: 0 auto;">
                        Save
                    </f7-button>
                </f7-list>
            </f7-card-content>
        </f7-card>

    </f7-page>
    <f7-page v-else>
        <offline-card/>
    </f7-page>
</template>

<script>
    import OfflineCard from "../../../components/offline-card";
    import ValidationErrorDisplay from '../../../components/validation-error-display'

    export default {
        components: {
            OfflineCard,
            ValidationErrorDisplay
        },
        data() {
            return {
                form: {
                    name: '',
                    bio: '',
                    user_fb: '',
                    user_tw: ''
                },
                errors: {
                    name: [],
                    bio: [],
                    user_fb: [],
                    user_tw: [],
                },
                serverVErrors: [],
                error: false,
                offline: false
            };
        },
        mounted() {
            if (!this.$auth.check()) {
                this.$router.push('/login')
            }
        },
        computed: {
            isSubmitEnabled() {
                return this.form.name !== '' && this.errors.bio !== '' &&
                    this.errors.name.length === 0 && this.errors.user_fb.length === 0 && this.errors.user_tw.length === 0 && this.errors.bio.length === 0;
            }
        },
        methods: {
            checkValidation(input = false) {
                if (input === "name" || !input) {
                    if (this.form.name === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Title of the tweet is required"
                        };
                        this.errors.name.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.name.length < 15) {
                        let obj = {
                            title: "Validation Error",
                            text: "Title should have minimum 15 character."
                        };
                        this.errors.name.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else {
                        this.errors.name = [];
                    }
                }
                if (input === "bio" || !input) {
                    this.errors.bio = [];
                    if (this.errors.bio === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Introduction is required"
                        };
                        this.errors.bio.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.errors.bio.length < 20) {
                        let obj = {
                            title: "Validation Error",
                            text: "Introduction should have minimum 20 character."
                        };
                        this.errors.bio.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.errors.bio.length > 300) {
                        let obj = {
                            title: "Validation Error",
                            text: "Introduction can not have more than 300 character."
                        };
                        this.errors.bio.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    }
                }
                if (input === 'user_fb' || input === 'user_tw' || !input) {
                    this.errors.user_fb = [];
                    if (this.form.user_fb !== '') {
                        let result = input === 'user_fb' ? this.validateFbProUrl(this.form[input]) : this.validateTwProUrl(this.form[input]);
                        if (!result) {
                            let obj = {
                                title: "Validation Error",
                                text: "Profile url is not valid"
                            };
                            this.errors[input].push(obj.text);
                            this.$utils.showMessage(obj, this, 2);
                        }
                    }
                }
                return this.errors.name.length === 0 && this.errors.bio.length === 0 && this.errors.user_fb.length === 0 && this.errors.user_tw.length === 0;
            },

            validateFbProUrl(str) {
                return /(?:https?:\/\/)?(?:www\.)?(?:facebook|fb|m\.facebook)\.(?:com|me)\/(?:(?:\w)*#!\/)?(?:pages\/)?(?:[\w\-]*\/)*([\w\-\.]+)(?:\/)?/i.test(str);
            },

            validateTwProUrl(str) {
                return /http(?:s)?:\/\/(?:www\.)?twitter\.com\/([a-zA-Z0-9_]+)/.test(str);
            },

            save() {
                this.offline = false;
                if (this.checkValidation()) {
                    this.$f7.preloader.show();
                    const vm = this;
                    const url = 'account/save-tweet';
                    this.$http.post(url, this.form)
                        .then(response => {
                            vm.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Successfully Saved."
                            };
                            vm.$utils.showMessage(obj, vm);
                            vm.$ls.remove('tweets');
                            vm.$router.push({name: '/tweets'});
                        })
                        .catch(error => {
                            vm.offline = vm.$utils.errorHandle(error, vm).offline;
                            vm.serverVErrors = vm.$utils.errorHandle(error, vm).vErrors;
                            vm.$f7.preloader.hide();
                        })
                }

            }
        }
    };
</script>
