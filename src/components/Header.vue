<template>
  <div class="nav">
    <router-link title="Home" to="/">Home</router-link>
    <router-link title="Add Restaurant" v-if="isAdmin" to="/add"
      >Add Restaurant</router-link
    >
    <a title="Logout" v-on:click="logout">Logout</a>
  </div>
</template>

<script>
export default {
  name: "Header",
  data() {
    return {
      isAdmin: false,
    };
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push({ name: "Login" });
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (!user) {
      this.$router.push({ name: "SignUp" });
      return;
    }
    this.isAdmin = JSON.parse(user).isAdmin;
  },
};
</script>
<style scoped>
.nav {
  width: 100vw;
  background-color: skyblue;
  /* overflow: hidden; */
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
}

.nav a {
  cursor: pointer;
  background-color: skyblue;
  float: left;
  color: #f5f5f5;
  font-weight: 700;
  text-align: center;
  padding: 10px 14px;
  text-decoration: none;
  /* font-size: 20px; */
  /* margin-left: 40px; */
  /* margin-right: 40px; */
}
.nav a:hover {
  background-color: #f5f5f5;
  color: skyblue;
  transition: all 0.5s ease-in-out;
}
</style>
