// Styles
import "@mdi/font/css/materialdesignicons.css";
import "vuetify/styles";
// import "vuetify/lib/styles/main.sass";
import { createVuetify } from "vuetify";
import {
  VDataTable,
  VDataTableServer,
  VDataTableVirtual,
} from "vuetify/labs/VDataTable";
import * as directives from "vuetify/lib/directives";

// export default createVuetify(
//   // https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
// )

export default createVuetify({
  components: {
    VDataTable,
    VDataTableServer,
    VDataTableVirtual,
  },
  directives,
});
