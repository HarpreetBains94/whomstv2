<template>
  <div
    class="content"
    :class="{ portrait: $store.getters.isPortrait }"
    :style="getStyle()"
  >
    <div class="title">{{ getTitle() }}</div>
    <div class="artists subtitle-2">{{ getArtists() }}</div>
    <div class="producers subtitle-2">{{ getProducers() }}</div>
    <div class="timestamp caption">{{ getTimestamp() }}</div>
    <v-btn text color="black" @click="onLinkClick" class="stream-button">
      Stream this song<v-icon right>mdi-open-in-new</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "MetadataContainer",

  props: ["data", "url", "timestamp"],

  methods: {
    getTitle() {
      return this.data.song.title;
    },
    getArtists() {
      let artistString = "";
      let featArtistString = "";
      this.data.artists.forEach(artist => {
        if (artistString.length === 0) {
          artistString = artist.name;
          return;
        }
        artistString += ", " + artist.name;
      });
      this.data.featArtists.forEach(artist => {
        if (featArtistString.length === 0) {
          featArtistString = ", feat " + artist.name;
          return;
        }
        featArtistString += ", " + artist.name;
      });
      return "By " + artistString + featArtistString;
    },
    getProducers() {
      if (this.data.producers.length === 0) {
        return '';
      }
      let producersString = "";
      this.data.producers.forEach(artist => {
        if (producersString.length === 0) {
          producersString = artist.name;
          return;
        }
        producersString += ", " + artist.name;
      });
      return "Produced By " + producersString;
    },
    getTimestamp() {
      return "Sample appears at " + this.convertSecondsToMinute(this.timestamp);
    },
    convertSecondsToMinute(time) {
      var minutes = Math.floor(time / 60);
      var seconds = time - minutes * 60;
      if (seconds < 10) {
        seconds = "0" + seconds;
      }
      return minutes + ":" + seconds;
    },
    onLinkClick() {
      window.open(this.getLinkUrl(), "_blank");
    },
    getLinkUrl() {
      return (
        "https://songwhip.com/convert?url=" +
        encodeURIComponent("https://www.youtube.com/watch?v=" + this.url) +
        "&sourceAction=pasteUrl&canGoBack=1"
      );
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
  }
};
</script>
<style scoped lang="scss">
.content {
  position: relative;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin: 12px;

  &.portrait {
    margin-left: 0;
    margin-top: 0;
    margin-bottom: 24px;
  }
}

.stream-button {
  position: absolute;
  bottom: 20px;
  left: 5px;
}
</style>
