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

    <!-- GOAL CREATE MODAL -->
    <div
      class="modal fade"
      id="exampleModal"
      tabindex="-1"
      role="dialog"
      aria-labelledby="goalCreateModal"
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
          <!-- GOAL CREATE FORM -->
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

<script type="text/javascript">
$(function() {
  $("#datetimepicker1").datetimepicker();
  $("#datetimepicker2").datetimepicker();
});
</script>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "manage.me",
      goals: [],
      newGoalSubject: "",
      newGoalBody: "",
      newGoalStartDate: "",
      newGoalEndDate: "",
      errors: []
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
  methods: {
    createGoal() {
      console.log("createGoal");
      this.errors = [];
      var params = {
        user_id: this.current_user.id,
        relationship_id: this.current_user.relationship_id,
        subject: this.newGoalSubject,
        body: this.newGoalBody,
        start_date: this.newGoalStartDate,
        end_date: this.newGoalEndDate
      };
      axios
        .post("http://localhost:3000/api/goals", params)
        .then(
          function(response) {
            console.log(response);
            this.goal.push(response.data);
            this.newGoalSubject = "";
            this.newGoalBody = "";
            this.newGoalStartDate = "";
            this.newGoalEndDate = "";
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error.response.data.errors);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  }
};
</script>
