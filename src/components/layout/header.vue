

<template>
  <header>
    <div class="container-fluid head-top d-flex ms-0">
      <div class="myHeader d-flex justify-content-between">
        <nav>
          <router-link to="/" @click="redirectToMainPage" >
            <img src="../../../static/figures/Mephi_small_Logo.png" alt="mephi Logo" class="justify-content-center align-items-center imageButtons imageMephi">
          </router-link>

        </nav>
        <div class="d-flex justify-content-end gap-2">
<!--          <nav class="align-items-center justify-content-center">-->
<!--            <router-link to="/profile" class="d-flex gap-3" style="text-decoration: none">-->
<!--              <img class= "imageButtons imageProfile" src="../../../static/figures/man_logo.png" alt="logo">-->
<!--              <div class="buttonProfileText"> ФИО аспиранта</div>-->
<!--            </router-link>-->
<!--          </nav>-->

          <nav class="align-items-center justify-content-center">
            <router-link to="/profile">
              <img class= "imageButtons imageLogOut" style="width: 40px" src="../../../static/figures/man_logo.png" alt="logo">
            </router-link>
          </nav>

          <nav class="align-items-center justify-content-center">
            <router-link to="/profile" style="text-decoration: none">
              <div class="buttonProfileText">{{userName}}</div>
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
      localStorage.setItem("studentId", '')
      localStorage.setItem("access_token", '')
      localStorage.setItem("studentID", '')
      localStorage.setItem("userType", '')
      localStorage.setItem("registered", '')
      localStorage.setItem("teacherId", '')
    }
  },
  data(){
    return {
      userName : 'СИ'
    }
  },
  beforeMount() {
    if (localStorage.getItem("user_type") === 'admin'){
      this.userName = 'Администратор'
      return
    }
    //todo else
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
    padding-bottom: 0.25rem;
  }

  .myHeader {
    margin:auto;
    width: 70%;
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

  .imageMephi{
    width: 80px !important;
  }
  .imageProfile{
    width: 35px !important;
  }
  .imageLogOut{
    width: 35px !important;
  }

  .buttonProfileText{
    margin-top:12px;
    text-decoration: none;
    font-size: 1rem;
    color:rgb(206,224,229)
  }
}

@media (max-width: 800px) {
  header .head-top {
    background-color: #005faf;
    padding-bottom: 0.25rem;
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
    width: 70px;
  }
  .imageProfile{
    width: 30px;
  }
  .imageLogOut{
    width: 30px !important;
  }

  .buttonProfileText{
    margin-top:10px;
    text-decoration: none;
    font-size: 0.9rem;
    color:rgb(206,224,229)
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  header .head-top {
    background-color: #005faf;
    padding-bottom: 0.25rem;
  }

  .myHeader {
    margin:auto;
    width: 90%;
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
    width: 50px;
  }
  .imageProfile{
    width: 20px;
  }
  .imageLogOut{
    width: 20px !important;
  }

  .buttonProfileText{
    text-decoration: none;
    font-size: 0.8rem;
    color:rgb(206,224,229)
  }
}





</style>