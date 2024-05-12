<template>


  <div class="mainPage">

  <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnProfileClicked="$emit('btnProfileClicked')"
      @btnReportingClicked="$emit('btnReportingClicked')"
      @updateStatusAllTeachersComponents = updateStudentStatusAndComments()

      :state-of-student-page = this.stateOfPage
      :work-status = this.workStatus
      :actual-semester = this.actualSemester
      :supervisor-mark = this.supervisorMark
  ></header-of-student>



    <div>
      <div class="roundBlock">
        <div class="d-flex justify-content-between">
          <nav class="checkboxBlock">
            <p class="mainText">Общая информация</p>
          </nav>
<!--          <nav class="checkboxBlock">-->
<!--            <button v-if="!commonInfo" class="editBtn" @click="buttonClickedCommonInfo">Редактировать</button>-->
<!--            <button v-else class="editBtn" @click="saveCommonInfo">Сохранить</button>-->
<!--          </nav>-->




        </div>

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
            <div class="rightLine col-6 textTable">
              <p class="text">Научный руководитель</p>
            </div>
            <div class="col-6 textTable" >
              Период
            </div>
          </div>

          <div class="d-flex" :class="{underline:index < this.arrayOfTeachers.length - 1}" v-for="(element,index) in arrayOfTeachers">
            <div class="rightLine col-6 textTable">
              <p class="text">{{element.full_name}}</p>
            </div>
            <div class="col-6 textTable" >
              {{element.start_at}} - {{element.end_at}}
            </div>
          </div>

        </div>


        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <div class="d-flex">
              <div class="text">Тема диссертации</div>
              <div class="text">

                <button v-if="!showTopicHistory" class="editBtn ms-2" @click="changeTopicHistoryState">Список тем</button>
                <button v-else class="editBtn ms-2" @click="changeTopicHistoryState">Скрыть</button>
              </div>

            </div>

            <input type="text" class="textInput" :disabled="!commonInfo"  v-model="theme">
          </nav>
        </div>



        <div v-if="showTopicHistory" class="myBox roundBlock p-0">
          <div class="d-flex" :class="{underline : arrayOfTopics.length !== 0}" >
            <div class="rightLine col-6 mainText">
              <p class="textTable">№ семестра</p>
            </div>
            <div class="col-6 textTable" >
              Тема
            </div>
          </div>

          <div class="d-flex" :class="{underline:index < this.arrayOfTopics.length - 1}" v-for="(element,index) in arrayOfTopics">
            <div class="rightLine col-6 textTable">
              <p class="text">{{element.semester}}</p>
            </div>
            <div class="col-6 textTable" >
              {{element.title}}
            </div>
          </div>
        </div>

