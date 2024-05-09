<template>
  <h1>Register</h1>

  <form @submit.prevent="register">
    <!-- Your form fields for email and password -->
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field v-model="password" label="Password" type="password" required></v-text-field>

    <p v-if="errorMessage" style="color: red;">{{ errorMessage }}</p>

    <v-btn @click="register">Create Account</v-btn>
    <v-btn @click="signInWithGoogle">Sign in with Google</v-btn>
    <v-btn @click="test">Test</v-btn>

  </form>
</template>

<script>
/* eslint-disable */
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";
import axios from "axios";

export default {
  data() {
    return {
      itemsPerPage: 5,
      newItem: {},
      email: "",
      password: "",
      name: "",
      errorMessage: "",
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        if (!this.name || !this.email) {
          this.errorMessage = "Name and email are required";
          return;
        }
        const result = await signInWithPopup(auth, provider);
        console.log("User signed in uid:", result.user.uid);
        // console.log("User signed in:", result.user);
        console.log(process.env.VUE_APP_LOCALHOST);

        await axios.post(`${process.env.VUE_APP_LOCALHOST}/add_user`, {
          user_id: result.user.uid,
          name: this.name,
          email: this.email,
          // Other user data you want to send
        });
        //redirect to home page
        this.$router.push("/");
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    },
    async test() {
      await axios.post(`${process.env.VUE_APP_LOCALHOST}/add_user`, {
        user_id: 11231,
        name: "A Name",
        email: "email",
        // Other user data you want to send
      });
    },
    async register() {
      try {

        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        console.log("user Credential.user.uid", userCredential.user.uid);
        await axios.post(`${process.env.VUE_APP_LOCALHOST}/add_user`, {
          user_id: userCredential.user.uid,
          email: this.email,
          name: this.name,
          // Other user data you want to send
        });
        //redirect to home page
        this.$router.push("/");
        // User account successfully created!
        console.log("User registered:", userCredential.user);
        // You may want to redirect the user to another page after successful registration
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
  },
};
</script>
