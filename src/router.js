import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import Show from "./views/Show.vue";
import Signup from "./views/Signup.vue";
import Login from "./views/Login.vue";
import Logout from "./views/Logout.vue";
import Update from "./views/goalUpdate.vue";
import Profile from "./views/userProfile.vue";
import Statistics from "./views/Statistics.vue";
import overdueRequests from "./views/overdueRequests.vue";
import goalsRequests from "./views/goalsRequests.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/signup",
      name: "signup",
      component: Signup
    },
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/logout",
      name: "logout",
      component: Logout
    },
    {
      path: "/goals/:id",
      name: "show",
      component: Show
    },
    {
      path: "/goals/update/:id",
      name: "update",
      component: Update
    },
    {
      path: "/profile",
      name: "profile",
      component: Profile
    },
    {
      path: "/statistics",
      name: "statistics",
      component: Statistics
    },
    {
      path: "/overdueRequests",
      name: "overdueRequests",
      component: overdueRequests
    },
    {
      path: "/goalsRequests",
      name: "goalsRequests",
      component: goalsRequests
    }
  ]
});
