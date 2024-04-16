<template>


  <page-header
  @redirectToMainPage = redirectToMainPage
  ></page-header>
  <student-view v-if="this.type==='student'"
  :state-of-student-page = stateOfStudentPage
  @buttonManageStudentPageClicked ="(index) => buttonManageStudentPageClicked(index)"
  ></student-view>
  <teacher-view v-if="this.type==='supervisor'"></teacher-view>
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
import axios from "axios";
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

    },
  async beforeMount() {
    await this.checkAuth()



    },
  async beforeCreate() {


  }
}


</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';
@import "../../static/css/studentProfile.css";

</style>