<template>
  <v-card>
    <v-row no-gutters>
      <v-col cols="12">
        <v-row no-gutters class="px-4 pt-4">
          <p class="headline">What's the point of this website?</p>
        </v-row>
        <v-row no-gutters class="px-4">
          <p class="body-1">This website presents you with a song which has been sampled. Your objective is to guess which song sampled it. </p>
        </v-row>
        <v-row no-gutters class="px-4">
          <p class="title">What is a sample?</p>
        </v-row>
        <v-row no-gutters class="px-4">
          <p class="body-1">Sampling in music referes to the act of taking sounds from songs or other media and incorporating it in to the production of a new song.
            In the example shown below, Mac Demarco sampled the melody from the Shigeo Sekito song.
          </p>
        </v-row>
        <v-row no-gutters class="px-4">
          <iframe
            width="468"
            height="263"
            src="https://www.youtube.com/embed/Q8oS_B6IaKE?start=18"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </v-row>
        <v-row no-gutters class="px-4 py-4">
          <iframe
            width="468"
            height="263"
            src="https://www.youtube.com/embed/NY8IS0ssnXQ?start=8"
            frameborder="0"
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          >
          </iframe>
        </v-row>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>

export default {
  name: "HelpContainer",
};
</script>
<style scoped lang="scss">
</style>
