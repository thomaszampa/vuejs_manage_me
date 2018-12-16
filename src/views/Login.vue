<template>
  <div class="login">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>Login</strong></h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <div class="container">
      <form v-on:submit.prevent="submit();">
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group"><label>Email:</label> <input type="email" class="form-control" v-model="email" /></div>
        <div class="form-group">
          <label>Password:</label> <input type="password" class="form-control" v-model="password" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  template: "#login-page",
  data: function() {
    return {
      email: "",
      password: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        email: this.email,
        password: this.password
      };
      axios
        .post("http://localhost:3000/api/sessions", params)
        .then(response => {
          axios.defaults.headers.common["Authorization"] = "Bearer " + response.data.jwt;
          localStorage.setItem("jwt", response.data.jwt);
          this.$router.push("/");
        })
        .catch(error => {
          this.errors = ["Invalid email or password."];
          this.email = "";
          this.password = "";
        });
    }
  }
};
</script>