<!--        <div class="container-fluid justify-content-between d-flex mb-3">-->
<!--          <nav class="inputWidth">-->
<!--            <label class="text">Приказ об утверждении</label>-->
<!--            <input type="text" class="textInput" disabled v-model="research_order">-->
<!--          </nav>-->
<!--        </div>-->


        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Год обучения (курс)</label>
            <input type="text" class="textInput" disabled  v-model="yearOfStudy">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Специальность</label>
            <input type="text" class="textInput" :disabled="!commonInfo"  v-model="specialization">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Объект исследования</label>
            <input type="text" class="textInput" disabled  v-model="research_object">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Предмет исследования</label>
            <input type="text" class="textInput" disabled v-model="research_subject">
          </nav>
        </div>

      </div>
    </div>


    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText">Текущее состояние диссертации</p>

      </div>

      <div class="myBox roundBlock p-0">
        <div class="d-flex underline" >
          <div class="rightLine col-4 textTable">
            Этап
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



        <div class="d-flex" :class="{underline:index < this.progressTableArray.length - 1 }" v-for="(value,index) in progressTableArray">
          <div class="col-4 textTable rightLine">
            {{this.topicMap[value.progress_type]}}
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox" :class="{myCheckBoxInActive : actualSemester !== 1 && this.actualSemester > 1}" v-model=value.first disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 2 && this.actualSemester > 2}" v-model=value.second disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 3 && this.actualSemester > 3}" v-model=value.third disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 4 && this.actualSemester > 4}" v-model=value.forth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 5 && this.actualSemester > 5}" v-model=value.fifth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 6 && this.actualSemester > 6}" v-model=value.sixth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 7 && this.actualSemester > 7}" v-model=value.seventh disabled>
          </div>
          <div class="col-1 textTable myInput" >
            <input type="checkbox" class="form-check-input myCheckBox"  :class="{myCheckBoxInActive : actualSemester !== 8 && this.actualSemester > 8}" v-model=value.eighth disabled>
          </div>

        </div>
      </div>

      <div class=" d-flex checkboxBlock">
        <p class="textTable">Процент выполнения диссертационного исследования {{this.progressOfDissertation}} %</p>
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
          <div class="rightLine col-6 textTable">
            <p class="text">{{element.semester}}</p>
          </div>
          <div class="col-6 textTable text">
            <p class="text">{{element.progressiveness}}</p>
          </div>
        </div>

      </div>

      <div>
        <input type="range"  v-model="progressOfDissertation" :disabled="!editingCheckbox">
      </div>

    </div>

    <student-page-from-teacher-status-tab v-for="(number, index) in this.actualSemester"
                                          :id = index
                                          :actual-semester = this.actualSemester
                                          :feedback = this.feedbacks[index]
                                          :status = this.states[index]
                                          v-if="renderChildComponents"
    ></student-page-from-teacher-status-tab>

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
import header from "@/components/layout/header.vue";
import store from "@/store/index.js";
import studentPageFromTeacherStatusTab from "@/components/layout/teacherComponents/studentPageFromTeacherStatusTab.vue";
import axios from "axios";
import HeaderOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import confirmChangingStudentStatus from "@/components/layout/models/teacherModels/confirmChangingStudentStatus.vue";

