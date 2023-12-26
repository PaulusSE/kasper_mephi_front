<template>
  <link href="../../../static/css/studentProfile.css" rel="stylesheet">
  <link href="../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <page-header></page-header>
  <student-profile v-if="type==='student'"></student-profile>
  <teacher-profile v-if="type==='supervisor'"></teacher-profile>
  <admin-profile v-if="type === 'admin'"></admin-profile>
</template>

<script>
import studentProfile from "@/components/layout/studentComponents/studentProfile.vue";
import teacherProfile from "@/components/layout/teacherComponents/teacherProfile.vue";
import header from "@/components/layout/header.vue"
import store from "@/store/index.js";
import adminProfile from "@/components/layout/adminComponents/adminProfile.vue";
export default {
  name: "profile",

  data() {
    return {
      type: store.getters.getType
    }
  },
  components : {
    "studentProfile" : studentProfile,
    "teacherProfile" : teacherProfile,
    "pageHeader" : header,
    "adminProfile" : adminProfile
  },
  async beforeMount() {
    const stateOfLogining =await store.dispatch("checkIfLogined")
    if (!stateOfLogining){
      this.$router.push('/auth')
    }
  },
  beforeCreate() {
    this.$store.dispatch("updateUserType", localStorage.getItem('user_type'))
  }

}
</script>

<style scoped>


</style>