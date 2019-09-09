<template>
  <f7-page>
    <!-- <f7-navbar title="Home"></f7-navbar> -->
    <f7-block-title>Latest Articles</f7-block-title>
    <article-card :header="'Latest Article'" v-for="n in 10" :key="n" :n="n"></article-card>
  </f7-page>
</template>
<script>
import ArticleCard from "../components/article-card";
export default {
  components: {
    ArticleCard
  },
  mounted() {
    setTimeout(() => {
      this.$utils.showLoader(1, this);
    }, 50);
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
