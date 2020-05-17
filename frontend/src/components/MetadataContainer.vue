<template>
  <v-container>
    <div class="content">
      <div class="title">{{ getTitle() }}</div>
      <div class="artists">{{ getArtists() }}</div>
      <div class="producers">{{ getProducers() }}</div>
    </div>
  </v-container>
</template>

<script>
export default {
  name: "MetadataContainer",

  props: ["data"],

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
