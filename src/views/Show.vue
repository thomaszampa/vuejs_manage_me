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
            <h5 class="modal-title" id="requestCreateModal">New Request</h5>
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
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
    <!-- Button trigger modal -->
    <button type="button" class="btn btn-primary mb-3 mt-3" data-toggle="modal" data-target="#exampleModal">
      New Request
    </button>
    <!-- BACK BUTTON -->
    <div><a href="/#/" class="btn btn-primary">Back to all Goals</a></div>
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