export default {
  name: "studentPageFromTeacher",
  components : {
    HeaderOfStudent,
    "pageHeader" : header,
    'studentPageFromTeacherStatusTab' : studentPageFromTeacherStatusTab,
    'confirmChanging' : confirmChangingStudentStatus

  },
  props : ["stateOfPage", "actualSemester", "workStatus", "supervisorMark"],
  data(){
    return {
      renderChildComponents : true,
      commonInfo : false,
      progressTableArray: {},
      theme : "",
      research_object:'',
      research_order : '',
      research_subject: '',
      specialization: '',
      feedbacks : [],
      states : '',
      teacherFullName: "",

      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      },

      progressOfDissertation : '',
      yearOfStudy : "",

      showTopicHistory : false,
      showTeacherHistory : false,
      showProgressHistory : false,
      showModalConfirmStudentStatusChange : false,
      newState : '',
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

      teacherFeedback : '',
      teacherFeedBackDate: '',
      studentFeedBack : '',
      studentFeedBackDate: '',
    }

  },
  methods : {

    async updateStudentStatusAndComments() {
      await this.getComments()
      this.$emit('updateStatusAllTeachersComponents')
    },


    async getComments(){
      try {
        const response = await axios.put(this.IP +"/supervisors/student/dissertation/" + localStorage.getItem("access_token"), {
          "student_id" : localStorage.getItem("studentID"),
        })

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

    buttonClickedCommonInfo() {
      this.commonInfo = !this.commonInfo
    },

    async saveCommonInfo() {

      try {
        const response = await axios.post(this.IP +"/admin/students/common_info/" + localStorage.getItem("access_token"), {
              "studentID" : localStorage.getItem("studentId"),
              "enrollmentOrder" : this.numberOfOrderOfStatement,
              "startDate" : this.dateOfOrderOfStatement
            }
        )

      }
      catch (e) {
        console.log(e)
      }
      this.commonInfo = !this.commonInfo

    },



    changeTopicHistoryState(){
      this.showTopicHistory = !this.showTopicHistory
    },
    changeTeacherHistoryState(){
      this.showTeacherHistory = !this.showTeacherHistory
    },

    changeProgressHistoryState(){
      this.showProgressHistory = !this.showProgressHistory
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

      this.theme = tittles[tittles.length-1].title
      this.research_order = tittles[tittles.length-1].research_order
      this.research_object = tittles[tittles.length-1].research_object
      this.research_subject = tittles[tittles.length-1].research_subject
    },

    async fillFeedBackArray(feedbacks){

      var semesterObjectArray = new Array()
      for (var i = 0; i < this.actualSemester; i++){
        semesterObjectArray.push({
          semester: i + 1
        })
      }

      if (feedbacks === undefined)
        feedbacks = new Array()

      for (var i = 0; i < feedbacks.length; i++){
        if (feedbacks[i] === undefined)
          return
        var semester = feedbacks[i].semester
        semesterObjectArray = semesterObjectArray.filter(function(obj) {
          return obj.semester !== semester
        })
      }

      for (var i = 0; i < semesterObjectArray.length; i++){
        feedbacks.push({
          semester:semesterObjectArray[i].semester,
          feedback:''
        })
      }


      feedbacks.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.feedbacks = feedbacks
    },

    async fillStatusArray(statuses){

      var semesterObjectArray = new Array()
      for (var i = 0; i < this.actualSemester; i++){
        semesterObjectArray.push({
          semester: i + 1
        })
      }

      if (statuses === undefined)
        statuses = new Array()

      for (var i = 0; i < statuses.length; i++){
        if (statuses[i] === undefined)
          return
        var semester = statuses[i].semester
        semesterObjectArray = semesterObjectArray.filter(function(obj) {
          return obj.semester !== semester
        })
      }

      for (var i = 0; i < semesterObjectArray.length; i++){
        statuses.push({
          semester:semesterObjectArray[i].semester,
          status:'empty'
        })
      }


      statuses.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.states = statuses

    },

    async getSpecializationAndYearOfStudy(data){
      this.specialization = data.specialization
      this.yearOfStudy = data.years
      this.progressOfDissertation = data.progress
    },

    async fillProgressHistory(progress){
      progress.sort((a, b) => a.semester > b.semester ? 1 : -1);


      this.arrayOfProgress = progress
      this.progressOfDissertation = this.arrayOfProgress[this.arrayOfProgress.length - 1].progressiveness
    },

    async commonRequest(){

      try {
        const response = await axios.put(this.IP +"/supervisors/student/dissertation/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentID"),
            }
        )
        this.data = response.data

      }

      catch (e) {
        console.log(e)
      }

      try {
        await this.fillStatusArray(this.data.dissertations_statuses)
      }
      catch (e){
        console.log(e)
      }

      try {
        await this.fillFeedBackArray(this.data.feedback)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillThemeHistory(this.data.dissertation_titles)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillCommonInfo(this.data.dissertation_titles)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillThemeHistory(this.data.dissertation_titles)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillTeacherHistory(this.data.supervisors)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillProgressTable(this.data.semester_progress)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.getSpecializationAndYearOfStudy(this.data.student_status)
      }
      catch (e){
        console.log(e)
      }
      try {
        await this.fillProgressHistory(this.data.progresses)
      }
      catch (e){
        console.log(e)
      }
      this.renderChildComponents = true




    }
  },

  async beforeCreate(){
    this.$store.dispatch("updateUserId", localStorage.getItem("studentID"))


  },

  async beforeMount() {
    await this.getComments()
    await this.commonRequest()






  },

}
</script>

<style scoped>

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

  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    font-size:1.3rem;
    text-align: center;
    font-weight: 400;


  }
  .textTable{
    color:#7C7F86;
    font-weight: 400 !important;
    font-size:1.2rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;

    margin-right: 1.5rem !important;
    background-color: white;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1.2rem;
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
    width: 70% !important;

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
}

@media (max-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }




  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    font-size:1.1rem;
    text-align: center;
    font-weight: 400;





  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;
    margin-right: 1.5rem !important;
    background-color: white;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1rem;
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
    width: 80% !important;

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
}

@media (pointer: coarse) and (max-width: 400px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }



  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    font-size:0.8rem;
    text-align: center;
    font-weight: 400;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:0.7rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;
    margin-right: 1.5rem !important;
    background-color: white;
    font-size: 0.6rem;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.6rem;
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
    width: 90% !important;

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

.inputWidth {
  width: 100% !important;
}

.myInput{

  display: grid !important;
  place-items: center !important;
}

div input {
  border-width: 0.15em !important;
  height: 2.5rem !important;
  border-radius: 0.7em !important;
  width: 100% !important;
}

</style>