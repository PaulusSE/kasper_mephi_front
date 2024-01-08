<template>
  <div class="mainPage">
    <div class="container-fluid my-2">
      <div class="container largeLogo">
        <img class='imgSize' src="../../../static/figures/Mephi_Logo.png" alt="Логотип Мифи"/>
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
              <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Адресс электронной почты" @click="inputEvent" v-model="login" style="font-size: 1rem">
            </div>
            <div class="form-group">
              <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Пароль" @click="inputEvent" v-model="password" style="font-size: 1rem">
            </div>
          </form>
        </div>

        <div>

        </div>

        <transition name="slide-fade">
          <div v-show="showWrongAnswerString" class = "wrongPassword">Неверный пароль</div>
        </transition>

        <transition name="slide-fade">
          <div v-show="showEmptyfieldError" class = "wrongPassword">Поля не должны быть пустыми</div>
        </transition>

        <transition name="slide-fade">
          <div v-show="showEmptyfieldErrorLanguage" class = "wrongPassword">Поля должны содержать символы латинского алфавита</div>
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

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const regularSymbolForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

import axios from "axios";



export default {

  data() {
    return {
      login: '',
      password: '',
      status: false,
      showWrongAnswerString: false,
      showEmptyfieldError : false,
      showEmptyfieldErrorLanguage : false,
      currentLogin: '',
      currentPassword: '',
      type: '',
      data: []
    }
  },
  methods: {
    async authorizate(){
      if (this.login.length === 0 || this.password.length === 0){
        this.showEmptyfieldError = true
        return
      }

      //todo проверка на соответствие логина и пароля форматам
      // if (!(this.checkPassword(this.password) && !this.isEmailValid(this.login))){
      //   this.showEmptyfieldErrorLanguage = true
      //   return
      // }

      try {
        const response = await axios.post( this.IP + "/authorization/authorize",
            {
              email : this.login,
              password : this.password
                }

        )

        if (response.status === 200){
          this.data = await response.data
          localStorage.setItem("access_token", this.data.token)
          localStorage.setItem("userType", this.data.client_type)
          localStorage.setItem("registered", this.data.registered)
          this.$store.dispatch("updateUserType", this.data.client_type)

          if(!this.data.registered)
            this.$router.push('/registration')

          this.$router.push('/')
        }
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },


    inputEvent(){
      if (this.showWrongAnswerString === true){
        this.showWrongAnswerString = false
      }

      if (this.showEmptyfieldError === true){
        this.showEmptyfieldError = false
      }

      if (this.showEmptyfieldErrorLanguage === true){
        this.showEmptyfieldErrorLanguage = false
      }


    },
    isEmailValid(value) {
      return EMAIL_REGEXP.test(value)},

    checkPassword(pass)
    {
      return regularSymbolForPassword.test(pass);
    },
  },
    async beforeMount() {
},
  mounted() {
  }
}
</script>



<style scoped>



@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';

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

@media (min-width: 1080px) {
  :root {
    --color-white: FFFFFF;
    --color-grey: A3A1A1;
    --color-blue: 0055BB;
    --color_white2: F3F5F6;
  }

  .imgSize{
    width: 200px !important;
  }

  .largeLogo {
    margin-top: 10rem;
    text-align: center;
    width: auto;
    height: auto;

  }

  .textMainPage {
    text-align: center;
    font-size: x-large;
    font-family: "Raleway", sans-serif;
    color: #a3a1a1;
    font-weight: 600;
  }



  .loggining {
    font-size: 1.7rem !important;
    height: 3.5rem !important;
    width: 8rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding: 0 !important;
    margin: 0 !important;
  }



  .mainPage {
    width: 40%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: auto auto 5%;
  }

  div input {
    border-width: 0.15em !important;
    height: 3rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }



  .btnBlock {
    padding:3em !important;
    padding-bottom:2.5em !important;
  }


  .descriptionBlock {
    margin-bottom: 3rem !important;
    width: 85% !important;
  }

  .authorization {
    margin:auto !important;
    width:85% !important;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 2%;
  }
}

@media (max-width: 1080px) {
  :root {
    --color-white: FFFFFF;
    --color-grey: A3A1A1;
    --color-blue: 0055BB;
    --color_white2: F3F5F6;
  }

  .imgSize{
    width: 200px !important;
  }

  .largeLogo {
    margin-top: 10rem;
    text-align: center;
    width: auto;
    height: auto;

  }

  .textMainPage {
    text-align: center;
    font-size: x-large;
    font-family: "Raleway", sans-serif;
    color: #a3a1a1;
    font-weight: 600;
  }



  .loggining {
    font-size: 1.7rem !important;
    height: 3.5rem !important;
    width: 7rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding: 0 !important;
    margin: 0 !important;
  }



  .mainPage {
    width: 60%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: auto auto 5%;
  }

  div input {
    border-width: 0.15em !important;
    height: 3rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }



  .btnBlock {
    padding:3em !important;
    padding-bottom:2.5em !important;
  }


  .descriptionBlock {
    margin-bottom: 3rem !important;
    width: 85% !important;
  }

  .authorization {
    margin:auto !important;
    width:85% !important;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 2%;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  :root {
    --color-white: FFFFFF;
    --color-grey: A3A1A1;
    --color-blue: 0055BB;
    --color_white2: F3F5F6;
  }

  .imgSize{
    width: 100px !important;
  }

  .largeLogo {
    margin-top: 2rem;
    text-align: center;
    width: auto;
    height: auto;

  }

  .textMainPage {
    text-align: center;
    font-size: 1rem;
    font-family: "Raleway", sans-serif;
    color: #a3a1a1;
    font-weight: 500;
  }



  .loggining {
    font-size: 1rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 1em !important;
    padding: 0 !important;
    margin: 0 !important;
    width: 5rem !important;
    height: 4rem !important;
  }



  .mainPage {
    width: 80%;
    height: 100%;
    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: auto auto 5%;
  }

  div input {
    border-width: 0.15em !important;
    height: 2rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }



  .btnBlock {
  }


  .descriptionBlock {

    width: 85% !important;
  }

  .authorization {
    margin:auto !important;
    width:85% !important;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    text-align: center;
    padding-top: 2%;
  }
}



</style>