<template>
    <sending-files-notification
        v-if="stateOfSending"
        :result-of-sending = resultOfSending
    ></sending-files-notification>

  <range-notification
  :show="showRangeError"
  ></range-notification>

  <work-send-to-check-notification
      :show = "showEditError"
  >
  </work-send-to-check-notification>



  <div class="mainPage">
    <header-of-student
        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage
    ></header-of-student>

    <div class="roundBlock">
    <div class="d-flex justify-content-between mt-1">
      <nav class="checkboxBlock">
        <p class="mainText mt-0">Общая информация</p>
      </nav>
      <nav v-if="!editingInfo">
        <button class="editBtn" @click="editCommonInfo">Редактировать</button>
      </nav>
      <nav v-else>
        <button class="editBtn" @click="saveCommonInfo">Сохранить</button>
      </nav>
    </div>
    <div>
      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Тема диссертации</label>
          <input type="text" class="textInput" :disabled="!editingInfo"  v-model="theme">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Научный руководитель</label>
          <input type="text" class="textInput" disabled  v-model="teacherFullName">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Номер приказа об утверждении</label>
          <input type="text" class="textInput" disabled  v-model="numberOfOrderOfStatement">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Дата приказа об утверждении</label>
          <input type="text" class="textInput" disabled v-model="dateOfOrderOfStatement">
        </nav>
      </div>
    </div>


  </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText">Текущее состояние диссертации</p>
        <button v-if="!editingCheckbox" @click="editTables" class="editBtn2">Редактировать</button>
        <button v-else @click="saveTables" class="editBtn2">Сохранить</button>
      </div>

    <div class="myBox roundBlock p-0">
      <div class="d-flex underline" >
        <div class="rightLine col-4 mainText">
          <p class="mainText">Этап</p>
        </div>
        <div class="col-8 textTable" >
          Семестр
        </div>
      </div>


      <div class="d-flex underline">
        <div class="col-4 textTable rightLine">

        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 1}">
            1
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 2}">
            2
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 3}">
            3
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 4}">
            4
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 5}">
            5
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 6}">
              6
        </div>
        <div class="col-1 textTable rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 7}">
          7
        </div>
        <div class="col-1 textTable" :class="{hightlightActualSemesterColumn : actualSemestr === 8}">
          8
        </div>

      </div>



      <div class="d-flex" :class="{underline: number < 10}" v-for="(element,index, number) in array">
        <div class="col-4 textTable rightLine" style="word-break: break-all">
          {{index}}
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 1}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id1 :disabled="!(actualSemestr === 1) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 2}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id2 :disabled="!(actualSemestr === 2) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 3}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id3 :disabled="!(actualSemestr === 3) || !editingCheckbox" >
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 4}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id4 :disabled="!(actualSemestr === 4) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 5}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id5 :disabled="!(actualSemestr === 5) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 6}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id6 :disabled="!(actualSemestr === 6) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 7}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id7 :disabled="!(actualSemestr === 7) || !editingCheckbox">
        </div>
        <div class="col-1 mainText myInput" :class="{hightlightActualSemesterColumn : actualSemestr === 8}">
          <input type="checkbox" class="form-check-input myCheckBox"  v-model=element.id8 :disabled="!(actualSemestr === 8) || !editingCheckbox">
        </div>

      </div>
    </div>

      <div class=" justify-content-between checkboxBlock">
        <p class="textTable">Процент выполнения диссертационного исследования {{this.progressOfDissertation}} %</p>
        <input type="range" v-model="progressOfDissertation" :disabled="!editingCheckbox">
      </div>

    </div>

    <div class="roundBlock">

      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Отчетные файлы</p>
        </nav>
      </div>

      <dissertation-tab v-for="index in actualSemestr"
                        :id=index
                        :job-status = statusOfJob[this.statuses[index]]
                        :state-of-sending = this.stateOfSending
                        @makeNotification="(resultStatus) => makeNotification(resultStatus)"
                        :actual-semester = this.actualSemestr
                        :waitForCheck = waitForCheck
                        @makeEditErrorNotification = callEditError
      ></dissertation-tab>

    </div>

<div class="text-end pb-2" style="margin-right: 2.5%">
  <button v-if="!waitForCheck" type="button" class="loggining btn btn-primary btn-lg my-1" @click="sendToCheck()">Отправить на проверку</button>
  <button v-else type="button" class="loggining btn btn-primary btn-lg my-1" @click="cancelCheck()">Отменить проверку</button>
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
import rangeNotification from "@/components/layout/notifications/studentNotifications/rangeNotification.vue";
import workSendToCheckNotification
  from "@/components/layout/notifications/studentNotifications/workSendToCheckNotification.vue";

