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
        <v-col cols="6" class="no-padding">
          <v-row>
            <metadata-container
              :data="getMetadata()"
              :url="getUrl()"
            ></metadata-container>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import VideoContainer from "./VideoContainer.vue";
import MetadataContainer from "./MetadataContainer.vue";

export default {
  name: "AnswerContainer",
  components: {
    VideoContainer,
    MetadataContainer
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
.content {
  height: 100%;
}
.no-padding {
  padding: 0;
  padding-left: 12px;
}
</style>
