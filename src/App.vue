<template>
  <v-app>
    <v-main>
      <MainBanner />
      <nav>
        <v-btn to="/">Home</v-btn>
        <v-btn to="/signin">Sign In</v-btn>
        <v-btn to="/register">Register</v-btn>
        <v-btn to="/splitTable">Split Wise</v-btn>
      </nav>
      <router-view></router-view>
    </v-main>
  </v-app>
</template>

<script>
import MainBanner from "./components/MainBanner.vue";
import { auth } from "./firebase";

export default {
  data() {
    return {
      user: null,
      isAdmin: false,
    };
  },
  name: "App",
  created() {
    auth.onAuthStateChanged((user) => {
      console.log("App.vue on authStateChanged triggered");
      console.log(user);
      this.user = user;
    });
  },
  methods: {
    async signOut() {
      try {
        await auth.signOut();
        this.$router.push("/login");
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },

  components: {
    MainBanner,
  },
};
</script>
