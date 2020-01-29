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


                    <f7-list-item title="ক্যাটাগরি" smart-select
                                  :smart-select-params="{openIn: 'popover', routableModals: false }">
                        <label>
                            <select multiple name="category_id"
                                    @change="checkValidation('category_id')"
                                    v-model="form.category_id">
                                <!--                                <option value="0" disabled>সিলেক্ট করুন</option>-->
                                <option v-for="(category, i) in this.$store.state.categories" :key="i"
                                        :value="category.id">
                                    {{ category.banglaName }}
                                </option>
                            </select>
                        </label>
                    </f7-list-item>


                    <div class="editor-wrapper" @paste="pasteEventHandler">
                        <p class="info">১। বাংলিশ লেখার চেয়ে বাংলা শব্দচয়নে আর্টিক্যাল লেখার চেষ্টা করবেন। ইংরেজি শব্দের
                            মাত্রাতিরিক্ত ব্যবহার হলে আর্টিক্যাল এপ্রুভ না হতে পারে।</p>
                        <p class="info">২। শব্দের মাঝে ডাবল স্পেস ব্যবহার থেকে বিরত থাকবেন।</p>
                        <p class="info">৩। যেকোন ধরনের বিরতি চিহ্নের আগে স্পেস দিবেন না, তবে বিরতি চিহ্নের পর স্পেস
                            হবে।</p>
                        <p class="info">৪। আঞ্চলিক ভাষা পরিহার করে প্রমিত ভাষার ব্যবহার করবেন।</p>

                        <quill-editor v-model="form.description"
                                      ref="myQuillEditor"
                                      :options="editorOption"></quill-editor>
                    </div>


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
    import OfflineCard from "@/components/offline-card";
    import ValidationErrorDisplay from '@/components/validation-error-display'
    // require styles
    import 'quill/dist/quill.core.css'
    import 'quill/dist/quill.snow.css'
    import 'quill/dist/quill.bubble.css'

    import {quillEditor} from 'vue-quill-editor'

    export default {
        components: {
            OfflineCard,
            ValidationErrorDisplay,
            quillEditor
        },
        data() {
            return {
                pageTitle: '',
                editorOption: {
                    modules: {
                        toolbar: [
                            ['bold', 'italic', 'underline', 'strike'],
                            ['blockquote', 'code-block'],
                            [{'header': 1}, {'header': 2}],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            [{'script': 'sub'}, {'script': 'super'}],
                            [{'indent': '-1'}, {'indent': '+1'}],
                            [{'direction': 'rtl'}],
                            [{'size': ['small', false, 'large', 'huge']}],
                            [{'header': [1, 2, 3, 4, 5, 6, false]}],
                            [{'font': []}],
                            [{'color': []}, {'background': []}],
                            [{'align': []}],
                            ['clean'],
                            ['link', 'image', 'video']
                        ]
                    }
                },
                form: {
                    title: '',
                    category_id: [],
                    description: ''
                },
                editId: null,
                errors: {
                    title: [],
                    category_id: [],
                    description: [],
                },
                serverVErrors: [],
                error: false,
                offline: false
            };
        },
        mounted() {
            let articalId = this.$route.params.id;
            if (articalId === undefined) {
                this.pageTitle = 'নতুন লেখা সাবমিট করুন';
            } else {
                this.pageTitle = 'লেখা আপডেট করুন';
                articalId = parseInt(this.$route.params.id);
                this.fetchArticle(articalId)
            }
        },
        computed: {
            isSubmitEnabled() {
                return this.form.title !== '' && this.form.category_id.length > 0 && this.form.description !== '' &&
                    this.errors.title.length === 0 && this.errors.category_id.length === 0 && this.errors.description.length === 0;
            }
        },
        methods: {
            fetchArticle(articleId) {
                this.$http.post('account/get-article-details', {id: articleId})
                    .then(response => {
                        this.editId = articleId;
                        this.form = {
                            title: response.data.title,
                            category_id: response.data.category_id,
                            description: response.data.description,
                        }
                    })
                    .catch(error => {
                        this.offline = this.$utils.errorHandle(error, this).offline;
                        this.serverVErrors = this.$utils.errorHandle(error, this).vErrors;
                        this.$f7.preloader.hide();
                    })
            },
            checkValidation(input = false) {
                if (input === "title" || !input) {
                    if (this.form.title === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Title of the article is required"
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
                if (input === "category_id" || !input) {
                    if (this.form.category_id.length === 0) {
                        let obj = {
                            title: "Validation Error",
                            text: "Category is required"
                        };
                        this.errors.category_id.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else {
                        this.errors.category_id = [];
                    }
                }
                if (input === "description" || !input) {
                    this.errors.description = [];
                    if (this.form.description === '') {
                        let obj = {
                            title: "Validation Error",
                            text: "Description of the article is required"
                        };
                        this.errors.description.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    } else if (this.form.description.length < 50) {
                        let obj = {
                            title: "Validation Error",
                            text: "Description should have minimum 50 character."
                        };
                        this.errors.description.push(obj.text);
                        this.$utils.showMessage(obj, this, 2);
                    }
                }


                return this.errors.title.length === 0 && this.errors.title.length === 0 && this.errors.description.length === 0;
            },
            pasteEventHandler(event) {
                var data = event.clipboardData.getData('text/plain');
                setTimeout(() => {
                    this.form.description = data;
                }, 100)
            },
            save() {
                this.offline = false;
                if (this.checkValidation()) {
                    this.$f7.preloader.show();
                    let url = 'account/save-article';
                    let $method = this.$http.post;
                    if (this.editId !== null) {
                        url = '/account/update-article/' + this.editId;
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
                            this.$ls.remove('myArticles');
                            this.$router.push('/account/my-articles');
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
<style lang="scss">
    .editor-wrapper {
        background: #f4f4f4;
        color: #000000;
        margin: 15px;

        p.info {
            padding: 10px 10px 0 10px;
            margin: 5px;
            font-size: 12px;

            &:nth-child(4) {
                margin-bottom: 20px;
            }
        }

        .ql-editor {
            min-height: 350px;
        }
    }
</style>