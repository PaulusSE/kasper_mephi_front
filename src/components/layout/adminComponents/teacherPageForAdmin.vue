<template>
<page-header></page-header>

  <div class="mainPage">
    <div class="container-fluid justify-content-between d-flex">
      <nav>
        <p class="mainText">Основная информация</p>
      </nav>

      <nav>
        <button v-if="!stateOfEditing" type="button" class="btn btn-primar btnedit"  @click="editProfile()">Редактировать</button>
        <button v-if="stateOfEditing" type="button" class="btn btn-primar btnedit" @click="cancelChange()">Отменить</button>
        <button v-if="stateOfEditing && stateOfWriting" type="button" class="btn btn-primar btnedit" @click="saveChange()">Сохранить</button>

      </nav>
    </div>
    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-5">ФИО</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="fullName">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-5">Почта</label>
        <input type="text" class="col-12" :disabled="!stateOfEditing" @input="inputEvent" v-model="email">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-5">Ученая степень</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="academicDegree">
      </nav>

    </div>



    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-5">Кафедра</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="department">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-5">Факультет</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="faculty">
      </nav>

    </div>


  </div>

  <div class="mainPage">
    <div class="aspirantText">
      <p>Аспиранты</p>
    </div>
    <div v-for="student in arrayOfStudents">
      <tab-of-student
          :full-name = student.fullName
          :group = student.group
          :topic = student.topic
          :date-of-statement = student.dateOfStatement
          :number-of-order-of-statement = student.numberOfOrderOfStatement
          :student_id = student.studentID
      ></tab-of-student>

    </div>
  </div>

</template>




<script>
import header from "@/components/layout/header.vue";
import tabOfStudent from "@/components/layout/studentComponents/tabOfStudent.vue";
import axios from "axios";
export default {
  name: "teacherPageForAdmin",
  components : {
    "pageHeader" : header,
    "tabOfStudent" : tabOfStudent
  },
  data() {
    return {
      fullName: '',
      email: '',
      academicDegree: '',
      department: '',
      faculty: '',
      fullNameCopy: '',
      emailCopy: '',
      academicDegreeCopy: '',
      departmentCopy: '',
      facultyCopy: '',
      stateOfEditing: false,
      stateOfWriting: false,
      arrayOfStudents : []
    }
  },
  methods : {
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
    },
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
    async checkAuth() {
      try {
        const response = await axios.get(this.IP +"/authorization/check/" + localStorage.getItem("access_token"))
        console.log(response)
        if (response.status === 200){
          this.$store.dispatch("updateUserType", response.data.userType)
          this.type = response.data.userType
        }
        else {
          this.$router.push('/auth')
        }

      } catch (e) {
        console.log(e)
        this.$router.push('/auth')
      }
    },
  },
  beforeMount() {
    this.checkAuth()
  }
}
</script>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.mainText {
  margin-top: 1rem;
  color:#7C7F86;
  font-weight: 300;
  font-size: 1.2rem;
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
  margin-left: 1.5rem;
  margin-right: 1.5rem;
  margin-bottom: 1%;
  height: 5em;
}

.btnedit{
  margin-top: 1em;
  font-size: larger;
  margin-right: 0.5rem;
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

.aspirantText {
  font-family: "Raleway", sans-serif !important;
  border: solid 0.12em #0055BB !important;
  border-radius: 12px;
  display:inline-block;
  margin-top: 1%;
  margin-left: 2.5%;
  margin-bottom: 1%;
  color: #0055BB !important;
  font-weight: 500;
  font-size:22px;
  padding-bottom: 0.2%;
  padding-top: 0.2%;
  padding-right: 1%;
  padding-left: 1%;
}

</style>