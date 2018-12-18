<template>
  <div class="home">
    <!-- Home Header -->
    <div class="row">
        <div class="col-lg-12">
            <h1 class="page-header"><strong>Overdue Requests</strong></h1>
        </div>
        <!-- /.col-lg-12 -->
    </div>
    <!-- Overdue Requests Index -->
    <div>
        <div class="col-lg-6">
            <div class="panel panel-red">
                <div class="panel-heading">
                    Red Panel
                </div>
                <div class="panel-body">
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum tincidunt est vitae ultrices accumsan. Aliquam ornare lacus adipiscing, posuere lectus et, fringilla augue.</p>
                </div>
                <div class="panel-footer">
                    Panel Footer
                </div>
            </div>
            <!-- /.col-lg-4 -->
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

  methods: {},

  computed: {}
};
</script>
