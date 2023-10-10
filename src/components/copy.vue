<template>
  <div>
    <v-text-field
      v-model="newColumnName"
      label="Enter Column Name"
    ></v-text-field>
    <v-btn @click="addColumnName" color="primary">Add Name</v-btn>

    <!-- Apply styling to center and round the edges -->
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="desserts"
      item-value="name"
      :style="{ 'max-width': tableMaxWidth, margin: '0 auto', 'border-radius': '10px', overflow: 'hidden' }"
    ></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        // Your existing headers...
      ],
      desserts: [
        // Your existing dessert data...
      ],
      newColumnName: "", // Added for the new column name
    };
  },
  computed: {
    // Calculate the maximum width based on the number of columns
    tableMaxWidth() {
      const numColumns = this.headers.length;
      const minWidthPerColumn = 150; // Adjust this as needed
      const maxWidth = numColumns * minWidthPerColumn + 'px';
      return maxWidth;
    },
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
