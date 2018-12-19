<template>
  <div class="home">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>Overdue Requests</strong><a href="/#/" class="btn btn-primary pull-right">Back</a></h1>
            
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- Overdue Requests Index -->
    <div>
        <div class="row">
          <div v-for="overdueRequest in overdueRequests" class="col-lg-6">
              <div class="panel panel-red">
                  <div class="panel-heading"><i class="fa fa-tag"></i>
                      <a 
                        v-if="overdueRequest.request_attachment_url"
                        v-bind:href="`${overdueRequest.request_attachment_url}`"
                        class="fa fa-file pull-right"
                        target="_blank"
                      >
                      </a>
                  </div>
                  <div class="panel-body">
                      <h3>{{ overdueRequest.body }}</h3><br>
                      <small><i class="fa fa-clock-o text-muted"></i><em class="text-muted"> Created: {{ formatDate(overdueRequest.time_stamp) }}</em></small>
                  </div>
                  <div class="panel-footer">
                    <input v-on:click="updateCompleteStatus(overdueRequest);" v-model="overdueRequest.complete" type="checkbox" class="checkbox-primary-md"><small class="text-muted"> Complete</small> 
                    <p class="pull-right"><small><i class="fa fa-clock-o text-muted"></i><em><font color="red"> Due: {{ formatDate(overdueRequest.due_date) }}</font></em></small>
                    </p>
                  </div>
              </div>
              <!-- /.col-lg-4 -->
          </div>
        </div>
    </div>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");

export default {
  data: function() {
    return {
      goals: [],
      overdueRequests: [],
      errors: []
    };
  },
  created: function() {
    var self = this;
    axios.get("http://localhost:3000/api/goals").then(function(response) {
      console.log(response.data);
      self.goals = response.data;
      self.goals.forEach(function(g) {
        g.requests.forEach(function(r) {
          if (r.over_due) {
            self.overdueRequests.push(r);
          }
        });
      });
      console.log(self.overdueRequests);
    });
  },

  methods: {
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    updateCompleteStatus(overdueRequest) {
      console.log("updateCompleteStatus", overdueRequest.complete);
      this.errors = [];

      var params = {
        goal_id: overdueRequest.goal_id,
        body: overdueRequest.body,
        due_date: overdueRequest.due_date,
        complete: !overdueRequest.complete
      };

      console.log(params);
      axios
        .patch("http://localhost:3000/api/requests/" + overdueRequest.id, params)
        .then(
          function(response) {
            console.log(response);
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
    }
  },
  computed: {}
};
</script>
