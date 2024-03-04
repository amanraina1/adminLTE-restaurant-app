import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";
import "@fortawesome/fontawesome-free/css/all.css";
import { createApp } from "vue";
import router from "./routes";
import store from "./store.js";
import App from "./App.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "admin-lte/dist/css/adminlte.min.css";
import "admin-lte/dist/js/adminlte.min.js";

const app = createApp(App);
app.component("font-aweosme-icon", FontAwesomeIcon);
app.use(VueSweetalert2);
app.use(router);
app.use(store);
app.mount("#app");
