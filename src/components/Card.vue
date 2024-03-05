<template>
  <div class="card">
    <div class="image-container">
      <img :src="cloudinaryImageId" alt="restaurant image" />
      <div class="details">
        <h3 class="name text-center">{{ name }}</h3>
        <span class="ratings text-center"
          >⭐️{{ avgRating }} • {{ contact }}</span
        >
        <span class="address text-center">{{ address }}</span>
        <div class="icon">
          <router-link :to="'/update/' + id" v-if="isAdmin">
            <button style="background-color: grey">
              <i title="Update" class="fa fa-edit"></i>
            </button>
          </router-link>
          <router-link :to="'/review/' + id">
            <button title="See Reviews">See Reviews</button>
          </router-link>
          <button style="background-color: red" v-if="isAdmin">
            <i title="Delete" v-on:click="remove(id)" class="fa fa-trash"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapActions } from "vuex";
export default {
  name: "Card",
  data() {
    return {
      isAdmin: "",
    };
  },
  props: {
    name: String,
    address: String,
    avgRating: String,
    contact: String,
    cloudinaryImageId: String,
    id: String,
  },
  methods: {
    ...mapActions(["removeRestaurants", "fetchRestaurants"]),
    remove(id) {
      this.$emit("removedata", id);
    },
  },

  mounted() {
    const user = localStorage.getItem("user-info");
    this.isAdmin = JSON.parse(user).isAdmin;
  },
};
</script>

<style scoped>
.card {
  width: 300px;
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  scale: 0.9;
  transition: all 300ms ease;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
}
.details .icon img {
  width: 30px;
  height: 30px;
}

.image-container {
  width: 273px;
  height: 380px;
  border-radius: 20px;
  overflow: hidden;
}
.image-container img {
  width: 100%;
  height: 65%;
  object-fit: cover;
  border-radius: 20px;
}
.details {
  display: flex;
  flex-direction: column;
  height: 35%;
}
.name {
  width: 100%;
  height: 20%;
}

.ratings {
  width: 100%;
  height: 20%;
}

.address {
  height: 20%;
}

.icon {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

button {
  padding: 5px 10px;
  border-radius: 5px;
  color: white;
  background-color: rgb(89, 145, 250);
  border: none;
  cursor: pointer;
  font-weight: 700;
}
</style>
