

<template>

  <header>
    <div class="container-fluid head-top d-flex justify-content-between ms-0">
      <nav >
        <router-link to="/" @click="redirectToMainPage">
          <img src="../../../static/figures/Mephi_small_Logo.png" alt="mephi Logo" class="justify-content-center align-items-center">
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
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';

@import "../../../static/css/studentProfile.css";



</style>