<template>
  <form
    @submit="sendData"
    class="d-flex flex-column align-items-center justify-content-center"
  >
    <div class="form-group">
      <label for="exampleInputEmail1">Name</label>
      <input
        type="name"
        v-model="name"
        class="form-control"
        id="name"
        placeholder="John Doe"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputEmail1">Email address</label>
      <input
        type="email"
        v-model="email"
        class="form-control"
        id="exampleInputEmail1"
        aria-describedby="emailHelp"
        placeholder="Enter email"
      />
    </div>
    <div class="form-group">
      <label for="exampleInputPassword1">Password</label>
      <input
        type="password"
        class="form-control"
        id="exampleInputPassword1"
        placeholder="Password"
        v-model="password"
      />
    </div>

    <button type="submit" v-on:click="sendData" class="btn btn-primary m-3">
      Sign Up
    </button>
    <router-link to="/login">
      <button type="submit" class="btn btn-secondary">Go To Login Page</button>
    </router-link>
  </form>
</template>

<script>
import axios from "axios";
export default {
  name: "SignUp",
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    async sendData() {
      const result = await axios.post("http://127.0.0.1:3000/users", {
        name: this.name,
        email: this.email,
        password: this.password,
        isAdmin: false,
      });
      if (result.status === 201) {
        localStorage.setItem("user-info", JSON.stringify(result.data));
        this.$router.push({ name: "Home" });
      }
    },
  },
  mounted() {
    const user = localStorage.getItem("user-info");
    if (user) {
      this.$router.push({ name: "Home" });
    }
  },
};
</script>
