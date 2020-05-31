<template>
  <div>
    <div class="navbar" :style="getNavbarStyle()"></div>
  </div>
</template>

<script>
export default {
  name: "NavbarContainer",
  data: () => ({
    isOverflown: false
  }),

  methods: {
    getNavbarStyle() {
      return {
        width: this.getNavbarWidth()
      };
    },
    getNavbarWidth() {
      return this.$store.getters.windowSize.width * 0.8 - 24 + "px";
    }
  }
};
</script>
<style scoped lang="scss">
.navbar {
  width: 100%;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
