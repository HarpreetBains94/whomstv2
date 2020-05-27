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
  position: relative;
  height: 100vh;
  width: 100vw;
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
.nav-bar {
  width: calc(80% - 24px);
  margin-left: 12px;
  height: 40px;
  border-radius: 20px;
  background-color: white;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
.content-container {
  width: 80%;
}
</style>
