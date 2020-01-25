
<template>
  <f7-page v-if="data">
    <p id="breadcrumb">
      <a @click="$router.push('/')">হোম</a>
      <a href>{{ data && data.title.length > 33 ? data.title.substr(0, 30) + '...' : data.title }}</a>
    </p>

    <f7-card class="demo-card-header-pic">
      <f7-card-header class="no-border" valign="bottom">
        <img :src="data.full_image" class="card-header-img"/>
      </f7-card-header>
      <f7-card-content>
        <b class="title">{{ data.title }}</b>
        <p class="date">প্রকাশিত হয়েছে: {{ data.time_format }}</p>
        <p class="date">লেখক: {{ data.author.name }}</p>
        <p class="date">ক্যাটাগরি: {{ data.categories }}</p>
        <div class="description" v-html="data.description"></div>
      </f7-card-content>
    </f7-card>
  </f7-page>
</template>
<script>
export default {
  components: {},
  data() {
    return {
      data: null
    };
  },
  mounted() {
    setTimeout(() => {
      this.get();
    }, 50);
  },
  methods: {
    get() {
      let aDetails = this.$ls.get("article_details" + this.$route.params.id);
      if (aDetails === null) {
        this.getArticleInfo();
      } else {
        this.data = JSON.parse(aDetails);
      }
    },
    getArticleInfo() {
      let url = "/get-article-details/" + this.$route.params.id;
      this.$f7.preloader.show();
      this.$http
        .get(url)
        .then(({ data }) => {
          this.data = data;
          this.$f7.preloader.hide();
          this.saveArticleDetailsInLocalStorage();
        })
        .catch(error => {
          if (!error.response) {
            // network error
            let obj = {
              title: "Network Error!",
              text: "Your device seems to be in offline"
            };
            this.$utils.showMessage(obj, this, 5);
            if (this.data == null) {
              this.offline = true;
            }
          }
          this.$f7.preloader.hide();
        });
    },
    saveArticleDetailsInLocalStorage() {
      let aDetails = this.$ls.get("article_details" + this.$route.params.id);
      if (aDetails === null) {
        this.$ls.set(
          "article_details" + this.$route.params.id,
          JSON.stringify(this.data)
        );
      }
    }
  }
};
</script>

