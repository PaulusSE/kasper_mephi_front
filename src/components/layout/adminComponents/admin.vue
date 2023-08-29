<template>
  <student-teacher v-if="this.stateOfAdminPage === 1"
                   @btnStudentTeacherButtonClicked="buttonManageAdminPageClicked(1)"
                   @btnAddUsersButtonClicked="buttonManageAdminPageClicked(2)"
                   @btnEditUsersButtonClicked="buttonManageAdminPageClicked(3)"
                   @btnReportButtonClicked="buttonManageAdminPageClicked(4)"
                   :state-of-admin-page = stateOfAdminPage
  ></student-teacher>
  <add-user v-if="this.stateOfAdminPage === 2"
            @btnStudentTeacherButtonClicked="buttonManageAdminPageClicked(1)"
            @btnAddUsersButtonClicked="buttonManageAdminPageClicked(2)"
            @btnEditUsersButtonClicked="buttonManageAdminPageClicked(3)"
            @btnReportButtonClicked="buttonManageAdminPageClicked(4)"
            :state-of-admin-page = stateOfAdminPage
  ></add-user>
  <edit-user v-if="this.stateOfAdminPage === 3"
             @btnStudentTeacherButtonClicked="buttonManageAdminPageClicked(1)"
             @btnAddUsersButtonClicked="buttonManageAdminPageClicked(2)"
             @btnEditUsersButtonClicked="buttonManageAdminPageClicked(3)"
             @btnReportButtonClicked="buttonManageAdminPageClicked(4)"
             :state-of-admin-page = stateOfAdminPage
  ></edit-user>
  <report v-if="this.stateOfAdminPage === 4"
             @btnStudentTeacherButtonClicked="buttonManageAdminPageClicked(1)"
             @btnAddUsersButtonClicked="buttonManageAdminPageClicked(2)"
             @btnEditUsersButtonClicked="buttonManageAdminPageClicked(3)"
             @btnReportButtonClicked="buttonManageAdminPageClicked(4)"
             :state-of-admin-page = stateOfAdminPage
  ></report>

</template>

<script>
import studentTeacher from "@/components/layout/adminComponents/studentTeacher.vue";
import addUser from "@/components/layout/adminComponents/addUsers.vue";
import editUser from "@/components/layout/adminComponents/editUsers.vue";
import report from "@/components/layout/adminComponents/report.vue";
import store from "@/store/index.js";
export default {
  name: "admin",
  props : ["stateOfAdminPage"],
  components : {
    "studentTeacher" : studentTeacher,
    "addUser" : addUser,
    "editUser": editUser,
    "report" : report
  },
  data() {
    return {
    }
  },
  methods : {
    buttonManageAdminPageClicked(index){
      this.$emit("buttonManageAdminPageClicked", index)
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

</style>