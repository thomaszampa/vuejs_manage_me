<template>
  <div class="show">
    <div class="container">
      <div>
        <h1>{{ goal.subject }}</h1>
      </div>
      <br />
      <div>{{ goal.body }}</div>
      <br />
      <div>{{ goal.requests }}</div>
      <a href="/#/" class="btn btn-primary">Back to all Goals</a>
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
      request: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/goals/" + this.$route.params.id).then(response => {
      this.goal = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
