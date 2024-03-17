<template>
  <!-- AdminLTE Theme Start -->

  <body class="login-page container-fluid" style="min-height: 496.797px">
    <div class="login-box">
      <div class="login-logo">
        <a href="#"><b>Admin</b>LTE</a>
      </div>

      <div class="card">
        <div class="card-body login-card-body">
          <p class="login-box-msg">Sign in to start your session</p>
          <Form
            validate-on-mount
            @submit="login()"
            :validation-schema="schema"
            v-slot="{ errors }"
          >
            <div class="mb-4">
              <div class="input-group">
                <Field
                  type="email"
                  name="email"
                  :class="{ 'p-invalid': errors.email }"
                  v-model="email"
                  class="form-control"
                  placeholder="Email"
                />

                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-envelope"></span>
                  </div>
                </div>
              </div>
              <span v-if="errors.email" class="p-error text-danger mb-3">
                {{ errors.email }}
              </span>
            </div>
            <div class="mb-4">
              <div class="input-group">
                <Field
                  type="password"
                  name="password"
                  :class="{ 'p-invalid': errors.password }"
                  class="form-control"
                  placeholder="Password"
                  v-model="password"
                />
                <div class="input-group-append">
                  <div class="input-group-text">
                    <span class="fas fa-lock"></span>
                  </div>
                </div>
              </div>
              <span v-if="errors.password" class="p-error text-danger">
                {{ errors.password }}
              </span>
            </div>

            <div class="row">
              <div class="col-12 text-center mb-4">
                <button type="submit" class="btn btn-primary btn-block">
                  Sign In
                </button>
              </div>
            </div>
          </Form>
          <p class="mb-0">
            <router-link to="/signup">Register a new membership</router-link>
          </p>
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
  name: "Login",
  data() {
    const schema = yup.object({
      email: yup.string().email().required(),
      password: yup.string().required(),
    });
    return {
      schema,
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
  components: {
    Form,
    Field,
    ErrorMessage,
  },
  methods: {
    async login() {
      if (!this.email || !this.password) {
        return;
      }
      let result = await axios.get(
        `http://localhost:3000/users?email=${this.email}&password=${this.password}`
      );

      if (result.status === 200 && result.data.length > 0) {
        localStorage.setItem("user-info", JSON.stringify(result.data[0]));
        location.reload();
        this.$router.push({ name: "Home" });
      } else {
        alert("Not valid credentials");
      }
    },
  },
};
</script>
