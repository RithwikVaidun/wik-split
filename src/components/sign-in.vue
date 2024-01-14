<template>
  <h1>Sign In</h1>

  <form @submit.prevent="register">
    <!-- Your form fields for email and password -->
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>
    <p v-if="errMsg">{{ errMsg }}</p>

    <v-btn @click="signIn">Sign In</v-btn>
    <v-btn @click="signInWithGoogle">Sign in with Google</v-btn>
    <v-btn to="/register">Create An Account</v-btn>
  </form>
</template>

<script>
/* eslint-disable */
import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";

import { auth } from "../firebase";

export default {
  data() {
    return {
      itemsPerPage: 5,
      newItem: {},
      email: "",
      password: "",
      errMsg: "",
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        // Successful sign-in
        console.log("User signed in:", result.user);
        this.$router.push("/");
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    },
    async test() {
      console.log(this.email, this.name);
    },
    async signIn() {
      try {
        const userCredential = await signInWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        this.$router.push("/");
        // User account successfully created!
        console.log("User registered:", userCredential.user);
        // You may want to redirect the user to another page after successful registration
      } catch (error) {
        switch (error.code) {
          case "auth/invalid-email":
            this.errMsg = "Invalid email address format.";
            break;
          case "auth/weak-password":
            this.errMsg = "Password should be at least 6 characters.";
            break;
          case "auth/email-already-in-use":
            this.errMsg = "Email already in use.";
            break;
          case "auth/wrong-password":
            this.errMsg = "Wrong password.";
            break;
          case "auth/user-not-found":
            this.errMsg = "User not found.";
            break;
          default:
            this.errMsg = "Something went wrong.";
            break;
        }
      }
    },
  },
};
</script>
