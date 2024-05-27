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
        @btnReportingClicked="$emit('btnReportingClicked')"
        @updateAllStudentsComponents = updateStudentStatusAndComments()
        :state-of-student-page = stateOfStudentPage
        @btnSendEverythingToCheck="$emit('btnSendEverythingToCheck')"
        :work-status = workStatus
        :actual-semester = this.actualSemester
        :supervisor-mark = this.supervisorMark

    ></header-of-student>

    <div class="roundBlock">
    <div class="d-flex justify-content-between mt-1">
      <nav class="checkboxBlock">
        <p class="mainText mt-0">Общая информация</p>
      </nav>
      <nav v-if="!editingInfo">
        <button class="editBtn" @click="editCommonInfo" :disabled="waitForCheck" :class="{disabledText : waitForCheck}" >Редактировать</button>
      </nav>
      <nav v-else>
        <button class="editBtn" @click="saveCommonInfo" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
      </nav>
    </div>
    <div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <div class="d-flex">
            <label class="text">Научный руководитель</label>
            <div>
              <button v-if="!showTeacherHistory" class="editBtn ms-2" @click="changeTeacherHistoryState">Список научных руководителей</button>
              <button v-else class="editBtn ms-2" @click="changeTeacherHistoryState">Скрыть список</button>
            </div>
          </div>
          <input type="text" class="textInput" disabled  v-model="teacherFullName">
        </nav>
      </div>

      <div v-if="showTeacherHistory" class="myBox roundBlock p-0">
        <div class="d-flex" :class="{underline : arrayOfTeachers.length !== 0}" >
          <div class="rightLine col-6 mainText">
            Научный руководитель
          </div>
          <div class="col-6 textTable" >
            Период
          </div>
        </div>

        <div class="d-flex" :class="{underline:index < this.arrayOfTeachers.length - 1}" v-for="(element,index) in arrayOfTeachers">
          <div class="rightLine col-6 mainText">
            {{element.full_name}}
          </div>
          <div class="col-6 textTable" >
            {{element.start_at}} - {{element.end_at}}
          </div>
        </div>

      </div>


      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <div class="d-flex">
            <label class="text">Тема диссертации</label>
            <div>
              <button v-if="!showTopicHistory" class="editBtn ms-2" @click="changeTopicHistoryState">Список тем</button>
              <button v-else class="editBtn ms-2" @click="changeTopicHistoryState">Скрыть</button>
            </div>
          </div>

          <input type="text" class="textInput" :disabled="!editingInfo"  v-model="theme">
        </nav>
      </div>


      <div v-if="showTopicHistory" class="myBox roundBlock p-0">
        <div class="d-flex" :class="{underline : arrayOfTopics.length !== 0}" >
          <div class="rightLine col-6 textTable">
            № семестра
          </div>
          <div class="col-6 textTable" >
            Тема
          </div>
        </div>

        <div class="d-flex" :class="{underline:index < this.arrayOfTopics.length} - 1" v-for="(element,index) in arrayOfTopics">
          <div class="rightLine col-6 mainText" :class="{underline: index < this.arrayOfTopics.length - 1}">
            {{element.semester}}
          </div>
          <div class="col-6 textTable" :class="{underline: index < this.arrayOfTopics.length - 1}">
            {{element.title}}
          </div>
        </div>
      </div>

