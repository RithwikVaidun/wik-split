<template>
  <div>
    <v-text-field
      v-model="newColumnName"
      label="Enter Column Name"
    ></v-text-field>
    <v-btn @click="addColumnName" color="primary">Add Name</v-btn>

    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="desserts"
      item-value="name"
      class="elevation-1"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: "Dessert (100g serving)",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Calories", align: "end", key: "calories" },
        { title: "Fat (g)", align: "end", key: "fat" },
        { title: "Carbs (g)", align: "end", key: "carbs" },
        { title: "Protein (g)", align: "end", key: "protein" },
        { title: "Iron (%)", align: "end", key: "iron" },
      ],
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1",
        },
        // Other dessert data...
      ],
      newColumnName: "", // Added for the new column name
    };
  },
  methods: {
    addColumnName() {
      const columnName = this.newColumnName.trim();
      if (
        columnName !== "" &&
        !this.headers.some((header) => header.key === columnName)
      ) {
        // Add the new column header
        this.headers.push({
          title: columnName,
          align: "end",
          key: columnName,
        });

        // Fill the new column with "test" in desserts data
        this.desserts.forEach((dessert) => {
          dessert[columnName] = "test";
        });

        // Clear the input field
        this.newColumnName = "";
      }
    },
  },
};
</script>

<style scoped>
/* Add your CSS styles here if needed */
</style>
