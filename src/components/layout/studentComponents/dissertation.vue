<template>
  <link href="../../../../static/css/dissertation.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">

    <sending-files-notification
        v-if="stateOfSending"
        :result-of-sending = resultOfsending
    ></sending-files-notification>



  <div class="mainPage">
    <header-of-student
        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage
    ></header-of-student>

    <div class="roundBlock">
    <div class="d-flex justify-content-between" style="height:3.5em">
      <nav class="checkboxBlock">
        <p class="mainText">Общая информация</p>
      </nav>
      <nav v-if="!editingInfo">
        <button class="editBtn" @click="editInformation">Редактировать</button>
      </nav>
      <nav v-else>
        <button class="editBtn" @click="editInformation">Сохранить</button>
      </nav>


    </div>
    <div>
      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">Тема</label>
          <input type="text" class="textInput" :disabled="!editingInfo"  v-model="theme">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">ФИО преподователя</label>
          <input type="text" class="textInput" :disabled="!editingInfo"  v-model="teacherFullName">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">Номер приказа об утверждении</label>
          <input type="text" class="textInput" :disabled="!editingInfo"  v-model="numberOfOrderOfStatement">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">Дата приказа об утверждении</label>
          <input type="text" class="textInput" :disabled="!editingInfo" v-model="dateOfOrderOfStatement">
        </nav>
      </div>


    </div>
  </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">План подготовки рукописи диссертаций и автореферата</p>
        <button v-if="!editingCheckbox" @click="editCheckBox" class="editBtn2">Редактировать</button>
        <button v-else @click="editCheckBox" class="editBtn2">Сохранить</button>
      </div>

    <div class="myBox roundBlock p-0">
      <div class="d-flex underline" >
        <div class="rightLine col-6 mainText">
          <p class="mainText">Этап</p>
        </div>
        <div class="col-6 mainText" >
          Семестр
        </div>
      </div>


      <div class="d-flex underline">
        <div class="col-6 mainText rightLine">

        </div>
        <div class="col-1 mainText rightLine">
            1
        </div>
        <div class="col-1 mainText rightLine">
            2
        </div>
        <div class="col-1 mainText rightLine">
            3
        </div>
        <div class="col-1 mainText rightLine">
            4
        </div>
        <div class="col-1 mainText rightLine">
            5
        </div>
        <div class="col-1 mainText">
              6
        </div>

      </div>



      <div class="d-flex" :class="{underline:index !== 10}" v-for="(element,index) in array">
        <div class="col-6 textTable rightLine">
          {{element.name}}
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id11 :disabled="!(actualSemestr === 1) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id12 :disabled="!(actualSemestr === 2) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id13 :disabled="!(actualSemestr === 3) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id14 :disabled="!(actualSemestr === 4) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id15 :disabled="!(actualSemestr === 5) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput">
          <input type="checkbox" class="myCheckBox" v-model=element.id16 :disabled="!(actualSemestr === 6) || !editingCheckbox">
        </div>

      </div>
    </div>

    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between" style="height:4em">
        <nav class="checkboxBlock">
          <p class="mainText">Файлы</p>
        </nav>
        <nav class="checkboxBlock">
          <p class="mainText" style="font-size: 20px; display: inline">Статус: </p><p style="display: inline" class="stateOfFiles">На доработку</p>
        </nav>

      </div>



      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Титульный лист:</p>
        </div>

        <div v-if="titlePage.length === 0" class="ms-5 mt-2">
          <p class="loadTextState">Файлы не выбраны</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ titlePage.name }} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteTitlePage">
              <img v-if="titlePage.length === 0" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="static/figures/trashActive.png" alt="trashFilesLogo">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input1">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input1" type="file" @input="inputTitlePage"/>
          </div>
        </div>
      </div>



      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Пояснительная записка:</p>
        </div>

        <div v-if="explanatoryNote.length === 0" class="ms-5 mt-2">
          <p class="loadTextState">Файлы не выбраны</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ explanatoryNote.name }} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteExplanatoryNote">
              <img v-if="explanatoryNote.length === 0" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="static/figures/trashActive.png" alt="trashFilesLogo">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input2">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input2" type="file" @input="inputExplanatoryFile"/>
          </div>
        </div>
      </div>

      <div style="text-align: right;">
        <button class="sendFilesBtn" @click="sendFiles" :disabled="!(titlePage.length !==0 || explanatoryNote.length !==0)">
          <div class="d-flex justify-content-around">
            <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
            <p style="font-size: 16px">
              Отправить
            </p>
          </div>
        </button>

      </div>

    </div>



    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Рецензия</p>
        </nav>
      </div>

      <div>
        <p v-if="feedback === ''" class="mainText" style="text-align: left; margin-left: 5%; font-size: 25px">Рецензия отсутствует</p>
        <p v-else style="font-size:20px; font-weight: 350">
          <textarea disabled v-model="feedback" rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
        </p>
      </div>
    </div>



  </div>


</template>

<script>
import PageNotFound from "@/App.vue";
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import sendingFilesNotification
  from "@/components/layout/notifications/studentNotifications/sendingFilesNotification.vue";
import SendingFilesNotification
  from "@/components/layout/notifications/studentNotifications/sendingFilesNotification.vue";
