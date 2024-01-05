<template>



  <div class="mainPage">

    <headfer-of-student
:state-of-student-page = this.stateOfPage
@btnDissertationClicked="$emit('btnDissertationClicked')"
@btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
@btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
@btnProfileClicked="$emit('btnProfileClicked')"
    ></headfer-of-student>
    <div class="roundBlock">


    <div class="container-fluid justify-content-between d-flex">
      <nav>
        <p class="mainText">Основная информация</p>
      </nav>

      <nav>

        <button type="button" class="btn btn-primar btnedit"  @click="editProfile()" v-if="!stateOfEditing">
          <p>Редактировать</p>
        </button>

        <button type="button" class="btn btn-primar btnedit"  @click="cancelChange()" v-if="stateOfEditing">
          <p>Отменить</p>
        </button>

        <button type="button" class="btn btn-primar btnedit"  @click="saveChange()" v-if="stateOfEditing && stateOfWriting">
          <p>Сохранить</p>
        </button>
      </nav>


    </div>
    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">ФИО</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="fullName">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 60%">
        <div style="width: 100%">
          <label class="text ms-0">Почта</label>
          <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="email">
        </div>

      </nav>
      <nav style="width: 30%;">
        <div style="width: 100%">
          <label class="text ms-0" >Группа</label>
          <input type="text"  :disabled="!stateOfEditing" @input="inputEvent" v-model="group">
        </div>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Научная специальность</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="speciality">
      </nav>

    </div>

    <div class="container-fluid justify-content-between">
      <nav style="width: 50%">
        <div style="width: 100%">
          <label class="text ms-0">Срок обучения</label>
          <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="studyingTime">
        </div>

      </nav>
      <nav style="width: 50%" >
        <div style="width: 100%">
          <label class="text ms-0" >Дата начала обучения</label>
          <input type="text"  :disabled="!stateOfEditing" @input="inputEvent" v-model="startDateStudying">
        </div>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Кафедра</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="department">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Факультет</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="faculty">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Приказ о зачислении</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="admissionOrder">
      </nav>
    </div>
      <div class="d-flex justify-content-between">
        <nav style="margin-left: 1.5rem">
          <button class="sendAcademButton" @click="sendToAdacem">В академ нах</button>
        </nav>
        <nav>
          <button class="deleteButton">Удалить пользователя</button>
        </nav>
      </div>

  </div>
  </div>
</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
export default {
  name: "studentProfileForAdmin",
  props : ['stateOfPage'],
  components : {
    "headferOfStudent" : headerOfStudent
  },
  data() {
    return {
      stateOfEditing : false,
      stateOfWriting : false,
    }
  },
  methods : {
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
      if (this.errorText !== '')
        this.errorText = ''
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
    sendToAdacem() {
      alert("send")
    }
  }
}
</script>

<style scoped>
*{
  padding: 0;
  margin: 0
}

.mainPage {
  width: 50% !important;

  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: 1.5% auto 1%;
  padding: 0 0 1.5%;
}

.mainText {
  margin-top: 1rem;
  color:#7C7F86;
  font-weight: 400;
  font-size: 1rem;
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

.text {
  font-family: "Raleway", sans-serif;
  color: #7c7f86;
  font-size: 1rem !important;
  font-weight: 450;
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

.btnedit{
  margin-top: 1rem;
  font-size: 0.9rem;
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

input {
  padding-left : 0.5rem;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;
}

.deleteButton {
  background-color: #dc3545 !important;
  color:white !important;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.7em !important;
}

.sendAcademButton {
  background-color: #ffc107 !important;
  color:white !important;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 0.7em !important;
}

</style>