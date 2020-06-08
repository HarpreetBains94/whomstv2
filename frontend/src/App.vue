<template>
  <v-app>
    <div class="base-container" :class="{ blue: isAnswered() }">
      <navbar-container></navbar-container>
      <router-view></router-view>
    </div>
  </v-app>
</template>

<script>
import NavbarContainer from "./components/NavbarContainer.vue";

export default {
  name: "App",

  components: {
    NavbarContainer
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
      this.$store.dispatch("setTopOffset", this.getTopOffset());
      this.$store.dispatch("setIsMobile", this.isMobile());
    },
    isMobile() {
      if (
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
          navigator.userAgent
        )
      ) {
        return true;
      } else {
        return false;
      }
    },
    getTopOffset() {
      switch (this.$route.name) {
        case "home":
          return this.getOffsetForHomeComponent();
        case "what":
          return this.getOffsetForWhatComponent();
        default:
          return this.getOffsetForHomeComponent();
      }
    },
    getOffsetForHomeComponent() {
      if (this.$store.getters.isPortrait) {
        return this.getTopOffsetForPortrait();
      }
      return this.getTopOffsetForHorizontal();
    },
    getTopOffsetForPortrait() {
      const videoHeight =
        (this.$store.getters.windowSize.width * 0.8 - 24) * (9 / 16);
      const otherCardHeights = 400;
      const navbarHeight = 40;
      const padding = 72;
      const totalContentHeight =
        videoHeight + otherCardHeights + navbarHeight + padding;
      const heightDelta =
        this.$store.getters.windowSize.height - totalContentHeight;
      if (heightDelta < 48) {
        return 24;
      }
      return heightDelta / 2;
    },
    getTopOffsetForHorizontal() {
      const videoHeight =
        (this.$store.getters.windowSize.width * 0.4 - 24) * (9 / 16);
      const navbarHeight = 40;
      const padding = 24;
      const totalContentHeight = videoHeight + navbarHeight + padding;
      const heightDelta =
        this.$store.getters.windowSize.height - totalContentHeight;
      if (heightDelta < 48) {
        return 24;
      }
      return heightDelta / 2;
    },
    getOffsetForWhatComponent() {
      const contentHeight = 800;
      const navbarHeight = 40;
      const padding = 24;
      const totalContentHeight =
        contentHeight + navbarHeight + padding;
      const heightDelta =
        this.$store.getters.windowSize.height - totalContentHeight;
      if (heightDelta < 48) {
        return 24;
      }
      return heightDelta / 2;
    },
    isAnswered() {
      return this.$store.getters.shouldShowAnswer;
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    });
  },

  watch:{
    $route (){
        this.onResize();
    }
  }, 

  beforeDestroy() {
    window.removeEventListener("resize", this.onResize);
  }
};
</script>
<style src="./css/style.css"></style>
<style lang="scss" scoped>
.base-container {
  position: relative;
  height: 100vh;
  width: 100vw;
  overflow-x: hidden;
  overflow: overlay;
  background: linear-gradient(
    45deg,
    rgb(255, 166, 115) 0%,
    rgb(255, 150, 224) 100%
  );
  background-size: 200% 200%;
  -webkit-animation: AnimationName 10s ease infinite;
  -moz-animation: AnimationName 10s ease infinite;
  animation: AnimationName 10s ease infinite;
  max-width: unset;
  z-index: 1;

  &:after {
    content: "";
    height: 100vh;
    width: 100vw;
    position: absolute;
    top: 0;
    left: 0;
    background: linear-gradient(
      45deg,
      rgba(192, 255, 145, 1) 0%,
      rgba(79, 193, 255, 1) 100%
    );
    background-size: 200% 200%;
    -webkit-animation: AnimationName 10s ease infinite;
    -moz-animation: AnimationName 10s ease infinite;
    animation: AnimationName 10s ease infinite;
    max-width: unset;
    transition: opacity 0.45s;
    z-index: -1;
    opacity: 0;
  }

  &.blue {
    &:after {
      opacity: 1;
    }
  }
}
@-webkit-keyframes AnimationName {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
}
@-moz-keyframes AnimationName {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
}
@keyframes AnimationName {
  0% {
    background-position: 100% 0%;
  }
  50% {
    background-position: 0% 100%;
  }
  100% {
    background-position: 100% 0%;
  }
}
</style>
