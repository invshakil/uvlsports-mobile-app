<template>
  <div>
    <f7-page>
      <f7-navbar :title="title" back-link="Back"></f7-navbar>
      <f7-block-title></f7-block-title>
      <article-card :description="description" :isDetailedPage="true"></article-card>
    </f7-page>
  </div>
</template>
<script>
import ArticleCard from "@/components/article-card";
export default {
  components: {
    ArticleCard
  },
  props: {
    title: {
      default: "Latest From EPL",
      required: false
    },
    description: {
      default:
        ""
    }
  }
};
</script>
