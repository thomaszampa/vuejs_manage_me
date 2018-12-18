<template>
  <div id="app">
    <div id="wrapper">
        <!-- Navigation -->
        <nav class="navbar navbar-default navbar-static-top" role="navigation" style="margin-bottom: 0">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target=".navbar-collapse">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <a class="navbar-brand" href="index.html"><strong>MANAGE.ME</strong></a>
            </div>
            <!-- /.navbar-header -->

            <ul class="nav navbar-top-links navbar-right">
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-tasks fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-tasks">
                        <li v-for="goal in goals" v-bind:key="goal.id">
                            <a v-bind:href="`/#/goals/${goal.id}`">
                                <div>
                                    <p>
                                        <strong>{{ goal.subject }}</strong>
                                        <span class="pull-right text-muted">40% Complete</span>
                                    </p>
                                    <div class="progress progress-striped active">
                                        <div class="progress-bar progress-bar-success" role="progressbar" aria-valuenow="40" aria-valuemin="0" aria-valuemax="100" style="width: 40%">
                                            <span class="sr-only">40% Complete (success)</span>
                                        </div>
                                    </div>
                                </div>
                            </a>
                        </li>
                    </ul>
                    <!-- /.dropdown-tasks -->
                </li>
                <!-- /.dropdown -->
                <li class="dropdown">
                    <a class="dropdown-toggle" data-toggle="dropdown" href="#">
                        <i class="fa fa-user fa-fw"></i> <i class="fa fa-caret-down"></i>
                    </a>
                    <ul class="dropdown-menu dropdown-user">
                        <li><a href="/#/profile"><i class="fa fa-user fa-fw"></i> User Profile</a>
                        </li>
                        <li class="divider"></li>
                        <li><a v-on:click="logout();" href="/#/login"><i class="fa fa-sign-out fa-fw"></i> Login | Logout</a>
                        </li>
                    </ul>
                    <!-- /.dropdown-user -->
                </li>
                <!-- /.dropdown -->
            </ul>
            <!-- /.navbar-top-links -->

            <div class="navbar-default sidebar" role="navigation">
                <div class="sidebar-nav navbar-collapse">
                    <ul class="nav" id="side-menu">
                        <li class="sidebar-search">
                            <div class="input-group custom-search-form">
                                <input type="text" class="form-control" placeholder="Search...">
                                <span class="input-group-btn">
                                <button class="btn btn-default" type="button">
                                    <i class="fa fa-search"></i>
                                </button>
                            </span>
                            </div>
                            <!-- /input-group -->
                        </li>
                        <li>
                            <a href="/#/"><i class="fa fa-home fa-fw"></i> Home</a>
                        </li>
                        <li class="active">
                            <a href="/#/goalsRequests"><i class="fa fa-tasks fa-fw"></i> Goals | Requests<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level collapse in">
                                <li>
                                    <a href="/#/overdueRequests"><i class="fa fa-exclamation-triangle fa-fw"></i> Overdue Requests</a>
                                </li>
                            </ul>
                        </li>
                        <li class="active">
                            <a href="/#/statistics" data-toggle="collapse"><i class="fa fa-bar-chart-o fa-fw"></i> Statistics<span class="fa arrow"></span></a>
                            <ul class="nav nav-second-level collapse in">
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-spotify"></i> Spotify</a>
                                </li>
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-apple"></i> Apple Music</a>
                                </li>
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-amazon"></i> Amazon Music</a>
                                </li>
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-youtube"></i> Youtube</a>
                                </li>
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-instagram"></i> Instagram</a>
                                </li>
                                <li>
                                    <a href="/#/statistics"><i class="fa fa-facebook"></i> Facebook</a> 
                                </li>
                                <li> 
                                    <a href="/#/statistics"><i class="fa fa-twitter"></i> Twitter</a>                                   
                                </li>
                            </ul>
                            <!-- /.nav-second-level -->
                        </li>
                    </ul>
                </div>
                <!-- /.sidebar-collapse -->
            </div>
            <!-- /.navbar-static-side -->
        </nav>

        <div id="page-wrapper">

          <router-view />

        </div>
        <!-- /#page-wrapper -->

    </div>
    <!-- /#wrapper -->
  </div>
</template>

<style>
</style>

<script>
import axios from "axios";

export default {
    data: function() {
        return {
            goals: [],
            requests: [],
            errors: []
        };
    },
    methods: {
        logout: function() {
            delete axios.defaults.headers.common["Authorization"];
            localStorage.removeItem("jwt");
            this.$router.push("/");
            console.log("You have successfully logged out!");
        }
    },
    created: function() {
        axios.get("http://localhost:3000/api/goals").then(
            function(response) {
                console.log(response.data);
                this.goals = response.data;
            }.bind(this)
        );
    }
};
</script>