<!--      <div class="container-fluid justify-content-between d-flex mb-3">-->
<!--        <nav class="inputWidth">-->
<!--          <label class="text">Приказ об утверждении</label>-->
<!--          <input type="text" class="textInput" :disabled="!editingInfo" v-model="research_order">-->
<!--        </nav>-->
<!--      </div>-->


      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Объект исследования</label>
          <input type="text" class="textInput"  :disabled="!editingInfo" v-model="research_object">
        </nav>
      </div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <label class="text">Предмет исследования</label>
          <input type="text" class="textInput" :disabled="!editingInfo" v-model="research_subject">
        </nav>
      </div>

    </div>


  </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText">Укажите разделы диссертации, над которыми вы работали в текущем семестре</p>
        <button v-if="!editingCheckbox" @click="editTables" class="editBtn2" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
        <button v-else @click="saveTables" class="editBtn2" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
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
        <div class="col-1 textTable"  v-for="(number, index) in 8"  :class="{rightLine : index + 1 < 8}">
          {{index + 1}}
        </div>

      </div>



      <div class="d-flex" :class="{underline: index < this.progressTableArray.length - 1}" v-for="(element,index) in progressTableArray" >
        <div class="col-4 textTable rightLine" style="word-break: break-all">
          {{this.topicMap[element.progress_type]}}
        </div>
        <div class="col-1 mainText myInput rightLine defaultCheckBoxBackground">
          <input type="checkbox" class="form-check-input myCheckBox" :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 1) && !this.canEdit}"   v-model=element.first :disabled="!editingCheckbox || (this.actualSemester !== 1) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput rightLine defaultCheckBoxBackground">
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 1) && !this.canEdit}" v-model=element.second :disabled="!editingCheckbox || (this.actualSemester !== 2) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput rightLine defaultCheckBoxBackground" >
          <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 3) && !this.canEdit}" v-model=element.third :disabled="!editingCheckbox || (this.actualSemester !== 3) && !this.canEdit" >
        </div>
        <div class="col-1 mainText myInput rightLine" >
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 4) && !this.canEdit}" v-model=element.forth :disabled="!editingCheckbox || (this.actualSemester !== 4) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput rightLine" >
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 5) && !this.canEdit}" v-model=element.fifth :disabled="!editingCheckbox || (this.actualSemester !== 5) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput rightLine" >
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 6) && !this.canEdit}" v-model=element.sixth :disabled="!editingCheckbox || (this.actualSemester !== 6) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput rightLine" >
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 7) && !this.canEdit}" v-model=element.seventh :disabled="!editingCheckbox || (this.actualSemester !== 7) && !this.canEdit">
        </div>
        <div class="col-1 mainText myInput" >
          <input type="checkbox" class="form-check-input myCheckBox"   :class="{myCheckBoxActive : editingCheckbox && !(this.actualSemester !== 8) && !this.canEdit}" v-model=element.eighth :disabled="!editingCheckbox || (this.actualSemester !== 8) && !this.canEdit">
        </div>

      </div>
    </div>

      <div class="checkboxBlock d-flex">
        <p class="textTable text-start">Процент выполнения диссертационного исследования {{this.progressOfDissertation}} %</p>
        <button v-if="!showProgressHistory" class="editBtn ms-2" @click="changeProgressHistoryState">История прогресса</button>
        <button v-else class="editBtn ms-2" @click="changeProgressHistoryState">Скрыть</button>
      </div>

      <div v-if="showProgressHistory" class="myBox roundBlock p-0">
        <div class="d-flex" :class="{underline : arrayOfProgress.length !== 0}" >
          <div class="rightLine col-6 textTable">
            <p class="">Семестр</p>
          </div>
          <div class="col-6 textTable" >
            Прогресс
          </div>
        </div>

        <div class="d-flex" :class="{underline:index < this.arrayOfProgress.length - 1}" v-for="(element,index) in arrayOfProgress">
          <div class="rightLine col-6 mainText">
            <p class="text">{{element.semester}}</p>
          </div>
          <div class="col-6 textTable text">
            {{element.progressiveness}}
          </div>
        </div>

      </div>



      <div>
        <input type="range" v-model="progressOfDissertation" :disabled="!editingCheckbox">
      </div>



    </div>

    <div class="roundBlock">

      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Отчетные файлы</p>
        </nav>
      </div>

      <dissertation-tab v-for="(number, index) in actualSemester"
                        :id=number
                        :state-of-sending = this.stateOfSending
                        @makeNotification="(resultStatus) => makeNotification(resultStatus)"
                        :actual-semester = this.actualSemester
                        :waitForCheck = waitForCheck
                        :buttonIsOpened = this.buttonTabArrayState[index]
                        @changeTabState = changeTabState(number)
                        @makeEditErrorNotification = callEditError
                        
                        v-if="renderChildComponents"
                        :can-edit = this.canEdit
      ></dissertation-tab>

    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Комментарий аспиранта к отчету</p>
        </nav>
      </div>

      <div class="d-flex justify-content-between" v-if="studentFeedBackDate.length !== 0">
        <nav class="checkboxBlock">
          <p class="textMainPage">Дата комментария: {{studentFeedBackDate.slice(0,10)}}</p>
        </nav>
      </div>

      <div>
        <textarea v-model="studentFeedBack"  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
      </div>
    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Комментарий научного руководителя к отчету</p>
        </nav>
      </div>

      <div class="d-flex justify-content-between" v-if="teacherFeedBackDate.length !== 0">
      <nav class="checkboxBlock">
        <p class="textMainPage">Дата комментария: {{teacherFeedBackDate.slice(0,10)}}</p>
      </nav>
    </div>

      <div>
        <textarea v-model="teacherFeedback"  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
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
import rangeNotification from "@/components/layout/notifications/studentNotifications/rangeNotification.vue";
import workSendToCheckNotification from "@/components/layout/notifications/studentNotifications/workSendToCheckNotification.vue";

