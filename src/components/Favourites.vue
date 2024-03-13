<template>
  <ul v-if="details.length > 0">
    <li v-for="item in details" :key="item.id">
      <Card
        :name="item.name"
        :address="item.address"
        :avgRating="item.avgRating"
        :contact="item.contact"
        :cloudinaryImageId="item.cloudinaryImageId"
        :id="item.id"
        fav="true"
        @removeFav="removeFavourite($event)"
      />
    </li>
  </ul>
  <div class="elseMsg" v-else>
    <h1>Favourite List is Empty 🗑️</h1>
  </div>
</template>

<script>
import Card from "./Card.vue";
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
      favourites: [],
    };
  },

  components: {
    Card,
  },

  methods: {
    ...mapActions(["fetchRestaurants", "fetchUsers", "removeFavourites"]),

    getRestaurants(id) {
      return this.$store.getters.getRestaurant(id);
    },

    async removeFavourite(id) {
      let response = this.getUser;
      this.favourites = response.favourites.filter((item) => item !== id);
      const data = this.$store.getters.getUserById(this.userId);

      await this.removeFavourites({
        id: this.userId,
        name: data.name,
        email: data.email,
        password: data.password,
        isAdmin: data.isAdmin,
        favourites: this.favourites,
      });
      this.details = [];
      this.fillDetails();

      this.$swal({
        icon: "success",
        title: "Removed from favourites",
      });
    },
    fillDetails() {
      this.favRestId = this.getUser?.favourites;
      this.favRestId?.map((item) => {
        this.restaurant.name = this.getRestaurants(item)?.name;
        this.restaurant.address = this.getRestaurants(item)?.address;
        this.restaurant.avgRating = this.getRestaurants(item)?.avgRating;
        this.restaurant.contact = this.getRestaurants(item)?.contact;
        this.restaurant.cloudinaryImageId =
          this.getRestaurants(item)?.cloudinaryImageId;
        this.restaurant.id = item;
        this.details.push(this.restaurant);
        this.restaurant = {};
      });
    },
  },
  computed: {
    getUser() {
      return this.$store.getters.getUserById(this.userId);
    },
  },

  async mounted() {
    this.fetchRestaurants();
    await this.fetchUsers();
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
}

.elseMsg {
  height: 85vh;
  display: flex;
  align-items: center;
  font-size: 2rem;
}
</style>
