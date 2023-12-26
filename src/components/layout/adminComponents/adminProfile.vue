<template>
  <link href="../../../../static/css/studentProfile.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap" rel="stylesheet">


  <div class="mainPage mb-3">
    <div class="container-fluid justify-content-between d-flex">
      <nav style="margin-left: 3em;">
        <p class="text" style="font-size: 29px; margin-top: 1em;">Смена пароля</p>
      </nav>


    </div>
    <div class="container-fluid justify-content-between">
      <nav style="width: 50%">
        <label class="text">Старый пароль</label>
        <input type="text" @input="inputEvent" v-model="currentPassword">
      </nav>

      <nav style="width: 50%">
        <label class="text">Новый пароль</label>
        <input type="text" @input="inputEvent" v-model="newPassword">
      </nav>

      <nav>
        <label class="text">Подтверждение нового пароля</label>
        <div class="d-flex m-0 justify-content gap-4" style="width: 100%">
          <input type="text" @input="inputEvent" v-model="newPasswordAgain" style="width: 51.2%">
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="changePassword()">Сменить</button>
        </div>
      </nav>
    </div>
  </div>



</template>

<script>
import store from "@/store/index.js";

export default {
  name: "teacherProfile",
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
      if(!this.stateOfWriting){
        this.stateOfWriting = !this.stateOfWriting
      }
    },
    changePassword(){
      //todo Сделать
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
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

header .head-top {
  background-color: #005faf;
  height: 4em;
}

header .head-top nav {
  margin-top: 2px;
  margin-left: 20%;
  margin-right: 20%;
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

div nav {
  margin-left: 7%;
  margin-right: 7%;
  margin-bottom: 1%;
  height: 5em;

}

div div {
  margin-left: 10px;
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

.text {
  font-family: "Raleway", sans-serif;
  color: #7c7f86;
  font-size: 22px;
  font-weight: 450;
}

.loggining {
  font-size: 1.2rem !important;
  height: 3rem !important;
  width: 6rem !important;
  background-color: #0055bb !important;
  font-weight: 300 !important;
  border-radius: 0.7em !important;
  padding: 0 !important;
  margin: 0 !important;
  color:white !important;
}


</style>