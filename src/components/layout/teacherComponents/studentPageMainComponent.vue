<template>
  <page-header>

  </page-header>


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



</template>

<script>
import studentPageFromTeacher from "@/components/layout/teacherComponents/studentPageFromTeacher.vue";
import header from "@/components/layout/header.vue";
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import scientificWorkForTeacher from "@/components/layout/teacherComponents/scientificWorkForTeacher.vue";
import teachingLoadForTeacher from "@/components/layout/teacherComponents/teachingLoadForTeacher.vue";
import studentProfileForAdmin from "@/components/layout/adminComponents/studentProfileForAdmin.vue";

import {h} from "vue";
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
    }
  },
  methods : {
    buttonManageStudentPageClicked(index){
      this.stateOfPage = index
    },
  },

}
</script>

<style scoped>

</style>