<template>
  <change-password-notification
      v-if="stateOfSending"
      :result-of-sending = resultOfSending
  ></change-password-notification>

  <page-header></page-header>

  <div class="mainPage pt-4">
    <div class="roundBlock">

      <div class="container-fluid justify-content-between d-flex">
        <nav>
          <p class="mainText">Основная информация</p>
        </nav>

<!--        <nav>-->
<!--          <button type="button" class="btn btn-primar btnedit"  @click="editProfile()" v-if="!stateOfEditingCommonInfo">-->
<!--            <p>Редактировать</p>-->
<!--          </button>-->

<!--          <button type="button" class="btn btn-primar btnedit"  @click="cancelChange()" v-if="stateOfEditingCommonInfo">-->
<!--            <p>Отменить</p>-->
<!--          </button>-->

<!--          <button type="button" class="btn btn-primar btnedit"  @click="saveChange()" v-if="stateOfEditingCommonInfo && stateOfWritingCommonInfo">-->
<!--            <p>Сохранить</p>-->
<!--          </button>-->
<!--        </nav>-->
      </div>

      <div class="container-fluid justify-content-between d-flex">
        <nav style="width: 100%;">
          <label class="text ms-0">ФИО</label>
          <input type="text" class="textInput" :disabled="!stateOfEditingCommonInfo" @input="inputEvent" v-model="fullName">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex">
        <nav style="width: 50%">
          <div style="width: 100%">
            <label class="text ms-0">Почта</label>
            <input type="text" class="textInput" disabled @input="inputEvent" v-model="email">
          </div>

        </nav>
        <nav style="width: 50%;">
          <div style="width: 100%">
            <label class="text ms-0" >Группа</label>
<!--            <select class="form-select blockStyles textInput ps-2 p-0" v-model="group" @input="inputEvent" :disabled="!stateOfEditingCommonInfo">-->
<!--              <option v-for="group in numberOfGroups" >{{group}}</option>-->
<!--            </select>-->
            <input type="text" class="textInput" :disabled="!stateOfEditingCommonInfo" @input="inputEvent" v-model="group">
          </div>
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex">
        <nav style="width: 100%;">
          <label class="text ms-0">Научная специальность</label>
          <input type="text" class="textInput" :disabled="!stateOfEditingCommonInfo" @input="inputEvent" v-model="speciality">
        </nav>

      </div>

      <div class="container-fluid justify-content-between d-flex">
        <nav style="width: 50%">
          <div style="width: 100%">
            <label class="text ms-0">Срок обучения</label>
            <input type="text" class="textInput" :disabled="!stateOfEditingCommonInfo" @input="inputEvent" v-model="studyingTime">
          </div>
        </nav>

        <nav style="width: 50%" >
          <div style="width: 100%">
            <label class="text ms-0" >Дата начала обучения</label>
            <input type="text" class="textInput" :disabled="!stateOfEditingCommonInfo" @input="inputEvent" v-model="startDateStudying">
          </div>
        </nav>
      </div>
    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between mt-1">
        <div class="container-fluid justify-content-between d-flex">
          <nav>
            <p class="mainText">Общая информация</p>
          </nav>

<!--          <nav>-->
<!--            <button type="button" class="btn btn-primar btnedit"  @click="editDissertationInfo()" v-if="!stateOfEditingDissertationInfo">-->
<!--              <p>Редактировать</p>-->
<!--            </button>-->

<!--            <button type="button" class="btn btn-primar btnedit"  @click="cancelChangeDissertationInfo()" v-if="stateOfEditingDissertationInfo">-->
<!--              <p>Отменить</p>-->
<!--            </button>-->

<!--            <button type="button" class="btn btn-primar btnedit"  @click="saveChangeDissertationInfo()" v-if="stateOfEditingDissertationInfo && stateOfWritingDissertationInfo">-->
<!--              <p>Сохранить</p>-->
<!--            </button>-->
<!--          </nav>-->
        </div>
      </div>
      <div>
        <div class="container-fluid justify-content-between d-flex">
          <nav class="inputWidth">
            <label class="text">Тема диссертации</label>
            <input type="text" class="textInput" :disabled="!stateOfEditingDissertationInfo"  v-model="theme">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex">
          <nav class="inputWidth">
            <label class="text">Научный руководитель</label>
            <input type="text" class="textInput" disabled  v-model="teacherFullName">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex">
          <nav class="inputWidth">
            <label class="text">Номер приказа об утверждении</label>
            <input type="text" class="textInput" disabled  v-model="numberOfOrderOfStatement">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex">
          <nav class="inputWidth">
            <label class="text">Дата приказа об утверждении</label>
            <input type="text" class="textInput" disabled v-model="dateOfOrderOfStatement">
          </nav>
        </div>
      </div>
    </div>


  </div>

  <div class="mainPage mb-3">
    <div class="container-fluid justify-content-between d-flex">
      <nav>
        <p class="mainText">Смена пароля</p>
      </nav>


    </div>
    <div class="container-fluid justify-content-between">
      <nav style="width: 50%">
        <label class="text ms-0">Старый пароль</label>
        <input type="password" class=textInput @input="inputEvent" v-model="currentPassword">
      </nav>

      <nav style="width: 50%">
        <label class="text ms-0">Новый пароль</label>
        <input type="password" class=textInput @input="inputEvent" v-model="newPassword">
      </nav>

      <nav style="width: 100%" class="mb-1">
        <label class="text ms-0">Подтверждение нового пароля</label>
        <div class="d-flex m-0 justify-content gap-4">
          <input type="password" class=textInput @input="inputEvent" v-model="newPasswordAgain" style="width: 50%">
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="changePassword()">Сменить</button>
        </div>
      </nav>

    </div>

    <transition name="slide-fade">
      <div v-if="errorText!==''" class = "wrongPassword">{{errorText}}</div>
    </transition>




  </div>


