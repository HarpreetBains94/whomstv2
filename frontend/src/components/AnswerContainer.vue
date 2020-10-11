<template>
  <div class="main-content">
    <v-container v-if="$store.getters.isPortrait" fluid>
      <v-row>
        <v-col cols="12">
          <v-row no-gutters>
            <metadata-container
              :data="getMetadata()"
              :url="getUrl()"
              :timestamp="getTimestamp()"
            ></metadata-container>
          </v-row>
          <v-row no-gutters class="my-3">
            <video-container
              :url="getUrl()"
              :timestamp="getTimestamp()"
            ></video-container>
          </v-row>
          <v-row no-gutters>
            <answer-button-container></answer-button-container>
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
        <v-col cols="6">
          <v-row class="px-3">
            <metadata-container
              :data="getMetadata()"
              :url="getUrl()"
              :timestamp="getTimestamp()"
            ></metadata-container>
          </v-row>
          <v-row class="px-3">
            <answer-button-container
              @previous-clicked="$emit('previous-clicked')"
              @next-clicked="$emit('next-clicked')"
            ></answer-button-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoContainer from "./VideoContainer.vue";
import MetadataContainer from "./MetadataContainer.vue";
import AnswerButtonContainer from "./AnswerButtonContainer.vue";

export default {
  name: "AnswerContainer",
  components: {
    VideoContainer,
    MetadataContainer,
    AnswerButtonContainer
  },
  methods: {
    getUrl() {
      return this.$store.getters.correctAnswer.song.url;
    },
    getTimestamp() {
      return this.$store.getters.correctAnswer.song_timestamp;
    },
    getMetadata() {
      return this.$store.getters.correctAnswer;
    }
  }
};
</script>
<style scoped lang="scss">
.main-content {
  height: 100%;
  padding: 0;
}
</style>
