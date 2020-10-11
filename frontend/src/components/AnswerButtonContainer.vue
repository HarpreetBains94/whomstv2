<template>
  <div
    class="answer-button-container"
    :class="{'is-portrait': $store.getters.isPortrait}"
  >
    <div
      class="answer-button-content"
    >
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
    getText() {
      return (
        "\"" + this.$store.getters.sample.song.title + "\"" +
        " was sampled by " +
        "\"" + this.$store.getters.correctAnswer.song.title + "\""
      );
    }
  }
};
</script>
<style scoped lang="scss">
.answer-button-container {
  position: relative;
  width: 100%;
  padding-top: calc(18.75% - 12px);
  border-radius: 20px;
  overflow: hidden;
  margin-top: 12px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);

  .answer-button-content {
    position: absolute;
    height: 100%;
    width: 100%;
    top: 0;
    left: 0;
    background-color: white;
    padding: 20px;
    padding-bottom: 60px;
  }

  &.is-portrait {
    padding-top: 120px;
  }
}

.back-button {
  position: absolute;
  left: 10px;
  bottom: 20px;
}

.previous-button {
  position: absolute;
  left: 75px;
  bottom: 20px;
}

.next-button {
  position: absolute;
  left: 175px;
  bottom: 20px;
}
</style>
