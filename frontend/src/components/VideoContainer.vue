<template>
  <div
    class="content"
    :width="getWidth()"
    :height="getHeight()"
    :style="getStyle()"
  >
    <iframe
      :width="getWidth()"
      :height="getHeight()"
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
    },
    getWidth() {
      if (this.$store.getters.isPortrait) {
        return this.$store.getters.windowSize.width * 0.8 - 24;
      }
      return this.$store.getters.windowSize.width * 0.4 - 24;
    },
    getHeight() {
      return this.getWidth() * (9 / 16);
    },
    getStyle() {
      return {
        "max-height": this.getHeight() + "px",
        "max-width": this.getWidth() + "px",
        "min-width": this.getWidth() + "px"
      };
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  border-radius: 20px;
  overflow: hidden;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 12px;
  margin-right: 12px;
}
</style>
