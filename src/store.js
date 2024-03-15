import { createStore } from "vuex";
import axios from "axios";

const store = createStore({
  state: {
    restaurants: [],
    users: [],
  },
  getters: {
    // {{ Restaurant APIs }}
    allRestaurants: (state) => {
      return state.restaurants;
    },
    getRestaurant: (state) => (id) => {
      const result = state.restaurants.find((item) => item.id === id);
      return result;
    },

    // {{ Users APIs }}
    allUsers: (state) => {
      return state.users;
    },
    getUserByEmail: (state) => (email, password) => {
      const response = state.users.find(
        (user) => user.email === email && user.password === password
      );
      return response;
    },
    getUserById: (state) => (id) => {
      const response = state.users.find((user) => user.id === id);
      return response;
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
        id: payload.id,
      });
      commit("updatedRestaurants", payload);
    },
    async updatedReviews({ commit }, payload) {
      const response = await axios.patch(
        `http://localhost:3000/restaurants/${payload.id}`,
        {
          reviews: payload.reviews,
        }
      );
      commit("updateReviews", response.data);
    },

    async addRestaurants({ commit }, title) {
      const result = await axios.post(`http://localhost:3000/restaurants`, {
        name: title.name,
        contact: title.contact,
        address: title.address,
        cloudinaryImageId: title.cloudinaryImageId,
        avgRating: title.avgRating,
        reviews: title.reviews,
      });

      commit("addRestaurant", result.data);
    },

    // {{ Users APIs }}
    async fetchUsers({ commit }) {
      const response = await axios.get("http://localhost:3000/users");
      commit("setUsers", response.data);
    },

    async addFavRestaurant({ commit }, data) {
      const response = await axios.patch(
        `http://localhost:3000/users/${data.id}`,
        {
          favourites: data.favourites,
        }
      );
      commit("addFavourite", response.data);
    },

    async removeFavourites({ commit }, data) {
      const response = await axios.put(
        `http://localhost:3000/users/${data.id}`,
        {
          email: data.email,
          favourites: data.favourites,
          id: data.id,
          isAdmin: data.isAdmin,
          name: data.name,
          password: data.password,
        }
      );
      commit("deleteFavourite", response.data);
    },
  },

  mutations: {
    // {{ Restaurants APIs }}
    setRestaurants: (state, restaurants) => (state.restaurants = restaurants),

    removeRestaurant: (state, id) => {
      state.restaurants = state.restaurants.filter((todo) => todo.id !== id);
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
    updateReviews: (state, payload) => {
      const restaurant = state.restaurants.find((x) => x.id === payload.id);
      restaurant.name = payload.name;
      restaurant.contact = payload.contact;
      restaurant.address = payload.address;
      restaurant.cloudinaryImageId = payload.cloudinaryImageId;
      restaurant.avgRating = payload.avgRating;
      restaurant.reviews = payload.reviews;
    },

    addRestaurant: (state, title) => state.restaurants.unshift(title),

    // {{ Users APIs }}
    setUsers: (state, users) => (state.users = users),
    deleteFavourite: (state, response) => {
      const index = state.users.findIndex((item) => item.id === response.id);
      if (index !== -1) {
        state.users[index] = response;
      }
    },

    addFavourite: (state, response) => {
      const index = state.users.findIndex((item) => item.id === response.id);

      if (index !== -1) {
        state.users[index] = response;
      }
    },
  },
});
export default store;
