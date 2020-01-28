<template>
    <f7-page v-if="!offline" login-screen>
        <f7-navbar title="যোগাযোগ করুন" back-link="Back"/>

        <f7-card class="form-design">
            <f7-card-header>যোগাযোগ করুন</f7-card-header>
            <f7-card-content>
                <f7-list>
                    <validation-error-display :errors="errors" :server_errors="serverVErrors"/>
                </f7-list>
                <f7-list form>
                    <f7-list-input
                            label="আপনার নাম"
                            type="text"
                            placeholder="e.g. John Doe"
                            :value="form.name"
                            @input="form.name = $event.target.value"
                            :class="{'has-error': errors.name.length > 0}"
                            @change="checkValidation('name')"
                    />
                    <f7-list-input
                            label="আপনার ইমেইল"
                            type="email"
                            placeholder="e.g. johndoe@email.com"
                            :value="form.email"
                            @input="form.email = $event.target.value"
                            :class="{'has-error': errors.email.length > 0}"
                            @change="checkValidation('email')"
                    />
                    <f7-list-input
                            label="বিষয়"
                            type="text"
                            placeholder="Type..."
                            :value="form.subject"
                            @input="form.subject = $event.target.value"
                            :class="{'has-error': errors.subject.length > 0}"
                            @change="checkValidation('subject')"
                    />
                    <f7-list-input
                            label="বিস্তারিত"
                            type="textarea"
                            placeholder="বিস্তারিত লিখুন..."
                            :value="form.description"
                            @input="form.description = $event.target.value"
                            :class="{'has-error': errors.description.length > 0}"
                            @change="checkValidation('description')"
                    />

                    <f7-button :disabled="!isSubmitEnabled" fill color="red" @click="submit"
                               style="width: 100px; margin: 0 auto;">
                        সাবমিট করুন
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
    import OfflineCard from "../../components/offline-card";
    import ValidationErrorDisplay from '../../components/validation-error-display'

    export default {
        components: {
            OfflineCard,
            ValidationErrorDisplay
        },
        data() {
            return {
                form: {
                    name: '',
                    email: '',
                    subject: '',
                    description: ''
                },
                errors: {
                    name: [],
                    email: [],
                    subject: [],
                    description: []
                },
                serverVErrors: [],
                error: false,
                offline: false
            };
        },
        computed: {
            isSubmitEnabled() {
                return this.form.name !== '' && this.form.email !== '' && this.form.description !== '' && this.form.subject !== '' &&
                    this.hasError();
            }
        },
        methods: {
            checkValidation(input = false) {
                if (input === "name" || !input) {
                    if (this.form.name === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Name is required"
                        };
                        this.errors.name.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.name.length < 6) {
                        let obj = {
                            title: "Validation Error",
                            text: "Name should have minimum 15 character."
                        };
                        this.errors.name.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else {
                        this.errors.name = [];
                    }
                }
                if (input === "email" || !input) {
                    if (this.form.email === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Please enter your email"
                        };
                        this.errors.email.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.validateEmail(this.form.email) === false) {
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
                if (input === "subject" || !input) {
                    if (this.form.subject === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Subject is required"
                        };
                        this.errors.subject.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.subject.length < 15) {
                        let obj = {
                            title: "Validation Error",
                            text: "Subject should have minimum 15 character."
                        };
                        this.errors.subject.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.subject.length > 90) {
                        let obj = {
                            title: "Validation Error",
                            text: "Subject can have maximum 90 character."
                        };
                        this.errors.subject.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else {
                        this.errors.subject = [];
                    }
                }
                if (input === "description" || !input) {
                    this.errors.description = [];
                    if (this.form.description === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Description of the message is required"
                        };
                        this.errors.description.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.description.length < 20) {
                        let obj = {
                            title: "Validation Error",
                            text: "Description should have minimum 20 character."
                        };
                        this.errors.description.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.description.length > 500) {
                        let obj = {
                            title: "Validation Error",
                            text: "Description can not have more than 500 character."
                        };
                        this.errors.description.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    }
                }

                return this.hasError();
            },

            hasError() {
                return this.errors.name.length === 0 && this.errors.email.length === 0 && this.errors.description.length === 0 && this.errors.subject.length === 0;
            },

            validateEmail(mail) {
                return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(mail);

            },

            submit() {
                this.offline = false;
                if (this.checkValidation()) {
                    this.$f7.preloader.show();
                    let url = 'send-email-from-app';
                    let $method = this.$http.post;
                    $method(url, this.form)
                        .then(() => {
                            this.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Thanks for your message."
                            };
                            this.$utils.showMessage(obj, this);
                            this.form = {
                                name: '',
                                email: '',
                                subject: '',
                                description: ''
                            };
                        })
                        .catch(error => {
                            this.offline = this.$utils.errorHandle(error, this).offline;
                            this.serverVErrors = this.$utils.errorHandle(error, this).vErrors;
                            this.$f7.preloader.hide();
                        })
                }
            }
        }
    };
</script>
