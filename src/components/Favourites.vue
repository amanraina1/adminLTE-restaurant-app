<template>
  <!-- {{ this.fillDetails() }} -->
  <!-- <input type="text " v-model="name" /> -->
  <ul v-if="details.length">
    <li v-for="item in details" :key="item.id">
      <Card
        :name="item.name"
        :address="item.address"
        :avgRating="item.avgRating"
        :contact="item.contact"
        :cloudinaryImageId="item.cloudinaryImageId"
        :id="item.id"
        fav="true"
      />
    </li>
  </ul>
  <div class="elseMsg" v-else>
    <h1>Favourite List is Empty 🗑️</h1>
  </div>
</template>

<script>
import Card from "./Card.vue";
import axios from "axios";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      restaurant: {
        name: "",
        address: "",
        avgRating: "",
        contact: "",
        cloudinaryImageId: "",
        id: "",
      },
      details: [],
      userId: this.$route.params.id,
      favRestId: [],
    };
  },
  components: {
    Card,
  },
  methods: {
    ...mapActions(["fetchRestaurants"]),
    // deleteRestFromFav() {
    //   console.log("deleted");
    //   this.fetchRestaurants();
    //   this.fillDetails();
    // },
    getRestaurants(id) {
      return this.$store.getters.getRestaurant(id);
    },
    async fillDetails() {
      const userData = await axios.get(
        `http://localhost:3000/users/${this.userId}`
      );
      this.favRestId = userData.data.favourites;
      this.favRestId?.map((item) => {
        this.restaurant.name = this.getRestaurants(item)?.name;
        this.restaurant.address = this.getRestaurants(item)?.address;
        this.restaurant.avgRating = this.getRestaurants(item)?.avgRating;
        this.restaurant.contact = this.getRestaurants(item)?.contact;
        this.restaurant.cloudinaryImageId =
          this.getRestaurants(item)?.cloudinaryImageId;
        this.restaurant.id = item;
        this.details.push(this.restaurant);
        this.restaurant = [];
      });
      //   console.log(this.details);
    },
  },
  mounted() {
    this.fetchRestaurants();
    this.fillDetails();
  },
};
</script>
<style scoped>
ul {
  width: 80%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  border-radius: 50px;
  /* border: 1px solid black; */
}

.elseMsg {
  height: 85vh;
  display: flex;
  align-items: center;
  font-size: 2rem;
}
</style>
