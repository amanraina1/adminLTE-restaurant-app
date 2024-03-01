<template>
  <!-- <Header /> -->
  <!-- <br /> -->
  {{ this.fillDetails }}
  <!-- <div class="breadcrumbs-path">
    <router-link to="/">Home </router-link>
    <div v-for="(path, index) in fullPaths">
      <span v-if="index === fullPaths.length - 1"> / {{ path }}</span>
      <span v-else
        >/<router-link to="path">{{ path }} </router-link></span
      >
    </div>
  </div> -->
  <!-- <br /><br /> -->
  <!-- <h1>Hello {{ username }}, Update a restaurant</h1> -->
  <!-- <br /><br /> -->
  <form
    class="add d-flex flex-column justify-content-center align-items-center"
    style="gap: 50px"
  >
    <input
      style="width: 300px; height: 40px"
      class="px-3"
      type="text"
      placeholder="Enter Name"
      v-model="restaurant.name"
      name="name"
    />
    <input
      style="width: 300px; height: 40px"
      class="px-3"
      type="text"
      placeholder="Enter Address"
      v-model="restaurant.address"
      name="address"
    />
    <input
      style="width: 300px; height: 40px"
      class="px-3"
      type="text"
      placeholder="Enter Contact"
      v-model="restaurant.contact"
      name="contact"
    />
    <input
      style="width: 300px; height: 40px"
      class="px-3"
      type="text"
      placeholder="Enter Ratings"
      v-model="restaurant.avgRating"
      name="avgRating"
    />
    <input
      style="width: 300px; height: 40px"
      class="px-3"
      type="text"
      placeholder="Restaurant Image Link"
      v-model="restaurant.cloudinaryImageId"
      name="cloudinaryImageId"
    />
    <button
      style="width: 320px; height: 40px"
      class="px-3"
      type="button"
      v-on:click="updateRestaurant"
    >
      Update Restaurant
    </button>
  </form>
</template>
<script>
import Header from "./Header.vue";
import { mapActions } from "vuex";
export default {
  name: "Update",
  data() {
    return {
      id: this.$route.params.id,
      fullPaths: "",
      username: "",
      reviews: "",
      restaurant: {
        name: "",
        address: "",
        contact: "",
        cloudinaryImageId: "",
        avgRating: "",
      },
    };
  },
  methods: {
    ...mapActions(["updatedRestaurant", "fetchRestaurants"]),
    async updateRestaurant() {
      if (this.restaurant.avgRating === "") {
        this.restaurant.avgRating = "4";
      }
      if (this.restaurant.cloudinaryImageId === "") {
        this.restaurant.cloudinaryImageId =
          "/src/assets/placeholder-restaurant.png";
      }
      this.updatedRestaurant({
        id: this.id,
        name: this.restaurant.name,
        contact: this.restaurant.contact,
        address: this.restaurant.address,
        cloudinaryImageId: this.restaurant.cloudinaryImageId,
        avgRating: this.restaurant.avgRating,
        reviews: this.reviews,
      });
      // if (result.status === 200) {
      //   this.$router.push({ name: "Home" });
      // }
    },
  },
  computed: {
    fillDetails() {
      this.restaurant.name = this.getRestaurantById?.name;
      this.restaurant.address = this.getRestaurantById?.address;
      this.restaurant.contact = this.getRestaurantById?.contact;
      this.restaurant.cloudinaryImageId =
        this.getRestaurantById?.cloudinaryImageId;
      this.restaurant.avgRating = this.getRestaurantById?.avgRating;
      this.reviews = this.getRestaurantById?.reviews;
    },
    getRestaurantById() {
      return this.$store.getters.getRestaurant(this.id);
    },
  },
  components: {
    Header,
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
    const { fullPath } = this.$route;
    this.fullPaths = fullPath.split("/").filter((x) => x);
    if (!user) {
      this.$router.push({ name: "SignUp" });
      return;
    }
    let admin = JSON.parse(user).isAdmin;
    if (user && !admin) {
      this.$router.push({ name: "Home" });
      return;
    }
    this.username = JSON.parse(user).name;
    this.$store.dispatch("fetchRestaurants");
    this.fetchRestaurants();
  },
};
</script>
<style>
.breadcrumbs-path {
  width: 80%;
  display: flex;
  justify-content: start;
  font-size: 20px;
  text-transform: capitalize;
  background-color: rgb(235, 235, 235);
  padding: 10px;
  border-bottom: 1px solid black;
}
.breadcrumbs-path a {
  text-decoration: none;
  color: #333;
  background-color: rgb(235, 235, 235);
}
.breadcrumbs-path span {
  color: #999;
  background-color: rgb(235, 235, 235);
}
</style>
