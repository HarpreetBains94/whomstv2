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

  data: () => ({
    windowWidth: 0
  }),

  methods: {
    getUrl() {
      return (
        "https://www.youtube.com/embed/" + this.url + "?start=" + this.timestamp
      );
    },
    getWidth() {
      return this.windowWidth * 0.4;
    },
    getHeight() {
      return this.getWidth() * (9 / 16);
    },
    getStyle() {
      return {
        "max-height": this.getHeight() + "px"
      };
    },
    onResize() {
      this.windowWidth = window.innerWidth;
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.windowWidth = window.innerWidth;
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
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
}
</style>
