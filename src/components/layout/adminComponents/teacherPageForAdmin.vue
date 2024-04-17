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
        <label class="text ms-0">ФИО</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="fullName">
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Почта</label>
        <input type="text" class="col-12" :disabled="!stateOfEditing" @input="inputEvent" v-model="email">
      </nav>

    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text ms-0">Ученая степень</label>
        <input type="text" :disabled="!stateOfEditing" @input="inputEvent" v-model="academicDegree">
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


  </div>

  <div class="mainPage">
    <div class="aspirantText">
      <p>Аспиранты</p>
    </div>
    <div v-for="student in arrayOfStudents">
      <tab-of-student
          :full-name = student.full_name
          :group = student.group_name
          :student_id = student.studentID
      ></tab-of-student>

    </div>
  </div>

</template>




<script>
import header from "@/components/layout/header.vue";
import tabOfStudent from "@/components/layout/studentComponents/tabOfStudent.vue";
import axios from "axios";
import store from "@/store/index.js";
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
        const response = await axios.get(this.IP +"/authorize/token/check/" + localStorage.getItem("access_token"))
        if (response.status === 200){
          this.$store.dispatch("updateUserType", response.data.user_type)
          localStorage.setItem("userType", response.data.user_type)
          localStorage.setItem("registered", response.data.registered)
          this.type = response.data.user_type
        }
        else {
          this.$router.push('/auth')
        }

      } catch (e) {
        console.log(e)
        this.$router.push('/auth')
      }
    },
    async getStudents(){

      try {
        const response = await axios.put(this.IP +'/administrator/supervisor/students/' + localStorage.getItem("access_token"),
            {
              "supervisor_id" : localStorage.getItem("teacherID")
                  }
        )
        this.data = await response.data;
        this.arrayOfStudents = this.data

      }
      catch (e) {
        console.log(e)
      }
    },
    async getProfileData(){
      try {
        const response = await axios.put(this.IP +"/administrator/supervisors/profile/" + localStorage.getItem("access_token"), {
          "supervisor_id" : localStorage.getItem("teacherID"),
        })
        this.data = response.data
        console.log(this.data)

      }
      catch (e) {
        console.log(e)
      }
      this.fullName = this.data.full_name
      this.academicDegree = this.data.degree
      this.department = this.data.department
      this.faculty = this.data.faculty
      this.email = this.data.email
    }
  },
  async beforeMount() {
    await this.checkAuth()
    if (store.getters.getType !== 'admin'){
      this.$router.push("/wrongAccess")
    }
    await this.getStudents()
    await this.getProfileData()
  }
}
</script>

<style scoped>


* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

@media (min-width: 800px) {
  .mainText {
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
  }


  .mainPage {
    width: 70%;

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
  }

  .btnedit{
    font-size: 1rem;
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
    height: 2.5rem;
    font-size: 1rem;
    padding-left: 0.5rem;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem;
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
    font-size:1.2rem;
    padding-bottom: 0.2%;
    padding-top: 0.2%;
    padding-right: 1%;
    padding-left: 1%;
  }
}

@media (max-width: 800px) {
  .mainText {
    color:#7C7F86;
    font-weight: 300;
    font-size: 1rem;
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 1%;
  }

  .btnedit{
    font-size: 0.9rem;
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
    height: 2rem;
    font-size: 0.9rem;
    padding-left: 0.5rem;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.9rem;
    font-weight: 450;
  }

  .aspirantText {
    font-family: "Raleway", sans-serif !important;
    border: solid 0.15em #0055BB !important;
    border-radius: 12px;
    display:inline-block;
    margin-top: 1%;
    margin-left: 2.5%;
    margin-bottom: 1%;
    color: #0055BB !important;
    font-weight: 500;
    font-size:1rem;
    padding-bottom: 0.2%;
    padding-top: 0.2%;
    padding-right: 1%;
    padding-left: 1%;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .mainText {
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;
  }

  .mainPage {
    width: 90%;
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
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    margin-bottom: 1%;
  }

  .btnedit{
    font-size: 0.8rem;
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
    height: 2rem;
    font-size: 0.8rem;
    padding-left: 0.5rem;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem;
    font-weight: 450;
  }

  .aspirantText {
    font-family: "Raleway", sans-serif !important;
    border: solid 0.17em #0055BB !important;
    border-radius: 12px;
    display:inline-block;
    margin-top: 1%;
    margin-left: 2.5%;
    margin-bottom: 1%;
    color: #0055BB !important;
    font-weight: 500;
    font-size:0.8rem;
    padding-bottom: 0.2%;
    padding-top: 0.2%;
    padding-right: 1%;
    padding-left: 1%;
  }
}
</style>