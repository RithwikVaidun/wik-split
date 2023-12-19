<!-- eslint-disable -->

<template>
  <div>
    <v-row class="justify-center">
      <v-col cols="5">
        <v-text-field v-model="newColumnName" label="Enter Name"></v-text-field>
      </v-col>
      <v-col cols="2">
        <v-btn @click="addName" color="primary">Add Name</v-btn>
      </v-col>
    </v-row>

    <!-- <v-row class="justify-center">
      <v-col v-for="(header, index) in headers" :key="index" cols="1">
        <v-btn @click="removeColumn(header.key)" color="error" small>{{
          header.text
        }}</v-btn>
      </v-col>
    </v-row> -->

    <!-- Apply styling to center and round the edges -->
    <table class="custom-data-table elevation-1 equal-width-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
          <th v-for="(person, index) in members" :key="index">
            {{ person.name }}
            <v-btn
              size="x-small"
              icon="mdi-trash-can-outline"
              @click="removeMember(person.name)"
              color="red"
              small
            ></v-btn>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, index) in foodItems" :key="index">
          <td>
            <input type="text" v-model="item.name" placeholder="Name" />
          </td>
          <td>
            <input
              type="number"
              v-model.number="item['price']"
              @input="distributePrice(item)"
              placeholder="Price"
            />
          </td>
          <td v-for="(person, key) in members" :key="key">
            {{ person.payments[index] }}
          </td>
        </tr>
      </tbody>
    </table>

    <v-btn @click="test" color="primary">Test</v-btn>
    <v-btn @click="addRow" color="primary">Add Row</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      members: [
        { name: "Rathik", payments: [] },
        { name: "Rithwik", payments: [] },
        { name: "Koosh", payments: [] },
      ],
      foodItems: [
        {
          name: "Frozen Yogurt",
          price: 8,
          index: 0,
        },
        {
          name: "Apples",
          price: 4,
          index: 1,
        },
        {
          name: "Cuties",
          price: 9,
          index: 2,
        },
        {
          name: "Ice Cream",
          price: 12,
          index: 3,
        },
      ],
      newColumnName: "",
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
    numColumns() {
      return this.headers.length;
    },
  },
  methods: {
    test() {
      console.log(this.foodItems["Frozen Yogurt"]);
      console.log(this.foodItems);
    },
    distributePrice(item) {
      console.log("ITEM", item);
      const pricePerPerson = item.price / this.members.length;
      for (let person in this.members) {
        this.members[person].payments[item.index] = pricePerPerson;
      }
    },

    addRow(foodItem) {
      this.foodItems.push({
        name: foodItem.name,
        price: 159,
        index: 4,
      });
    },

    removeMember(memberName) {
      this.members = this.members.filter(
        (member) => member.name !== memberName
      );
      for (let item in this.foodItems) {
        this.distributePrice(this.foodItems[item]);
      }
    },

    addName() {
      this.members.push({
        name: this.newColumnName,
        payments: [],
      });
      this.newColumnName = "";
      for (let item in this.foodItems) {
        this.distributePrice(this.foodItems[item]);
      }
      //distribute price
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
