<template>
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

  <div class="mainPage">

    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

  </div>

</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import store from "@/store/index.js";
export default {
  name: "report",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>

<style scoped>
.mainPage {
  width: 60%;

  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: 1.5% auto 1%;
  padding: 0 0 1.5%;
}

</style>