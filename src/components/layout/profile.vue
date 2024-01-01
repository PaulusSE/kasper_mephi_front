<template>

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