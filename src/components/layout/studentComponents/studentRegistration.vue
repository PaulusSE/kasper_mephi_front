<template>
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <div class="mainPage">
    <div class="headerText">
      <p>Регистрация</p>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">ФИО</label>
        <select class="form-select blockStyles" v-model="fullName" @input="inputEvent">
          <option v-for="fullName in arrayOfFullNames" >{{fullName.fullName}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Почта</label>
        <input type="text" class="blockStyles" v-model="email" @input="inputEvent">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Пароль</label>
        <input type="password" class="blockStyles" v-model="password" @input="inputEvent">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Пароль</label>
        <input type="password" class="blockStyles" v-model="passwordCheck" @input="inputEvent">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Преподователь</label>
        <select class="form-select blockStyles" v-model="teacher" @input="inputEvent">
        <option v-for="teacher in arrayOfTeachers" >{{teacher.fullName}}</option>
        <option >Моего преподователя нет в списке</option>
        </select>
      </nav>
    </div>


    <div v-if="this.errorMessage !== ''" class = "wrongData" style="text-align: center">{{this.errorMessage}}</div>





    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%; text-align: center; padding-top: 2rem">
        <button class="registrateBtn" @click="registration" >Зарегистрироваться</button>
      </nav>
    </div>


  </div>


</template>

<script>
import header from "@/components/layout/header.vue"

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const regularSymbolForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export default {
  name: "studentRegistration",
  components: {
    "pageHeader": header,
  },
  data() {
    return {
      fullName: '',
      email: '',
      password: '',
      passwordCheck: '',
      teacher: '',
      errorMessage: '',
      arrayOfFullNames: [
        {
          fullName: "Сафиуллин Ильяс Фанисович",
          id: 1,
        },
        {
          fullName: "Иван Петрович Павлов",
          id: 2,
        },
      ],
      arrayOfTeachers: [
        {
          fullName: "Тихомирова Анна Николаевна",
          id: 1,
        },
        {
          fullName: "Рословцев Владимир Владимирович",
          id: 2,
        },

      ]
    }
  },
  methods: {
    isEmailValid(value) {
      return EMAIL_REGEXP.test(value)},

    checkPassword(pass)
    {
      return regularSymbolForPassword.test(pass);
    },

    registration() {

      if (this.fullName === ''){
        this.errorMessage = 'Поле ФИО не должно быть пустым'
        return;
      }


      if (!this.isEmailValid(this.email)){
        this.errorMessage = "Некорректная почта"
        return
      }

      if (this.password === ''){
        this.errorMessage = "Поле пароль не должно быть пустым"
        return;
      }

      if (this.password.length < 5){
        this.errorMessage = "Поле Пароль должно содержать хотя бы 6 символов"
        return;
      }

      if (this.checkPassword(this.password)){
        this.errorMessage = "Поле пароль содержит недопустимые символы"
        return;
      }

      if (this.password !== this.passwordCheck){
        this.errorMessage = "Пароли не совпадают"
        return
      }

      if (this.teacher === ''){
        this.errorMessage = 'Поле Преподователь не должно быть пустым'
        return;
      }

      if (this.teacher === 'Моего преподователя нет в списке'){
        this.$emit("requestToAddTeacher")
        return;
      }
      else {
        this.redirectToMain()
      }




    },
    inputEvent() {
      this.errorMessage = ''
    },

    redirectToMain() {
      this.$router.push('/')
    }
  }
}
</script>

<style scoped>


.mainPage {
  width: 60%;

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

.headerText{
  font-family: Raleway,serif;
  padding-top: 1%;
  padding-left: 2%;
  font-size: 27px;
  font-weight: 320;
}


div div {
  margin-left: 0;
}



.registrateBtn{
  background-color: #0055BB !important;
  color: white !important;
  border-color: #0055BB !important;
  height: 3.2rem !important;
  border-radius: 8px !important;
  font-weight: 300 !important;
  font-size: 21px;
}

.blockStyles {
  height: 2.5rem;
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

</style>