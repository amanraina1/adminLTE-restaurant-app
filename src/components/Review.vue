<template>
  {{ this.fillDetails }}
  <!-- <Header /> -->
  <!-- <br /> -->

  <!-- <div class="breadcrumbs-path">
    <router-link to="/">Home </router-link>
    <div v-for="(path, index) in fullPaths">
      <span v-if="index === fullPaths.length - 1"> / {{ path }}</span>
      <span v-else
        >/<router-link to="path">{{ path }} </router-link></span
      >
    </div>
  </div>
  <br /><br /> -->
  <div class="container-sm">
    <ul>
      <li v-for="item in reviews" :key="item.name">
        <div class="info">
          <span class="profile">
            <img src="../assets/avatar.svg" alt="user avatar" />
            <b>{{ item.name }} </b>
          </span>
          <span>{{ item.rating }}⭐️</span>
        </div>
        <h4>{{ item.message }}</h4>
        <img
          v-on:click="deleteComment"
          v-if="item.id === userId"
          class="delete-icon"
          src="../assets/delete.png"
          alt="delete icon"
        />
        <img
          v-on:click="deleteComment(item.id)"
          v-if="isAdmin"
          src="../assets/delete.png"
          alt="delete icon"
          class="delete-icon"
        />
      </li>
    </ul>
    <!-- <div class="comments">
      <input
        type="text"
        v-model="message"
        placeholder="Write a Review (optional)"
        name="review"
      />
      <label for="rating">Rating : </label>
      <select name="rating" id="rating" v-model="rating">
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
      </select>
      <br />
      <br />
      <br />
      <button @click="print">Submit</button>
    </div> -->
    <!-- AdminLTE Theme Start -->
    <div class="container-sm d-flex justify-content-center align-items-center">
      <div class="card w-50 card-primary">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title">Add Review</h3>
        </div>

        <Form :validation-schema="schema" v-slot="{ errors }">
          <div class="card-body">
            <div class="form-group">
              <label for="exampleInputEmail1">Write a Review</label>
              <Field
                type="text"
                name="message"
                v-model="message"
                :class="{ 'p-invalid': errors.message }"
                class="form-control"
                id="exampleInputEmail1"
                placeholder="Write a Review"
              />
              <span class="p-error text-danger"> {{ errors.message }} </span>
            </div>
            <div class="form-group">
              <label for="exampleInputPassword1">Give Rating</label>
              <select name="rating" id="rating" class="m-4" v-model="rating">
                <option value="0" selected>Option Name</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </select>
            </div>
          </div>

          <div class="card-footer">
            <button @click="print()" type="submit" class="btn btn-primary">
              Submit
            </button>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "Review",
  data() {
    const schema = yup.object({
      message: yup.string().required(),
    });
    return {
      schema,
      rating: "",
      username: "",
      userId: "",
      message: "",
      isAdmin: false,
      id: this.$route.params.id,
      fullPaths: "",
      reviews: [],
      restaurant: {
        name: "",
        contact: "",
        address: "",
        cloudinaryImageId: "",
        avgRating: "",
      },
    };
  },
  methods: {
    ...mapActions(["fetchRestaurants", "updatedRestaurant"]),

    async deleteComment(id) {
      if (this.isAdmin) {
        // Logic to delete  comment by admin
        this.reviews = this.reviews.filter((item) => item.id !== id);
        // this.reviews = deleteUser;
      } else {
        // Logic for deleting the comment on clicking of the delete icon
        const validateUser = this.reviews.filter(
          (item) => item.id !== this.userId
        );
        this.reviews = validateUser;
      }
      // this.$store.dispatch("updatedRestaurants");
      this.updatedRestaurant({
        id: this.id,
        name: this.restaurant.name,
        contact: this.restaurant.contact,
        address: this.restaurant.address,
        cloudinaryImageId: this.restaurant.cloudinaryImageId,
        avgRating: this.restaurant.avgRating,
        reviews: this.reviews,
      });
    },

    async print() {
      // Validation for both fields, so they are not empty
      if (!this.message || !this.rating) {
        return;
      }

      // Validation to see if there is an comment by other user, so we will edit it
      const duplicateUser = this.reviews.find(
        (item) => item.id === this.userId
      );
      if (duplicateUser) {
        duplicateUser.message = this.message;
        duplicateUser.rating = this.rating;
        this.$swal({
          icon: "success",
          title: "Review Edited !",
        });
        this.message = "";
        this.review = "";
      } else {
        this.reviews = [
          ...this.reviews,
          {
            id: this.userId,
            name: this.username,
            message: this.message,
            rating: this.rating,
          },
        ];
        this.$swal({
          icon: "success",
          title: "Review Added !",
        });
        this.message = "";
        this.review = "";
      }

      // Updating the database
      this.updatedRestaurant({
        id: this.id,
        name: this.restaurant.name,
        contact: this.restaurant.contact,
        address: this.restaurant.address,
        cloudinaryImageId: this.restaurant.cloudinaryImageId,
        avgRating: this.restaurant.avgRating,
        reviews: this.reviews,
      });
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
    const user = localStorage.getItem("user-info");
    const { fullPath } = this.$route;
    this.fullPaths = fullPath.split("/").filter((x) => x);

    if (!user) {
      this.$router.push({ name: "SignUp" });
      return;
    }

    this.username = JSON.parse(user).name;
    this.isAdmin = JSON.parse(user).isAdmin;
    this.userId = JSON.parse(user).id;
    this.$store.dispatch("fetchRestaurants");
    this.fetchRestaurants();
    // let details = this.$store.getters.getRestaurant(this.id);
    // if (details) {
    //   this.restaurant.name = details.name;
    //   this.restaurant.address = details.address;
    //   this.restaurant.contact = details.contact;
    //   this.restaurant.cloudinaryImageId = details.cloudinaryImageId;
    //   this.restaurant.avgRating = details.avgRating;
    //   this.reviews = details.reviews;
    // }
  },
};
</script>

<style scoped>
.container {
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: start;
  align-items: center;
  /* width: 100vw; */
  /* height: 100vh; */
  overflow-y: scroll;
  /* background-color: red; */
}

ul {
  width: 100%;
  height: min-content;
  display: flex;
  flex-direction: column;
  align-items: center;
  list-style: none;
  /* background-color: green; */
  /* margin-bottom: 10px; */
}
ul li {
  border: 2px solid rgb(162, 162, 162);
  margin: 20px;
  list-style: none;
  width: 30%;
  padding: 10px;
  gap: 20px;
  height: 10rem;
  display: flex;
  flex-direction: column;
  position: relative;
  /* background-color: red; */
}
ul li .delete-icon {
  position: absolute;
  cursor: pointer;
  scale: 0.8;
  right: 0;
  bottom: 0;
}
ul li .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
ul li .info .profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}
ul li img {
  width: 30px;
}
ul li h4 {
  display: flex;
}
.comments {
  display: flex;
  flex-direction: column;
  width: 30%;
}
/* .breadcrumbs-path {
  width: 80%;
  display: flex;
  justify-content: start;
  font-size: 20px;
  text-transform: capitalize;
  background-color: rgb(235, 235, 235);
  padding: 10px;
  border-bottom: 1px solid black;
} */
/* .breadcrumbs-path a {
  text-decoration: none;
  color: #333;
  background-color: rgb(235, 235, 235);
} */
/* .breadcrumbs-path span {
  color: #999;
  background-color: rgb(235, 235, 235);
} */
</style>
