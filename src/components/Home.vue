<template>
  <!-- <Header /> -->
  <!-- {{ this.restaurant }} -->
  <br />
  <!-- <h1 class="text-center">Hello {{ name }}, Welcome to Home page</h1> -->
  <!-- <span class="search-bar">
    <input type="text" placeholder="Enter Name to search" v-model="search" />
    <button title="Search a restaurant" @click="searchRestaurant">
      Search
    </button>
  </span> -->

  <ul>
    <!-- <img src="../assets/placeholder-restaurant.png" /> -->
    <li v-for="item in displayedPosts" :key="item.id">
      <Card
        :name="item.name"
        :address="item.address"
        :avgRating="item.avgRating"
        :contact="item.contact"
        :cloudinaryImageId="item.cloudinaryImageId"
        :id="item.id"
      />
    </li>
  </ul>
  <!-- Pagination Code  -->

  <div v-if="this.restaurant.length > 0" class="pagination">
    <span
      :class="page === 1 ? 'pagination__disable' : ''"
      v-on:click="selectPageHandler(page - 1)"
      >◀️</span
    >
    <span
      :class="page === i + 1 ? 'pagination__selected' : ''"
      v-on:click="selectPageHandler(i + 1)"
      v-for="(item, i) in [...Array(Math.ceil(this.restaurant.length / 6))]"
    >
      {{ i + 1 }}
    </span>
    <span
      :class="
        page === Math.ceil(this.restaurant.length / 6)
          ? 'pagination__disable'
          : ''
      "
      v-on:click="selectPageHandler(page + 1)"
      >▶️</span
    >
  </div>
</template>
<script>
import Header from "./Header.vue";
import Card from "./Card.vue";
import { mapActions } from "vuex";

export default {
  name: "Home",
  data() {
    return {
      name: "",
      page: 1,
      search: "",
      restaurant: [],
    };
  },
  methods: {
    ...mapActions(["fetchRestaurants"]),
    searchRestaurant() {
      const list = this.$store.getters.allRestaurants.filter((item) =>
        item.name?.includes(this.search)
      );
      this.$store.state.restaurants = list;
    },

    loadData() {
      const user = localStorage.getItem("user-info");
      if (!user) {
        this.$router.push({ name: "SignUp" });
        return;
      }
      this.name = JSON.parse(user).name;
      this.$store.dispatch("fetchRestaurants");
      this.fetchRestaurants();
    },
    selectPageHandler(i) {
      if (
        i >= 1 &&
        i <= Math.ceil(this.restaurant.length / 6) &&
        i !== this.page
      )
        this.page = i;
    },
  },
  computed: {
    displayedPosts() {
      this.restaurant = this.$store.getters.allRestaurants;
      return this.restaurants.slice(this.page * 6 - 6, this.page * 6);
    },
    restaurants() {
      return this.$store.state.restaurants;
    },
  },
  components: {
    Header,
    Card,
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped>
.search-bar {
  width: min-content;
  height: min-content;
  position: absolute;
  right: 10px;
  top: 60px;
  gap: 20px;
  display: flex;
}
.search-bar input {
  /* height: 100%; */
  width: 160px;
  height: 40px;
  padding-left: 20px;
  display: block;
  border: 1px solid skyblue;
}
.search-bar button {
  width: 150px;
  height: 40px;
  border: 1px solid skyblue;
  color: #fff;
  background-color: skyblue;
  cursor: pointer;
}
.search-bar button:hover {
  background-color: #f5f5f5;
  color: skyblue;
}
ul {
  width: 80%;
  justify-content: center;
  display: flex;
  flex-wrap: wrap;
  list-style-type: none;
  border-radius: 50px;
  /* border: 1px solid black; */
}
.pagination {
  padding: 10px;
  display: flex;
  justify-content: center;
}
.pagination span {
  padding: 5px 10px;
  border: 1px solid grey;
  cursor: pointer;
}
.pagination__selected {
  background-color: rgb(220, 220, 220);
}
.pagination__disable {
  opacity: 0;
}
</style>