export default {
  name: "dissertation",
  components: {SendingFilesNotification, headerOfStudent, PageNotFound, dissertationTab, rangeNotification, workSendToCheckNotification},
  "headerOfStudent":headerOfStudent,
  "notification":sendingFilesNotification,
  "dissertationTab" : dissertationTab,
  "rangeNotification" : rangeNotification,
  "workSendToCheckNotification" : workSendToCheckNotification,
  props: ["stateOfStudentPage", "actualSemester", "canEdit", "waitForCheck", "workStatus", "supervisorMark"],

  data(){
    return {
      titlePage: [],
      explanatoryNote: [],
      editingInfo : false,
      editingCheckbox : false,
      theme : "",
      teacherFullName : "",
      states : [],


      stateOfSending:false,
      resultOfSending: '',
      arrayWithFilesId: [],
      jobStatus : '',
      feedbacks: [],
      renderChildComponents : false,

      research_object:'',
      research_order : '',
      research_subject: '',

      workStatusMap : {
        "todo" : "Отправлено на доработку",
        "approved" : "Принято",
        "on review" : "Ожидает проверки",
        "in progress" : "В процессе выполнения",
        "empty" : "Пусто",
        "failed" : "Не сдано",
      },

      progressTableArray: {
      },
      progressMap : new Map(),

      progressOfDissertation : '',
      progressOfDissertationCopy : '',
      showRangeError : false,
      showEditError: false,
      showTopicHistory : false,
      showTeacherHistory : false,
      showProgressHistory: false,
      arrayOfTopics : [],
      arrayOfTeachers : [],
      arrayOfProgress: [],
      topicMap : {
        'intro' : 'Введение',
        'ch. 1' : 'Глава 1',
        'ch. 2' : 'Глава 2',
        'ch. 3' : 'Глава 3',
        'ch. 4' : 'Глава 4',
        'ch. 5' : 'Глава 5 (При необходимости)',
        'ch. 6' : 'Глава 6 (При необходимости)',
        'end' : 'Заключение',
        'literature' : 'Список литературы',
        'abstract' : 'Автореферат',
      },

      feedbackDefaultValue : {
        feedback : ""
      },
      statusDefaultValue : {
        status : ""
      },

      teacherFeedback : '',
      teacherFeedBackDate: '',
      studentFeedBack : '',
      studentFeedBackDate: '',

      buttonTabArrayState: [],

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

    async updateStudentStatusAndComments() {
      await this.getComments()
      this.$emit('updateAllStudentsComponents')
    },




    async saveCommonInfo(){

      try {
        const response = await axios.post(this.IP +"/students/dissertation_title/" + localStorage.getItem("access_token"),
            {
              "research_object": this.research_object,
              "research_order": this.research_order,
              "research_subject": this.research_subject,
              "title": this.theme
            }
        )

      }
      catch (e) {

        console.log(e)
      }
      this.editingInfo = !this.editingInfo
    },

    changeTopicHistoryState(){
      this.showTopicHistory = !this.showTopicHistory
    },

    changeProgressHistoryState(){
      this.showProgressHistory = !this.showProgressHistory
    },

    changeTeacherHistoryState(){
      this.showTeacherHistory = !this.showTeacherHistory
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


    async saveTables() {
      this.editingCheckbox = !this.editingCheckbox;
      if (this.progressOfDissertationCopy > this.progressOfDissertation){
        this.progressOfDissertation = this.progressOfDissertationCopy
        this.showRangeError = true
        setTimeout(() => {
          this.showRangeError = false
        }, 5000);

      }

      try {
        const response = await axios.post(this.IP +"/students/dissertation/progress/" + localStorage.getItem("access_token"),
            {"progresses" : this.progressTableArray
            }
        )
      }
      catch (e) {

      }

      if (this.progressOfDissertation === this.progressOfDissertationCopy)
        return



      try {
        const response = await axios.post(this.IP +"/students/dissertation/progress/percent/" + localStorage.getItem("access_token"),
            { "progress": parseInt(this.progressOfDissertation)
            }
        )
      }
      catch (e) {

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


    async getComments(){
      try {
        const response = await axios.get(this.IP +"/students/dissertation/" + localStorage.getItem("access_token"))

        this.data = response.data

      }
      catch (e) {
        console.log(e)
      }

      try {
        this.data.feedback.sort((a, b) => a.semester > b.semester ? 1 : -1);
        this.teacherFeedback = this.data.feedback[0].feedback
        this.teacherFeedBackDate = this.data.feedback[0].updated_at
      }
      catch (e){
        console.log(e)
      }

      try {
        this.data.students_comments.sort((a, b) => a.semester > b.semester ? 1 : -1);
        this.studentFeedBack = this.data.students_comments[0].commentary
        this.studentFeedBackDate = this.data.students_comments[0].commented_at
      }
      catch (e){
        console.log(e)
      }
    },


    async fillThemeHistory(tittles){
      tittles.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.arrayOfTopics = tittles
    },

    async fillTeacherHistory(supervisors){
      supervisors.sort((a, b) => a.start_at > b.start_at ? 1 : -1);
      this.arrayOfTeachers = supervisors

      for(var i = 0; i < this.arrayOfTeachers.length; i++){
        this.arrayOfTeachers[i].start_at = this.arrayOfTeachers[i].start_at.slice(0,10)
        if (this.arrayOfTeachers[i].end_at !== undefined)
          this.arrayOfTeachers[i].end_at = this.arrayOfTeachers[i].end_at.slice(0,10)
        else
          this.arrayOfTeachers[i].end_at = ''
      }

      this.teacherFullName = this.arrayOfTeachers[this.arrayOfTeachers.length - 1].full_name
    },

    async fillProgressHistory(progress){
      progress.sort((a, b) => a.semester > b.semester ? 1 : -1);


      this.arrayOfProgress = progress
      this.progressOfDissertation = this.arrayOfProgress[this.arrayOfProgress.length - 1].progressiveness
    },

    changeTabState(id){

      var currentState = this.buttonTabArrayState[id - 1]
      this.buttonTabArrayState = Array.from({ length: this.actualSemester }, (val, index) => false);
      
      this.buttonTabArrayState[id - 1] = !currentState
    },



    async getCommonInfo() {
      try {
        const response = await axios.get(this.IP +"/students/dissertation/" + localStorage.getItem("access_token")
        )
        this.data = response.data
      }
      catch (e) {
        console.log(e)
      }

      try {
        await this.fillTeacherHistory(this.data.supervisors)
      }
      catch(e) {
        console.log(e)
      }

      try {
        await this.fillCommonInfo(this.data.dissertation_titles)
      }
      catch(e) {
        console.log(e)
      }

      try {
        await this.fillProgressTable(this.data.semester_progress)
      }
      catch(e) {
        console.log(e)
      }

      try {
        await this.fillThemeHistory(this.data.dissertation_titles)
      }
      catch(e) {
        console.log(e)
      }

      try {
        await this.fillProgressHistory(this.data.progresses)
      }
      catch(e) {
        console.log(e)
      }

      this.buttonTabArrayState = Array.from({ length: this.actualSemester }, (val, index) => false);
      


      // await this.fillStatusArray(this.data.dissertations_statuses)
      // await this.fillFeedBackArray(this.data.feedback)

      this.renderChildComponents = true

    },

    sortTopic(a, b){
      const weight = {
        'intro' : 1,
        'ch. 1' : 2,
        'ch. 2' : 3,
        'ch. 3' : 4,
        'ch. 4' : 5,
        'ch. 5' : 6,
        'ch. 6' : 7,
        'end' : 8,
        'literature' : 9,
        'abstract' : 10,
      }
      var weightA = weight[a.progress_type]
      var weightB = weight[b.progress_type]

      return weightA > weightB
    },

    async fillProgressTable(array){

      array.sort((a, b) => this.sortTopic(a,b) ? 1 : -1);
      this.progressTableArray = array
    },

    async fillCommonInfo(tittles){
      tittles.sort((a, b) => a.semester > b.semester ? 1 : -1);


      this.theme = tittles[tittles.length - 1].title
      this.research_order = tittles[tittles.length - 1].research_order
      this.research_object = tittles[tittles.length - 1].research_object
      this.research_subject = tittles[tittles.length - 1].research_subject
      this.teacherFullName = this.arrayOfTeachers[this.arrayOfTeachers.length - 1].full_name
    }

  },
  async beforeMount() {
    await this.getCommonInfo()
    await this.getComments()








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

.disabledText {
  color: grey !important;
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
    width: 40% !important;
    margin:auto;
    border: 0 !important;
    margin-top:10px;
    margin-bottom:10px;
    background-color: grey;
    
    
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
    width: 70%;

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
    background-color: gray !important;
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
    background-color: gray !important;
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