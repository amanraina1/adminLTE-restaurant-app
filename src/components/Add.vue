<template>
  <!-- AdminLTE Theme start -->
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Add Restaurant</h3>
      </div>

      <form>
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Enter Restaurant name</label>
            <input
              type="text"
              v-model="restaurant.name"
              class="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Restaurant name"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Restaurant address</label>
            <input
              type="text"
              class="form-control"
              v-model="restaurant.address"
              id="exampleInputPassword1"
              placeholder="Enter Restaurant address"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Contact Number</label>
            <input
              type="number"
              class="form-control"
              v-model="restaurant.contact"
              id="exampleInputPassword1"
              placeholder="Enter Contact Number"
            />
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Image Link</label>
            <input
              type="text"
              class="form-control"
              v-model="restaurant.cloudinaryImageId"
              id="exampleInputPassword1"
              placeholder="Enter Image Link"
            />
          </div>
        </div>

        <div class="card-footer">
          <button
            v-on:click="addRestaurantNew"
            type="submit"
            class="btn btn-primary"
          >
            Add Restaurant
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import Header from "./Header.vue";
import { mapActions } from "vuex";
export default {
  name: "Add",
  data() {
    return {
      username: "",
      fullPaths: "",
      restaurant: {
        name: "",
        address: "",
        contact: "",
        cloudinaryImageId: "",
        avgRating: "",
      },
    };
  },
  components: {
    Header,
  },
  methods: {
    ...mapActions(["addRestaurants"]),
    async addRestaurantNew() {
      if (this.restaurant.avgRating === "") {
        this.restaurant.avgRating = "4";
      }
      if (this.restaurant.cloudinaryImageId === "") {
        this.restaurant.cloudinaryImageId =
          "/src/assets/placeholder-restaurant.png";
      }
      this.addRestaurants({
        restaurantName: this.restaurant.name,
        contact: this.restaurant.contact,
        address: this.restaurant.address,
        cloudinaryImageId: this.restaurant.cloudinaryImageId,
        avgRating: this.restaurant.avgRating,
        reviews: [],
      });
      this.$swal({
        icon: "success",
        title: "Restaurant Added !",
      });
      this.$router.push({ name: "Home" });
    },
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    const { fullPath } = this.$route;
    const fullPaths2 = fullPath.split("/").filter((x) => x);
    this.fullPaths = fullPaths2;
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
  },
};
</script>
