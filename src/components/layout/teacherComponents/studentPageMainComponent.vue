<template>
  <page-header>

  </page-header>

  <div>
    <student-page-from-teacher v-if="stateOfPage === 1"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"

    ></student-page-from-teacher>
    <scientific-work-for-teacher v-if="stateOfPage === 2"
                                 :state-of-page = this.stateOfPage
                                 @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                                 @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                                 @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                                 @btnProfileClicked="buttonManageStudentPageClicked(4)"
    ></scientific-work-for-teacher>
    <teaching-load-for-teacher v-if="stateOfPage === 3"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
    ></teaching-load-for-teacher>
    <student-profile-for-admin v-if="stateOfPage === 4"
                               :state-of-page = this.stateOfPage
                               @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                               @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                               @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                               @btnProfileClicked="buttonManageStudentPageClicked(4)"
    ></student-profile-for-admin>
  </div>




</template>

<script>
import studentPageFromTeacher from "@/components/layout/teacherComponents/studentPageFromTeacher.vue";
import header from "@/components/layout/header.vue";
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import scientificWorkForTeacher from "@/components/layout/teacherComponents/scientificWorkForTeacher.vue";
import teachingLoadForTeacher from "@/components/layout/teacherComponents/teachingLoadForTeacher.vue";
import studentProfileForAdmin from "@/components/layout/adminComponents/studentProfileForAdmin.vue";
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
    "studentProfileForAdmin" : studentProfileForAdmin
  },
  data() {
    return {
      stateOfPage : 1,
      userType : '',
    }
  },
  methods : {
    buttonManageStudentPageClicked(index){
      this.stateOfPage = index
    },
    async checkAuth() {
      try {
        const response = await axios.get(this.IP +"/authorization/check/" + localStorage.getItem("access_token"))

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
  async beforeMount() {
    if (localStorage.getItem('registered') === 'false')
      this.$router.push('/registration')
    this.checkAuth()


  },
  async beforeCreate() {

  }

}
</script>

<style scoped>

</style>