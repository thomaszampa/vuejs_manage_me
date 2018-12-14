<template>
  <div class="home">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>Home</strong></h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- Header Panels -->
    <div class="row">
        <div class="col-lg-3 col-md-6">
            <div class="panel panel-green">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-tasks fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">{{ goals.length }}</div>
                            <div>New Goals!</div>
                        </div>
                    </div>
                </div>
                <a href="#">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="panel panel-primary">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-tags fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">26</div>
                            <div>New Requests!</div>
                        </div>
                    </div>
                </div>
                <a href="#">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="panel panel-yellow">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-shopping-cart fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">124</div>
                            <div>TBD!</div>
                        </div>
                    </div>
                </div>
                <a href="#">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="panel panel-red">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-exclamation-triangle fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">13</div>
                            <div>Overdue Requests!</div>
                        </div>
                    </div>
                </div>
                <a href="#">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <!-- Collapsible Panel & Notification Feed -->
    <div class="row">
      <!-- Collapsible Goals Feed -->
      <div class="col-md-8">
          <div class="panel panel-default">
              <div class="panel-heading">
                  <strong>GOALS</strong>
                  <button type="button" class="pull-right btn btn-primary btn-xs" data-toggle="modal" data-target="#exampleModal">New Goal</button>
              </div>
              <!-- .panel-heading -->
              <div class="panel-body">
                  <div v-for="goal in goals" class="panel-group" v-bind:key="goal.id" id="accordion">
                      <div class="panel panel-default">
                          <div class="panel-heading">
                              <h4 class="panel-title">
                                  <a data-toggle="collapse" data-parent="#accordion" :href="['#collapseOne' + goal.id]">
                                  <strong>{{ goal.subject }}</strong>
                                  <button v-on:click="redirectToRequests(goal);" class="pull-right btn btn-primary btn-xs">Requests</button> 
                                  </a>
                              </h4>                           
                          </div>
                          <div :id="['collapseOne' + goal.id]" class="panel-collapse collapse in">
                              <div class="panel-body">
                                  {{ goal.body }}
                                <div class="pull-right text-muted small">
                                  <em>Began: {{ formatDate(goal.start_date) }}</em>
                                </div><br>
                                <div class="pull-right text-muted small">
                                  <em>Completed By: {{ formatDate(goal.end_date) }}</em>
                                </div>                              
                              </div>

                          </div>
                      </div>
                  </div>
              </div>
              <!-- .panel-body -->
          </div>
      </div>
    </div>
    <!-- GOALS INDEX - LINK TO SHOW -->
<!--     <div class="container">
      <div class="row">
        <div v-for="goal in goals" class="col-4 mb-3 mt-3" v-bind:key="goal.id">
          <div class="card" style="width: 18rem;">
            <div class="card-body">
              <h3 class="card-subject">{{ goal.subject }}</h3>
              <p class="card-body">{{ goal.body }}</p>
              <p class="card-start_date">{{ goal.start_date }}</p>
              <p class="card-end_date">{{ goal.end_date }}</p>
              <a v-bind:href="`#/goals/update/${goal.id}`" class="btn btn-primary">Edit Goal</a><br />
              <a v-bind:href="`#/goals/${goal.id}`" class="btn btn-primary mb-3 mt-3">See Requests</a>
            </div>
          </div>
        </div>
      </div>
    </div> -->
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
