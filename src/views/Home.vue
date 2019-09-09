<template>
  <f7-page>
    <!-- <f7-navbar title="Home"></f7-navbar> -->
    <f7-block-title>Latest Articles</f7-block-title>
    <article-card
      :header="article.title"
      v-for="(article, index) in results"
      :data="article"
      :key="index"
    ></article-card>

    <div style="width: 100%; text-align: center; margin-bottom: 10px">
      <f7-button
        color="red"
        outline
        @click="infiniteHandler()"
        style="width: 200px; margin: 0 auto;"
      >{{ loading ? 'Loading...' : 'Load more articles'}}</f7-button>
    </div>
  </f7-page>
</template>
<script>
import ArticleCard from "../components/article-card";
export default {
  components: {
    ArticleCard
  },
  data() {
    return {
      page: 0,
      set: 10,
      results: [],
      next_page_exists: 1,
      loading: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.infiniteHandler();
    }, 50);
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
    infiniteHandler() {
      this.tweetLoading = true;
      let url = "/get-articles";
      this.$f7.preloader.show();
      this.$http
        .get(url, {
          params: {
            set: this.set,
            page: this.page
          }
        })
        .then(({ data }) => {
          if (data.length) {
            this.page += 1;
            this.results.push(...data);
          } else {
            this.next_page_exists = 0;
          }
          this.tweetLoading = false;
          this.$f7.preloader.hide();
        });
    }
  }
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
