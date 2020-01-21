<template>
  <div style="height: 100%">
    <f7-page v-if="!offline">
      <p id="breadcrumb">
        <a @click="$router.go(-1)">Home</a>
        <a href>Tweets</a>
      </p>
      <f7-list media-list>
        <tweet-block v-for="(tweet, index) in results" :data="tweet" :key="index"/>
      </f7-list>
      <div v-if="!firstLoad" style="width: 100%; text-align: center; margin-bottom: 10px">
        <f7-button
          color="red"
          outline
          @click="infiniteHandler()"
          style="width: 200px; margin: 0 auto;"
        >{{ loading ? 'Loading...' : 'Load more tweets'}}</f7-button>
      </div>
    </f7-page>
    <f7-page v-else>
      <offline-card/>
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
      nextPageExist: 1,
      loading: false,
      firstLoad: true,
      offline: false
    };
  },
  mounted() {
    setTimeout(() => {
      this.get();
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
    get() {
      let tweets = this.$ls.get("tweets");
      if (tweets === null) {
        this.infiniteHandler();
      } else {
        let lastTime = this.$ls.get("tweet_last_time");
        let diff = this.$utils.timeDiffInMinutes(lastTime);
        if (diff > 10) {
          this.infiniteHandler();
        } else {
          tweets = JSON.parse(tweets);
          this.results = tweets;
        }
        this.firstLoad = false;
      }
    },
    infiniteHandler() {
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
            this.firstLoad = false;
          } else {
            this.nextPageExist = 0;
          }
          this.loading = false;
          this.$f7.preloader.hide();
          this.saveTweetsInLocalStorage();
        })
        .catch(error => {
          if (!error.response) {
            // network error
            let obj = {
              title: "Network Error!",
              text: "Your device seems to be in offline"
            };
            this.$utils.showMessage(obj, this, 5);
            if (this.results.length === 0) {
              this.offline = true;
            }
          }
          this.$f7.preloader.hide();
        });
    },
    saveTweetsInLocalStorage() {
      let time = this.$ls.get("tweet_last_time");
      let articles = this.$ls.get("tweets");
      if (time === null) {
        this.$ls.set("tweet_last_time", new Date().getTime());
      }
      if (articles === null) {
        this.$ls.set("tweets", JSON.stringify(this.results));
      } else {
        articles = JSON.parse(articles);
        if (articles.length !== this.results.length) {
          this.$ls.remove("tweets");
          this.$ls.remove("tweet_last_time");
          this.$ls.set("tweets", JSON.stringify(this.results));
          this.$ls.set("tweet_last_time", new Date().getTime());
        }
      }
    }
  }
};
</script>

<style lang="css">
.list li {
  list-style: none;
}
</style>
