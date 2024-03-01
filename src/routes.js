import Home from "./components/Home.vue";
import Signup from "./components/Signup.vue";
import Login from "./components/Login.vue";
import Update from "./components/Update.vue";
import Add from "./components/Add.vue";
import Review from "./components/Review.vue";

import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    name: "Home",
    component: Home,
    path: "/",
  },
  {
    name: "Signup",
    component: Signup,
    path: "/signup",
  },
  {
    name: "Login",
    component: Login,
    path: "/login",
  },
  // {
  //   name: "Update",
  //   component: Update,
  //   path: "/update/:id",
  // },
  // {
  //   name: "Add",
  //   component: Add,
  //   path: "/add",
  // },
  // {
  //   name: "Review",
  //   component: Review,
  //   path: "/review/:id",
  // },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router;
