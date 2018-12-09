<template>
  <div class="show">
    <div class="container" align="center">
      <div class="row">
        <div v-for="request in goal.requests" class="mt-3 mb-3" v-bind:key="request.id">
          <div class="card" style="width: 75rem;">
            <div class="card-body">
              <h5 class="card-title">{{ request.body }}</h5>
              <h6 class="card-subtitle mb-2 text-muted">Request made at: {{ request.time_stamp }}</h6>
              <h6 class="mb-2">Due: {{ request.due_date }}</h6>
            </div>
          </div>
        </div>
      </div>
      <div><a href="/#/" class="btn btn-primary">Back to all Goals</a></div>
    </div>
  </div>
</template>

<style></style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      goal: {},
      requests: [],
      errors: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/goals/" + this.$route.params.id).then(
      function(response) {
        console.log(response.data);
        this.goal = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
