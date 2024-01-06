<template>
  <v-app>
    <v-main>
      <MainBanner />
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MainBanner from "./components/MainBanner.vue";

export default {
  name: "App",

  components: {
    MainBanner,
  },
};
</script>
