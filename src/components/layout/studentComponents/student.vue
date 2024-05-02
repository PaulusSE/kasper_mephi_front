<template>


  <dissertation v-if="stateOfStudentPage === 1"

                @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                @btnReportingClicked="buttonManageStudentPageClicked(5)"
                @updateAllStudentsComponents = updateStatus()
                :state-of-student-page = stateOfStudentPage
                :actual-semester = actualSemester
                :can-edit = canEdit
                :work-status = workStatus
                :wait-for-check = waitForCheck
                :supervisor-mark = this.supervisorMark
  ></dissertation>
  <scientific-work v-if="stateOfStudentPage === 2"
                   @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                   @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                   @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                   @btnReportingClicked="buttonManageStudentPageClicked(5)"
                   @updateAllStudentsComponents = updateStatus()
                   :state-of-student-page = stateOfStudentPage
                   :actual-semester = actualSemester
                   :can-edit = canEdit
                   :work-status = workStatus
                   :wait-for-check = waitForCheck
                   :supervisor-mark = this.supervisorMark

  ></scientific-work>
  <teaching-load v-if="stateOfStudentPage === 3"
                 @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                 @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                 @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                 @btnReportingClicked="buttonManageStudentPageClicked(5)"
                 @updateAllStudentsComponents = updateStatus()
                 :state-of-student-page = stateOfStudentPage
                 :actual-semester = actualSemester
                 :can-edit = canEdit
                 :work-status = workStatus
                 :wait-for-check = waitForCheck
                 :supervisor-mark = this.supervisorMark

  ></teaching-load>
  <report v-if="stateOfStudentPage === 5"
                 @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                 @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                 @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                 @btnReportingClicked="buttonManageStudentPageClicked(5)"
                 :state-of-student-page = stateOfStudentPage
                  :actual-semester = actualSemester
                  :wait-for-check = waitForCheck
                  :can-edit = canEdit

  ></report>

</template>

<script>
import dissertation from "@/components/layout/studentComponents/dissertation.vue";
import scientificWork from "@/components/layout/studentComponents/scientificWork.vue";
import teachingLoad from "@/components/layout/studentComponents/teachingLoad.vue";
import report from "@/components/layout/studentComponents/report.vue";
import store from "@/store/index.js";
import Report from "@/components/layout/adminComponents/report.vue";
import axios from "axios";
export default {
  name: "student",
  props : ["stateOfStudentPage"],
  components: {
    Report,
    "dissertation": dissertation,
    "scientificWork": scientificWork,
    "teachingLoad" : teachingLoad,
    "report" : report
  },
  data() {
    return {
      actualSemester : '',
      canEdit: false,
      waitForCheck : false,
      workStatus : 'in progress',
      supervisorMark: ''
    }
  },
  methods : {
    buttonManageStudentPageClicked(index){
      this.$emit("buttonManageStudentPageClicked", index)
    },
    async getActualSemester() {
      try {
        const response = await axios.get(this.IP +'/students/info/' + localStorage.getItem("access_token"))
        this.data = await response.data;

      }
      catch (e) {
        console.log(e)
      }
      this.actualSemester = this.data.actual_semester

      this.workStatus = this.data.status
      this.waitForCheck = this.workStatus === 'approved' || this.workStatus === 'on review'
      this.canEdit = this.data.can_edit
    },

    async getSupervisorMark() {
      try {
        const response = await axios.get(this.IP +'/students/marks/' + localStorage.getItem("access_token"))
        this.data = await response.data;

      }
      catch (e) {
        console.log(e)
      }

      try {
        this.data.supervisor_marks.sort((a, b) => a.semester < b.semester ? 1 : -1);
        this.supervisorMark = this.data.supervisor_marks[0].mark
      }
      catch (e){
        console.log(e)
      }

    },
    async updateStatus(){
      await this.getActualSemester()
      await this.getSupervisorMark()
    }

  },
  async beforeMount() {
    if (localStorage.getItem('registered') === 'false')
      this.$router.push('/registration')
    await this.getActualSemester()
    await this.getSupervisorMark()


  }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';

@import '../../../../static/css/dissertation.css';

</style>