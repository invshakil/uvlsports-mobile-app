<template>
    <f7-page v-if="!offline">
        <f7-block-title> {{ pageTitle }}</f7-block-title>

        <f7-list class="filter-area" inline-labels>
            <f7-list-input
                    type="text"
                    placeholder="খুঁজুন..."
                    @change="filterResult($event.target.value, 'string')"
                    :value="filter.string"
            >
                <f7-icon f7="search" slot="media" color="red"></f7-icon>
            </f7-list-input>

            <f7-list-item v-if="isHome"
                          title="ক্যাটাগরি" smart-select
                          :smart-select-params="{openIn: 'popover', routableModals: false }">
                <label>
                    <select name="category_id"
                            @change="filterResult($event.target.value, 'category_id')"
                            :value="filter.category_id">
                        <option value="0" selected>সবগুলো</option>
                        <option v-for="(category, i) in this.$store.state.categories" :key="i" :value="category.id">
                            {{ category.banglaName }}
                        </option>
                    </select>
                </label>
            </f7-list-item>
        </f7-list>

        <article-card
                :header="article.title"
                v-for="(article, index) in results"
                :data="article"
                :key="index"
        />

        <div v-if="!firstLoad" style="width: 100%; text-align: center; margin-bottom: 10px">
            <f7-button
                    color="red"
                    outline
                    @click="infiniteHandler()"
                    style="width: 200px; margin: 0 auto;"
            >{{ loading ? 'Loading...' : 'Load more articles'}}
            </f7-button>
        </div>
    </f7-page>
    <f7-page v-else>
        <offline-card/>
    </f7-page>
</template>
<script>
    import ArticleCard from "./article-card";
    import OfflineCard from "./offline-card";

    export default {
        components: {
            ArticleCard,
            OfflineCard
        },
        data() {
            return {
                pageTitle: '',
                page: 0,
                set: 10,
                filter: {
                    category_id: 0,
                    string: '',
                },
                results: [],
                nextPageExist: 1,
                loading: false,
                firstLoad: true,
                offline: false,
                isHome: true
            };
        },
        created() {
            if (this.$route.path === '/') {
                this.pageTitle = 'সর্বশেষ আর্টিক্যাল সমূহ';
                setTimeout(() => {
                    this.get();
                }, 50);
            } else {
                let categoryId = parseInt(this.$route.params.id);
                this.pageTitle = this.$store.state.categories.find(category => category.id === categoryId).banglaName + ' এর আর্টিক্যাল সমূহ';
                this.filterResult(categoryId, 'category_id');
                this.isHome = false;
            }

        },
        methods: {
            getImageUrl(imageSrc) {
                let baseUrl = this.$http.defaults.baseURL;
                baseUrl = baseUrl.substring(0, baseUrl.length - 4);
                if (imageSrc === null) {
                    return baseUrl + "/" + "image_upload/system_logo.png";
                }
                return imageSrc;
            },
            filterResult(value, type) {
                let time = 0;
                if (type === 'category_id') {
                    this.filter.category_id = value;
                } else {
                    this.filter.string = value;
                    time = 1000;
                }
                this.page = 0;
                this.set = 10;
                setTimeout(() => this.infiniteHandler(true), time)
            },
            get() {
                let articles = this.$ls.get("articles");
                if (articles === null) {
                    this.infiniteHandler();
                } else {
                    let lastTime = this.$ls.get("article_last_time");
                    let diff = this.$utils.timeDiffInMinutes(lastTime);
                    if (diff > 10) {
                        this.infiniteHandler(true);
                    } else {
                        articles = JSON.parse(articles);
                        this.results = articles;
                    }
                    this.firstLoad = false;
                }
            },

            async infiniteHandler(shouldReset = false) {
                this.$f7.preloader.show();
                this.loading = true;
                this.offline = false;
                let url = "/get-articles?category_id=" + this.filter.category_id + '&string=' + this.filter.string;
                this.$http
                    .get(url, {
                        params: {
                            set: this.set,
                            page: this.page
                        }
                    })
                    .then(({data}) => {
                        if (data.length) {
                            this.page += 1;
                            if (shouldReset) {
                                this.results = data;
                            } else {
                                this.results.push(...data);
                            }
                            this.firstLoad = false;
                        } else {
                            this.nextPageExist = 0;
                        }
                        this.loading = false;
                        this.$f7.preloader.hide();
                        if (this.isHome) {
                            this.saveArticlesInLocalStorage();
                        }
                    })
                    .catch(error => {
                        if (!error.response) {
                            // network error
                            let obj = {
                                title: "Network Error!",
                                text: "Your device seems to be in offline"
                            };
                            this.$utils.showMessage(obj, this, 5);
                            if (!this.results.length === 0) {
                                this.offline = true;
                            }
                        }
                        this.$f7.preloader.hide();
                    });
            },

            saveArticlesInLocalStorage() {
                let time = this.$ls.get("article_last_time");
                let articles = this.$ls.get("articles");
                if (time === null) {
                    this.$ls.set("article_last_time", new Date().getTime());
                }
                if (articles === null) {
                    this.$ls.set("articles", JSON.stringify(this.results));
                } else {
                    articles = JSON.parse(articles);
                    if (articles.length !== this.results.length) {
                        this.$ls.remove("articles");
                        this.$ls.remove("article_last_time");
                        this.$ls.set("articles", JSON.stringify(this.results));
                        this.$ls.set("article_last_time", new Date().getTime());
                    }
                }
            }
        },

    };
</script>

<style lang="css">
    .footer {
        position: absolute;
        background: #ed143db5;
        text-align: center;
        padding: 10px 0;
        height: 45px;
        font-weight: bold;
        width: 100%;
        bottom: 0;
    }
</style>
