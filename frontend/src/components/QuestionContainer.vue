<template>
  <div class="main-content">
    <v-container v-if="$store.getters.isPortrait" fluid>
      <v-row>
        <v-col cols="12">
          <v-row no-gutters>
            <metadata-container
              :data="getMetadata()"
              :url="getUrl()"
            ></metadata-container>
          </v-row>
          <v-row no-gutters>
            <video-container
              :url="getUrl()"
              :timestamp="getTimestamp()"
            ></video-container>
          </v-row>
          <v-row no-gutters>
            <search-container></search-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else fluid>
      <v-row>
        <v-col cols="6">
          <video-container
            :url="getUrl()"
            :timestamp="getTimestamp()"
          ></video-container>
        </v-col>
        <v-col cols="6" class="no-padding">
          <v-row>
            <metadata-container
              :data="getMetadata()"
              :url="getUrl()"
            ></metadata-container>
          </v-row>
          <v-row>
            <search-container
              @previous-clicked="$emit('previous-clicked')"
            ></search-container>
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
.main-content {
  height: 100%;
  padding: 0;
}
.no-padding {
  padding: 0;
  padding-left: 12px;
}
</style>