export default {
  name: "dissertation",
  components: {SendingFilesNotification, headerOfStudent, PageNotFound, dissertationTab, rangeNotification, workSendToCheckNotification},
  "headerOfStudent":headerOfStudent,
  "notification":sendingFilesNotification,
  "dissertationTab" : dissertationTab,
  "rangeNotification" : rangeNotification,
  "workSendToCheckNotification" : workSendToCheckNotification,
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
      actualSemestr: '',
      statuses : [],
      stateOfSending:false,
      resultOfSending: '',
      arrayWithFilesId: [],
      jobStatus : '',
      feedback: "",
      waitForCheck : false,
      array: {
      },
      progressMap : new Map(),
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Сдано',
        'empty': '',
        '' : ''
      },
      progressOfDissertation : 15,
      progressOfDissertationCopy : '',
      showRangeError : false,
      showEditError: false,

    }

  }

,
  methods: {
    editCommonInfo() {
      if (this.waitForCheck){
        this.callEditError()
        return
      }

      this.editingInfo = !this.editingInfo
    },
    async saveCommonInfo(){
      try {
        const response = await axios.post(this.IP +"/students/dissertation/theme/" + localStorage.getItem("access_token"),
            {
                "theme" : this.theme
            }
        )
        console.log(response)
      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
      this.editingInfo = !this.editingInfo
    },

    callEditError() {
        this.showEditError = true
        setTimeout(() => {
          this.showEditError = false
        }, 5000);
    },

    editTables() {

      if (this.waitForCheck){
        this.callEditError()
        return
      }

      this.editingCheckbox = !this.editingCheckbox;
      this.progressOfDissertationCopy = this.progressOfDissertation
    },

    async sendToCheck() {
this.waitForCheck = !this.waitForCheck
    },

    async cancelCheck() {
      this.waitForCheck = !this.waitForCheck
    },

    createSaveData() {
      var saveData = new Array()

      var requestPlan = {
        "Введение" : 'intro',
        "Основная часть" : 'main',
        "Глава 1" : 'ch. 1',
        "Глава 2" : 'ch. 2',
        "Глава 3" : 'ch. 3',
        "Глава 4" : 'ch. 4',
        "Глава 5 (При необходимости)" : 'ch. 5',
        "Глава 6 (При необходимости)" : 'ch. 6',
        "Заключение" : 'end',
        "Список литературы" : 'literature',
        "Автореферат" : 'abstract',
      }

      const keys = new Map(Object.entries(requestPlan));

      for (var [key, value] of keys) {
        saveData.push({
          first : this.array[key].id1,
          second : this.array[key].id2,
          third : this.array[key].id3,
          forth : this.array[key].id4,
          fifth : this.array[key].id5,
          sixth : this.array[key].id6,
          seventh : this.array[key].id7,
          eighth : this.array[key].id8,
          progressName : value,
        })
      }
      return saveData
    },

    fillArrayOfFilesID(data) {
      this.arrayWithFilesId = Array(data.length)
      for (var i = 0; i < this.arrayWithFilesId.length; i++){
        this.arrayWithFilesId[i] = new Array()
      }
      for (var i = 0; i < data.length; i++){
        if (data[i].semester === 1) {
          this.arrayWithFilesId[0].push(data[i])
        }
        if (data[i].semester === 2) {
          this.arrayWithFilesId[1].push(data[i])
        }
        if (data[i].semester === 3) {
          this.arrayWithFilesId[2].push(data[i])
        }
        if (data[i].semester === 4) {
          this.arrayWithFilesId[3].push(data[i])
        }
      }

    },

    fillArrayOfStatuses(data) {
      const keys = [1, 2, 3, 4, 5, 6, 7, 8]
      var object = new Map()
      for (var i = 0; i < keys.length; i++){
        object[keys[i]] = ''
      }
      if (data === null){
        this.statuses = object
        return
      }

      for (var i = 0; i < data.length; i++){
        object[data[i].semester] = data[i].status
      }

      this.statuses = object
    },

    async saveTables() {
      this.editingCheckbox = !this.editingCheckbox;
      if (this.progressOfDissertationCopy > this.progressOfDissertation){
        this.progressOfDissertation = this.progressOfDissertationCopy
        this.showRangeError = true
        setTimeout(() => {
          this.showRangeError = false
        }, 5000);

      }





    var saveData = this.createSaveData()


      try {
        const response = await axios.post(this.IP +"/students/dissertation/progress/" + localStorage.getItem("access_token"),
            {"progress" : saveData
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

    makeNotification(resultStatus) {
      if (resultStatus === 200)
        this.resultOfSending = true
      else
        this.resultOfSending = false
            this.stateOfSending = true
      setTimeout(() => {
        this.stateOfSending = false
      }, 5000);
    },

    async uploadFile() {

    },

  },
  async beforeMount() {

    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }

    try {
      const response = await axios.get(this.IP +'/students/dissertation/' + localStorage.getItem("access_token"))

      this.data = await response.data
      this.theme = this.data.commonInfo.theme
      this.teacherFullName = this.data.commonInfo.teacherFullName //todo забить доконца
      this.jobStatus = this.data.commonInfo.jobStatus
      this.numberOfOrderOfStatement = this.data.commonInfo.numberOfOrderOfStatement
      this.feedback = this.data.commonInfo.feedback === undefined ? '' : this.data.commonInfo.feedback
      let objectDate = this.data.commonInfo.dateOfOrderOfStatement
      const keys = ['intro', 'main', 'ch. 1', 'ch. 2', 'ch. 3', 'ch. 4', 'ch. 5', 'ch. 6', 'end', 'literature', 'abstract']
      const myKeys = ['Введение', 'Основная часть', 'Глава 1', 'Глава 2', 'Глава 3', 'Глава 4', 'Глава 5 (При необходимости)', 'Глава 6 (При необходимости)', 'Заключение', 'Список литературы', 'Автореферат' ]
      var key = ''
      for (var i = 0; i < keys.length; i++) {
        key = keys[i]

        this.data.dissertationPlan[key].id1 = (this.data.dissertationPlan[key].id1 === true) ? this.data.dissertationPlan[key].id1 : false
        this.data.dissertationPlan[key].id2 = (this.data.dissertationPlan[key].id2 === true) ? this.data.dissertationPlan[key].id2 : false
        this.data.dissertationPlan[key].id3 = (this.data.dissertationPlan[key].id3 === true) ? this.data.dissertationPlan[key].id3 : false
        this.data.dissertationPlan[key].id4 = (this.data.dissertationPlan[key].id4 === true) ? this.data.dissertationPlan[key].id4 : false
        this.data.dissertationPlan[key].id5 = (this.data.dissertationPlan[key].id5 === true) ? this.data.dissertationPlan[key].id5 : false
        this.data.dissertationPlan[key].id6 = (this.data.dissertationPlan[key].id6 === true) ? this.data.dissertationPlan[key].id6 : false
        this.data.dissertationPlan[key].id7 = (this.data.dissertationPlan[key].id7 === true) ? this.data.dissertationPlan[key].id7 : false
        this.data.dissertationPlan[key].id8 = (this.data.dissertationPlan[key].id8 === true) ? this.data.dissertationPlan[key].id8 : false
      }

      for (var i = 0; i < keys.length; i++){
        this.array[myKeys[i]] = this.data.dissertationPlan[keys[i]]
      }
      const year = (objectDate.slice(0,4))
      const month = (objectDate.slice(5,7))
      const day = (objectDate.slice(8,10))

      this.dateOfOrderOfStatement = day + '.' + month + '.' + year
      this.actualSemestr = this.data.commonInfo.actualSemestr
      this.fillArrayOfStatuses(this.data.statuses)
      // this.fillArrayOfFilesID(this.data.ids)


    }
    catch (e) {
      console.log(e)
    }
    this.files = new Array(this.actualSemestr)


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

.hightlightActualSemesterColumn {
  background-color: mediumseagreen;
  color:black !important;
  font-weight: 400 !important;
}


@media (min-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 1rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding: 0.3rem;
    margin: 0 !important;
    color:white !important;
  }



  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
    margin-top:10px;
    margin-bottom:10px;
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


  .myBox {
    width: 90%;
    margin: auto;

  }

  div input {
    border-width: 0.15em !important;
    height: 2.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1.2rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1rem;
    background-color: white;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1rem;

  }

  .mainPage {
    width: 50%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto 1%;
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

}

@media (max-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 0.9rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }



  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    margin-top:10px;
    margin-bottom:10px;
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


  .myBox {
    width: 90%;
    margin: auto;

  }

  div input {
    border-width: 0.15em !important;
    height: 2.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 1rem;
    background-color: white;

  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.8rem;

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
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

  .noFeedBack{
    text-align: left;
    margin-left: 5%;
    font-size: 0.8rem
  }

  .feedback {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    font-size: 0.8rem !important;
    resize: none !important;
    background-color: white !important;
    font-weight: 350;
  }
}

@media (pointer: coarse) and (max-width: 400px)  {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 0.8rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    margin-top:5px;
    margin-bottom:5px;
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


  .myBox {
    width: 90% !important;
    margin: auto;

  }

  div input {
    border-width: 0.15em !important;
    height: 1.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 0.9rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:0.8rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 5%;
    background-color: white;
    font-size: 0.7rem;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.7rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.6rem;

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
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.6rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

}


</style>