import store from "@/store/index.js";



export default {
  name: "dissertation",
  components: {SendingFilesNotification, headerOfStudent, PageNotFound},
  "headerOfStudent":headerOfStudent,
  "notification":sendingFilesNotification,
  props: ["stateOfStudentPage", "educationTime"],

  data(){
    return {
      titlePage: [],
      explanatoryNote: [],
      editingInfo : false,
      editingCheckbox : false,
      theme : "Бу",
      teacherFullName : "Бубу",
      numberOfOrderOfStatement : 123,
      dateOfOrderOfStatement : "12.05.2021",
      actualSemestr: 3,
      jobStatus:1,
      stateOfSending:false,
      resultOfsending:false,
      feedback: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
          "\n ",
      array: [
        {
          name: "Введение",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Основная часть",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 1",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 2",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 3",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 4",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 5 (при необоходимости)",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 6 (при необоходимости)",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Заключение",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Список литературы",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Автореферат",
          id11:false,
          id12:false,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
      ]
    }

  }

,
  methods: {
    editInformation() {
      this.editingInfo = !this.editingInfo
    },
    editCheckBox() {
      this.editingCheckbox = !this.editingCheckbox;
    },
    async fileInputChange() {
      let files = Array.from(event.target.files);

      this.filesOrder = files.slice();

      for (let item of files) {
        await this.uploadFile(item);
      }
    },

    async uploadFile() {
      let form = new FormData();
      form.append("file",item)

      await axios.post('', form, {
        onUploadProgress: (itemUpload) => {
          this.fileProgress = Math.round((item.loaded / itemUpload.total) * 100);
          this.fileCurrent = item.name + '' + this.fileProgress;
        }
      })
          .then(response => {
            this.fileProgress = 0;
            this.fileCurrent = '';
            this.filesFinish.push(item);
            this.filesOrder.splice(item,1);
          })
          .catch(error => {
        console.log(error);
      })
    },
    deleteExplanatoryNote() {
      this.explanatoryNote = []
    },
    deleteTitlePage(){
      this.titlePage = []
    },
    inputTitlePage(){
      this.titlePage = event.target.files[0]
    },
    inputExplanatoryFile(){
      this.explanatoryNote = event.target.files[0]
    },
    sendFiles(){
      this.stateOfSending = true
      this.titlePage = []
      this.explanatoryNote = []
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    },

  },
  beforeMount() {
    if (store.getters.getType !== "student"){
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


.checkboxBlock{
  padding-top: 0.8%;
  padding-left: 0.8%;
  padding-bottom: 2%;
}

.sendFilesBtn{
  margin-right: 2.5%;
  width: 13%;
  height: 2.2em;
  background-color: #0055BB;
  font-family: "Raleway", sans-serif;
  font-size:22px;
  padding: 5px;
  border-radius: 10px;
  color:white;
  font-weight: 400;
  border: 0;
  margin-bottom: 1%;
  margin-top: 1%;
}



.myCheckBox{
  zoom: 0.4;
  accent-color: white;
  background-color: green;
}

.myInput{

  display: grid !important;
  place-items: center !important;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

}

.stateOfFiles{
  font-size: 18px;
  color:#FFC009;


}

.imgUploadFile {
  width: 30px;
  height: 30px;
}


.myBox {
  width: 80%;
  margin: auto;

}

.underline {
  border-bottom: solid 0.12em #DEDEDE;

}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
  font-size: 25px !important;
}

.btnAddDeleteFiles {
  border:0;
  background:white;
}


.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:30px;
  text-align: center;
}

.textTable{
  color:#7C7F86;
  font-weight: 400;
  font-size:21px;
  text-align: center;
}

.editBtn {
  color:#0055BB;
  border: 0;
  margin-top: 5%;
  margin-right: 1%;
}

.editBtn2 {
  color:#0055BB;
  border: 0;
  background-color: white;
}

ul p{
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size:22px;
  margin-left: 2%;
}

.ext{
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size:22px;
  margin-left: 2%;
}

.text2 {
  display: inline;
  font-weight: 400;
  margin-left:0.35%;
}

.text3 {
  display: inline;
  font-weight: 400;
  font-family: "Times New Roman", "Arial", "serif";
  font-size: 18px;
  height: 2.2em !important;
  border-radius: 0.3rem !important;
}

.selectedFileMessage {
  font-weight: 400;
  font-family: "Times New Roman", "Arial", "serif";
  font-size: 15px;
  margin-left:2%;
  color: #7C7F86;
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

.loadText {
  font-family: 'Raleway', 'sans-serif';
  font-size: 22px;
  font-weight: 500;
}

.image-upload>input {
  display: none;
}

.textWithCarry{
  border: 0 !important;
  resize: none;
  width: 100%;
  overflow-x: hidden;
  overflow-y:scroll;
  font-size: 25px;
  outline: none;
}

.text {
  font-family: "Raleway", sans-serif;
  color: #7c7f86;
  font-size: 22px;
  font-weight: 450;
}

.textInput {
  font-size: 20px;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  font-weight: 400;
  border-width: 2px 2px 2px 2px !important;
  border-color: #7c7f86 !important;

}




</style>