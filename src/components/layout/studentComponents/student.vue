<template>
  <link href="../../../../static/css/dissertation.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <dissertation v-if="stateOfStudentPage === 1"
                @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                :state-of-student-page = stateOfStudentPage
                :education-time = educationTime
  ></dissertation>
  <scientific-work v-if="stateOfStudentPage === 2"
                   @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                   @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                   @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                   :state-of-student-page = stateOfStudentPage
                   :education-time = educationTime
  ></scientific-work>
  <teaching-load v-if="stateOfStudentPage === 3"
                 @btnDissertationClicked="buttonManageStudentPageClicked(1)"
                 @btnScientificWorkClicked="buttonManageStudentPageClicked(2)"
                 @btnTeachingLoadClicked="buttonManageStudentPageClicked(3)"
                 :state-of-student-page = stateOfStudentPage
                 :education-time = educationTime
  ></teaching-load>
</template>

<script>
import dissertation from "@/components/layout/studentComponents/dissertation.vue";
import scientificWork from "@/components/layout/studentComponents/scientificWork.vue";
import teachingLoad from "@/components/layout/studentComponents/teachingLoad.vue";
import store from "@/store/index.js";
export default {
  name: "student",
  props : ["stateOfStudentPage"],
  components: {
    "dissertation": dissertation,
    "scientificWork": scientificWork,
    "teachingLoad" : teachingLoad,
  },
  data() {
    return {
      educationTime:2,
    }
  },
  methods : {
    buttonManageStudentPageClicked(index){
      this.$emit("buttonManageStudentPageClicked", index)
    }
  },
  beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>

<style scoped>

</style>