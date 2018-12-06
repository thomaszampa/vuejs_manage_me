<template>
  <div class="home">
    <h1>{{ "MANAGE.ME" }}</h1>

    <!-- GOALS INDEX - LINK TO SHOW -->
    <div class="container">
      <div class="row mb-3 mt-3">
        <div v-for="goal in goals" class="col-4 mb-3 mt-3" v-bind:key="goal.id">
          <div class="card" style="width: 18rem;">
            <!-- <img class="" v-bind:src="" alt="Card image cap" /> -->
            <div class="card-body">
              <h3 class="card-subject">{{ goal.subject }}</h3>
              <p class="card-body">{{ goal.body }}</p>
              <p class="card-start_date">{{ goal.start_date }}</p>
              <p class="card-start_date">{{ goal.end_date }}</p>
              <a v-bind:href="`#/goals/${goal.id}`" class="btn btn-primary">See Requests</a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- ... -->
  </div>
</template>

<style></style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "manage.me",
      goals: []
    };
  },
  created: function() {
    axios.get("http://localhost:3000/api/goals").then(
      function(response) {
        console.log(response.data);
        this.goals = response.data;
      }.bind(this)
    );
  },
  methods: {},
  computed: {}
};
</script>
