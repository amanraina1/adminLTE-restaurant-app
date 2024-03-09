<template>
  <div class="root">
    <!-- <button @click="isOpen = true">Open</button> -->
    <Teleport to="body">
      <div v-if="isOpen" class="modal">
        <div>
          <h1>Are you sure you want to Delete ?</h1>
          <button class="bg-red" @click="remove(this.reviewId)">Yes</button>
          <button class="bg-primary" @click="isOpen = false">No</button>
        </div>
      </div>
    </Teleport>
  </div>

  <!-- Modal Box up here -->
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
          <button
            v-on:click="showModal(id)"
            style="background-color: red"
            v-if="isAdmin"
          >
            <i title="Delete" class="fa fa-trash"></i>
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
      isOpen: false,
      reviewId: "",
    };
  },
  props: {
    name: String,
    address: String,
    avgRating: Number,
    contact: Number,
    cloudinaryImageId: String,
    id: String,
  },
  methods: {
    ...mapActions(["removeRestaurants", "fetchRestaurants"]),
    remove(id) {
      this.removeRestaurants(id);
      this.$swal({
        icon: "success",
        title: "Restaurant Deleted Successfully !",
      });
    },
    async showModal(id) {
      this.isOpen = true;
      this.reviewId = id;
    },
  },

  mounted() {
    const user = localStorage.getItem("user-info");
    this.isAdmin = JSON.parse(user).isAdmin;
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
  /* background-color: rgba(0, 0, 0, 0.1); */
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
