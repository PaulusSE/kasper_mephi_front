<template>
  <link href="../../static/css/studentProfile.css" rel="stylesheet">
  <link href="static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <page-header
  @redirectToMainPage = redirectToMainPage
  ></page-header>
  <student-view v-if="this.type==='student'"
  :state-of-student-page = stateOfStudentPage
  @buttonManageStudentPageClicked ="(index) => buttonManageStudentPageClicked(index)"
  ></student-view>
  <teacher-view v-if="this.type==='teacher'"></teacher-view>
  <admin v-if="this.type==='admin'"
  :state-of-admin-page = stateOfAdminPage
  @buttonManageAdminPageClicked = "(index) => buttonManageAdminPageClicked(index)"
  ></admin>

</template>

<script>
import header from "@/components/layout/header.vue"
import student from "@/components/layout/studentComponents/student.vue";
import teacher from "@/components/layout/teacherComponents/teacher.vue";
import admin from "@/components/layout/adminComponents/admin.vue";
import store from "@/store/index.js";
export default {
  name: "mainPage",
  components: {
    "pageHeader": header,
    "studentView": student,
    "teacherView": teacher,
    "admin": admin
  },
  data() {
    return {
      type: store.getters.getType,
      stateOfStudentPage: 1,
      stateOfAdminPage: 1,
    }
  },
  methods: {
    redirectToMainPage() {
      if (this.type === 'student') {
        this.stateOfStudentPage = 1
        return
      }
      if (this.type === 'admin') {
        this.stateOfAdminPage = 1
      }
    },
    buttonManageStudentPageClicked(index){
      this.stateOfStudentPage = index
    },
    buttonManageAdminPageClicked(index){
      this.stateOfAdminPage = index
    },

    },
  async beforeMount() {

    const stateOfLogining = await store.dispatch("checkIfLogined")
    if (!stateOfLogining)
      this.$router.push('/auth')
    }

}


</script>

<style scoped>

</style>