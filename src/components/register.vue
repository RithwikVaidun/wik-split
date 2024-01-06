<template>
  <h1>Register</h1>

  <form @submit.prevent="register">
    <!-- Your form fields for email and password -->
    <v-text-field v-model="email" label="Email" required></v-text-field>
    <v-text-field v-model="name" label="Name" required></v-text-field>
    <v-text-field
      v-model="password"
      label="Password"
      type="password"
      required
    ></v-text-field>

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
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        // Successful sign-in
        console.log("User signed in:", result.user);
        await axios.post("http://192.168.1.39:8081/add_user", {
          email: this.email,
          name: this.name,
          // Other user data you want to send
        });
        //redirect to home page
        this.$router.push("/");
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    },
    async test() {
      console.log(this.email, this.name);
    },
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        await axios.post("http://192.168.1.39:8081/add_user", {
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
<style scoped>
/* ...existing styles... */

.equal-width-table {
  display: table;
  table-layout: fixed;
  width: 100%;
  --num-columns: var(
    --num-columns
  ); /* Set the number of columns using CSS variable */
  border-collapse: collapse; /* Ensure borders collapse properly */
}

.equal-width-table th,
.equal-width-table td {
  border: 1px solid #ccc; /* Add border to table cells */
  padding: 8px; /* Add padding for better readability */
}

.equal-width-table th {
  width: calc(
    100% / var(--num-columns)
  ); /* Calculate width based on the number of columns */
}

.equal-width-table tr:last-child td {
  border-bottom: none; /* Remove bottom border for last row */
}
</style>
