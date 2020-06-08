<template>
  <div class="navbar-container">
    <div class="navbar" :style="getNavbarStyle()">
      <v-btn text rounded class="pa-5 mx-4 float-left nav-button" @click="onHomeClick">Home</v-btn>
      <v-menu offset-y>
      <template v-slot:activator="{ on }">
        <v-btn
          icon
          rounded
          class="pa-5 mx-4 float-right nav-button"
          v-on="on"
        >
          <v-app-bar-nav-icon></v-app-bar-nav-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          @click="onWhatClick"
        >
          <v-list-item-title>What is this?</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="onSubmitClick"
        >
          <v-list-item-title>Submit a sample</v-list-item-title>
        </v-list-item>
        <v-list-item
          @click="onBrokenClick"
        >
          <v-list-item-title>Report Broken Link</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    </div>
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
        width: this.getNavbarWidth(),
        "margin-top": this.getMarginTop()
      };
    },
    getNavbarWidth() {
      return this.$store.getters.windowSize.width * 0.8 - 24 + "px";
    },
    getMarginTop() {
      return this.$store.getters.topOffset + "px";
    },
    onHomeClick() {
      this.$router.push("/");
    },
    onWhatClick() {
      this.$router.push("/what");
    },
    onSubmitClick() {
      this.$router.push("/submit");
    },
    onBrokenClick() {
      let id = this.$store.getters.sample.song.id;
      if (this.$store.getters.shouldShowAnswer) {
        id = this.$store.getters.correctAnswer.song.id;
      }
      this.$http
        .post(
          window.location.protocol +
            "//" +
            window.location.hostname +
            ":3000/api/borked/",
          {
            song_id: id
          }
        )
        .then(() => {
          console.log('success');
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped lang="scss">
.navbar {
  width: 80%;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: auto;
}
.navbar-container {
  width: 100vw;
  position: fixed;
  z-index: 2;
}
.nav-button {
  // padding: 6px;
}
</style>
