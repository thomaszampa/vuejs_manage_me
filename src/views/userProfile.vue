<template>
  <div class="profile">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>{{ current_user.first_name }}</strong></h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      users: [],
      errors: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/users").then(
      function(response) {
        console.log(response.data);
        this.users = response.data;
      }.bind(this)
    );
  },
  methods: {}
};
</script>