</template>

<script>
import store from "@/store/index.js";
import changePasswordNotification from "@/components/layout/notifications/changePasswordNotification.vue";
import axios from "axios";

export default {
  name: "studentsMainPage",
  components : {changePasswordNotification},
  "changePasswordNotification" : changePasswordNotification,
  data(){
    return {
      fullName: '',
      email: '',
      group: '',
      speciality: '',
      studyingTime: '',
      startDateStudying: '',
      department: '',
      faculty: '',
      admissionOrder: '',
      fullNameCopy: "",
      emailCopy: '',
      groupCopy: '',
      specialityCopy: '',
      studyingTimeCopy: '',
      startDateStudyingCopy: '',
      departmentCopy: '',
      facultyCopy: '',
      admissionOrderCopy: '',
      currentPassword: '',
      newPassword: '',
      newPasswordAgain: '',
      stateOfSending:false,
      resultOfSending: '',
      errorText : '',
      stateOfEditingCommonInfo: false,
      stateOfWritingCommonInfo: false,
      stateOfEditingDissertationInfo : false,
      stateOfWritingDissertationInfo : false,
      numberOfGroups : [],
    }
  },

  methods:{
    editProfile(){
      this.stateOfEditingCommonInfo = !this.stateOfEditingCommonInfo
      this.fullNameCopy = this.fullName
      this.emailCopy = this.email
      this.groupCopy = this.group
      this.specialityCopy = this.speciality
      this.studyingTimeCopy = this.studyingTime
      this.startDateStudyingCopy = this.startDateStudying
      this.departmentCopy = this.department
      this.facultyCopy = this.faculty
      this.admissionOrderCopy = this.admissionOrder
    },

    editDissertationInfo(){

    },

    inputEvent(){
      if (this.errorText !== '')
        this.errorText = ''
      if(!this.stateOfWritingCommonInfo){
        this.stateOfWritingCommonInfo = !this.stateOfWritingCommonInfo
      }
    },
    async changePassword(){
      if (this.currentPassword.length === 0 || this.newPassword.length === 0 || this.newPasswordAgain.length === 0){
        this.errorText = "Поля не должны быть пустыми"
        return
      }

      if (this.newPassword !== this.newPasswordAgain){
        this.errorText = "Пароли не совпадают"
        return
      }

      var resultState = ''
      try {
        const response = await axios.post(this.IP +"/authorize/password/change/" + localStorage.getItem("access_token"),
            {
              "oldPassword": this.currentPassword,
              "newPassword": this.newPassword,
            }
        )
        resultState = response.status
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }


      this.resultOfSending = (resultState === 200)
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    },

    async getProfileData(){
      try {
        const response = await axios.get(this.IP +"/student/profile/" + localStorage.getItem("access_token"))
        this.data = response.data
        console.log(response)
      }
      catch (e) {
        console.log(e)
      }
      this.fullName = this.data.full_name
      this.email = this.data.email
      this.group = this.data.group_name
      this.speciality = this.data.specialization
      this.startDateStudying = this.data.start_date.slice(0,10)
      this.studyingTime = this.data.years
    },

    cancelChange(){
      this.stateOfEditingCommonInfo = !this.stateOfEditingCommonInfo
      this.fullName = this.fullNameCopy
      this.email = this.emailCopy
      this.group = this.groupCopy
      this.speciality = this.specialityCopy
      this.studyingTime = this.studyingTimeCopy
      this.startDateStudying = this.startDateStudyingCopy
      this.department = this.departmentCopy
      this.faculty = this.facultyCopy
      this.admissionOrder = this.admissionOrderCopy

      if (this.stateOfWritingCommonInfo)
        this.stateOfWritingCommonInfo = !this.stateOfWritingCommonInfo

    },
    saveChange(){
      this.stateOfEditingCommonInfo = !this.stateOfEditingCommonInfo
      if (this.stateOfWritingCommonInfo)
        this.stateOfWritingCommonInfo = !this.stateOfWritingCommonInfo
    },


  },
  async beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }
    await this.getProfileData()
  }

}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';


