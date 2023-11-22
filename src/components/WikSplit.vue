<!-- eslint-disable -->

<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="5">
        <v-text-field v-model="newColumnName" label="Enter Name"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="addColumnName" color="primary">Add Name</v-btn>
      </v-col>
    </v-row>

    <v-row class="justify-center">
      <v-col v-for="(header, index) in headers" :key="index" cols="1">
        <v-btn @click="removeColumn(header.key)" color="error" small>{{
          header.text
        }}</v-btn>
      </v-col>
    </v-row>

    <!-- Apply styling to center and round the edges -->
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="foodItmes"
      item-value="name"
      class="custom-data-table elevation-1"
    >
    </v-data-table>
    <v-btn @click="removeColumn('Rithwik')" color="primary">MyTest</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          title: "-----",
          align: "start",
          sortable: false,
          key: "name",
        },
        { title: "Rathik", align: "end", key: "Rathik" },
        { title: "Rithwik", align: "end", key: "Rithwik" },
        { title: "Koosh", align: "end", key: "Koosh" },
      ],
      foodItmes: [
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
  computed: {
    tableMaxWidth() {
      const numColumns = this.headers.length;
      const minWidthPerColumn = 150;
      const maxWidth = numColumns * minWidthPerColumn + "px";
      return maxWidth;
    },
  },
  methods: {
    test() {
      console.log(this.headers);
    },
    removeColumn(columnName) {
      // Remove the column header
      this.headers = this.headers.filter((header) => header.key !== columnName);

      // Remove the column data
      this.foodItmes.forEach((dessert) => {
        delete dessert[columnName];
      });
    },
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

        // Fill the new column with "test" in foodItmes data
        this.foodItmes.forEach((dessert) => {
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
.custom-data-table {
  width: 80%; /* Set the desired width */
  margin: 20px auto; /* Center the table */
  border: 1px solid #ccc; /* Add border */
  border-radius: 8px; /* Round the edges */
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); /* Add a subtle shadow */
}

/* Override the default elevation styles */
.custom-data-table.elevation-1 {
  box-shadow: none;
}
</style>
