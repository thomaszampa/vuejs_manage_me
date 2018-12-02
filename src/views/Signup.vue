<template>
  <div class="signup">
    <div class="container">
      <form v-on:submit.prevent="submit();">
        <h1>Signup</h1>
        <ul>
          <li class="text-danger" v-for="error in errors">{{ error }}</li>
        </ul>
        <div class="form-group">
          <label>First Name:</label> <input type="first_name" class="form-control" v-model="first_name" />
        </div>
        <div class="form-group">
          <label>Last Name:</label> <input type="last_name" class="form-control" v-model="last_name" />
        </div>
        <div class="form-group"><label>Email:</label> <input type="email" class="form-control" v-model="email" /></div>
        <div class="form-group">
          <label>Artist Name:</label> <input type="artist_name" class="form-control" v-model="artist_name" />
        </div>
        <div class="form-group">
          <label>Password:</label> <input type="password" class="form-control" v-model="password" />
        </div>
        <div class="form-group">
          <label>Password confirmation:</label>
          <input type="password" class="form-control" v-model="passwordConfirmation" />
        </div>
        <input type="submit" class="btn btn-primary" value="Submit" />
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      name: "",
      email: "",
      password: "",
      passwordConfirmation: "",
      errors: []
    };
  },
  methods: {
    submit: function() {
      var params = {
        first_name: this.first_name,
        last_name: this.last_name,
        email: this.email,
        artist_name: this.artist_name,
        password: this.password,
        password_confirmation: this.passwordConfirmation
      };
      axios
        .post("http://localhost:3000/api/users", params)
        .then(response => {
          this.$router.push("/login");
        })
        .catch(error => {
          this.errors = error.response.data.errors;
        });
    }
  }
};
</script>
