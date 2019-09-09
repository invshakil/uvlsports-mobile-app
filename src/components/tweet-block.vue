<template>
  <div>
    <f7-list-item
      @click="openTweet"
      link="#"
      title="Yellow Submarine"
      subtitle="Posted On 11:30pm"
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt. Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. In vel dui laoreet, commodo augue id, pulvinar lacus."
    >
      <img slot="media" src="https://cdn.framework7.io/placeholder/people-160x160-1.jpg" width="80" />
    </f7-list-item>
  </div>
</template>

<script>
export default {
  name: "tweet-block",
  methods: {
    openTweet() {
      const self = this;
      const app = self.$f7;
      app.dialog.alert(
        `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla sagittis tellus ut turpis condimentum, ut dignissim lacus tincidunt.
         Cras dolor metus, ultrices condimentum sodales sit amet, pharetra sodales eros. Phasellus vel felis tellus. Mauris rutrum ligula nec dapibus feugiat. 
         In vel dui laoreet, commodo augue id, pulvinar lacus.`,
         'Tweet Title'
      );
    }
  }
};
</script>
