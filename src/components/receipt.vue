<!-- eslint-disable -->

<template>
  <h1>Reciept</h1>
  <div>
    <table class="custom-data-table elevation-1 equal-width-table">
      <thead>
        <tr>
          <th>Item</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(item, i) in foodItems" :key="i">
          <!-- <h3>{{ i }}</h3> -->
          <td>
            <input type="text" v-model="item.name" placeholder="Name" />
          </td>
          <td>
            <input
              type="number"
              v-model.number="item['price']"
              placeholder="Price"
            />
          </td>
        </tr>
        <tr>
          <td>
            <input v-model="newItem.name" type="text" placeholder="New Name" />
          </td>
          <td>
            <input
              v-model.number="newItem.price"
              type="number"
              placeholder="New Price"
              @blur="handleNewItem"
            />
          </td>
        </tr>
      </tbody>
    </table>
    <v-spacer></v-spacer>
    <br />
    <br />

    <router-link to="/register">Register</router-link>
    <v-btn @click="test" color="primary">Test</v-btn>
    <v-btn @click="addRow" color="primary">Add Row</v-btn>
  </div>
</template>

<script>
export default {
  data() {
    return {
      itemsPerPage: 5,
      foodItems: [
        {
          name: "Frozen Yogurt",
          price: 8,
        },
        {
          name: "Apples",
          price: 4,
        },
        {
          name: "Cuties",
          price: 9,
        },
        {
          name: "Ice Cream",
          price: 12,
        },
      ],
      newItem: {},
    };
  },
  methods: {
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
