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
          <input type="text" class="textInput" disabled  v-model="teacherFullName">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">Номер приказа об утверждении</label>
          <input type="text" class="textInput" disabled  v-model="numberOfOrderOfStatement">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav style="width: 100%;">
          <label class="text">Дата приказа об утверждении</label>
          <input type="text" class="textInput" disabled v-model="dateOfOrderOfStatement">
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
          {{index}}
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id1 :disabled="!(actualSemestr === 1) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id2 :disabled="!(actualSemestr === 2) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id3 :disabled="!(actualSemestr === 3) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id4 :disabled="!(actualSemestr === 4) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine">
          <input type="checkbox" class="myCheckBox" v-model=element.id5 :disabled="!(actualSemestr === 5) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput">
          <input type="checkbox" class="myCheckBox" v-model=element.id6 :disabled="!(actualSemestr === 6) || !editingCheckbox">
        </div>

      </div>
    </div>

    </div>

    <div class="roundBlock">

      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Отчетные файлы</p>
        </nav>
      </div>

      <dissertation-tab v-for="(files,index) in arrayWithLinksToFiles"
                        :id=index
                        :job-status = statusOfJob[jobStatus]
                        :files = files
                        :state-of-sending = this.stateOfSending
                        @makeNotification="makeNotification()"
      ></dissertation-tab>

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
import dissertationTab from "@/components/layout/studentComponents/dissertationTab.vue";
import store from "@/store/index.js";
import axios from "axios";


export default {
  name: "dissertation",
  components: {SendingFilesNotification, headerOfStudent, PageNotFound, dissertationTab},
  "headerOfStudent":headerOfStudent,
  "notification":sendingFilesNotification,
  "dissertationTab" : dissertationTab,
  props: ["stateOfStudentPage", "educationTime"],

  data(){
    return {
      titlePage: [],
      explanatoryNote: [],
      editingInfo : false,
      editingCheckbox : false,
      theme : "",
      teacherFullName : "",
      numberOfOrderOfStatement : '',
      dateOfOrderOfStatement : "",
      actualSemestr: 3,
      jobStatus:'',
      stateOfSending:false,
      resultOfsending:true,
      arrayWithLinksToFiles : [
        {
          TitleList : "",
          ExplanationaryNote : ''
        },
        {
          TitleList : '',
          ExplanationaryNote : ''
        },
      ],
      feedback: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.\n" +
          "\n ",
      array: {

        "Введение": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },

        "Основная часть": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },


        "Глава 1": {
          id1: false,
          id2: false,
          id3: false,
          id4: true,
          id5: false,
          id6: false
        },


        "Глава 2": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },


        "Глава 3": {
          id1: false,
          id2: false,
          id3: true,
          id4: false,
          id5: false,
          id6: false
        },


        "Глава 4": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },


        "Глава 5 (при необоходимости)": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },

        "Глава 6 (при необоходимости)": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },


        "Заключение": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        }
        ,

        "Список литературы": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },


        "Автореферат": {
          id1: false,
          id2: false,
          id3: false,
          id4: false,
          id5: false,
          id6: false
        },

      },
      progressMap : new Map(),
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Сдано',
        'empty': ''
      }
    }

  }

,
  methods: {
    editInformation() {
      this.editingInfo = !this.editingInfo
    },
    async editCheckBox() {

      //todo отправлять токен в хедере, не отправлять student_id, client_id

      this.editingCheckbox = !this.editingCheckbox;
      var client_id = '7becb1de-7349-11ee-b962-0242ac120002'
      var student_id = '0c23146e-734a-11ee-b962-0242ac120002'
      var semestr_id = 10

      var requestPlan = {
        "Введение" : 'intro',
        "Основная часть" : 'main',
        "Глава 1" : 'ch. 1',
        "Глава 2" : 'ch. 2',
        "Глава 3" : 'ch. 3',
        "Глава 4" : 'ch. 4',
        "Глава 5 (при необоходимости)" : 'ch. 5',
        "Глава 6 (при необоходимости)" : 'ch. 6',
        "Заключение" : 'end',
        "Список литературы" : 'literature',
        "Автореферат" : 'abstract',
      }

      const keys = new Map(Object.entries(requestPlan));

      var data = []

      for (var [key, value] of keys) {
        data.push({
          clientID : client_id,
          studentID : student_id,
          first : this.array[key].id1,
          second : this.array[key].id2,
          third : this.array[key].id3,
          forth : this.array[key].id4,
          fifth : this.array[key].id5,
          sixth : this.array[key].id6,
          progressName : value,
          semesterProgressID : semestr_id
        })
        semestr_id = semestr_id + 1
      }

      try {
        const response = await axios.post("http://localhost:8080/students/dissertation/progress",
            {"progress" : data
            }
        )
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }





    },
    async fileInputChange() {
      let files = Array.from(event.target.files);

      this.filesOrder = files.slice();

      for (let item of files) {
        await this.uploadFile(item);
      }
    },

    makeNotification() {
      this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
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

  },
  async beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }

    try {
      const response = await axios.get('http://localhost:8080/students/dissertation/4a90979c-734c-11ee-b962-0242ac120002')
      this.data = await response.data
      this.theme = this.data.commonInfo.theme
      this.teacherFullName = this.data.commonInfo.teacherFullName
      this.teacherFullName = this.data.commonInfo.teacherFullName //todo забить доконца

      this.jobStatus = this.data.commonInfo.jobStatus
      this.numberOfOrderOfStatement = this.data.commonInfo.numberOfOrderOfStatement
      this.feedback = this.data.commonInfo.feedback
      let objectDate = this.data.commonInfo.dateOfOrderOfStatement

      const keys = ['intro', 'main', 'ch. 1', 'ch. 2', 'ch. 3', 'ch. 4', 'ch. 5', 'ch. 6', 'end', 'literature', 'abstract']
      var key = ''
      for (var i = 0; i < keys.length; i++) {
        key = 'intro'
        this.data.dissertationPlan[key].id1 = (this.data.dissertationPlan[key].id1 === true) ? this.data.dissertationPlan[key].id1 : false
        this.data.dissertationPlan[key].id2 = (this.data.dissertationPlan[key].id2 === true) ? this.data.dissertationPlan[key].id2 : false
        this.data.dissertationPlan[key].id3 = (this.data.dissertationPlan[key].id3 === true) ? this.data.dissertationPlan[key].id3 : false
        this.data.dissertationPlan[key].id4 = (this.data.dissertationPlan[key].id4 === true) ? this.data.dissertationPlan[key].id4 : false
        this.data.dissertationPlan[key].id5 = (this.data.dissertationPlan[key].id5 === true) ? this.data.dissertationPlan[key].id5 : false
        this.data.dissertationPlan[key].id6 = (this.data.dissertationPlan[key].id6 === true) ? this.data.dissertationPlan[key].id6 : false
      }
      this.array['Введение'] = this.data.dissertationPlan['intro']
      const year = (objectDate.slice(0,4))
      const month = (objectDate.slice(5,7))
      const day = (objectDate.slice(8,10))

      this.dateOfOrderOfStatement = day + '.' + month + '.' + year
      this.actualSemestr = this.data.commonInfo.actualSemestr


    }
    catch (e) {
      console.log(e)
    }
    this.jobStatus = 'todo'


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

.chosen_box{
background-color: red;
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