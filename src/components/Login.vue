<template>
  <form
    @submit="login"
    class="d-flex flex-column align-items-center justify-content-center"
  >
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

    <button type="submit" v-on:click="login" class="btn btn-primary m-3">
      Login
    </button>
    <router-link to="/signup">
      <button type="submit" class="btn btn-secondary">
        Go To Sign Up Page
      </button>
    </router-link>
  </form>

  <!-- 
    
    
    <p>
      <router-link to="/signup">
        <button>Go To Sign Up Page</button>
      </router-link>
    </p>
  
  <h4>For Admin Login</h4>
  <span>Email - admin@example.com | PW - admin</span>
  <br />
  <br />
  <h4>For User Login</h4>
  <span>Email - user@example.com | PW - user</span>  -->
</template>
<script>
import axios from "axios";
export default {
  name: "Login",
  data() {
    return {
      email: "",
      password: "",
    };
  },
  mounted() {
    let user = localStorage.getItem("user-info");
    if (user) {
      {
        this.$router.push({ name: "Home" });
      }
    }
  },
  methods: {
    async login(e) {
      e.preventDefault();
      console.log(this.email);
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );

      if (result.status === 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        this.$router.push({ name: "Home" });
      } else {
        alert("Not Valid Credentials");
      }
    },
  },
};
</script>
