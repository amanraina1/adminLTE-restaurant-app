<template>
  {{ this.fillDetails }}

  <!-- AdminLTE Theme Start -->
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Update Restaurant</h3>
      </div>

      <Form :validation-schema="schema" v-slot="{ errors }">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Enter Restaurant name</label>
            <Field
              type="text"
              v-model="restaurant.name"
              name="name"
              class="form-control"
              :class="{ 'p-invalid': errors.name }"
              id="exampleInputEmail1"
              placeholder="Enter Restaurant name"
            />
            <span class="p-error text-danger"> {{ errors.name }} </span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Restaurant address</label>
            <Field
              type="text"
              class="form-control"
              :class="{ 'p-invalid': errors.address }"
              name="address"
              v-model="restaurant.address"
              id="exampleInputPassword1"
              placeholder="Enter Restaurant address"
            />
            <span class="p-error text-danger"> {{ errors.address }} </span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Contact Number</label>
            <Field
              type="number"
              class="form-control"
              :class="{ 'p-invalid': errors.contact }"
              name="contact"
              v-model="restaurant.contact"
              id="exampleInputPassword1"
              placeholder="Enter Contact Number"
            />
            <span class="p-error text-danger"> {{ errors.contact }} </span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Average Ratings</label>
            <Field
              type="number"
              name="avgRating"
              class="form-control"
              :class="{ 'p-invalid': errors.avgRating }"
              v-model="restaurant.avgRating"
              id="exampleInputPassword1"
              placeholder="Enter Average Ratings"
            />
            <span class="p-error text-danger"> {{ errors.avgRating }} </span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Image Link</label>
            <Field
              type="text"
              name="imageLink"
              class="form-control"
              :class="{ 'p-invalid': errors.imageLink }"
              v-model="restaurant.cloudinaryImageId"
              id="exampleInputPassword1"
              placeholder="Enter Image Link"
            />
            <span class="p-error text-danger"> {{ errors.imageLink }} </span>
          </div>
        </div>

        <div class="card-footer">
          <button
            type="submit"
            class="btn btn-primary"
            v-on:click="updateRestaurant"
          >
            Update Restaurant
          </button>
        </div>
      </Form>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "Update",
  data() {
    const schema = yup.object({
      name: yup.string().required(),
      address: yup.string().required(),
      contact: yup.number().required(),
      avgRating: yup.number().required(),
      imageLink: yup.string().required(),
    });
    return {
      schema,
      id: this.$route.params.id,
      fullPaths: "",
      username: "",
      reviews: "",
      restaurant: {
        name: "",
        address: "",
        contact: null,
        cloudinaryImageId: "",
        avgRating: null,
      },
    };
  },
  methods: {
    ...mapActions(["updatedRestaurant", "fetchRestaurants"]),
    async updateRestaurant() {
      if (
        this.restaurant.name === this.getRestaurantById?.name &&
        this.restaurant.address === this.getRestaurantById?.address &&
        this.restaurant.contact === this.getRestaurantById?.contact &&
        this.restaurant.cloudinaryImageId ===
          this.getRestaurantById?.cloudinaryImageId &&
        this.restaurant.avgRating === this.getRestaurantById?.avgRating
      ) {
        this.$swal({
          icon: "error",
          title: "No details have been changed !",
        });
        this.$router.push({ name: "Home" });
        return;
      }
      if (
        !this.restaurant.name ||
        !this.restaurant.address ||
        !this.restaurant.contact ||
        !this.restaurant.cloudinaryImageId ||
        !this.restaurant.avgRating
      ) {
        return;
      }
      if (this.restaurant.avgRating === null) {
        this.restaurant.avgRating = 4;
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
      this.$swal({
        icon: "success",
        title: "Details Updated !",
      });
      this.$router.push({ name: "Home" });
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
    Form,
    Field,
    ErrorMessage,
  },

  async mounted() {
    let user = localStorage.getItem("user-info");
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
