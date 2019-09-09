<template>
  <div>
    <f7-list-item
      @click="openTweet"
      link="#"
      :title="data.title"
      :subtitle="data.time"
      :text="data.description.length > 50 ? data.description.substr(0, 80) + '...' : data.description"
    >
      <img slot="media" :src="data.image" width="80" />
    </f7-list-item>
  </div>
</template>

<script>
export default {
  name: "tweet-block",
  props: {
    data: {
      required: true
    }
  },
  methods: {
    openTweet() {
      const self = this;
      const app = self.$f7;
      app.dialog.alert(`${this.data.description}`, this.data.title);
    }
  }
};
</script>
