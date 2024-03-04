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
            <button><i title="Update" class="fa fa-edit"></i></button>
          </router-link>
          <router-link :to="'/review/' + id">
            <button title="See Reviews">See Reviews</button>
          </router-link>
          <button>
            <i
              title="Delete"
              v-on:click="remove(id)"
              v-if="isAdmin"
              class="fa fa-trash"
            ></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<!-- v-on:click="removeRestaurants(id)" -->
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
  justify-content: center;
  align-items: center;
  margin: 20px;
}
.card:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  scale: 0.9;
  transition: all 0.05s ease;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
}
.details .icon img {
  width: 30px;
  height: 30px;
}

.image-container {
  width: 273px;
  height: 340px;
  /* margin-right: 50px; */
  /* margin-left: 50px; */
  /* margin-top: 20px; */
  margin-bottom: 20px;
  /* border: 1px solid black; */
  border-radius: 20px;
  overflow: hidden;
}
/* .image-container:hover {
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
  scale: 0.9;
  transition: all 0.05s ease;
  border-bottom: 1px solid black;
  background-color: #f6f6f6;
} */
.image-container img {
  width: 100%;
  /* height: 182px; */
  height: 65%;
  object-fit: cover;
  border-radius: 20px;
}
.details {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 35%;
}
.name {
  /* background-color: red; */
  width: 100%;
  height: 20%;
  /* width: 90%;
    display: block;
    font-size: 20px;
    margin: 5px;
    font-weight: 700; */
}

.ratings {
  /* background-color: yellow; */
  width: 100%;
  height: 15%;
  /* display: block;
    margin: 5px;
    width: 100%; */
}

.address {
  /* display: block; */
  /* background-color: lightblue; */
  height: 15%;
}

.icon {
  width: 100%;
  height: 40%;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 20px;
  /* background-color: blue; */
}

.icon img {
  cursor: pointer;
  /* width: 100px; */
  /* background-color: green; */
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
