

<template>
  <header>
    <div class="container-fluid head-top d-flexms-0">
      <div class="myHeader d-flex justify-content-between">
        <nav>
          <router-link to="/" @click="redirectToMainPage" >
            <img src="../../../static/figures/Mephi_small_Logo.png" alt="mephi Logo" class="justify-content-center align-items-center imageButtons imageMephi">
          </router-link>

        </nav>
        <div class="d-flex justify-content-end gap-3">
          <nav class="align-items-center justify-content-center me-">
            <router-link to="/profile">
              <img class= "imageButtons imageProfile" src="../../../static/figures/man_logo.png" alt="logo">
            </router-link>
          </nav>

          <nav class="align-items-center justify-content-center">
            <router-link to="/auth" @click="logout">
              <img class= "imageButtons imageLogOut" style="width: 40px" src="../../../static/figures/logout.png" alt="logo">
            </router-link>
          </nav>
        </div>

      </div>

    </div>
  </header>


</template>

<script>
export default {
  name: "header",
  methods: {
    redirectToMainPage(){
      this.$emit("redirectToMainPage")
    },
    logout() {
        //todo Post запрос. Сделать токен невалидным
        localStorage.setItem("access_token", '')
      localStorage.setItem("user_type", '')
    }
  }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';


@media (min-width: 800px) {
  header .head-top {
    background-color: #005faf;
    height: 4em;
  }

  .myHeader {
    margin:auto;
    width: 50%;
    padding: 0 !important;
    margin-top: 0 !important;

  }

  header .head-top nav {
    margin-top: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;
    height: 3em;
    font-size: medium;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .imageButtons {
    margin-top: 0.5em;
    color:black
  }
}

@media (max-width: 800px) {
  header .head-top {
    background-color: #005faf;
    height: 4em;
  }

  .myHeader {
    margin:auto;
    width: 80%;
    padding: 0 !important;
    margin-top: 0 !important;

  }

  header .head-top nav {
    margin-top: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;
    height: 3em;
    font-size: medium;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .imageButtons {
    margin-top: 0.5em;
    color:black;
  }

  .imageMephi{

  }
  .imageProfile{

  }
  .imageLogOut{

  }
}

@media (pointer: coarse) {
  header .head-top {
    background-color: #005faf;
    height: 3rem
  }

  .myHeader {
    margin:auto;
    width: 90%;
    padding: 0 !important;
    margin-top: 0 !important;
    height: 0 !important;


  }

  header .head-top nav {
    margin-top: 0 !important;
    margin-left: 0 !important;
    margin-right: 0 !important;
  }

  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;
    height: 3em;
    font-size: medium;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .imageButtons {
    margin-top: 0.5em;
    color:black;
  }

  .imageMephi{
    width: 50px;
  }
  .imageProfile{
    width: 21px;
  }
  .imageLogOut{
    width: 24px !important;
  }
}





</style>