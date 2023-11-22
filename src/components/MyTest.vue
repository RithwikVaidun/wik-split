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

    <!-- Apply styling to center and round the edges -->
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="headers"
      :items="foodItems"
      item-value="name"
      class="elevation-1"
      style="{
          max-width: tableMaxWidth;
          margin: '0 auto';
          'border-radius': '10px';
          overflow: 'hidden';
      }"
    >
      <template v-slot:header="{ items }">
        <tr>
          <th v-for="header in items" :key="header.value">
            {{ header.text }}
            <v-btn icon small @click="removeColumn(header.value)">
              <v-icon color="red">mdi-delete</v-icon>
            </v-btn>
          </th>
        </tr>
      </template>
      <template v-slot:item="{ item }">
        <v-text-field v-model="item.name" color="red"></v-text-field>
      </template>
    </v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: [
        {
          text: "Name",
          align: "start",
          sortable: false,
          value: "name",
        },
      ],
      foodItems: [
        {
          name: "",
          price: 0,
        },
        // Other food items...
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
    addColumnName() {
      const columnName = this.newColumnName.trim();
      if (
        columnName !== "" &&
        !this.headers.some((header) => header.value === columnName)
      ) {
        // Add the new column header
        this.headers.push({
          text: columnName,
          align: "end",
          value: columnName,
        });

        // Fill the new column with "0" in foodItems data
        this.foodItems.forEach((food) => {
          food[columnName] = 0;
        });

        // Clear the input field
        this.newColumnName = "";
      }
    },
    removeColumn(columnName) {
      // Find the index of the column to remove in the headers
      const columnIndex = this.headers.findIndex(
        (header) => header.value === columnName
      );
      if (columnIndex >= 0) {
        // Remove the column from the headers array
        this.headers.splice(columnIndex, 1);
        // Remove the column from the foodItems data
        this.foodItems.forEach((food) => {
          delete food[columnName];
        });
      }
    },
  },
};
</script>
