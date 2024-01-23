<!-- eslint-disable -->

<template>
  <h1>Home</h1>
  <h3>My Groups</h3>

  <v-card v-for="(group, index) in groups" outlined class="name-list">
    <v-card-title>List of Names</v-card-title>
    <v-card-text>
      <v-list dense>
        <v-list-item v-for="(name, index) in group.names" :key="index">
          <v-list-item-content>
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-card-text>
  </v-card>
  <div>
    <v-card>
      <v-card-title class="text-h5"> Create Group </v-card-title>
      <v-card-text
        >Let Google help apps determine location. This means sending anonymous
        location data to Google, even when no apps are running.</v-card-text
      >
      <v-select
        v-model="selectedGroup"
        label="Select"
        :items="users"
        item-title="name"
        item-value="user_id"
        multiple
      ></v-select>
      <v-text-field
        v-model="groupName"
        label="Group Name"
        required
      ></v-text-field>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="createGroup"
          >Create Group</v-btn
        >
      </v-card-actions>
    </v-card>

    <v-dialog v-model="dialog" width="auto">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Open Dialog </v-btn>
      </template>
    </v-dialog>

    <v-btn @click="test" color="primary">Test</v-btn>
    <v-btn @click="getGroups" color="primary">getGroups</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../firebase";

export default {
  data() {
    return {
      groupName: "test",
      newItem: {},
      users: [],
      selectedGroup: [],
      groups: {},
    };
  },
  created() {
    // Fetch users when the component is created
    // this.fetchUsers();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get("http://192.168.1.39:8081/get_users");
        // console.log(response.data);
        this.users = response.data; // Assign fetched users to the 'users' data property
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      }
    },
    async getGroups() {
      const user_id = auth.currentUser.uid;
      console.log("user_id FRONT END", user_id);
      const response = await axios.get("http://192.168.1.39:8081/get_groups", {
        params: {
          user_id: user_id,
        },
      });
      console.log("response of get groups", response.data);
    },
    async test() {
      console.log("called test");
      try {
        const response = await axios.get("3.145.169.66:8081/get_users");
        // console.log(response.data);
        this.users = response.data; // Assign fetched users to the 'users' data property
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      }
    },
    async createGroup() {
      console.log("create group::", this.selectedGroup, this.groupName);
      await axios.post("http://192.168.1.39:8081/create_group", {
        groupIDS: this.selectedGroup,
        groupName: this.groupName,
      });
      try {
        console.log("ij");
      } catch (error) {
        console.error("Error creating group:", error);
        if (error.response) {
          // The request was made and the server responded with a status code
          // that falls out of the range of 2xx
          console.error("Response data:", error.response.data);
          console.error("Response status:", error.response.status);
          console.error("Response headers:", error.response.headers);
        } else if (error.request) {
          // The request was made but no response was received
          console.error(
            "No response received. Request details:",
            error.request
          );
        } else {
          // Something happened in setting up the request that triggered an Error
          console.error("Error setting up the request:", error.message);
        }
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
