<template>
  <v-app>
    <v-main>
      <MainBanner />
      <!-- <WikSplit /> -->
      <MyTest />
    </v-main>
  </v-app>
</template>

<script>
// import WikSplit from "./components/WikSplit.vue";
import MyTest from "./components/MyTest.vue";
import MainBanner from "./components/MainBanner.vue";

export default {
  name: "App",

  components: {
    MainBanner,
    // WikSplit,
    MyTest,
  },

  data: () => ({
    //
  }),
};
</script>
