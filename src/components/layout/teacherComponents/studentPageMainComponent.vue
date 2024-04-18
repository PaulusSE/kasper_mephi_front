<template>
  <page-header>

  </page-header>

  <div class="mainPageContainer mt-2">
    <p class="textHeader">
      Аспирант {{this.userName}}  {{this.group}}
    </p>
  </div>

  <div>
    <student-page-from-teacher v-if="stateOfPage === 1"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
                               @btnReportingClicked="buttonManageStudentPageClicked(5)"

    ></student-page-from-teacher>
    <scientific-work-for-teacher v-if="stateOfPage === 2"
                                 :state-of-page = this.stateOfPage
                                 @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                                 @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                                 @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                                 @btnProfileClicked="buttonManageStudentPageClicked(4)"
                                 @btnReportingClicked="buttonManageStudentPageClicked(5)"
    ></scientific-work-for-teacher>
    <teaching-load-for-teacher v-if="stateOfPage === 3"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
                               @btnReportingClicked="buttonManageStudentPageClicked(5)"
    ></teaching-load-for-teacher>
    <student-profile-for-admin v-if="stateOfPage === 4"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
                               @btnReportingClicked="buttonManageStudentPageClicked(5)"
    ></student-profile-for-admin>
    <student-report v-if="stateOfPage === 5"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
                               @btnReportingClicked="buttonManageStudentPageClicked(5)"
    ></student-report>
  </div>




</template>

<script>
import studentPageFromTeacher from "@/components/layout/teacherComponents/studentPageFromTeacher.vue";
import header from "@/components/layout/header.vue";
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import scientificWorkForTeacher from "@/components/layout/teacherComponents/scientificWorkForTeacher.vue";
import teachingLoadForTeacher from "@/components/layout/teacherComponents/teachingLoadForTeacher.vue";
import studentProfileForAdmin from "@/components/layout/adminComponents/studentProfileForAdmin.vue";
import studentReportForTeacher from "@/components/layout/teacherComponents/studentReportForTeacher.vue";
import store from "@/store/index.js";

import {h} from "vue";
import axios from "axios";
export default {
  name: "studentPageMainComponent",
  components : {
    "studentPageFromTeacher" : studentPageFromTeacher,
    "pageHeader" : header,
    "headerOfStudent" : headerOfStudent,
    "scientificWorkForTeacher" : scientificWorkForTeacher,
    "teachingLoadForTeacher" : teachingLoadForTeacher,
    "studentProfileForAdmin" : studentProfileForAdmin,
    "studentReport" : studentReportForTeacher
  },
  data() {
    return {
      stateOfPage : 1,
      userType : '',
      userName: '',
      group: '',
    }
  },
  methods : {
    buttonManageStudentPageClicked(index){
      this.stateOfPage = index
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

    async getStudentName() {
      try {
        const response = await axios.put(this.IP +"/supervisors/student/info/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentID")
            }
        )
        this.data = response.data
      }
      catch (e) {
        console.log(e)
      }
      this.userName = this.data.full_name
      this.group = this.data.group_name
    }
  },
  async beforeMount() {
    this.checkAuth()
    if (localStorage.getItem("userType") === "student"){
      this.$router.push('/wrongAccess')
    }
    this.getStudentName()


  },
  async beforeCreate() {

  }

}
</script>

<style scoped>

*{
  padding: 0;
  margin: 0;
}

@media (min-width: 800px) {

  .mainPageContainer{
    width: 70%;
    margin: auto;
  }

  .textHeader{
    color:#7C7F86;
    font-size:1.5rem;
    font-weight: 400;
  }
}

@media (max-width: 800px) {
  .mainPageContainer{
    width: 80%;
    margin: auto;
  }
  .textHeader{
    color:#7C7F86;
    font-size:1.3rem;
    font-weight: 400;
  }

}

@media (pointer: coarse) and (max-width: 400px) {
  .mainPageContainer{
    width: 90%;
    margin: auto;
  }
  .textHeader{
    color:#7C7F86;
    font-size:1.1rem;
    font-weight: 400;
  }

}

</style>