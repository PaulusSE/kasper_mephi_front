<link href="../../../static/css/studentProfile.css" rel="stylesheet">
<link href="static/css/bootstap.css" rel="stylesheet">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">


<template>

  <header>
    <div class="container-fluid head-top d-flex justify-content-between">
      <nav >
        <router-link to="/" @click="redirectToMainPage">
          <img src="static/figures/Mephi_small_Logo.png" alt="mephi Logo" class="justify-content-center align-items-center">
        </router-link>

      </nav>

      <nav class="align-items-center justify-content-center">
        <router-link to="/profile">
          <img style="margin-top: 0.5em; color:black" src="../../../static/figures/man_logo.png" alt="logo">
        </router-link>


      </nav>
    </div>
  </header>


</template>

<script>
export default {
  name: "header",
  methods: {
    redirectToMainPage(){
      console.log("Redirecting to main page")
      this.$emit("redirectToMainPage")
    }
  }
}
</script>

<style scoped>

</style>