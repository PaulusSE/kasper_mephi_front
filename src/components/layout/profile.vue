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
import axios from "axios";
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
  methods : {
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
    if (localStorage.getItem('registered') === 'false')
      this.$router.push('/registration')
    await this.checkAuth()



  },
  async beforeCreate() {

  },
  mounted() {
  }


}
</script>

<style scoped>


</style>