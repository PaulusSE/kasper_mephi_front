<template>
  <link href="../../../static/css/studentProfile.css" rel="stylesheet">
  <link href="../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  
  <transition>
    <student-registration></student-registration>
<!--    <addTeacher v-else></addTeacher>-->
  </transition>

</template>

<script>
import studentRegistration from "@/components/layout/studentComponents/studentRegistration.vue";
import header from "@/components/layout/header.vue"
import studentWriteFullNameOfTeacher from "@/components/layout/studentComponents/studentWriteFullNameOfTeacher.vue";
export default {
  name: "registration",
  data() {
    return {
    }
  },
  components : {
    "studentRegistration" : studentRegistration,
    "pageHeader" : header,
    "addTeacher" : studentWriteFullNameOfTeacher
  },
  methods : {
  },
  beforeMount() {
    // this.checkAuth()
    // if (localStorage.getItem('registered') !== 'false')
    //   this.$router.push('/')
  }
}
</script>

<style scoped>



</style>