<template>
  <div>
    <p>Original Number: {{ originalNumber }}</p>
    <p>Square of the Number: {{ squaredNumber }}</p>
    <p>Reversed Message: {{ reversedMessage }}</p>

    <button @click="increaseNumber">Increase Number</button>
    <v-text-field
      v-model="newName"
      placeholder="Enter a name"
      @input="updateHeaders"
    />

    <!-- Add v-data-table to display data -->
    <v-data-table :headers="tableHeaders" :items="tableData"></v-data-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      originalNumber: 5,
      message: "Hello, Vue!",
      newName: "", // For inputting new names
      tableHeaders: [
        { text: "Item", value: "name" }, // First column as "Item"
      ],
      tableData: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1",
        },
        // Add more data rows as needed
      ],
    };
  },
  computed: {
    squaredNumber() {
      return this.originalNumber ** 2;
    },
    reversedMessage() {
      return this.message.split("").reverse().join("");
    },
  },
  methods: {
    increaseNumber() {
      this.originalNumber++;
      // Update tableData whenever originalNumber changes
      this.updateTableData();
    },
    updateTableData() {
      // Update the relevant row(s) in tableData with the new originalNumber value
      const updatedData = this.tableData.map((item) => ({
        ...item,
        name: `Updated Name ${this.originalNumber}`,
      }));
      this.tableData = updatedData;
    },
    updateHeaders() {
      // Update tableHeaders with the new name from the input field
      const newColumnName = this.newName.trim();
      if (newColumnName !== "") {
        this.tableHeaders.push({ text: newColumnName, value: newColumnName });
        this.newName = ""; // Clear the input field
      }
    },
  },
};
</script>
