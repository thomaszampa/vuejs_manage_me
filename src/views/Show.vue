<template>
  <div class="show">
    <!-- TITLE -->
    <div>
      <h1>{{ goal.subject }}</h1>
    </div>
    <!-- REQUEST INDEX -->
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
    </div>
    <div><a href="/#/" class="btn btn-primary">Back to all Goals</a></div>
    <!-- REQUEST CREATE MODAL -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="requestCreateModal"
      aria-hidden="true"
    >
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title" id="goalCreateModal">New Goal</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <!-- REQUEST CREATE FORM -->
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="newGoalSubject">Subject</label>
                <input
                  v-model="newGoalSubject"
                  type="text"
                  class="form-control"
                  id="InputSubject"
                  aria-describedby="subjectHelp"
                  placeholder="Enter subject"
                />
              </div>
              <div class="form-group">
                <label for="newGoalBody">Body</label>
                <input v-model="newGoalBody" type="text" class="form-control" id="InputBody" placeholder="Enter Body" />
              </div>
              <!-- DATE TIME SELETOR -->
              <div class="form-group">
                <label for="newGoalStartDatew">Start Date</label>
                <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                  <input
                    v-model="newGoalStartDate"
                    type="text"
                    class="form-control datetimepicker-input"
                    data-target="#datetimepicker1"
                  />
                  <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                  </div>
                </div>
              </div>
              <div class="form-group">
                <label for="newGoalEndDate">End Date</label>
                <div class="input-group date" id="datetimepicker2" data-target-input="nearest">
                  <input
                    v-model="newGoalEndDate"
                    type="text"
                    class="form-control datetimepicker-input"
                    data-target="#datetimepicker2"
                  />
                  <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                  </div>
                </div>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click="createGoal();" type="button" class="btn btn-primary">Create</button>
          </div>
        </div>
      </div>
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
