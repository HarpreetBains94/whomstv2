<template>
  <v-container>
    <div class="content">
      <v-autocomplete
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
      ></v-autocomplete>
      <v-btn text small @click="onSubmit">submit</v-btn>
    </div>
    <v-snackbar v-model="snackbar">
      nope
      <v-btn color="pink" text @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
  </v-container>
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
    showIncorrectAnswerSnackBar() {
      this.snackbar = true;
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
  height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
}
</style>
