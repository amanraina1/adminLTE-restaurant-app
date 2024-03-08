<template>
  <!-- AdminLTE Theme start -->
  <div class="container-sm d-flex justify-content-center align-items-center">
    <div class="card w-50 mt-5 card-primary">
      <div class="card-header">
        <h3 class="card-title">Add Restaurant</h3>
      </div>

      <Form :validation-schema="schema" v-slot="{ errors }">
        <div class="card-body">
          <div class="form-group">
            <label for="exampleInputEmail1">Enter Restaurant name</label>
            <Field
              type="text"
              name="name"
              v-model="restaurant.name"
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
              name="address"
              v-model="restaurant.address"
              class="form-control"
              :class="{ 'p-invalid': errors.address }"
              id="exampleInputPassword1"
              placeholder="Enter Restaurant address"
            />
            <span class="p-error text-danger"> {{ errors.address }} </span>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Enter Contact Number</label>
            <Field
              type="text"
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
            <label for="exampleInputPassword1">Image Link</label>
            <Field
              type="text"
              class="form-control"
              name="imageLink"
              v-model="restaurant.cloudinaryImageId"
              id="exampleInputPassword1"
              placeholder="Image Link (Optional)"
            />
          </div>
        </div>

        <div class="card-footer">
          <button
            @click="addRestaurantNew"
            type="submit"
            class="btn btn-primary"
          >
            Add Restaurant
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
  name: "Add",
  data() {
    const schema = yup.object({
      name: yup.string().required(),
      address: yup.string().required(),
      contact: yup.string().required(),
    });
    return {
      schema,
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
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    ...mapActions(["addRestaurants"]),
    async addRestaurantNew() {
      if (
        !this.restaurant.name ||
        !this.restaurant.address ||
        !this.restaurant.contact
      ) {
        return;
      }
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
