<template>
  <div class="mainPage">
    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="roundBlock">

      <div class="">
        <p class="headerText text-start">Аспиранты</p>
      </div>
      <div class="editBtnStudents">
        <div v-if="stateOfStudents">
          <button class="editBtn" @click="editStudentsButton">Редактировать</button>
        </div>

        <div v-else>
          <button class="editBtn"  @click="saveStudents">Сохранить</button>
          <button class="editBtn"  @click="cancelStudents">Отменить</button>
        </div>
      </div>

      <div class="roundBlock p-0 " v-if="arrayOfStudents.length !== 0">

          <div class="mainText text-start d-flex justify-content-between m-0" :class="{underline:index !== arrayOfStudents.length - 1}"  v-for="(student,index) in arrayOfStudents">
            <a class="ps-2 p-0 linkStyle" href="/user" @click="pushStudentIDToStorage(index)"  >{{index + 1}}. {{student.studentFullName}}</a>
            <button class="btnAddDeleteFiles me-3" @click="deleteStudent(index)" :disabled="stateOfStudents">
              <img class="trashLogo" src="../../../../static/figures/trash.png" alt="trashLogo">
            </button>
          </div>
      </div>
    </div>

    <div class="roundBlock mt-1">

      <div class="mt-2 mb-3">
        <p class="headerText text-start">Научные руководители</p>
      </div>

      <div class="editBtnStudents">
        <div v-if="stateOfTeachers">
          <button class="editBtn" @click="editTeachersButton">Редактировать</button>
        </div>

        <div v-else>
          <button class="editBtn"  @click="saveTeachers">Сохранить</button>
          <button class="editBtn"  @click="cancelTeachers">Отменить</button>
        </div>
      </div>


      <div class="roundBlock p-0"  v-if="arrayOfTeachers.length !== 0">
        <div class="mainText text-start d-flex justify-content-between m-0" :class="{underline:index !== arrayOfTeachers.length - 1}"  v-for="(teacher,index) in arrayOfTeachers">
          <a class="ps-2 p-0 linkStyle" href="/user2" @click="pushTeacherIDToStorage(index)">{{index + 1}}. {{teacher.teacherFullName}}</a>
          <button class="btnAddDeleteFiles me-3" @click="deleteTeacher(index)" :disabled="stateOfTeachers">
            <img class="trashLogo" src="../../../../static/figures/trash.png" alt="trashLogo">
          </button>
        </div>
      </div>
    </div>


  </div>


</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import store from "@/store/index.js";
import axios from "axios";
export default {
  name: "editUser",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
  },
  data(){
    return {
      arrayOfStudentsCopy : [],
      arrayOfStudents : [
        {}
      ],
      arrayOfTeachersCopy: [],
      arrayOfTeachers : [{}],
      stateOfStudents: true,
      stateOfTeachers: true,
    }
  },
  methods : {
    deleteStudent(index){
      console.log("Запрос на удаление пользователя ",index)
      this.arrayOfStudents.splice(index,1) /// Временно
    },
    deleteTeacher(index){
      console.log("Запрос на удаление пользователя ",index)
      this.arrayOfTeachers.splice(index,1) /// Временно
    },
    editStudentsButton(){
      this.stateOfStudents = !this.stateOfStudents
      this.arrayOfStudentsCopy = this.arrayOfStudents.slice(0)
    },
    saveStudents(){
      this.stateOfStudents = !this.stateOfStudents
      if (this.arrayOfStudentsCopy === this.arrayOfStudents)
        return
      /// saveStudents
    },
    cancelStudents(){
      this.stateOfStudents = !this.stateOfStudents
      this.arrayOfStudents = this.arrayOfStudentsCopy.slice(0)
    },
    editTeachersButton(){
      this.stateOfTeachers = !this.stateOfTeachers
      this.arrayOfTeachersCopy = this.arrayOfTeachers.slice(0)
    },
    saveTeachers(){
      this.stateOfTeachers = !this.stateOfTeachers
      if (this.arrayOfTeachersCopy === this.arrayOfTeachers)
        return
      /// save changes
    },
    cancelTeachers(){
      this.stateOfTeachers = !this.stateOfTeachers
      this.arrayOfTeachers = this.arrayOfTeachersCopy.slice(0)
    },
    async getAspsAndTeachers() {
      try {
        const response = await axios.get(this.IP + "/admin/pairs/" + localStorage.getItem("access_token"),
        )
        this.arrayOfTeachers = response.data.supervisors
        this.arrayOfStudents = response.data.pairs
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }



    },

    pushStudentIDToStorage(index){
      localStorage.setItem("studentID", this.arrayOfStudents[index].studentId)
      this.$store.dispatch("updateUserId", this.arrayOfStudents[index].studentId)
    },
    pushTeacherIDToStorage(index){
    localStorage.setItem("teacherID", this.arrayOfTeachers[index].teacherId)
      //todo мб стоит пихнуть id в store
    }
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
    this.getAspsAndTeachers()
  }

}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

@media (min-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:40px !important;
    height: 40px !important;

  }

  .linkStyle {

    text-decoration: none;
    color:#0055BB !important;
  }
}

@media (max-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.9rem;
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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:30px !important;
    height: 30px !important;
  }

  .linkStyle {
    text-decoration: none;
    color:#0055BB;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
    font-size: 0.8rem;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.7rem !important;
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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 0!important;
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 !important;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:0.6rem !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .linkStyle {
    padding-bottom: 0.75rem;
    text-decoration: none;

  }
}

</style>