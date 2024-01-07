<template>

    <div class="mainPage">
      <div class="container-fluid my-2">
        <div class="container logo">
          <img src="/static/figures/Mephi_Logo.png" alt="Логотип Мифи"/>
        </div>
      </div>

    <div class="text404 pb-4">
      <p>Проводятся технические работы</p>
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
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';

*{
  margin:0;
  padding: 0;
}

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
  text-align:center;
  margin-bottom: 2%;
}

.mainPage {
  width: 40%;

  height: 80%;
  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: auto auto 5%;
}

</style>