* {
  margin:0;
  padding: 0;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95% !important;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;;
}

.checkboxBlock{
  padding-top: 0.8%;
  padding-left: 0.8%;
  padding-bottom: 2%;
}

.inputWidth {
  width: 100%;
}

.blockStyles {
  height: 2rem;
  border-radius: 10px;
  border-color: #7C7F86;
  border-width: 2px 2px 2px 2px !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
  font-size: 0.8rem;
}



@media (min-width: 800px) {
  .loggining {
    font-size: 1rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding: 0.3rem;
    margin: 0 !important;
    color:white !important;
  }

  .mainText {
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
  }

  header .head-top nav {
    margin-top: 2px;
    margin-left: 20%;
    margin-right: 20%;
  }

  header .head-top nav a {
    height: 20px;
    width: 20px;
  }

  header .head-top nav a:nth-of-type(1) {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }

  header .head-top nav a:nth-of-type(2) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem !important;
    font-weight: 450;
  }

  .mainPage {
    width: 70%;

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

  div nav {
    margin-left: 1.5rem !important;
    margin-right: 1.5rem !important;;
    margin-bottom: 1%;

  }

  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  .btnedit{
    margin-top: 1rem;
    font-size: 0.9rem;
  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;
    font-size: medium;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .textInput {
    font-size: 1rem;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    font-weight: 400;
    border-width: 2px 2px 2px 2px !important;
    border-color: #7c7f86 !important;
    height: 2rem !important;
    padding-left:0.5rem;
  }



  input {
    padding-left : 0.5rem;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.2rem;
    text-align: center;
    padding-top: 2%;
  }
}

@media (max-width: 800px) {
  .loggining {
    font-size: 0.9rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .mainText {
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
  }

  header .head-top nav {
    margin-top: 2px;
    margin-left: 20%;
    margin-right: 20%;
  }

  header .head-top nav a {
    height: 20px;
    width: 20px;
  }

  header .head-top nav a:nth-of-type(1) {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem !important;
    font-weight: 450;

  }

  header .head-top nav a:nth-of-type(2) {
    width: 30px;
    height: 30px;
    margin: 0 auto;
    margin-top: 10px;
  }

  .mainPage {
    width: 80%;

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

  div nav {
    margin-left: 1.5rem !important;
    margin-right: 1.5rem !important;;
    margin-bottom: 0.3rem;
  }

  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  .btnedit{
    margin-top: 1rem;
    font-size: 0.8rem;

  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;

    font-size: medium;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 22px;
    font-weight: 450;
  }

  input {
    padding-left : 0.5rem;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 1.1rem;
    text-align: center;
    padding-top: 2%;
  }

  .textInput {
    font-size: 0.8rem;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    font-weight: 400;
    border-width: 2px 2px 2px 2px !important;
    border-color: #7c7f86 !important;
    height: 2rem !important;
    padding-left:0.5rem;
  }

}

@media (pointer: coarse) and (max-width: 400px) {
  .loggining {
    font-size: 0.8rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .mainText {
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1rem;
  }

  header .head-top nav {
    margin-top: 0 !important;
    margin-left: 20%;
    margin-right: 20%;
  }



  header .head-top nav a:nth-of-type(1) {
    width: 10px;
    height: 10px;
    margin: 0 auto;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem !important;
    font-weight: 450;

  }

  header .head-top nav a:nth-of-type(2) {
    width: 30px;
    height: 30px;

  }

  .mainPage {
    width: 90%;

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

  .textInput {
    font-size: 0.6rem;
    border-top-left-radius: 10px !important;
    border-top-right-radius: 10px !important;
    border-bottom-left-radius: 10px !important;
    border-bottom-right-radius: 10px !important;
    font-weight: 400;
    border-width: 2px 2px 2px 2px !important;
    border-color: #7c7f86 !important;
    height: 2rem !important;
    padding-left:0.5rem;
  }


  div nav button {
    background-color: white !important;
    border-color: white !important;
    color: #0055bb !important;
    transition: 0.5s all ease;
  }

  div nav button:hover {
    color: darkblue;
    background-color: #7c7f86;
  }

  .btnedit{
    margin-top: 1rem;
    font-size: 0.6rem;

  }

  div nav input {
    width: 100%;
    border-color: #7c7f86 !important;
    border-radius: 0.7em;
    font-size: 0.8rem !important;
  }

  div nav label {
    display: block;
    margin-left: 5%;
  }

  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem !important;
    font-weight: 450;
  }

  input {
    padding-left : 0.5rem;
  }

  .wrongPassword {
    color: red;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size: 0.8rem;
    text-align: center;
    padding-top: 2%;
  }
}

.slide-fade-enter-active {
  transition: all .3s ease-out;
}

.slide-fade-leave-active {
  transition: all .8s
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  opacity: 0;
}


</style>