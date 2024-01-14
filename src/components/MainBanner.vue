<template>
  <v-app-bar app dark color="blue">
    <v-avatar size="64">
      <!-- <img :src="require('@/assets/logo.png')" alt="Logo" /> -->
    </v-avatar>

    <v-toolbar-title class="text-center text-white font-cursive">
      <span class="title">WikSplit</span>
    </v-toolbar-title>
    <v-btn v-if="loggedIn">{{ user.email }}</v-btn>
    <v-btn v-if="loggedIn" @click="signOut">Sign Out</v-btn>
    <v-btn v-else to="/signin">Sign In</v-btn>
  </v-app-bar>
</template>

<script>
import { auth } from "../firebase";

export default {
  data() {
    return {
      user: null,
      loggedIn: false,
    };
  },
  created() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        console.log(user.email);
        this.user = user;
        this.loggedIn = true;
      } else {
        console.log("no user");
      }
    });
  },
  methods: {
    async signOut() {
      try {
        await auth.signOut();
        this.loggedIn = false;
        this.$router.push("/signin");
        // location.href = window.location.href;
      } catch (error) {
        console.error("Error signing out:", error);
      }
    },
  },
};
</script>
