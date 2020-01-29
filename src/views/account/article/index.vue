<template>
    <div style="height: 100%">
        <f7-page v-if="!offline">
            <p id="breadcrumb">
                <a @click="$router.push('/')">হোম</a>
                <a href>আপনার লেখাসমূহ</a>
            </p>

            <f7-list class="filter-area" inline-labels>

                <f7-list-item title="ফিল্টার করুন" smart-select
                              :smart-select-params="{openIn: 'popover', routableModals: false, closeOnSelect: true }"
                >
                    <label>
                        <select name="category_id"
                                @change="infiniteHandler(true)"
                                v-model="filter.category_id">
                            <option value="*" selected>সবগুলো</option>
                            <option value="0">শুধু অপ্রকাশিত লেখা</option>
                            <option value="1">শুধু প্রকাশিত লেখা</option>
                        </select>
                    </label>
                </f7-list-item>
            </f7-list>

            <f7-list v-if="results.length > 0" media-list v-for="(data, i) in results" :key="i">
                <f7-list-item :title="data.title"
                              :subtitle="data.time_format"
                >
                    <img slot="media" :src="data.medium_image" width="80" :alt="data.title"/>

                </f7-list-item>
                <f7-block-footer style="display: flex"
                                 v-if="$auth.check()">
                    <f7-button color="green" v-if="data.status === 1" fill small
                               @click="$router.push('/article-details/' + data.id)"
                               style="width: 100px; margin-right: 10px">
                        বিস্তারিত পড়ুন
                    </f7-button>

                    <f7-button color="green" fill small v-if="data.status === 0"
                               @click="$router.push('/account/update-article/' + data.id)"
                               style="width: 100px; margin-right: 10px">
                        আপডেট করুন
                    </f7-button>

                    <f7-button color="red" fill small v-if="data.status === 0" @click="deleteArticle(data.id)"
                               style="width: 100px;">
                        ডিলেট করুন
                    </f7-button>
                </f7-block-footer>
            </f7-list>

            <NoResult v-if="results.length === 0"></NoResult>

            <div v-if="!firstLoad" style="width: 100%; text-align: center; margin-bottom: 10px">
                <f7-button
                        color="red"
                        outline
                        @click="infiniteHandler()"
                        style="width: 200px; margin: 0 auto;"
                >{{ loading ? 'Loading...' : 'Load more'}}
                </f7-button>
            </div>
        </f7-page>
        <f7-page v-else>
            <offline-card/>
        </f7-page>
    </div>
</template>

<script>
    import {setTimeout} from "timers";
    import OfflineCard from "@/components/offline-card";
    import NoResult from "@/components/no-result";

    export default {
        components: {
            OfflineCard, NoResult
        },
        data() {
            return {
                page: 0,
                set: 10,
                results: [],
                nextPageExist: 1,
                loading: false,
                firstLoad: true,
                offline: false,
                filter: {
                    category_id: '*'
                }
            };
        },
        mounted() {
            setTimeout(() => {
                this.get();
            }, 50);
        },
        methods: {
            get() {
                this.infiniteHandler();
            },
            infiniteHandler(shouldReset = false) {
                this.loading = true;
                this.offline = false;
                let url = "account/get-my-articles?status=" + this.filter.category_id;
                this.$f7.preloader.show();
                if (shouldReset) {
                    this.set = 10;
                    this.page = 0;
                }
                this.$http
                    .get(url, {
                        params: {
                            set: this.set,
                            page: this.page
                        }
                    })
                    .then((response => {
                        let articles = response.data.articles;
                        if (articles.length) {
                            this.page += 1;
                            if (shouldReset) {
                                this.results = articles;
                            } else {
                                this.results.push(...articles);
                            }
                            this.firstLoad = false;
                        } else {
                            this.nextPageExist = 0;
                        }
                        this.loading = false;
                        this.$f7.preloader.hide();
                    }))
                    .catch(error => {
                        this.offline = this.$utils.errorHandle(error, this).offline;
                        this.serverVErrors = this.$utils.errorHandle(error, this).vErrors;
                        this.$f7.preloader.hide();
                    });
            },
            deleteArticle(id) {
                let vm = this;
                this.$f7.dialog.confirm('Are you sure about to delete this data?', 'Confirmation!', () => {
                    vm.$f7.preloader.show();
                    vm.$http.delete('/account/delete-article/' + id)
                        .then(() => {
                            vm.$f7.preloader.hide();
                            let obj = {
                                title: "Success!",
                                text: "Deleted successfully..."
                            };
                            vm.$utils.showMessage(obj, vm);
                            vm.infiniteHandler(true)
                        })
                        .catch(error => {
                            vm.$utils.errorHandle(error, vm);
                            vm.$f7.preloader.hide();
                        })
                })
            }
        }
    };
</script>

<style lang="css">
    .list li {
        list-style: none;
    }
</style>
