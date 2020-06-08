<template>
  <v-container
    fluid
    class="home-container"
  >
    <v-row 
      align="center"
      justify="center"
      v-if="isAnswered()"
      :style="getStyle()"
    >
      <answer-container class="content-container"></answer-container>
    </v-row>
    <v-row
      align="center"
      justify="center"
      v-else
      :style="getStyle()"
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
        "margin-top": this.getMarginTop()
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
// .base-container {
//   position: relative;
//   height: 100vh;
//   width: 100vw;
//   overflow-x: hidden;
//   overflow: overlay;
//   background: linear-gradient(
//     45deg,
//     rgb(255, 166, 115) 0%,
//     rgb(255, 150, 224) 100%
//   );
//   background-size: 200% 200%;

//   -webkit-animation: AnimationName 10s ease infinite;
//   -moz-animation: AnimationName 10s ease infinite;
//   animation: AnimationName 10s ease infinite;
//   max-width: unset;
//   z-index: 1;

//   &:after {
//     content: "";
//     height: 100vh;
//     width: 100vw;
//     position: absolute;
//     top: 0;
//     left: 0;
//     background: linear-gradient(
//       45deg,
//       rgba(192, 255, 145, 1) 0%,
//       rgba(79, 193, 255, 1) 100%
//     );
//     background-size: 200% 200%;

//     -webkit-animation: AnimationName 10s ease infinite;
//     -moz-animation: AnimationName 10s ease infinite;
//     animation: AnimationName 10s ease infinite;
//     max-width: unset;
//     transition: opacity 0.45s;
//     z-index: -1;
//     opacity: 0;
//   }

//   &.blue {
//     &:after {
//       opacity: 1;
//     }
//   }
// }
// @-webkit-keyframes AnimationName {
//   0% {
//     background-position: 100% 0%;
//   }
//   50% {
//     background-position: 0% 100%;
//   }
//   100% {
//     background-position: 100% 0%;
//   }
// }
// @-moz-keyframes AnimationName {
//   0% {
//     background-position: 100% 0%;
//   }
//   50% {
//     background-position: 0% 100%;
//   }
//   100% {
//     background-position: 100% 0%;
//   }
// }
// @keyframes AnimationName {
//   0% {
//     background-position: 100% 0%;
//   }
//   50% {
//     background-position: 0% 100%;
//   }
//   100% {
//     background-position: 100% 0%;
//   }
// }
.home-container {
  width: 100%;
  height: 100%;
}
.content-container {
  width: 80%;
}
</style>
