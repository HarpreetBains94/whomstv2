<template>
  <v-app>
    <div class="nav-bar"></div>
    <router-view></router-view>
  </v-app>
</template>

<script>
// import HelloWorld from "./components/HelloWorld";

export default {
  name: "App",

  components: {
    // HelloWorld
  },

  data: () => ({
    //
  }),

  methods: {
    onResize() {
      this.$store.dispatch("resizeWindow", {
        width: window.innerWidth,
        height: window.innerHeight
      });
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.$store.dispatch("resizeWindow", {
        width: window.innerWidth,
        height: window.innerHeight
      });
      window.addEventListener("resize", this.onResize);
    });
  },

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style src="./css/style.css"></style>
