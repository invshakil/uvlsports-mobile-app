<template>
  <div style="height: 100%">
    <f7-page>
      <p id="breadcrumb">
        <a @click="$router.go(-1)">Home</a>
        <a href>Tweets</a>
      </p>
      <f7-list media-list>
        <tweet-block v-for="(tweet, index) in results" :data="tweet" :key="index"></tweet-block>
      </f7-list>
      <div style="width: 100%; text-align: center; margin-bottom: 10px">
        <f7-button
          color="red"
          outline
          @click="infiniteHandler()"
          style="width: 200px; margin: 0 auto;"
        >{{ tweetLoading ? 'Loading...' : 'Load more tweets'}}</f7-button>
      </div>
    </f7-page>
  </div>
</template>

<script>
import TweetBlock from "@/components/tweet-block";
import { setTimeout } from "timers";

export default {
  components: {
    TweetBlock
  },
  data() {
    return {
      page: 0,
      set: 10,
      results: [],
      next_page_exists: 1,
      tweetLoading: false
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
      let url = "/get-more-tweets";
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
.list li {
  list-style: none;
}
</style>
