<template>
  <div style="height: 100%">
    <f7-page v-if="!offline">
      <p id="breadcrumb">
        <a @click="$router.go(-1)">Home</a>
        <a href>Tweets</a>
      </p>
      <f7-list media-list>
        <tweet-block v-for="(tweet, index) in results" :data="tweet" :key="index"></tweet-block>
      </f7-list>
      <div v-if="firstLoad" style="width: 100%; text-align: center; margin-bottom: 10px">
        <f7-button
          color="red"
          outline
          @click="infiniteHandler()"
          style="width: 200px; margin: 0 auto;"
        >{{ loading ? 'Loading...' : 'Load more tweets'}}</f7-button>
      </div>
    </f7-page>
    <f7-page v-else>
      <offline-card></offline-card>
    </f7-page>
  </div>
</template>

<script>
import TweetBlock from "@/components/tweet-block";
import { setTimeout } from "timers";
import OfflineCard from "../../components/offline-card";
export default {
  components: {
    TweetBlock,
    OfflineCard
  },
  data() {
    return {
      page: 0,
      set: 10,
      results: [],
      next_page_exists: 1,
      loading: false,
      firstLoad: true,
      offline: false
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
      this.firstLoad = false;
      this.loading = true;
      this.offline = false;
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
        })
        .catch(error => {
          if (!error.response) {
            // network error
            let obj = {
              title: "Network Error!",
              text: "Your device seems to be in offline"
            };
            this.$utils.showMessage(obj, this, 5);
            this.offline = true;
          }
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
