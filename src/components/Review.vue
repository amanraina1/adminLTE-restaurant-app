<template>
  <!-- Rendering Modal on delete option -->
  <div class="root">
    <Teleport to="body">
      <div v-if="isOpen" class="modal">
        <div>
          <h1>Are you sure you want to Delete ?</h1>
          <button class="bg-red" @click="deleteComment(this.reviewId)">
            Yes
          </button>
          <button class="bg-primary" @click="isOpen = false">No</button>
        </div>
      </div>
    </Teleport>
  </div>

  <div class="container-sm">
    <!-- Rendering existing Reviews -->
    <ul>
      <li
        :style="this.getRandomColor()"
        v-for="item in reviews"
        :key="item.name"
      >
        <div class="info">
          <span class="profile">
            <img src="../assets/avatar.svg" alt="user avatar" />
            <b>{{ item.name }} </b>
          </span>
          <span>
            <img
              class="star"
              v-for="item in item.rating"
              src="../assets/filledStar.png"
            />
            <img
              class="star"
              v-for="item in 5 - item.rating"
              src="../assets/emptyStar.png"
            />
          </span>
        </div>
        <h4>{{ item.message }}</h4>
        <!-- <img
          v-on:click="showModal(item.id)"
          v-if="isAdmin || item.id === userId"
          class="delete-icon"
          src="../assets/delete.png"
          alt="delete icon"
        /> -->
        <div class="button">
          <button
            v-on:click="showModal(item.id)"
            v-if="isAdmin || item.id === userId"
            class="delete-icon"
          >
            Delete
          </button>
        </div>
      </li>
    </ul>

    <!-- AdminLTE Theme Start -->
    <div class="container-sm d-flex justify-content-center align-items-center">
      <div class="card w-50 card-primary">
        <div class="card-header d-flex justify-content-center">
          <h3 class="card-title">Add Review</h3>
        </div>

        <Form @submit="print()" :validation-schema="schema" v-slot="{ errors }">
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
              <label for="rating">Give Rating</label>
              <Field
                name="rating"
                v-model="rating"
                :class="{ 'p-invalid': errors.rating }"
                class="form-control"
                id="rating"
                as="select"
              >
                <option value="" disabled selected>Select Rating</option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
              </Field>
              <span class="p-error text-danger"> {{ errors.rating }} </span>
            </div>
          </div>

          <div class="card-footer">
            <button type="submit" class="btn btn-primary">Submit</button>
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
      message: yup
        .string()
        .required()
        .max(100, "This field must not exceed 100 words!"),
      rating: yup.string().required(),
    });
    return {
      isOpen: false,
      reviewId: "",
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
        contact: null,
        address: "",
        cloudinaryImageId: "",
        avgRating: null,
      },
    };
  },
  methods: {
    ...mapActions(["fetchRestaurants", "updatedRestaurant", "updatedReviews"]),
    getRandomColor() {
      let color = `hsl(${Math.random() * 360},100%,75%)`;
      return `background-color : ${color}`;
    },
    async deleteComment(id) {
      if (this.isAdmin) {
        // Logic to delete  comment by admin
        this.reviews = this.reviews.filter((item) => item.id !== id);
        this.isOpen = false;
        this.$swal({
          icon: "success",
          title: "Review Deleted !",
        });
      } else {
        // Logic for deleting the comment on clicking of the delete icon
        const validateUser = this.reviews.filter(
          (item) => item.id !== this.userId
        );
        this.reviews = validateUser;
        this.isOpen = false;
        this.$swal({
          icon: "success",
          title: "Review Deleted !",
        });
      }

      this.updatedReviews({
        id: this.id,
        reviews: this.reviews,
      });
    },

    async showModal(id) {
      this.isOpen = true;
      this.reviewId = id;
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
        duplicateUser.rating = Number(this.rating);
        this.message = "";
        this.review = "";
        this.$swal({
          icon: "success",
          title: "Review Edited !",
        });
      } else {
        this.reviews = [
          ...this.reviews,
          {
            id: this.userId,
            name: this.username,
            message: this.message,
            rating: Number(this.rating),
          },
        ];
        this.message = "";
        this.review = "";
        this.$swal({
          icon: "success",
          title: "Review Added !",
        });
      }

      // Updating the database
      this.updatedReviews({
        id: this.id,
        reviews: this.reviews,
      });
    },
    fillDetails() {
      this.restaurant.name = this.getRestaurantById?.name;
      this.restaurant.address = this.getRestaurantById?.address;
      this.restaurant.contact = this.getRestaurantById?.contact;
      this.restaurant.cloudinaryImageId =
        this.getRestaurantById?.cloudinaryImageId;
      this.restaurant.avgRating = this.getRestaurantById?.avgRating;
      this.reviews = this.getRestaurantById?.reviews;
    },
  },
  computed: {
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

    if (!user) {
      this.$router.push({ name: "SignUp" });
      return;
    }

    this.username = JSON.parse(user).name;
    this.isAdmin = JSON.parse(user).isAdmin;
    this.userId = JSON.parse(user).id;

    await this.fetchRestaurants();
    this.fillDetails();
  },
};
</script>

<style scoped>
.root {
  position: relative;
}
.modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal h1 {
  color: aliceblue;
}
.modal > div {
  background-color: #2f2e2eef;
  padding: 50px;
  border-radius: 10px;
}
.modal > div button {
  padding: 10px 30px;
  margin: 10px;
  border: none;
  border-radius: 10px;
  cursor: pointer;
  font-size: larger;
  font-weight: 800;
}

ul {
  width: 100%;
  height: auto;
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
}
ul li {
  box-shadow: 0rem 1rem 5rem hsla(0, 0%, 71%, 0.2);
  border: none;
  margin: 10px;
  width: 30%;
  padding: 0px 20px;
  border-radius: 20px;
  height: 250px;
  display: flex;
  flex-direction: column;
}
ul li .button {
  display: flex;
  justify-content: space-evenly;
  height: 20%;
}
ul li .delete-icon {
  border: none;
  width: 40%;
  align-self: center;
  border-radius: 50px;
  padding: 5px 10px;
  background-color: rgb(74, 74, 74);
  color: white;
  cursor: pointer;
}
ul li .delete-icon:hover {
  background-color: rgb(217, 217, 217);
  color: #2f2e2e;
}
ul li .info {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 25%;
}
ul li .info .profile {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;

  font-weight: 900;
}
ul li img {
  width: 40px;
}
ul li .star {
  width: 20px;
}
ul li h4 {
  width: 100%;
  height: 55%;
  padding: 10px 10px;
  word-wrap: break-word;
  font-size: 1em;
  line-height: 30px;
  hyphens: auto;
  font-weight: 550;
}
.comments {
  display: flex;
  flex-direction: column;
  width: 30%;
}
</style>
