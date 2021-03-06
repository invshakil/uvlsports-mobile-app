<template>
    <f7-page v-if="!offline">
        <f7-navbar title="Create Tweet" back-link="Back"/>

        <f7-card class="form-design">
            <f7-card-header>{{ pageTitle }}</f7-card-header>
            <f7-card-content>
                <f7-list>
                    <validation-error-display :errors="errors" :server_errors="serverVErrors"/>
                </f7-list>
                <f7-list form>
                    <f7-list-input
                            label="টাইটেল *"
                            type="text"
                            placeholder="লিখুন..."
                            :value="form.title"
                            @input="form.title = $event.target.value"
                            :class="{'has-error': errors.title.length > 0}"
                            @change="checkValidation('title')"
                    />

                    <f7-list-input
                            label="ছবির লিঙ্ক (optional)"
                            type="text"
                            placeholder="যেমন. https://uvlsports.com/demo-image.jpg"
                            :value="form.image"
                            @input="form.image = $event.target.value"
                            :class="{'has-error': errors.image.length > 0}"
                            @change="checkValidation('image')"
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

                    <f7-button fill color="red" :disabled="!isSubmitEnabled" @click="save"
                               style="width: 100px; margin: 0 auto;">
                        সেভ করুন
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
                pageTitle: '',
                form: {
                    title: '',
                    image: '',
                    description: ''
                },
                editId: null,
                errors: {
                    title: [],
                    description: [],
                    image: [],
                },
                serverVErrors: [],
                error: false,
                offline: false
            };
        },
        mounted() {
            let tweetId = this.$route.params.id;
            if (tweetId === undefined) {
                this.pageTitle = 'নতুন টুইট ক্রিয়েট করুন';
            } else {
                this.pageTitle = 'টুইট আপডেট করুন';
                tweetId = parseInt(this.$route.params.id);
                let tweets = localStorage.getItem('tweets');
                if (tweets !== null) {
                    let tweet = JSON.parse(tweets).find(tweet => tweet.id === tweetId);
                    this.form = {
                        title: tweet.title,
                        image: tweet.image,
                        description: tweet.description
                    };
                    this.editId = tweet.id;
                }
            }
        },
        computed: {
            isSubmitEnabled() {
                return this.form.title !== '' && this.form.description !== '' &&
                    this.errors.title.length === 0 && this.errors.image.length === 0 && this.errors.description.length === 0;
            }
        },
        methods: {
            checkValidation(input = false) {
                if (input === "title" || !input) {
                    if (this.form.title === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Title of the tweet is required"
                        };
                        this.errors.title.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.title.length < 15) {
                        let obj = {
                            title: "Validation Error",
                            text: "Title should have minimum 15 character."
                        };
                        this.errors.title.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else {
                        this.errors.title = [];
                    }
                }
                if (input === "description" || !input) {
                    this.errors.description = [];
                    if (this.form.description === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Description of the tweet is required"
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
                if (input === "image" || !input) {
                    this.errors.image = [];
                    if (this.form.image !== '') {
                        let result = this.isURL(this.form.image);
                        if (!result) {
                            this.errors.image.push('Image Url is not valid');
                            let obj = {
                                title: "Validation Error",
                                text: "Image Url is not valid"
                            };
                            this.errors.image.push(obj.text);
                            this.$utils.showMessage(obj, this, 2);
                        }
                    }
                }

                return this.errors.title.length === 0 && this.errors.title.length === 0 && this.errors.description.length === 0;
            },

            isURL(str) {
                let url = /^(?:\w+:)?\/\/([^\s\\.]+\.\S{2}|localhost[\\:?\d]*)\S*$/.test(str);
                if (url) {
                    var image = new Image();
                    image.src = str;

                    return image.complete && image.height !== 0;
                } else {
                    return false;
                }
            },

            save() {
                this.offline = false;
                if (this.checkValidation()) {
                    this.$f7.preloader.show();
                    let url = 'account/save-tweet';
                    let $method = this.$http.post;
                    if (this.editId !== null) {
                        url = '/account/update-tweet/' + this.editId;
                        $method = this.$http.patch;
                    }
                    $method(url, this.form)
                        .then(() => {
                            this.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Successfully Saved."
                            };
                            this.$utils.showMessage(obj, this);
                            this.$ls.remove('tweets');
                            this.$router.push('/tweets');
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
