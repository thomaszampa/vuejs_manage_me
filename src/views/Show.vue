<template>
  <div class="show">
    <!-- Show Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header">
              <strong>{{ goal.subject }}</strong>
              <a href="/#/" class="btn btn-primary pull-right">Back</a>
            </h1>       
        </div>
        
        <!-- /.col-lg-12 -->
    </div>
    <!-- PROGRESS BAR -->
    <div>
      <p>
        <strong>Progress</strong><br>
        <span class="text-muted"><em>40% Complete</em></span><br>
      </p>
        <div class="progress progress-striped">
            <div class="progress-bar progress-bar-success active" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                <span class="sr-only">40% Complete (success)</span>
            </div>
        </div>
    </div>
    <!-- REQUEST INDEX TIMELINE -->
    <div class="panel panel-default">
        <div class="panel-heading">
            <i class="fa fa-clock-o fa-fw"></i><strong>Request Timeline</strong>
        </div>
        <!-- /.panel-heading -->
        <div class="panel-body">
            <ul class="timeline">
                <li v-for="(request, index) in goal.requests" v-bind:class="{'timeline-inverted': index % 2 !== 0}">
                    <div class="timeline-badge"><i class="fa fa-check"></i>
                    </div>
                    <div class="timeline-panel">
                        <div class="timeline-heading">
                            <h4 class="timeline-title">{{ request.body }}</h4>
                            <small><i class="fa fa-clock-o text-muted"></i><em class="text-muted"> Created: {{ formatDate(request.time_stamp) }}</em></small>
                          <div class="timeline-body">
                           <p class="pull-right"><small><i class="fa fa-clock-o text-muted"></i><em><font color="red"> Due: {{ formatDate(request.due_date) }}</font></em></small>
                            </p>
                          </div>
                        </div>
                    </div>
                </li>
            </ul>
            <button type="button" class="pull-right btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#exampleModal">New Request</button>
        </div>
        <!-- /.panel-body -->
    </div>
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
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
            <h5 class="modal-title" id="requestCreateModal"><strong class="huge">New Request</strong></h5>
          </div>
          <!-- REQUEST CREATE FORM -->
          <div class="modal-body">
            <form>
              <div class="form-group">
                <label for="newRequestBody">Body</label>
                <input
                  v-model="newRequestBody"
                  type="text"
                  class="form-control"
                  id="InputBody"
                  placeholder="Enter Body"
                />
              </div>
              <!-- DATE TIME SELETOR -->
              <div class="form-group">
                <label for="newRequestDueDate">Due Date</label>
                <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
                  <input
                    id="newRequestDueDate"
                    type="text"
                    class="form-control datetimepicker-input"
                    data-target="#datetimepicker1"
                  />
                  <div class="input-group-append" data-target="#datetimepicker1" data-toggle="datetimepicker">
                    <div class="input-group-text"><i class="fa fa-calendar"></i></div>
                  </div>
                </div>
              </div>
              <!-- ATTACHMENT SELECTOR -->
              <div class="form-group">
                <label for="newRequestAttachment">Attachment</label>
                <input type="file" v-on:change="setFile($event);" ref="fileInput" />
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button v-on:click="createRequest();" type="button" class="btn btn-primary" data-dismiss="modal">
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
var axios = require("axios");

export default {
  data: function() {
    return {
      goal: {},
      requests: [],
      newRequestGoalId: "",
      newRequestBody: "",
      newRequestDueDate: "",
      newRequestAttachment: "",
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
  mounted: function() {
    $("#datetimepicker1").datetimepicker({ format: "DD/MM/YY HH:mm" });
  },
  methods: {
    setFile: function(event) {
      if (event.target.files.length > 0) {
        this.newRequestAttachment = event.target.files[0];
        console.log("newRequestAttachment", this.newRequestAttachment);
      }
    },
    createRequest() {
      console.log("createRequest");
      this.errors = [];

      // var params = {
      //   goal_id: this.goal.id,
      //   body: this.newRequestBody,
      //   due_date: document.getElementById("newRequestDueDate").value
      // };

      var formData = new FormData();
      formData.append("goal_id", this.goal.id);
      formData.append("body", this.newRequestBody);
      formData.append("due_date", document.getElementById("newRequestDueDate").value);
      formData.append("request_attachment", this.newRequestAttachment);

      console.log(params);
      axios
        .post("http://localhost:3000/api/requests", params)
        .then(
          function(response) {
            console.log(response);
            this.request.push(response.data);
            this.newRequestGoalId = "";
            this.newRequestBody = "";
            this.newRequestDueDate = "";
            this.newRequestAttachment = "";
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
    }
  },
  computed: {}
};
</script>
