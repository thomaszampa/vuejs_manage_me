<template>
  <div class="update">
    <!-- GOALS UPDATE FORM -->
    <div class="container">
      <form>
        <div class="form-group">
          <label for="updatedGoalSubject">Subject</label>
          <input
            v-model="updatedGoalSubject"
            type="subject"
            class="form-control"
            id="updatedGoalSubject"
            aria-describedby="emailHelp"
            placeholder="Enter subject"
          />
        </div>
        <div class="form-group">
          <label for="updatedGoalBody">Body</label>
          <input
            v-model="updatedGoalBody"
            type="body"
            class="form-control"
            id="updatedGoalBody"
            aria-describedby="emailHelp"
            placeholder="Enter body"
          />
        </div>
        <div class="form-group">
          <label for="updatedGoalStartDate">Start Date</label>
          <div class="input-group date" id="datetimepicker1" data-target-input="nearest">
            <input
              id="updatedGoalStartDate"
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
          <label for="updatedGoalEndDate">End Date</label>
          <div class="input-group date" id="datetimepicker2" data-target-input="nearest">
            <input
              id="updatedGoalEndDate"
              type="text"
              class="form-control datetimepicker-input"
              data-target="#datetimepicker2"
            />
            <div class="input-group-append" data-target="#datetimepicker2" data-toggle="datetimepicker">
              <div class="input-group-text"><i class="fa fa-calendar"></i></div>
            </div>
          </div>
        </div>
        <a href="/#/">
          <button v-on:click="updateGoal();" type="submit" class="btn btn-primary">Update Goal</button>
        </a>
      </form>
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
      goals: [],
      updatedGoalSubject: "",
      updatedGoalBody: "",
      updatedGoalStartDate: "",
      updatedGoalEndDate: "",
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
    updateGoal() {
      console.log("updateGoal");
      this.errors = [];

      var params = {
        subject: this.updatedGoalSubject,
        body: this.updatedGoalBody,
        start_date: document.getElementById("updatedGoalStartDate").value,
        end_date: document.getElementById("updatedGoalEndDate").value
      };
      console.log(params);
      axios
        .patch("http://localhost:3000/api/goals/" + this.$route.params.id, params)
        .then(
          function(response) {
            console.log(response);
            this.goals.push(response.data);
            this.updatedGoalSubject = "";
            this.updatedGoalBody = "";
            this.updatedGoalStartDate = "";
            this.updatedGoalEndDate = "";
          }.bind(this)
        )
        .catch(
          function(error) {
            console.log(error);
            this.errors = error.response.data.errors;
          }.bind(this)
        );
      setTimeout(function() {
        window.location.href = "/#/";
      }, 100);
    }
  }
};
</script>
