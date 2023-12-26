<template>


  <div class="mainPage">

    <transition>
      <div v-if="!correctRecovery" class="block1">
        <div class="headerText">
          <p class="pt-3 text">Введите адрес электронной почты </p>
        </div>

        <div style="text-align: center">
          <input type="text" class="input text" v-model="email" @input="inputEvent" placeholder="Адрес электронной почты">
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


@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';


@media (min-width: 1080px){
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color-white: FFFFFF;
    --color-grey: A3A1A1;
    --color-blue: 0055BB;
    --color_white2: F3F5F6;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 20px;
    font-weight: 500;
  }



  .headerText {
    text-align: center !important;
    padding:1rem !important;
    font-family: Raleway,serif;
    font-size: 25px !important;
  }

  .block1 {
    width: 80%;
    margin-left:10%
  }

  .mainPage {
    width: 30%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin-left: auto;
    margin-right: auto;
    margin-top: 3rem;
    padding-bottom: 1rem;
    padding-top: 1rem;
  }

  .myBtn{
    background-color: #0055BB !important;
    color: white !important;
    border-color: #0055BB !important;
    padding: 0.3rem;
    margin: 1rem;
    border-radius: 0.7em !important;
    font-weight: 300 !important;
    height: 4rem !important;
    width: 13rem !important;
    font-size: 20px !important;
  }

  div input {
    border-width: 0.15em !important;
    height: 60px !important;
    border-radius: 0.7em !important;
    width: 100% !important;
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
    font-size: 20px;
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
    font-size: 20px !important;

  }
}

@media (max-width: 1080px){
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --color-white: FFFFFF;
    --color-grey: A3A1A1;
    --color-blue: 0055BB;
    --color_white2: F3F5F6;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem;
    font-weight: 500;
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
    width: 70%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1rem auto auto;
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
    margin-bottom: 0.8rem;
  }

  .wrongData{
    color: red;
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
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
    font-size: 1rem !important;
    margin-top: 1rem;
    margin-left: 1rem;
    margin-right: 1rem;

  }
}

</style>