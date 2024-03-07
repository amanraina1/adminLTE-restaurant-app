<template>
  <!-- <form
    @submit="sendData"
    class="d-flex flex-column align-items-center justify-content-center py-5"
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
  </form> -->

  <body class="register-page container-fluid" style="min-height: 570.797px">
    <div class="register-box">
      <div class="register-logo">
        <a href="#"><b>Admin</b>LTE</a>
      </div>
      <div class="card">
        <div class="card-body register-card-body">
          <p class="login-box-msg">Register a new membership</p>
          <Form :validation-schema="schema" v-slot="{ errors }">
            <div class="mb-3">
              <div class="input-group">
                <Field
                  type="text"
                  name="name"
                  class="form-control"
                  :class="{ 'p-invalid': errors.name }"
                  v-model="name"
                  placeholder="Full name"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-user"></span>
                  </div>
                </div>
              </div>
              <span class="p-error text-danger"> {{ errors.name }} </span>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <Field
                  type="email"
                  name="email"
                  v-model="email"
                  class="form-control"
                  :class="{ 'p-invalid': errors.email }"
                  placeholder="Email"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <span class="p-error text-danger"> {{ errors.email }} </span>
            </div>
            <div class="mb-3">
              <div class="input-group">
                <Field
                  type="password"
                  name="password"
                  class="form-control"
                  placeholder="Password"
                  :class="{ 'p-invalid': errors.password }"
                  v-model="password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <span class="p-error text-danger"> {{ errors.password }} </span>
            </div>

            <div class="row">
              <div class="col-8">
                <!-- <div class="icheck-primary">
                  <input
                    type="checkbox"
                    id="agreeTerms"
                    name="terms"
                    value="agree"
                  />
                  <label for="agreeTerms">
                    I agree to the <a href="#">terms</a>
                  </label>
                </div> -->
              </div>

              <div class="col-12 mb-4 mt-4">
                <button
                  type="submit"
                  v-on:click="sendData"
                  class="btn btn-primary btn-block"
                >
                  Register
                </button>
              </div>
            </div>
          </Form>
          <!-- <div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-primary">
              <i class="fab fa-facebook mr-2"></i>
              Sign up using Facebook
            </a>
            <a href="#" class="btn btn-block btn-danger">
              <i class="fab fa-google-plus mr-2"></i>
              Sign up using Google+
            </a>
          </div> -->
          <router-link to="/login">I already have a membership</router-link>
        </div>
      </div>
    </div>
  </body>
</template>

<script>
import axios from "axios";
import * as yup from "yup";
import { Form, Field, ErrorMessage } from "vee-validate";
export default {
  name: "SignUp",
  data() {
    const schema = yup.object({
      name: yup.string().required(),
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    return {
      schema,
      name: "",
      email: "",
      password: "",
    };
  },
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    async sendData() {
      if (!this.email || !this.password || !this.name) {
        return;
      }
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
