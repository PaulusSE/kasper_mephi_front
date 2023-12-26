
<template>

  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <page-header></page-header>

  <div class="mainPage">
    <div class="container-fluid justify-content-between d-flex">
      <nav style="margin-left: 3em;">
        <p class="text" style="font-size: 29px; margin-top: 1em;">Основная информация</p>
      </nav>

      <nav>
        <button type="button" class="btn btn-primar" style="margin-top: 1em; font-size: larger;" @click="editProfile()" v-if="!stateOfEditing">
          <p>Редактировать</p>
        </button>

        <button type="button" class="btn btn-primar" style="margin-top: 1em; font-size: larger;" @click="cancelChange()" v-if="stateOfEditing">
          <p>Отменить</p>
        </button>

        <button type="button" class="btn btn-primar" style="margin-top: 1em; font-size: larger;" @click="saveChange()" v-if="stateOfEditing && stateOfWriting">
          <p>Сохранить</p>
        </button>



      </nav>
    </div>
    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">ФИО</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="fullName">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 70%; margin-right:0">
        <div style="width: 100%; padding: 0; margin:0;">
          <label class="text" style="margin-left: 7.5%">Почта</label>
          <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="email">
        </div>

      </nav>
      <nav style="width: 30%; margin-left: 1%" >
        <div style="width: 100%; padding: 0; margin:0">
          <label class="text" >Группа</label>
          <input type="text"  :disabled="!stateOfEditing" @input="inputEvent" v-model="group">
        </div>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Научная специальность</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="speciality">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 50%; margin-right:0">
        <div style="width: 100%; padding: 0; margin:0">
          <label class="text" style="margin-left: 9.5%">Срок обучения</label>
          <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="studyingTime">
        </div>

      </nav>
      <nav style="width: 50%; margin-left: 1%" >
        <div style="width: 100%; padding: 0; margin:0">
          <label class="text" >Дата начала обучения</label>
          <input type="text"  :disabled="!stateOfEditing" @input="inputEvent" v-model="startDateStudying">
        </div>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Кафедра</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="department">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Факультет</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="faculty">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text">Приказ о зачислении</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="admissionOrder">
      </nav>
    </div>

  </div>

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
  name: "studentsMainPage",
  data(){
    return {
      fullName: '1',
      email: '2',
      group: '3',
      speciality: '4',
      studyingTime: '5',
      startDateStudying: '6',
      department: '7',
      faculty: '8',
      admissionOrder: '9',
      fullNameCopy: "",
      emailCopy: '',
      groupCopy: '',
      specialityCopy: '',
      studyingTimeCopy: '',
      startDateStudyingCopy: '',
      departmentCopy: '',
      facultyCopy: '',
      admissionOrderCopy: '',
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',

      stateOfEditing: false,
      stateOfWriting: false,
    }
  },

  methods:{
    editProfile(){
      this.stateOfEditing = !this.stateOfEditing
      this.fullNameCopy = this.fullName
      this.emailCopy = this.email
      this.groupCopy = this.group
      this.specialityCopy = this.speciality
      this.studyingTimeCopy = this.studyingTime
      this.startDateStudyingCopy = this.startDateStudying
      this.departmentCopy = this.department
      this.facultyCopy = this.faculty
      this.admissionOrderCopy = this.admissionOrder

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
      this.group = this.groupCopy
      this.speciality = this.specialityCopy
      this.studyingTime = this.studyingTimeCopy
      this.startDateStudying = this.startDateStudyingCopy
      this.department = this.departmentCopy
      this.faculty = this.facultyCopy
      this.admissionOrder = this.admissionOrderCopy

      if (this.stateOfWriting)
        this.stateOfWriting = !this.stateOfWriting

    },
    saveChange(){
      this.stateOfEditing = !this.stateOfEditing
      if (this.stateOfWriting)
        this.stateOfWriting = !this.stateOfWriting
    },
    beforeMount() {
      if (store.getters.getType !== "student"){
        this.$router.push('/wrongAccess')
      }
    }
  }

}
</script>

<style scoped>

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
  margin-left: 1.5rem !important;
  margin-right: 1.5rem !important;;
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



</style>