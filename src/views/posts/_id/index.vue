
<template>
  <f7-page>
    <p id="breadcrumb">
      <a @click="$router.go(-1)">Home</a>
      <a href>Article Title 1</a>
    </p>

    <f7-card class="demo-card-header-pic">
      <f7-card-header class="no-border" valign="bottom">
        <img src="https://cdn.framework7.io/placeholder/nature-1000x700-8.jpg" width="100%" />
      </f7-card-header>
      <f7-card-content>
        <b>Article Title</b>
        <p class="date">Posted on January 21, 2018</p>
        <p class="date">Author: SHakil</p>
        <p>
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente porro, eveniet quasi, facilis, laborum consequatur reprehenderit quis earum fugit veritatis dignissimos asperiores!
          Ipsa aperiam quam molestiae dolor molestias tenetur veniam?
        </p>
      </f7-card-content>
    </f7-card>
  </f7-page>
</template>
<script>
export default {
  components: {},
  mounted() {
    setTimeout(() => {
      this.$utils.showLoader(1, this);
    }, 50);
  }
};
</script>
