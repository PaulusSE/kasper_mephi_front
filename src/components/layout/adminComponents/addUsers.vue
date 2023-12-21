<template>
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

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

    <div class="roundBlock pt-2 ps-4">

      <div class="mt-2 ms-3">
        <p class="headerText text-start">Загрузить</p>
      </div>

      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Аспиранты</p>
        </div>

        <div v-if="studentsFile.length === 0" class="ms-5 mt-2">
          <p class="loadTextState">Файлы не выбраны</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ studentsFile.name }} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteStudentFile">
              <img v-if="studentsFile.length === 0" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="../../../../static/figures/trashActive.png">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input2">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input2" type="file" @input="inputStudentFile"/>
          </div>
        </div>


      </div>

      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Научные руководители</p>
        </div>

        <div v-if="teachersFile.length === 0" class="ms-5 mt-2">
          <p class="loadTextState">Файлы не выбраны</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ teachersFile.name }} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteTeacherFile">
              <img v-if="teachersFile.length === 0" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="../../../../static/figures/trashActive.png">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input" type="file" @input="inputTeacherFile"/>
          </div>
        </div>
      </div>

      <div style="text-align: right; margin-right: 2.5%; margin-left: 2.5%">
        <button class="sendFilesBtn p-2" @click="sendFiles">
          <div class="d-flex justify-content-around">
            <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
            <p>
              Сохранить
            </p>
          </div>

        </button>
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
      studentsFile : [],
      teachersFile : [],
      stateOfSending : false,
      resultOfSending : false,
    }
  },
  methods: {
    deleteStudentFile(){
      this.studentsFile = []
    },
    deleteTeacherFile(){
      this.teachersFile = []
    },
    inputStudentFile(){
      this.studentsFile = event.target.files[0]
    },
    inputTeacherFile(){
      this.teachersFile = event.target.files[0]
    },
    sendFiles(){
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);

      console.log("Sending files")
      this.studentsFile = []
      this.teachersFile = []
    }
  },
  beforeMount() {
    if (store.getters.getType !== "admin"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.headerText{
  font-family: Raleway,serif;
  font-size: 24px;
  font-weight: 400;
}

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
  font-size: 22px;
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