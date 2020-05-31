<template>
  <div
    class="content"
    :class="{ portrait: $store.getters.isPortrait }"
    :style="getStyle()"
  >
    <div class="title">
      Who Sampled This Song?
    </div>
    <v-autocomplete
      class="search"
      v-model="selectedAnswer"
      :items="songs"
      :loading="isLoadingSearch"
      :search-input.sync="search"
      color="black"
      hide-no-data
      hide-selected
      item-text="value"
      item-value="id"
      label="Search"
      placeholder="Start typing to Search"
      return-object
      @keyup.enter.native="onSubmit"
    ></v-autocomplete>
    <v-btn text small @click="onSubmit">submit</v-btn>
    <v-btn
      :disabled="$store.getters.hasNoPreviousId"
      text
      small
      @click="onPrevious"
      class="previous-button"
    >
      Previous
    </v-btn>
    <v-btn text small @click="onSkip" class="skip-button">
      Skip
    </v-btn>
    <v-snackbar v-model="snackbar">
      nope
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import _ from "lodash";

export default {
  name: "SearchContainer",
  data: () => ({
    selectedAnswer: null,
    songs: [],
    isLoadingSearch: false,
    search: null,
    snackbar: false
  }),

  methods: {
    fetchSearchData: _.debounce(function(val) {
      this.isLoadingSearch = true;
      this.$http
        .get(
          window.location.protocol +
            "//" +
            window.location.hostname +
            ":3000/search/" +
            val
        )
        .then(res => {
          this.songs = res.data;
          this.isLoadingSearch = false;
        })
        .catch(err => {
          this.songs = [];
          console.log(err);
        });
    }, 500),
    onSubmit() {
      if (!this.selectedAnswer) {
        return;
      }
      let correct = false;
      let correctAnserIndex = 0;
      this.$store.getters.pairs.forEach((pair, index) => {
        if (this.selectedAnswer.id === pair.song.id) {
          correct = true;
          correctAnserIndex = index;
        }
      });
      if (correct) {
        this.$store.dispatch("answerChosen", correctAnserIndex);
        return;
      }
      this.showIncorrectAnswerSnackBar();
    },
    onPrevious() {
      const previousId = this.$store.getters.previousId;
      this.$store.dispatch("doPreviousClickStuff");
      this.$router.push("/" + previousId);
    },
    onSkip() {
      this.$store.dispatch("onSkipClicked");
    },
    showIncorrectAnswerSnackBar() {
      this.snackbar = true;
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
    }
  },

  watch: {
    search(val) {
      if (!val) {
        this.songs = [];
        return;
      }
      if (this.isLoadingSearch) {
        return;
      }
      this.fetchSearchData(val);
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
  padding-bottom: 60px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 12px;

  &.portrait {
    margin-left: 0;
  }
}

.search {
  padding-top: 20px;
  display: inline-block;
  width: calc(100% - 76px);
}

.previous-button {
  position: absolute;
  left: 5px;
  bottom: 20px;
}

.skip-button {
  position: absolute;
  left: 105px;
  bottom: 20px;
}
</style>
