<template>
  <h1>hi</h1>
  <!-- <div>
    <input
      v-model="newName"
      placeholder="Enter a name"
      @keyup.enter="addName"
    />
    <button @click="addName">Add Name</button>
  </div>
  <v-container>
    <v-data-table
      v-model:items-per-page="itemsPerPage"
      :headers="updatedHeaders"
      :items="desserts"
      item-value="name"
      class="elevation-1"
    ></v-data-table>
  </v-container> -->
</template>

<script>
// const headers = [
//   {
//     title: "Item",
//     align: "start",
//     sortable: false,
//     key: "name",
//   },
//   { title: "Calories", align: "end", key: "calories" },
//   { title: "Fat (g)", align: "end", key: "fat" },
//   { title: "Carbs (g)", align: "end", key: "carbs" },
//   { title: "Protein (g)", align: "end", key: "protein" },
//   { title: "Iron (%)", align: "end", key: "iron" },
// ];

export default {
  data() {
    return {
      itemsPerPage: 5,
      headers: this.updatedHeaders,
      desserts: [
        {
          name: "Frozen Yogurt",
          calories: 159,
          fat: 6.0,
          carbs: 24,
          protein: 4.0,
          iron: "1",
        },
        {
          name: "Jelly bean",
          calories: 375,
          fat: 0.0,
          carbs: 94,
          protein: 0.0,
          iron: "0",
        },
        {
          name: "KitKat",
          calories: 518,
          fat: 26.0,
          carbs: 65,
          protein: 7,
          iron: "6",
        },
        {
          name: "Eclair",
          calories: 262,
          fat: 16.0,
          carbs: 23,
          protein: 6.0,
          iron: "7",
        },
        {
          name: "Gingerbread",
          calories: 356,
          fat: 16.0,
          carbs: 49,
          protein: 3.9,
          iron: "16",
        },
        {
          name: "Ice cream sandwich",
          calories: 237,
          fat: 9.0,
          carbs: 37,
          protein: 4.3,
          iron: "1",
        },
        {
          name: "Lollipop",
          calories: 392,
          fat: 0.2,
          carbs: 98,
          protein: 0,
          iron: "2",
        },
        {
          name: "Cupcake",
          calories: 305,
          fat: 3.7,
          carbs: 67,
          protein: 4.3,
          iron: "8",
        },
        {
          name: "Honeycomb",
          calories: 408,
          fat: 3.2,
          carbs: 87,
          protein: 6.5,
          iron: "45",
        },
        {
          name: "Donut",
          calories: 452,
          fat: 25.0,
          carbs: 51,
          protein: 4.9,
          iron: "22",
        },
      ],
      newName: "", // Input field for entering names
      namesArray: [], // Array to store names
    };
  },
  methods: {
    addName() {
      if (this.newName.trim() !== "") {
        this.namesArray.push(this.newName); // Add the name to the array
        this.newName = ""; // Clear the input field
      }
    },
    computed: {
      updatedHeaders() {
        // return headers.map((header, index) => {
        //   if (index === 0) {
        //     // Keep the first object as is
        //     return header;
        //   } else {
        //     // Update the title property with values from namesArray
        //     return { ...header, title: this.namesArray[index - 1] };
        //   }
        // });
        return [
          {
            title: "Item",
            align: "start",
            sortable: false,
            key: "name",
          },
          { title: "Rithwik", align: "end", key: "calories" },
          { title: "Rahul", align: "end", key: "fat" },
          { title: "Rathik", align: "end", key: "carbs" },
          { title: "Koosh", align: "end", key: "protein" },
          { title: "Suneet", align: "end", key: "iron" },
        ];
      },
    },
  },
};
</script>
