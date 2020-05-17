<template>
  <div class="content">
    <v-container fluid>
      <v-row>
        <v-col cols="6">
          <video-container
            :url="getUrl()"
            :timestamp="getTimestamp()"
          ></video-container>
        </v-col>
        <v-col cols="6">
          <v-row>
            <metadata-container :data="getMetadata()"></metadata-container>
          </v-row>
          <v-row>
            <search-container></search-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoContainer from "./VideoContainer.vue";
import SearchContainer from "./SearchContainer.vue";
import MetadataContainer from "./MetadataContainer.vue";

export default {
  name: "QuestionContainer",
  components: {
    VideoContainer,
    SearchContainer,
    MetadataContainer
  },
  methods: {
    getUrl() {
      return this.$store.getters.sample.song.url;
    },
    getTimestamp() {
      return this.$store.getters.questionPair.sample_timestamp;
    },
    getMetadata() {
      return this.$store.getters.sample;
    }
  }
};
</script>
<style scoped lang="scss">
.content {
  height: 100%;
}
</style>
