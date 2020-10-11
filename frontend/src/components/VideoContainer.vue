<template>
  <div
    class="content"
  >
    <iframe
      class="video-content"
      :src="getUrl()"
      frameborder="0"
      allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
      allowfullscreen
    >
    </iframe>
  </div>
</template>

<script>
export default {
  name: "VideoContainer",

  props: ["url", "timestamp"],

  methods: {
    getUrl() {
      return (
        "https://www.youtube.com/embed/" + this.url + "?start=" + this.timestamp
      );
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  border: 2px solid black;
  overflow: hidden;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  width: 100%;
  padding-top: 56.25%;
  box-sizing: border-box;
  position: relative;

  .video-content {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
  }
}
</style>
