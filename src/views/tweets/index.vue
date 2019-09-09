<template>
  <div style="height: 100%">
    <f7-page>
      <p id="breadcrumb">
        <a @click="$router.go(-1)">Home</a>
        <a href>Tweets</a>
      </p>
      <f7-list media-list>
        <tweet-block v-for="n in 10" :key="n"></tweet-block>
      </f7-list>
    </f7-page>
  </div>
</template>

<script>
import TweetBlock from "@/components/tweet-block";
export default {
  components: {
    TweetBlock
  },
  mounted() {
    setTimeout(() => {
      this.$utils.showLoader(1, this);
    }, 50);
  }
};
</script>

<style lang="css">
.list li {
  list-style: none;
}
</style>
