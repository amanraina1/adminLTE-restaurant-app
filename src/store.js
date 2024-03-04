import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    restaurants: [],
  },
  getters: {
    allRestaurants: (state) => {
      return state.restaurants;
    },
    getRestaurant: (state) => (id) => {
      const result = state.restaurants.find((x) => x.id === id);
      return result;
    },
  },

  actions: {
    // {{ Restaurant APIs }}
    async fetchRestaurants({ commit }) {
      const response = await axios.get("http://localhost:3000/restaurants");
      commit("setRestaurants", response.data);
    },
    async removeRestaurants({ commit }, id) {
      await axios.delete(`http://localhost:3000/restaurants/${id}`);
      // console.log("Commit :", this.state.restaurants);
      commit("removeRestaurant", id);
    },
    async updatedRestaurant({ commit }, payload) {
      await axios.put(`http://localhost:3000/restaurants/${payload.id}`, {
        name: payload.name,
        contact: payload.contact,
        address: payload.address,
        cloudinaryImageId: payload.cloudinaryImageId,
        avgRating: payload.avgRating,
        reviews: payload.reviews,
      });
      commit("updatedRestaurants", payload);
    },
    async addRestaurants({ commit }, title) {
      const result = await axios.post(`http://localhost:3000/restaurants`, {
        name: title.restaurantName,
        contact: title.contact,
        address: title.address,
        cloudinaryImageId: title.cloudinaryImageId,
        avgRating: title.avgRating,
        reviews: title.reviews,
      });

      commit("addRestaurants", result.data);
    },
  },

  mutations: {
    // {{ Restaurants APIs }}
    setRestaurants: (state, restaurants) => (state.restaurants = restaurants),

    removeRestaurant: (state, id) => {
      state.restaurants = state.restaurants.filter((todo) => todo.id !== id);
      // console.log("Mutations :", state.restaurants);
    },
    updatedRestaurants: (state, payload) => {
      const restaurant = state.restaurants.find((x) => x.id === payload.id);
      restaurant.name = payload.name;
      restaurant.contact = payload.contact;
      restaurant.address = payload.address;
      restaurant.cloudinaryImageId = payload.cloudinaryImageId;
      restaurant.avgRating = payload.avgRating;
      restaurant.reviews = payload.reviews;
    },
    addRestaurants: (state, title) => state.restaurants.unshift(title),
  },
});
export default store;
