<template>
  <div
    class="content"
    :class="{ portrait: $store.getters.isPortrait }"
    :style="getStyle()"
  >
    <div class="title">Correct!</div>
    <div>{{ getText() }}</div>
    <v-btn text small @click="onBack" class="back-button">
      back
    </v-btn>
    <v-btn
      :disabled="$store.getters.hasNoPreviousId"
      text
      small
      @click="onPrevious"
      class="previous-button"
    >
      Previous
    </v-btn>
    <v-btn text small @click="onNext" class="next-button">
      next
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "AnswerButtonContainer",
  methods: {
    onPrevious() {
      const previousId = this.$store.getters.previousId;
      this.$store.dispatch("doPreviousClickStuff");
      this.$router.push("/" + previousId);
    },
    onNext() {
      this.$store.dispatch("doNextClickStuff");
      this.$router.push("/" + this.$store.getters.nextId);
    },
    onBack() {
      this.$store.dispatch("resetAnswer");
    },
    getWidth() {
      if (this.$store.getters.isPortrait) {
        return this.$store.getters.windowSize.width * 0.8 - 24;
      }
      return this.$store.getters.windowSize.width * 0.4 - 24;
    },
    getHeight() {
      if (this.$store.getters.isPortrait) {
        return 200;
      }
      return this.getWidth() * (9 / 16) * 0.5 - 12;
    },
    getStyle() {
      return {
        "min-height": this.getHeight() + "px",
        "max-height": this.getHeight() + "px",
        "min-width": this.getWidth() + "px",
        "max-width": this.getWidth() + "px"
      };
    },
    getText() {
      return (
        this.$store.getters.sample.song.title +
        " was sampled by " +
        this.$store.getters.correctAnswer.song.title
      );
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  position: relative;
  height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 12px;
  padding-bottom: 60px;

  &.portrait {
    margin-left: 0;
  }
}

.back-button {
  position: absolute;
  left: 5px;
  bottom: 20px;
}

.previous-button {
  position: absolute;
  left: 70px;
  bottom: 20px;
}

.next-button {
  position: absolute;
  left: 170px;
  bottom: 20px;
}
</style>
