<template>
  <div class="goalsRequests">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>Goals | Requests</strong></h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- Collapsible Panel -->
    <div class="row">
      <!-- Collapsible Goals Feed -->
      <div class="col-md-12">
          <div class="panel panel-default">
              <div class="panel-heading">
                <i class="fa fa-tasks"></i><strong> GOALS</strong>
              </div>
              <!-- .panel-heading -->
              <div class="panel-body">
                  <div v-for="goal in goals" class="panel-group" v-bind:key="goal.id" id="accordion">
                      <div class="panel panel-default">
                          <div class="panel-heading">
                              <h4 class="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" :href="['#collapseOne' + goal.id]">
                                  <strong>{{ goal.subject }}</strong>
                                  <button v-on:click="redirectToRequests(goal);" class="pull-right btn btn-primary btn-xs"><strong>{{ goal.requests.length }}</strong> | Requests</button> 
                                  </a>
                              </h4>                           
                          </div>
                          <div :id="['collapseOne' + goal.id]" class="panel-collapse collapse">
                              <div class="panel-body">
                                  {{ goal.body }}
                                <div class="pull-right text-muted small">
                                  <em>Began: {{ formatDate(goal.start_date) }}</em>
                                </div><br>
                                <div class="pull-right text-muted small">
                                  <em>Complete By: {{ formatDate(goal.end_date) }}</em>
                                </div>                              
                              </div>

                          </div>
                      </div>
                  </div>
                  <button type="button" class="pull-right btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">New Goal</button>
              </div>
              <!-- .panel-body -->
          </div>
      </div>
    </div>

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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title huge" id="goalCreateModal"><strong>New Goal</strong></h5>
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
                <label for="newGoalStartDate">Start Date</label>
                <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                  <input
                    id="newGoalStartDate"
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
                    id="newGoalEndDate"
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
            <button v-on:click="createGoal();" type="button" class="btn btn-primary" data-dismiss="modal">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
  data: function() {
    return {
      message: "manage.me",
      goals: [],
      overdueRequests: [],
      spotifyInfo: {},
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

  mounted: function() {
    $("#datetimepicker1").datetimepicker({ format: "DD/MM/YY HH:mm" });
    $("#datetimepicker2").datetimepicker({ format: "DD/MM/YY HH:mm" });
  },

  methods: {
    createGoal() {
      console.log("createGoal");
      this.errors = [];

      var params = {
        subject: this.newGoalSubject,
        body: this.newGoalBody,
        start_date: document.getElementById("newGoalStartDate").value,
        end_date: document.getElementById("newGoalEndDate").value
      };
      console.log(params);
      axios
        .post("http://localhost:3000/api/goals", params)
        .then(
          function(response) {
            console.log(response);
            this.goals.push(response.data);
            this.newGoalSubject = "";
            this.newGoalBody = "";
            this.newGoalStartDate = "";
            this.newGoalEndDate = "";
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    },
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    redirectToRequests(goal) {
      this.$router.push("/goals/" + `${goal.id}`);
    }
  }
};
</script>
