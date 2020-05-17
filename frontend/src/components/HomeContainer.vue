<template>
  <v-container class="base-container" :class="{ blue: isAnswered() }" fluid>
    <v-row align="center" justify="center">
      <div class="nav-bar"></div>
    </v-row>
    <v-row align="center" justify="center" v-if="isLoading">
      <div class="loading">
        Loading...
      </div>
    </v-row>
    <v-row align="center" justify="center" v-if="error">
      <div class="error">
        {{ error }}
      </div>
    </v-row>
    <v-row align="center" justify="center" v-if="isAnswered()">
      <answer-container class="content-container"></answer-container>
    </v-row>
    <v-row align="center" justify="center" v-else>
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
      this.error = null;
      this.$store.dispatch("startLoading");
      this.$http
        .get(
          window.location.protocol +
            "//" +
            window.location.hostname +
            ":3000/" +
            (this.$route.params.id || "")
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
    isAnswered() {
      return this.$store.getters.shouldShowAnswer;
    }
  },
  computed: {
    isLoading() {
      return this.$store.getters.loading;
    }
  },
  watch: {
    $route: "fetchData"
  }
};
</script>
<style scoped lang="scss">
.base-container {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(
    circle at bottom left,
    rgb(255, 152, 169) 0%,
    black 100%
  );
  max-width: unset;

  &.blue {
    background: radial-gradient(
      circle at bottom right,
      rgb(56, 209, 255) 0%,
      black 100%
    );
  }
}
.nav-bar {
  width: calc(80% - 24px);
  margin-left: 12px;
  max-width: 1536px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
}
.content-container {
  width: 80%;
  max-width: 1536px;
}
</style>
