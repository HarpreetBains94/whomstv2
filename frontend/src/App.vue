<template>
  <v-app class="v-app-custom">
    <div class="base-container d-flex align-center" :class="{ blue: isAnswered() }">
      <v-btn
        icon
        text
        x-large
        class="menu-button"
        @click.stop="drawer = !drawer"
      >
        <v-icon>mdi-menu</v-icon>
      </v-btn>
      <router-view
        @show-snackbar="showSnackbar"
      />
    </div>
    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list dense>
        <v-list-item
          link
          @click.stop="onHomeClick"
        >
          <v-list-item-icon>
            <v-icon>mdi-home</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click.stop="onHelpClick"
        >
          <v-list-item-icon>
            <v-icon>mdi-help</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Help</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
        <v-list-item
          link
          @click.stop="onBrokenClick"
        >
          <v-list-item-icon>
            <v-icon>mdi-link-off</v-icon>
          </v-list-item-icon>

          <v-list-item-content>
            <v-list-item-title>Report a broken link</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>
    <v-snackbar v-model="snackbar">
      {{ snackbarMessage }}
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-dialog
      v-model="showHelpDialog"
      max-width="500"
    >
      <help-container />
    </v-dialog>
  </v-app>
</template>
<script>

import HelpContainer from "./components/HelpContainer.vue";

export default {
  name: "App",
  components: {
    HelpContainer
  },

  data: () => ({
    drawer: null,
    snackbar: false,
    snackbarMessage: "",
    showHelpDialog: false,
  }),

  methods: {
    onResize() {
      this.$store.dispatch("resizeWindow", {
        width: window.innerWidth,
        height: window.innerHeight
      });
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

    isAnswered() {
      return this.$store.getters.shouldShowAnswer;
    },

    onHomeClick() {
      this.drawer = false;
      this.$router.push("/");
    },

    onHelpClick() {
      this.showHelpDialog = true;
    },

    onBrokenClick() {
      let id = this.$store.getters.sample.song.id;
      if (this.$store.getters.shouldShowAnswer) {
        id = this.$store.getters.correctAnswer.song.id;
      }
      if (!id) {
        return;
      }
      this.$http
        .post(
            "api/borked/",
          {
            song_id: id
          }
        )
        .then(() => {
          this.showSnackbar("Thank you for feedback");
        })
        .catch(() => {
          this.showSnackbar("Something went wrong, try again");
        });
    },
    showSnackbar(message) {
      this.snackbarMessage = message;
      this.snackbar = true;
    },
  },

  mounted() {
    this.$nextTick(() => {
      this.onResize();
      window.addEventListener("resize", this.onResize);
    });
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
  min-height: 100vh;
  min-width: 100vw;
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
  overflow: auto;

  &:after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
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

.v-app-custom {
  height: 100vh;
  overflow: overlay;
}

.menu-button {
  position: fixed;
  top: 16px;
  left: 16px;
  z-index: 2;
}
</style>
