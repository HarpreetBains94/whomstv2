<template>
  <div
    class="meta-data-container"
    :class="{'is-portrait': $store.getters.isPortrait}"
  >
    <div
      class="meta-data-content"
    >
      <div class="title">{{ getTitle() }}</div>
      <div class="artists subtitle-2">{{ getArtists() }}</div>
      <div class="producers subtitle-2">{{ getProducers() }}</div>
      <div class="timestamp caption">{{ getTimestamp() }}</div>
      <v-btn text color="black" @click="onLinkClick" class="stream-button">
        Stream this song<v-icon right>mdi-open-in-new</v-icon>
      </v-btn>
    </div>  
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
    }
  }
};
</script>
<style scoped lang="scss">
.meta-data-container {
  position: relative;
  width: 100%;
  padding-top: calc(37.5% - 12px);
  border-radius: 20px;
  overflow: hidden;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  margin-bottom: 12px;

  .meta-data-content {
    position: absolute;
    background-color: white;
    padding: 20px;
    padding-bottom: 170px;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
  }

  &.is-portrait {
    padding-top: 180px
  }
}

.stream-button {
  position: absolute;
  bottom: 20px;
  left: 5px;
}
</style>
