<template>
  <v-container>
    <div class="content">
      <div class="title">{{ getTitle() }}</div>
      <div class="artists">{{ getArtists() }}</div>
      <div class="producers">{{ getProducers() }}</div>
      <v-btn text color="black" @click="onLinkClick">
        <v-icon left>mdi-open-in-new</v-icon> Stream this song
      </v-btn>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MetadataContainer",

  props: ["data", "url"],

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
.content {
  height: 200px;
  width: 100%;
  background-color: white;
  border-radius: 20px;
  overflow: hidden;
  padding: 20px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
}
</style>
