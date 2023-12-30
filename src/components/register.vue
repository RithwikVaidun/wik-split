<template>
  <h1>Register</h1>

  <form @submit.prevent="register">
    <!-- Your form fields for email and password -->
    <input type="email" v-model="email" placeholder="Email" required />
    <input type="password" v-model="password" placeholder="Password" required />
    <button @click="register">Create Account</button>
    <button @click="signInWithGoogle">Sign in with Google</button>
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
export default {
  data() {
    return {
      itemsPerPage: 5,
      newItem: {},
      email: "",
      password: "",
    };
  },
  methods: {
    async signInWithGoogle() {
      const provider = new GoogleAuthProvider();

      try {
        const result = await signInWithPopup(auth, provider);
        // Successful sign-in
        console.log("User signed in:", result.user);
        // You can redirect the user or perform other actions here
      } catch (error) {
        console.error("Error signing in with Google:", error);
      }
    },
    async register() {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          this.email,
          this.password
        );
        // User account successfully created!
        console.log("User registered:", userCredential.user);
        // You may want to redirect the user to another page after successful registration
      } catch (error) {
        console.error("Error creating account:", error);
      }
    },
    test() {
      console.log(this.foodItems["Frozen Yogurt"]);
      console.log(this.foodItems);
    },
    handleNewItem() {
      if (this.newItem.name && this.newItem.price !== null) {
        this.foodItems.push({ ...this.newItem });
        this.newItem = {
          name: "",
          price: null,
        };
      }
    },

    addRow(foodItem) {
      this.foodItems.push({
        name: foodItem.name,
        price: 159,
        index: 4,
      });
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
