<template>
  <v-container>
    <div class="content">
      <v-btn :disabled="$store.getters.hasNoPreviousId" text small @click="onPrevious">Previous</v-btn>
      <v-btn text small @click="onNext">next</v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "AnswerButtonContainer",
  methods: {
    onPrevious() {
      this.$emit("previous-clicked");
      this.$store.dispatch("doPreviousClickStuff");
    },
    onNext() {
      this.$emit("next-clicked");
      this.$store.dispatch("doNextClickStuff");
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
