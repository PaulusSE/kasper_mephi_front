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

    <div class="roundBlock pt-2">

<div>
  <p class="mainText text-start">Пользователи не прошедшие регистрацию</p>
</div>



<div class="roundBlock mt-2">


<div class="d-flex justify-content-between" style="margin-left: 2.5%">
  <nav class="mt-3" >
    <p class="headingSemester"></p>
  </nav>
  <nav class="text-end" style="margin-right: 2.5%">
    <button v-if="!editTableWithUsers" @click="buttonEditUsers" class="editBtn mt-3">Редактировать</button>
    <div v-else class="d-flex gap-1">
      <button class="editBtn mt-3 " @click="buttonCancelUsers">Отменить</button>
      <button class="editBtn mt-3 " @click="buttonSaveUsers">Сохранить</button>
    </div>
  </nav>
</div>


<div v-if="!editTableWithUsers">
<div class="roundBlock p-0 mt-2">
  <div>
    <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfUsers.length !== 0}">
      <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
        №
      </div>

      <div class=" textMiniTable rightLine" style="width: 40%; text-align: center">
        Почта
      </div>

      <div class=" textMiniTable" style="width: 40%; text-align: center">
        Тип
      </div>



    </div>

    <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfUsers.length}" v-for="(element,index) in arrayOfUsers">
      <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
        {{index + 1}}
      </div>

      <div class="textMiniTable rightLine"  style="width: 40%; text-align: center">
        <p >{{element.email}}</p>
      </div>

      <div class="textMiniTable"  style="width: 40%; text-align: center">
        <p >{{this.userTypeMap[element.user_type]}}</p>
      </div>

    </div>
  </div>

</div>
</div>
<div v-else>
<div class="roundBlock p-0 mt-2">
  <div>
    <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfUsers.length !== 0}">
      <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
        №
      </div>

      <div class=" textMiniTable rightLine" style="width: 40%; text-align: center">
        Группа
      </div>

      <div class=" textMiniTable rightLine" style="width: 40%; text-align: center">
        Тип
      </div>

      <div class=" textMiniTable" style="width: 10%; text-align: center">

      </div>
    </div>

    <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfUsers.length}" v-for="(element,index) in arrayOfUsers">
      <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
        {{index + 1}}
      </div>

      <div class="textMiniTable rightLine"  style="width: 40%; text-align: center">
        <input type="text" class="inputBox" v-model="element.email" disabled>
      </div>
      
      <div class="textMiniTable rightLine"  style="width: 40%; text-align: center">
        <p >{{this.userTypeMap[element.user_type]}}</p>
      </div>

      <div class="textMiniTable " style="width: 10%; text-align: center">
        <button class="btnAddDeleteFiles mt-2" @click="deleteUser(index)">
          <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
        </button>
      </div>

    </div>
  </div>

</div>
</div>

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
      editTableWithUsers : false,
      arrayOfUsers: [],
      arrayOfUsersCopy: [],
      arrayOfIdsToDelete: [],

      userTypeMap: {
        "student" : "Аспирант",
        "supervisor" : "Научный руководитель"
      }


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

      await this.getUsers()

    },

    deleteUser(index){
      this.arrayOfIdsToDelete.push(this.arrayOfUsers[index].user_id)
      this.arrayOfUsers.splice(index, 1)
    },


    buttonEditUsers(){
        this.editTableWithUsers = true
        this.arrayOfUsersCopy = JSON.parse(JSON.stringify(this.arrayOfUsers));
    },

    buttonCancelUsers(){
      this.editTableWithUsers = false
      this.arrayOfUsers = JSON.parse(JSON.stringify(this.arrayOfUsersCopy));
      this.arrayOfIdsToDelete.length = 0
    },

    async buttonSaveUsers(){
      this.editTableWithUsers = !this.editTableWithUsers


      if (this.arrayOfIdsToDelete.length === 0)
        return
      console.log(this.arrayOfIdsToDelete)
      try {
        const response = await axios.put(this.IP + "/administrator/users/not_registered/" + localStorage.getItem("access_token"),{
            "ids" : this.arrayOfIdsToDelete
        })
        this.data = response.data
        this.arrayOfUsers = this.data

      }
      catch (e) {

        console.log(e)
      }
    },

    async getUsers(){
      try {
        const response = await axios.get(this.IP + "/administrator/users/not_registered/" + localStorage.getItem("access_token"))
        this.data = response.data
        this.arrayOfUsers = this.data

      }
      catch (e) {

        console.log(e)
      }
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

      await this.getUsers()

    },


    callNotification(){
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    }
  },
  async beforeMount() {
  await this.getUsers()
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

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
}

.inputBox {
  border: 0 !important;
  font-weight: 400;
  text-align: center;
  border-radius: 0 !important;
  color:#000000;
  background-color: white;
  outline: none !important;
  width: 100%;
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

  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
  }

  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-all;
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

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
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

  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.9rem;
  }


  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.9rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
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


  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
    font-size: 0.8rem;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.7rem !important;
  }
  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.6rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
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