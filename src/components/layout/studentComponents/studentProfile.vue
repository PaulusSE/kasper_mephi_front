
<template>
  <link href="../../../../static/css/studentProfile.css" rel="stylesheet">
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


</style>