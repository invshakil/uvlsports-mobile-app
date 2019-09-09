<template>
  <div scrollable>
    <f7-card class="demo-card-header-pic">
      <f7-card-header class="no-border" valign="bottom">
        <img @click="visitArticlePage" :src="data.medium_image" width="100%" />
      </f7-card-header>
      <f7-card-content>
        <b @click="visitArticlePage">{{ data.title }}</b>
        <p class="date">{{ data.time_format }}</p>
        <p
          v-html="data.description.length > 100 ? data.description.substr(0, 100) + '....' : data.description"
        ></p>
      </f7-card-content>
      <f7-card-footer>
        <div class="demo-facebook-name">{{ data.author.name }}</div>
        <div class="demo-facebook-date">
          <f7-link @click="visitArticlePage">Read More...</f7-link>
        </div>
      </f7-card-footer>
    </f7-card>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      required: true
    }
  },
  mounted() {},
  methods: {
    visitArticlePage() {
      return this.$router.push("/article-details/" + this.data.id);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
