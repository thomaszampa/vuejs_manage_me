<template>
  <div class="home">
    <h1>{{ message }}</h1>
    <p>Spotify info</p>
    <p>{{ userInfo }}</p>
  </div>
</template>

<style>
</style>

<script>
var axios = require("axios");
export default {
  data: function() {
    return {
      spotifyAccessToken: null,
      userInfo: {}
    };
  },
  created: function() {
    this.spotifyAccessToken = localStorage.getItem("spotifyAccessToken");
    var spotifyRequestOptions = {
      headers: {
        Authorization: "Bearer " + this.spotifyAccessToken,
        "Content-Type": "application/json"
      }
    };
    axios.get("https://api.spotify.com/v1/me", spotifyRequestOptions).then(response => {
      this.userInfo = response.data;
    });
  },
  methods: {},
  computed: {}
};
</script>
