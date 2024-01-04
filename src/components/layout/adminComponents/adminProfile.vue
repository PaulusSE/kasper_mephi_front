<template>

  <change-password-notification
      v-if="stateOfSending"
      :result-of-sending = resultOfSending
  ></change-password-notification>

  <div class="mainPage mb-2">
    <div class="container-fluid justify-content-between d-flex">
      <nav>
        <p class="mainText">Смена пароля</p>
      </nav>


    </div>
    <div class="container-fluid justify-content-between">
      <nav style="width: 50%">
        <label class="text ms-0">Старый пароль</label>
        <input type="password" @input="inputEvent" v-model="currentPassword">
      </nav>

      <nav style="width: 50%">
        <label class="text ms-0">Новый пароль</label>
        <input type="password" @input="inputEvent" v-model="newPassword">
      </nav>

      <nav style="width: 100%">
        <label class="text ms-0">Подтверждение нового пароля</label>
        <div class="d-flex m-0 justify-content gap-4">
          <input type="password" @input="inputEvent" v-model="newPasswordAgain" style="width: 50%">
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="changePassword()">Сменить</button>
        </div>
      </nav>
    </div>

    <transition name="slide-fade">
      <div v-if="errorText!==''" class = "wrongPassword">{{errorText}}</div>
    </transition>

  </div>



</template>

<script>
import store from "@/store/index.js";
import changePasswordNotification from "@/components/layout/notifications/changePasswordNotification.vue";
import axios from "axios";

export default {
  name: "teacherProfile",
  components : {changePasswordNotification},
  "changePasswordNotification" : changePasswordNotification,
  data() {
    return {
      fullName: '1',
      email: '2',
      academicDegree: '3',
      department: '4',
      faculty: '5',
      fullNameCopy: '',
      emailCopy: '',
      academicDegreeCopy: '',
      departmentCopy: '',
      facultyCopy: '',
      stateOfEditing: false,
      stateOfWriting: false,
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      stateOfSending:false,
      resultOfSending: '',
      errorText : ''
    }
  },
  methods : {
    editProfile() {
      this.stateOfEditing = !this.stateOfEditing

      this.fullNameCopy = this.fullName
      this.emailCopy = this.email
      this.departmentCopy = this.department
      this.facultyCopy = this.faculty
      this.academicDegreeCopy = this.academicDegree
    },
    inputEvent(){
      if (this.errorText !== '')
        this.errorText = ''
      if(!this.stateOfWriting){
        this.stateOfWriting = !this.stateOfWriting
      }
    },

    async changePassword(){
      if (this.currentPassword.length === 0 || this.newPassword.length === 0 || this.newPasswordAgain.length === 0){
        this.errorText = "Поля не должны быть пустыми"
        return
      }

      if (this.newPassword !== this.newPasswordAgain){
        this.errorText = "Пароли не совпадают"
        return
      }

      var resultState = ''
      try {
        const response = await axios.post("http://localhost:8080/authorization/change_password/" + localStorage.getItem("access_token"),
            {
              "oldPassword": this.currentPassword,
              "newPassword": this.newPassword,
            }
        )
        resultState = response.status
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }


      this.resultOfSending = (resultState === 200)
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    },

    cancelChange(){
      this.stateOfEditing = !this.stateOfEditing
      this.fullName = this.fullNameCopy
      this.email = this.emailCopy
      this.department = this.departmentCopy
      this.faculty = this.facultyCopy
      this.academicDegree = this.academicDegreeCopy

      if (this.stateOfWriting)
        this.stateOfWriting = !this.stateOfWriting

    },
    saveChange(){
      this.stateOfEditing = !this.stateOfEditing
      if (this.stateOfWriting)
        this.stateOfWriting = !this.stateOfWriting
    }
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>


<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (min-width: 800px) {
  header .head-top {
    background-color: #005faf;
    height: 4em;
  }

  header .head-top nav {
    margin-top: 2px;
    margin-left: 20%;
    margin-right: 20%;
  }

  .mainText {
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.3rem;
  }

  header .head-top nav a {
    height: 20px;
    width: 20px;
  }

  header .head-top nav a:nth-of-type(1) {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }

  header .head-top nav a:nth-of-type(2) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .mainPage {
    width: 50%;
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

  div nav {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 1%;
    height: 5em;
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
    padding-left: 0.5rem;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem;
    font-weight: 450;
  }

  .loggining {
    font-size: 1.2rem !important;

    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding:0.5rem;
    margin: 0 !important;
    color:white !important;
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

@media (max-width: 800px) {
  header .head-top {
    background-color: #005faf;
    height: 4em;
  }

  header .head-top nav {
    margin-top: 2px;
    margin-left: 20%;
    margin-right: 20%;
  }

  .mainText {
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
  }

  header .head-top nav a {
    height: 20px;
    width: 20px;
  }

  header .head-top nav a:nth-of-type(1) {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }

  header .head-top nav a:nth-of-type(2) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .mainPage {
    width: 80%;
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

  div nav {
    margin-left: 1.5rem;
    margin-right: 1.5rem;
    margin-bottom: 1%;
    height: 5em;
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
    padding-left: 0.5rem;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.9rem;
    font-weight: 450;
  }

  .loggining {
    font-size: 1.1rem !important;
    padding:0.25rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
    text-align: center;
    padding-top: 2%;
  }
}

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