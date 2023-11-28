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
      <template v-slot:[`item.price`]="{ item }">
        <v-text-field
          v-model="prices[item.name]"
          @input="distributePrice(item)"
          clearable
          hide-details="auto"
          label="price"
        >
        </v-text-field>
      </template>
    </v-data-table>
    <v-btn @click="test" color="primary">MyTest</v-btn>

    <!-- button to add a new row -->
    <v-btn @click="addRow" color="primary">Add Row</v-btn>
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
        { title: "Price", align: "end", key: "price" },
        { title: "Rathik", align: "end", key: "Rathik" },
        { title: "Rithwik", align: "end", key: "Rithwik" },
        { title: "Koosh", align: "end", key: "Koosh" },
      ],
      foodItmes: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
        },
        {
          name: "Pineapple",
          calories: 159,
          fat: 6.0,
        },
        {
          name: "Chicken",
          calories: 159,
          fat: 6.0,
        },
        {
          name: "Cuties",
          calories: 159,
          fat: 6.0,
        },
        // Other dessert data...
      ],
      newColumnName: "",
      prices: {},
      newFoodItem: {},
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
    distributePrice(item) {
      console.log(item);
      const enteredPrice = this.prices[item.name];

      // Calculate the num of people (all columns except name and price)
      const columnsToDistribute = this.headers.filter(
        (header) => header.key !== "name" && header.key !== "price"
      );

      const numColumns = columnsToDistribute.length;
      const distributedValue = enteredPrice / numColumns;

      // Distribute the value among remaining columns
      columnsToDistribute.forEach((column) => {
        const roundedValue = Number(distributedValue.toFixed(2)); // Round to 2 decimal places
        this.foodItmes.find((foodItem) => foodItem.name === item.name)[
          column.key
        ] = roundedValue;
      });
    },
    addRow(foodItem) {
      this.foodItmes.push({
        name: foodItem.name,
        calories: 159,
        fat: 6.0,
      });
    },
    test() {
      console.log(this.prices["Frozen Yogurt"]);
    },
    removeColumn(columnName) {
      // Remove the column header
      this.headers = this.headers.filter((header) => header.key !== columnName);

      // Remove the column data
      this.foodItmes.forEach((dessert) => {
        delete dessert[columnName];
      });
      this.distributePrice();
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
          dessert[columnName] = 0;
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
