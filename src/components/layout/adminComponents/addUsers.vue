<template>


  <sending-files-notification
      v-if="stateOfSending"
      :result-of-sending=resultOfSending
  ></sending-files-notification>

  <div class="mainPage">
    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="roundBlock pt-2">

      <div>
        <p class="mainText text-start">Добавление пользователей</p>
      </div>

      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Аспиранты</p>
        </div>

        <div>
          <textarea  v-model="newStudents"  rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
        </div>

        <div class="myBtn mt-2" >
          <button class="sendFilesBtn p-2" @click="addStudents">
            <div class="d-flex justify-content-around">
              <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
              <p class="loadText">
                Добавить аспирантов
              </p>
            </div>

          </button>
        </div>

      </div>

      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Научные руководители</p>
        </div>

        <div>
          <textarea  v-model="newTeachers"  rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
        </div>

        <div class="myBtn mt-2" >
          <button class="sendFilesBtn p-2" @click="addTeachers">
            <div class="d-flex justify-content-around">
              <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
              <p class="loadText">
                Добавить научных руководителей
              </p>
            </div>

          </button>
        </div>


      </div>

      <div class="roundBlock">
        <p class="loadText">
          Формат для загрузки пользователей в систему
        </p>
        <p>
          Адрес электронной почты через точку с запятой без пробела : email1@mail.com;email2@gmail.com;
        </p>
      </div>

    </div>

  </div>
</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import sendingFilesWithUsersNotification
  from "@/components/layout/notifications/adminNotifications/sendingFilesWithUsersNotification.vue";
import SendingFilesNotification
  from "@/components/layout/notifications/studentNotifications/sendingFilesNotification.vue";
import store from "@/store/index.js";
import axios from "axios";
import utf8 from "utf8";
export default {
  name: "addUser",
  props : ["stateOfAdminPage"],
  components : {
    SendingFilesNotification,
    "headerOfAdmin": headerOfAdmin,
    "notification" : sendingFilesWithUsersNotification
  },
  data() {
    return {
      newStudents : [],
      newTeachers : [],
      stateOfSending : false,
      resultOfSending: false,

    }
  },
  methods: {

    async addStudents(){
      try {
        const response = await axios.post(this.IP +"/administrator/users/students/" + localStorage.getItem("access_token"),
            {
              "users" : this.newStudents
            }
        )
        if (response.status === 200) {
          this.resultOfSending = true
        }


      }
      catch (e) {
        this.resultOfSending = false
      }
      this.callNotification()
      this.newStudents = ''

    },

    async addTeachers(){
      try {
        const response = await axios.post(this.IP +"/administrator/users/supervisors/" + localStorage.getItem("access_token"),
            {
              "users" : this.newTeachers
            }
        )
        if (response.status === 200) {
          this.resultOfSending = true
        }


      }
      catch (e) {
        this.resultOfSending = false
      }
      this.callNotification()
      this.newTeachers = ''

    },


    callNotification(){
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    }
  },
  beforeMount() {

  }
}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';


* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

@media (min-width: 800px) {
  .mainText {
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.3rem;

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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .myBtn {
    margin-right: 2.5%;
    text-align: right;
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 1.2rem;
    font-weight: 500;
  }

  .btnAddDeleteFiles {
    border:0;
    background:white;
  }

  .image-upload>input {
    display: none;
  }

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;

    padding: 0.5rem !important;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
  }

  .imgUploadFile {
    width: 30px;
    height: 30px;
  }
  .loadTextState {
    font-size: 1.1rem;
  }
}

@media (max-width: 800px) {
  .mainText {
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;

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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .myBtn {
    margin-right: 2.5%;
    text-align: right
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 1rem;
    font-weight: 500;
  }

  .btnAddDeleteFiles {
    border:0;
    background:white;
  }

  .image-upload>input {
    display: none;
  }

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:22px;
    padding: 5px;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
  }

  .imgUploadFile {
    width: 30px;
    height: 30px;
  }

  .imgSize {
    width: 40px !important;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .mainText {
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
    margin-top: 0;
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;

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
    margin: 1.5% auto 1%;
    padding: 0 0 1.5%;
  }

  .myBtn {
    margin-right: 2.5%;
    text-align: right
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 0.8rem;
    font-weight: 500;
  }

  .btnAddDeleteFiles {
    border:0;
    background:white;
  }

  .image-upload>input {
    display: none;
  }

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:0.6rem;
    padding: 5px;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
  }

  .imgUploadFile {
    width: 20px;
    height: 20px;
  }

  .imgSize {
    width: 30px;
  }

  .loadTextState {
    font-size: 0.6rem;
  }
}



.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
}


</style>