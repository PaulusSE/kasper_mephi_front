<template>

  <notification
      v-if="stateOfSending"
      :result-of-sending = resultOfSending
  ></notification>


  <div class="mainPage">

    <div class="headerText">
      <p class="pt-3" v-if="!this.processFinished">Введите ФИО вашего руководителя. </p>
      <p v-else>Администратор рассмотрим ваш запрос</p>
    </div>

    <div style="text-align: center">
      <input type="text" class="input" v-model="fullName" @input="inputEvent">
    </div>

    <div v-if="this.errorMessage !== ''" class = "wrongData" style="text-align: center">{{this.errorMessage}}</div>

    <div v-if="!this.processFinished" class="headerText">
      <button class="myBtn" @click="addteacher">Добавить преподователя</button>
    </div>


  </div>
</template>

<script>
import addingTeacherNotification
  from "@/components/layout/notifications/studentNotifications/addingTeacherNotification.vue";
export default {
  name: "studentWriteFullNameOfTeacher",
  components : {
    "notification" : addingTeacherNotification
  },
  data(){
    return {
      fullName: '',
      processFinished: false,
      errorMessage: '',
      stateOfSending:false,
      resultOfSending:false,
    }
  },
  methods : {
    isUsername(fullName){
      return fullName && fullName.split(" ").length === 3 && /^[\u0400-\u04FF ]+$/.test(fullName);
    },

    addteacher(){
      if (!this.isUsername(this.fullName)){
        this.errorMessage = 'ФИО должно состоять из отчества, имени и фамилии и написано на киррилице'
        return
      }

      var result = confirm('Вы уверены, что хотите сделать запрос на добавление научного руководителя ' + this.fullName)
      if (!result)
        return;

      this.stateOfSending = true
      this.resultOfSending = false

      setTimeout(() => {
        this.stateOfSending = false
      }, 2000);

      setTimeout(() => {
        this.$router.push('/')
      }, 4000);



    },
    inputEvent() {
      this.errorMessage = ''
    }

  }
}
</script>

<style scoped>

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.headerText {
  text-align: center !important;
  margin-top:1rem !important;

}
.mainPage {
  width: 30%;

  background: rgba(255, 255, 255, 1);
  opacity: 1;
  border-top-left-radius: 25px;
  border-top-right-radius: 25px;
  border-bottom-left-radius: 25px;
  border-bottom-right-radius: 25px;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
  margin: 1.5% auto auto;
  padding-bottom: 1.5%;
}

.myBtn{
  background-color: #0055BB !important;
  color: white !important;
  border-color: #0055BB !important;
  padding: 0.3rem;
  border-radius: 8px !important;
  font-weight: 300 !important;
}

.input {
  width: 90%;
  border-radius: 10px;
  border-color: #7C7F86;
  border-width: 2px 2px 2px 2px !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
}

.wrongData{
  color: red;
  font-family: "Raleway", sans-serif;
  font-size: 15px;
  text-align: center;
  font-weight: 500;
  padding-top: 2%;
}

</style>