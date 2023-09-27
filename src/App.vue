<template>
  <v-app>
    <v-main>
      <WikSplit />
      <MyTest />
    </v-main>
  </v-app>
</template>

<script>
import WikSplit from "./components/WikSplit.vue";
import MyTest from "./components/MyTest.vue";

export default {
  name: "App",

  components: {
    WikSplit,
    MyTest,
  },

  data: () => ({
    //
  }),
};
</script>
