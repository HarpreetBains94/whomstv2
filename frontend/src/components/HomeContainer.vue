<template>
  <v-container
    fluid
  >
    <v-row 
      align="center"
      justify="center"
      v-if="isAnswered()"
    >
      <answer-container class="content-container"></answer-container>
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-else
    >
      <question-container class="content-container"></question-container>
    </v-row>
  </v-container>
</template>

<script>
import QuestionContainer from "./QuestionContainer.vue";
import AnswerContainer from "./AnswerContainer.vue";

export default {
  name: "HomeContainer",
  components: {
    QuestionContainer,
    AnswerContainer
  },
  data: () => ({
    error: null
  }),
  created() {
    this.fetchData();
  },
  methods: {
    fetchData() {
      const id = this.$route.params.id || "";
      this.error = null;
      this.$store.dispatch("startLoading");
      this.$http
        .get(
          window.location.protocol +
            "//" +
            window.location.hostname +
            ":3000/" +
            id
        )
        .then(res => {
          this.$store.dispatch("stopLoading");
          this.$store.dispatch(
            "newSampleFetched",
            this.mapApiFetchToStoreData(res.data)
          );
        })
        .catch(err => {
          console.log(err);
        });
    },
    mapApiFetchToStoreData(data) {
      var sample = {
        song: data.sample,
        artists: data.artists,
        featArtists: data.featArtists,
        producers: data.producers
      };
      return {
        sample,
        pairs: data.pairs,
        randomSampleId: data.randomSampleId
      };
    },
    getStyle() {
      return {
        "min-height": this.$store.getters.contentHeight + "px",
        "max-height": this.$store.getters.contentHeight + "px"
      };
    },
    getMarginTop() {
      return (this.$store.getters.topOffset + 40 - 12) + "px";
    },
    isAnswered() {
      return this.$store.getters.shouldShowAnswer;
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>
<style scoped lang="scss">
.content-container {
  width: 80%;
}
</style>
