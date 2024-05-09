<!-- eslint-disable -->

<template>
  <h1>Home</h1>
  <h3>My Groups</h3>

  <div class="name-list-container">
    <v-card v-for="(group, title) in groups" outlined class="name-list" :key="title">
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-list dense>
          <v-list-item v-for="name in group" :key="name">
            <v-list-item-title>{{ name }}</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
    </v-card>
  </div>
  <div>


    <v-dialog v-model="dialog" max-width="600">
      <template v-slot:activator="{ props }">
        <v-btn color="primary" v-bind="props"> Create Group </v-btn>
      </template>
      <v-card>
        <v-card-title> Create Group </v-card-title>

        <v-select v-model="selectedGroup" label="Selec Group Members" :items="filteredUsers(users)" item-title="name"
          item-value="user_id" multiple></v-select>
        <v-text-field v-model="groupName" label="Group Name" required></v-text-field>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="createGroup">Create Group</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-btn @click="quickSplit" color="primary">Quick Split</v-btn>
  </div>
</template>

<script>
import axios from "axios";
import { auth } from "../firebase";

export default {
  data() {
    return {
      groupName: "",
      newItem: {},
      users: [],
      selectedGroup: [],
      groups: {},
      dialog: false,
    };
  },
  created() {
    // Fetch users when the component is created
    this.fetchUsers();
    this.fetchGroups();
  },
  methods: {
    async fetchUsers() {
      try {
        const response = await axios.get(`${process.env.VUE_APP_LOCALHOST}/get_users`);
        // console.log(response.data);
        this.users = response.data; // Assign fetched users to the 'users' data property
        console.log(this.users);
      } catch (error) {
        console.error("Error fetching users:", error);
        // Handle error
      }
    },
    async fetchGroups() {
      const user_id = auth.currentUser.uid;
      const response = await axios.get(`${process.env.VUE_APP_LOCALHOST}/get_groups`, {
        params: {
          user_id: user_id,
        },
      });
      console.log("response of get groups", response.data);
      for (let i = 0; i < response.data.length; i++) {
        const names = await axios.get(`${process.env.VUE_APP_LOCALHOST}/get_group_names`, {
          params: {
            group_id: response.data[i]["group_id"],
          },
        });
        this.groups[response.data[i]["group_name"]] = names.data.map((obj) => obj.name);
      }
      console.log("groups", this.groups);
    },
    filteredUsers(users) {
      return users.filter((user) => user.user_id !== auth.currentUser.uid);
    },
    async quickSplit() {
      console.log("quick split");
      //route to /receipts
      this.$router.push("/receipt");
    },
    test() {
      console.log("called test");

    },
    async createGroup() {
      console.log("create group::", this.selectedGroup, this.groupName);
      let ids = [...this.selectedGroup];
      // Push the current user's ID to the copied array
      ids.push(auth.currentUser.uid);
      await axios.post(`${process.env.VUE_APP_LOCALHOST}/create_group`, {
        groupIDS: ids,
        groupName: this.groupName,
      });
      this.dialog = false;
      this.fetchGroups();
    },
  },
};
</script>

<style scoped>
.name-list-container {
  display: flex;
  justify-content: space-around;
}

.name-list {
  width: 300px;
  margin: 10px;
  border: 4px solid black;
  /* Thicker black border */
}
</style>