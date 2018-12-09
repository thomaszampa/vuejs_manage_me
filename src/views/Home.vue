<template>
  <div class="home">
    <!-- GOALS INDEX - LINK TO SHOW -->
    <div class="container">
      <div class="row">
        <div v-for="goal in goals" class="col-4 mb-3 mt-3" v-bind:key="goal.id">
          <div class="card" style="width: 18rem;">
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
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">New Goal</button>

    <!-- Modal -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="exampleModalLabel">New Goal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body">...</div>
          <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
            <button type="button" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
    </div>
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
