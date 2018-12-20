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
            <div class="panel panel-yellow">
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
                <a href="/#/goalsRequests">
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
                            <div class="huge">{{ requests.length }}</div>
                            <div>New Requests!</div>
                        </div>
                    </div>
                </div>
                <a href="/#/goalsRequests">
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
                            <div class="huge"> {{ overdueRequests.length }} </div>
                            <div>Overdue Requests!</div>
                        </div>
                    </div>
                </div>
                <a href="/#/overdueRequests">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
        <div class="col-lg-3 col-md-6">
            <div class="panel panel-green">
                <div class="panel-heading">
                    <div class="row">
                        <div class="col-xs-3">
                            <i class="fa fa-spotify fa-5x"></i>
                        </div>
                        <div class="col-xs-9 text-right">
                            <div class="huge">124</div>
                            <div>New Followers!</div>
                        </div>
                    </div>
                </div>
                <a href="/#/statistics">
                    <div class="panel-footer">
                        <span class="pull-left">View Details</span>
                        <span class="pull-right"><i class="fa fa-arrow-circle-right"></i></span>
                        <div class="clearfix"></div>
                    </div>
                </a>
            </div>
        </div>
    </div>
    <!-- Collapsible Panel -->
    <div class="row">
      <!-- Collapsible Goals Feed -->
      <div class="col-md-8">
          <div class="panel panel-default">
              <div class="panel-heading">
                <i class="fa fa-tasks"></i><strong> Goals</strong>
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
      <!-- SPOTIFY -->
      <div class="col-lg-4">
          <div class="panel panel-default">
              <div class="panel-heading">
                  <i class="fa fa-spotify"></i><strong> Spotify</strong><a class="btn btn-primary btn-xs pull-right" href="https://accounts.spotify.com/authorize?client_id=1b3820e9ab614deeb214ed33ca5d1922&response_type=code&redirect_uri=http://localhost:8080&scope=user-top-read">Spotify | Login</a>
              </div>
              <!-- /.panel-heading -->
              <div class="panel-body" v-if="userInfo.images && userTopArtists.items">
                  <!-- Nav tabs -->
                  <ul class="nav nav-tabs">
                      <li><a href="#profile" data-toggle="tab">Profile</a>
                      </li>
                      <li><a href="#fans" data-toggle="tab">Fans</a>
                      </li>
                      <li><a href="#competition" data-toggle="tab">Competition</a>
                      </li>
                  </ul><br>

                  <!-- Tab panes -->
                  <div class="tab-content">
                      <div class="text-center tab-pane fade" id="profile">
                        <div v-if="userInfo.images">
                          <img v-bind:src="`${ userInfo.images[0].url }`" class="img-circle" width="100" height="100">
                          <h2>Hello {{ userInfo.display_name }}!</h2>
                          <em><small class="text-muted">Followers: {{ userInfo.followers.total }}</small></em>
                        </div><br>
                      </div>
                      <div class="tab-pane fade" id="fans">
                          <div class="row text-center">
                            <div class="col-lg-6">
                              <div class="well">
                                <i class="fa fa-male fa-5x"></i>
                                <h2><strong>35%</strong></h2>
                              </div>
                            </div>
                            <div class="col-lg-6">
                              <div class="well">
                                <i class="fa fa-female fa-5x"></i>
                                <h2><strong>65%</strong></h2>
                              </div>
                            </div>
                          </div>
                          <div class="row text-center">
                            <div class="col-lg-12">
                              <div class="well">
                                <i class="fa fa-globe fa-5x"></i>
                                <h2>Congratulations!</h2>
                                <h3>You have fans supporting you all over the globe!</h3><br>
                                <h4>USA: 60% | JAPAN: 23% | NORWAY: 17%</h4>
                              </div>
                            </div>
                          </div>
                      </div>
                      <div class="tab-pane fade" id="competition">
                        <div class="col-lg-12">
                            <div class="panel panel-default">
                                <div v-for="item in userTopArtists.items.slice(0, 3)" class="panel-body">
                                  <div class="col-lg-12 well">
                                    <div class="row">
                                      <div class="col-md-5">
                                        <img class="img-rounded" width="125" height="125" v-bind:src="`${ item.images[0].url }`">
                                      </div>
                                      <div class="col-md-7">
                                        <h2>{{ item.name }}</h2>
                                        <em><small class="text-muted">Genre: {{ item.genres[0] }}</small></em>
                                        <h5>Followers: {{ item.followers.total }}</h5>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                            </div>
                        </div>
                      </div>
                  </div>
              </div>
              <!-- /.panel-body -->
          </div>
          <!-- /.panel -->
      </div>
    </div>
    <!-- GRAPHS -->
    <div class="row">
      <div class=col-lg-12>
        <div class="row">
          <div class="col-md-4">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <i class="fa fa-play fa-fw"></i><strong> Monthly Streaming Snapshot</strong>
                </div>
                <div class="panel-body">
                    <div id="morris-donut-chart"></div>
                </div>
                <!-- /.panel-body -->
            </div>
          </div>
          <div class="col-lg-8">
            <div class="panel panel-default">
                <div class="panel-heading">
                    <i class="fa fa-usd fa-fw"></i> <strong>Sales Since Freshman Release</strong>
                </div>
                <!-- /.panel-heading -->
                <div class="panel-body">
                    <div id="morris-area-chart"></div>
                </div>
                <!-- /.panel-body -->
            </div>
          </div>
        </div>
        <div>
          <button type="button" class="pull-right btn btn-primary btn-lg btn-block">More Statistics</button><br>
          <span></span><br>
        </div><br>
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
      requests: [],
      overdueRequests: [],
      newGoalSubject: "",
      newGoalBody: "",
      newGoalStartDate: "",
      newGoalEndDate: "",
      spotifyAccessToken: "",
      userInfo: {},
      userTopArtists: {},
      errors: []
    };
  },
  created: function() {
    // SPOTIFY AUTHENTICATION AND ACCESS TOKEN QUERY
    var queryParams = window.location.search;
    if (queryParams) {
      var code = queryParams.split("?code=")[1];
      axios.get("http://localhost:3000/api/spotify/callback?code=" + code).then(response => {
        localStorage.setItem("spotifyAccessToken", response.data.token);
        this.spotifyAccessToken = response.data.token;
        window.location.href = "/";
      });
    }

    this.spotifyAccessToken = localStorage.getItem("spotifyAccessToken");

    var spotifyRequestOptions = {
      headers: {
        Authorization: "Bearer " + this.spotifyAccessToken,
        "Content-Type": "application/json"
      }
    };
    axios.get("https://api.spotify.com/v1/me", spotifyRequestOptions).then(response => {
      this.userInfo = response.data;
      console.log(this.userInfo);
    });

    axios.get("https://api.spotify.com/v1/me/top/artists", spotifyRequestOptions).then(response => {
      this.userTopArtists = response.data;
      console.log("userTopArtists", this.userTopArtists);
    });

    // AXIOS REQUEST FOR GOALS AND REQUESTS
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

      self.goals.forEach(function(g) {
        g.requests.forEach(function(r) {
          self.requests.push(r);
        });
      });

      console.log(self.requests);
      console.log(self.overdueRequests);
    });
  },

  mounted: function() {
    // DATETIMEPICKER FORMAT
    $("#datetimepicker1").datetimepicker({ format: "DD/MM/YY HH:mm" });
    $("#datetimepicker2").datetimepicker({ format: "DD/MM/YY HH:mm" });
    // GRAPHICAL DUMMY DATA
    Morris.Donut({
      element: "morris-donut-chart",
      data: [
        { label: "Spotify", value: 12 },
        { label: "Apple Music", value: 30 },
        { label: "Amazon Music", value: 20 }
      ],
      colors: ["#1DB954", "#69a6f9", "#ff9900"]
    });
    Morris.Area({
      element: "morris-area-chart",
      data: [
        {
          period: "2010 Q1",
          iTunes: 2666,
          BandCamp: null,
          Retail: 2647
        },
        {
          period: "2010 Q2",
          iTunes: 2778,
          BandCamp: 2294,
          Retail: 2441
        },
        {
          period: "2010 Q3",
          iTunes: 4912,
          BandCamp: 1969,
          Retail: 2501
        },
        {
          period: "2010 Q4",
          iTunes: 3767,
          BandCamp: 3597,
          Retail: 5689
        },
        {
          period: "2011 Q1",
          iTunes: 6810,
          BandCamp: 1914,
          Retail: 2293
        },
        {
          period: "2011 Q2",
          iTunes: 5670,
          BandCamp: 4293,
          Retail: 1881
        },
        {
          period: "2011 Q3",
          iTunes: 4820,
          BandCamp: 3795,
          Retail: 1588
        },
        {
          period: "2011 Q4",
          iTunes: 15073,
          BandCamp: 5967,
          Retail: 5175
        },
        {
          period: "2012 Q1",
          iTunes: 10687,
          BandCamp: 4460,
          Retail: 2028
        },
        {
          period: "2012 Q2",
          iTunes: 8432,
          BandCamp: 5713,
          Retail: 1791
        }
      ],
      xkey: "period",
      ykeys: ["iTunes", "BandCamp", "Retail"],
      labels: ["iTunes", "BandCamp", "Retail"],
      pointSize: 2,
      hideHover: "auto",
      resize: true
    });
  },

  methods: {
    // CREATE GOAL
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
    // MISC. METHODS
    formatDate(date) {
      return moment(date).format("MMMM Do YYYY, h:mm:ss a");
    },
    redirectToRequests(goal) {
      this.$router.push("/goals/" + `${goal.id}`);
    },
    redirectToStatistics() {
      this.$router.push("/statistics");
    }
  }
};
</script>
