

<template>
  <link href="../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <div class="mainPage">
    <div class="container-fluid my-2">
      <div class="container largeLogo">
        <img src="../../../static/figures/Mephi_Logo.png" alt="Логотип Мифи"/>
      </div>
    </div>

    <div class="container-fluid descriptionBlock">
      <div class="container">
        <p class="textMainPage my-1">Доступ к информационным системам</p>
        <p class="textMainPage">НИЯУ МИФИ</p>
      </div>
    </div>

    <div class="container-fluid">
      <div class="container" style="margin-bottom: 3rem">


        <div class="form-floating mb-4 col-6 authorization">
          <form>
            <div class="form-group mb-3">
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Логин" @click="inputEvent" v-model="login" style="font-size: 20px">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" @click="inputEvent" v-model="password" style="font-size: 20px">
            </div>
          </form>
        </div>

        <div>

        </div>

        <transition name="slide-fade">
          <div v-show="showWrongAnswerString" class = "wrongPassword">Неверный пароль</div>
        </transition>

      </div>
    </div>

    <div class="container-fluid btnBlock">
      <div class="container" style="text-align: center;">
        <div>
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="authorizate()">Войти</button>
        </div>
        <div style="text-align: center;">
          <router-link to="/passwordrecovery">Забыли пароль?</router-link>
        </div>

      </div>
    </div>

  </div>


</template>


<script>


import axios from "axios";

export default {

  data() {
    return {
      login: '',
      password: '',
      status: false,
      showWrongAnswerString: false,
      currentLogin: '123',
      currentPassword: '123',
      type: '',
      data: []
    }
  },
  methods: {
    authorizate(){
      if (this.login === this.currentLogin && this.password === this.currentPassword){
          this.status = true;
          this.type = 'student';
        this.$router.push('/users')
      }
      else {
        this.showWrongAnswerString = true;
      }
    },
    inputEvent(){
      if (this.showWrongAnswerString === true){
        this.showWrongAnswerString = false
      }
    },
  },
    async beforeMount() {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts')
        this.data = await response.data
      }
      catch (e) {
        console.log(e)
      }
}
}




</script>



<style scoped>
.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}





</style>