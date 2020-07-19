<template>
  <div class="main-content" :style="getStyle()">
    <v-container fluid>
      <v-row>
        <v-col cols="12">
          <v-row>
            <p class="headline">What's the point of this website?</p>
          </v-row>
          <v-row>
            <p class="body-1">This website presents you with a song which has been sampled. Your objective is to guess which song sampled it. </p>
          </v-row>
          <v-row>
            <p class="title">What is a sample?</p>
          </v-row>
          <v-row>
            <p class="body-1">Sampling in music referes to the act of taking sounds from songs or other media and incorporating it in to the production of a new song.
              In the example shown below, Mac Demarco sampled the melody from the Shigeo Sekito song.
            </p>
          </v-row>
          <v-row>
            <v-col :cols="$store.getters.isMobile ? 12 : 6" class="pa-0">
              <iframe
                :width="getWidth()"
                :height="getHeight()"
                src="https://www.youtube.com/embed/Q8oS_B6IaKE?start=18"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </v-col>
            <v-col :cols="$store.getters.isMobile ? 12 : 6" class="pa-0">
              <iframe
                :width="getWidth()"
                :height="getHeight()"
                src="https://www.youtube.com/embed/NY8IS0ssnXQ?start=8"
                frameborder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              >
              </iframe>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

export default {
  name: "SubmitContainer",
  
  methods: {
    getWidth() {
      if(this.$store.getters.isMobile) {
        return Math.ceil(this.$store.getters.windowSize.width * 0.8 - 72);
      }
      return Math.ceil(this.$store.getters.windowSize.width * 0.4 - 48);
    },
    getHeight() {
      return Math.ceil(this.getWidth() * (9 / 16));
    },
    getStyle() {
      return {
        width: this.$store.getters.windowSize.width * 0.8 - 24 + "px"
      }
    }
  }
};
</script>
<style scoped lang="scss">
.main-content {
  position: absolute;
  left: calc(10% + 12px);
  height: 800px;
  margin: auto;
  padding: 12px;
  background-color: white;
  border-radius: 20px;
  -webkit-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  -moz-box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.5);
  padding: 0 24px;
}
.no-padding {
  padding: 0;
  padding-left: 12px;
}
.spacer {
  height: 12px;
}
</style>
