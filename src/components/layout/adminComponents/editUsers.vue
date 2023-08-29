<template>
  <div class="mainPage">
    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="roundBlock pt-2 ps-4">

      <div class="mt-2 ms-3 mb-3">
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

      <div class="roundBlock p-0 pb-1" v-if="arrayOfStudents.length !== 0">

          <div style="margin-left: 0" class="mainText text-start d-flex justify-content-between" :class="{underline:index !== arrayOfStudents.length - 1}"  v-for="(student,index) in arrayOfStudents">
            <p class="ps-4 pt-2" style="padding-bottom: 0.75rem">{{index + 1}}. {{student.fullName}}</p>
            <button class="btnAddDeleteFiles me-2 mt-1" @click="deleteStudent(index)" :disabled="stateOfStudents">
              <img class="trashLogo" src="static/figures/trash.png" alt="trashLogo">
            </button>
          </div>
      </div>
    </div>

    <div class="roundBlock pt-2 ps-4" style="margin-top: 4rem">

      <div class="mt-2 ms-3 mb-3">
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


      <div class="roundBlock p-0 pb-1"  v-if="arrayOfTeachers.length !== 0">
        <div style="margin-left: 0" class="mainText text-start d-flex justify-content-between" :class="{underline:index !== arrayOfTeachers.length - 1}"  v-for="(teacher,index) in arrayOfTeachers">
          <p class="ps-4 pt-2" style="padding-bottom: 0.75rem">{{index + 1}}. {{teacher.fullName}}</p>
          <button class="btnAddDeleteFiles me-2 mt-1" @click="deleteTeacher(index)" :disabled="stateOfTeachers">
            <img class="trashLogo" src="static/figures/trash.png" alt="trashLogo">
          </button>
        </div>
      </div>
    </div>


  </div>


</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import store from "@/store/index.js";
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
        {
          fullName: 'Витя П.',
          studentId:1,
        },
        {
          fullName: 'Дима С.',
          studentId:2,
        },
        {
          fullName: 'Катя Н.',
          studentId:3,
        }
      ],
      arrayOfTeachersCopy: [],
      arrayOfTeachers : [
        {
          fullName: 'Витя П. С.',
          teacherId:4,
        },
        {
          fullName: 'Дима Н. Г.',
          teacherId:5,
        },
        {
          fullName: 'Катя А. Ф.',
          teacherId:6,
        }
      ],
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
  margin:0;
  padding:0;
  box-sizing: border-box;
}

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
  width: 60%;

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
  font-family: Raleway,serif;
  font-size: 24px;
  font-weight: 400;
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
  margin-left:1rem;
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

</style>