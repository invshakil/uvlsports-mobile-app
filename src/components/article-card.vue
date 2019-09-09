<template>
  <div scrollable>
    <f7-card class="demo-card-header-pic">
      <f7-card-header class="no-border" valign="bottom">
        <img
          @click="visitArticlePage"
          src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg"
          width="100%"
        />
      </f7-card-header>
      <f7-card-content>
        <b @click="visitArticlePage">Article Title {{ n }}</b>
        <p class="date">Posted on January 21, 2018</p>
        <p>{{ description }}</p>
      </f7-card-content>
      <f7-card-footer>
        <div class="demo-facebook-name">Shakil</div>
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
    n: {
      type: Number
    },
    description: {
      required: false,
      default:
        "Quisque eget vestibulum nulla. Quisque quis dui quis ex ultricies efficitur vitae non felis. Phasellus quis nibh hendrerit..."
    }
  },
  mounted() {},
  methods: {
    visitArticlePage() {
      return this.$router.push("/article-details");
    }
  }
};
</script>

<style lang="css" scoped>

</style>
