<template>
  <link href="../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <div class="mainPage">

    <transition>
      <div v-if="!correctRecovery" class="block1">
        <div class="headerText">
          <p class="pt-3 text">Введите адрес электронной почты </p>
        </div>

        <div style="text-align: center">
          <input type="text" class="input text" v-model="email" @input="inputEvent">
        </div>

        <div v-if="!correctEmail" class = "wrongData" style="text-align: center">Некорректная почта</div>

        <div class="headerText">
          <button class="myBtn" @click="recoverAccountButton">Восстановить почту</button>
        </div>
      </div>

      <div v-else class="textMessage text">
        Письмо об восстановлении отправлено на почту <p style="font-weight: 600">{{this.email}}</p>
        <div style="text-align: center;">
          <router-link to="/auth" class="text">Вернуться на страницу авторизации</router-link>
        </div>
      </div>
    </transition>



  </div>

</template>

<script>
const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;

export default {
  name: "forgetPassword",
  data() {
    return {
      email : "",
      correctEmail : true,
      correctRecovery : false
    }
  },
  methods : {
    isEmailValid(value) {
      return EMAIL_REGEXP.test(value)},
    inputEvent() {
      this.correctEmail = true
    },
    recoverAccountButton(){
      if (!this.isEmailValid(this.email)){
        this.correctEmail = false
      }
      else {
        this.correctRecovery = true
        // Send to the server about recovery
      }
    }
  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.headerText {
  text-align: center !important;
  padding:1rem !important;
  font-family: Raleway,serif;

}

.block1 {
  width: 80%;
  margin-left:10%
  }

.mainPage {
  width: 30%;

  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: 1.5% auto auto;
  padding-bottom: 1.5%;
}

.myBtn{
  background-color: #0055BB !important;
  color: white !important;
  border-color: #0055BB !important;
  padding: 0.3rem;
  border-radius: 8px !important;
  font-weight: 300 !important;
}

.input {
  width: 90%;
  border-radius: 10px;
  border-color: #7C7F86;
  border-width: 2px 2px 2px 2px !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
}

.wrongData{
  color: red;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  padding-top: 2%;
}

.text {
  font-family: "Raleway", sans-serif;
}

.textMessage{
  text-align: center !important;
  padding: 0.25em !important;
  font-size: 20px;
}

</style>