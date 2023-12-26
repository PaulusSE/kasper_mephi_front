<template>

    <link href="static/css/authorization.css" rel="stylesheet">
    <link href="static/css/bootstap.css" rel="stylesheet">
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">


    <div class="mainPage">
      <div class="container-fluid my-2">
        <div class="container logo">
          <img src="/static/figures/Mephi_Logo.png" alt="Логотип Мифи"/>
        </div>
      </div>

    <div style="text-align:center; margin-bottom: 2%">
      <router-link to="/" class="5 text404">Главная страница</router-link>
    </div>

    <div class="text404" style="text-align:center;padding-bottom: 20px">
      <p >Page not found</p>
    </div>




    </div>
  </template>

<script>
import header from "@/components/layout/header.vue"
export default {
  name: "pageNotFound",
  components: {
    "pageHeader" : header,
  }
}
</script>

<style scoped>

.logo {
  margin-top: 10rem;
  text-align: center;
  width: 100%;
  height: 300px;
}

.text404 {
  font-family: "Raleway", sans-serif;
  color: #7c7f86;
  font-size: 25px;
  font-weight: 500;
}

</style>