<template>
  <div
    class="search-container"
    :class="{'is-portrait': $store.getters.isPortrait}"
  >
    <div
      class="search-container-content"
    >
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
        label="Who Sampled This Song?"
        return-object
        @keyup.enter.native="onSubmit"
      ></v-autocomplete>
      <v-tooltip>
        <template v-slot:activator="{ on }">
          <v-btn icon small @click="onSubmit" v-on="on">
            <v-icon>
              mdi-send-check
            </v-icon>
          </v-btn>
        </template>
        <span>Confirm Answer</span>
      </v-tooltip>
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
          "api/search/" + val
        )
        .then(res => {
          this.isLoadingSearch = false;
          this.songs = res.data;
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
        this.$emit("show-snackbar", "Correct!")
        return;
      }
      this.$emit("show-snackbar", "Wrong")
    },
    onPrevious() {
      const previousId = this.$store.getters.previousId;
      this.$store.dispatch("doPreviousClickStuff");
      this.$router.push("/" + previousId);
    },
    onSkip() {
      this.$store.dispatch("onSkipClicked");
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
.search-container {
  position: relative;
  width: 100%;
  padding-top: calc(18.75% - 14px);
  border: 2px solid black;
  overflow: hidden;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-top: 12px;

  .search-container-content {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: white;
    padding: 20px;
    padding-bottom: 60px;
  }

  &.is-portrait {
    padding-top: 120px;
  }
}

.search {
  margin-top: -8px;
  display: inline-block;
  width: calc(100% - 30px);
}

.previous-button {
  position: absolute;
  left: 10px;
  bottom: 20px;
}

.skip-button {
  position: absolute;
  left: 110px;
  bottom: 20px;
}
</style>
