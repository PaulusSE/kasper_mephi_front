<template>


  <div class="mainPage">

  <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnProfileClicked="$emit('btnProfileClicked')"
      :state-of-student-page = this.stateOfPage
  ></header-of-student>

    <div class="roundBlock">
      <div class="mb-2">
        <p class="mainText text-start">Статус работы: </p>
      </div>
      <div>
        <select class="form-select mainText" style="border-radius: 20px; width: 90%; margin-left: 5%" @change="changeStudentJobStatus" v-model="this.workStatus">
          <option  class="textResult1" value="approved">Принято</option>
          <option  class="textResult2" value="todo">На доработку</option>
          <option  class="textResult3" value="failed">Не сдано</option>
          <option  class="textResult2" value="in progress">В процессе</option>
          <option  class="textResult2" value="empty">Пусто</option>
          <option  class="textResult2" value="on review">Ожидает проверки</option>
        </select>
      </div>
    </div>

    <div>
      <div class="roundBlock">
        <div class="d-flex justify-content-between">
          <nav class="checkboxBlock">
            <p class="mainText">Общая информация</p>
          </nav>
          <nav class="checkboxBlock">
            <button v-if="!commonInfo" class="editBtn" @click="buttonClickedCommonInfo">Редактировать</button>
            <button v-else class="editBtn" @click="saveCommonInfo">Сохранить</button>
          </nav>




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
            <label class="text">Приказ исследования</label>
            <input type="text" class="textInput" disabled v-model="research_order">
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

          <div class="col-1 textTable"  v-for="(number, index) in 8"  :class="{hightlightActualSemesterColumn : actualSemester === index + 1, rightLine : index + 1 < 8}">
            {{index + 1}}
          </div>

        </div>



        <div class="d-flex" :class="{underline:index !== 10}" v-for="(value,index) in progressTableArray">
          <div class="col-4 textTable rightLine">
            {{this.topicMap[value.progress_type]}}
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 1}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.first disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 2}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.second disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 3}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.third disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 4}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.forth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 5}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.fifth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 6}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.sixth disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemester === 7}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.seventh disabled>
          </div>
          <div class="col-1 textTable myInput" :class="{hightlightActualSemesterColumn : actualSemester === 8}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.eighth disabled>
          </div>

        </div>
      </div>

      <div class=" justify-content-between checkboxBlock">
        <p class="textTable">Процент выполнения диссертационного исследования {{this.progressOfDissertation}} %</p>

      </div>

    </div>

    <student-page-from-teacher-status-tab v-for="(number, index) in this.actualSemester"
                                          :id = index
                                          :actual-semester = this.actualSemester
                                          :feedback = this.feedbacks[index]
                                          :status = this.states[index]
                                          v-if="renderChildComponents"
    ></student-page-from-teacher-status-tab>



  </div>



</template>

<script>
import header from "@/components/layout/header.vue";
import store from "@/store/index.js";
import studentPageFromTeacherStatusTab from "@/components/layout/teacherComponents/studentPageFromTeacherStatusTab.vue";
import axios from "axios";
import HeaderOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
export default {
  name: "studentPageFromTeacher",
  components : {
    HeaderOfStudent,
    "pageHeader" : header,
    'studentPageFromTeacherStatusTab' : studentPageFromTeacherStatusTab,

  },
  props : ["stateOfPage",],
  data(){
    return {
      renderChildComponents : true,
      commonInfo : false,
      progressTableArray: {},
      theme : "",
      research_object:'',
      research_order : '',
      specialization: '',
      feedbacks : [],
      states : '',
      teacherFullName: "",
      actualSemester : 1,
      workStatus: '',
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
      arrayOfTopics : [],
      arrayOfTeachers : [],
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
      }
    }

  },
  methods : {

    async changeStudentJobStatus(){
      try {
        const response = await axios.post(this.IP +"/supervisors/student/review/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentId"),
              "status" : this.workStatus,

            }
        )
      }
      catch (e) {
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

    },


    changeTopicHistoryState(){
      this.showTopicHistory = !this.showTopicHistory
    },
    changeTeacherHistoryState(){
      this.showTeacherHistory = !this.showTeacherHistory
    },

    async getActualSemester(){
      try {
        const response = await axios.get(this.IP +'/supervisors/student/list/' + localStorage.getItem("access_token"))
        this.data = await response.data
        for (var i = 0; i < this.data.length; i++){
          if (this.data[i].student_id === localStorage.getItem("student_id")){
            this.actualSemester = this.data[i].actual_semester
          }
        }

      }
      catch (e) {
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
      var currentDissertationTittle = new Array()
      for (var i = 0; i < tittles.length; i++){
        if (tittles[i].semester === this.actualSemester){
          currentDissertationTittle = tittles[i]
          break
        }
      }
      this.theme = currentDissertationTittle.title
      this.workStatus = currentDissertationTittle.status
      this.research_order = currentDissertationTittle.research_order
      this.research_object = currentDissertationTittle.research_object
    },

    async fillFeedBackArray(feedbacks){
      feedbacks.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.feedbacks = feedbacks
    },

    async fillStatusArray(statuses){
      statuses.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.states = statuses
    },

    async getSpecializationAndYearOfStudy(){
      try {
        const response = await axios.get(this.IP +"/students/info/" + localStorage.getItem("access_token"))
        this.data = response.data
        this.specialization = this.data.specialization
        this.yearOfStudy = this.data.years
      }
      catch (e) {
        console.log(e)
      }
    },

    async commonRequest(){
      await this.getActualSemester()
      try {
        const response = await axios.put(this.IP +"/supervisors/student/dissertation/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentId"),
            }
        )
        this.data = response.data
        await this.fillStatusArray(this.data.dissertations_statuses)
        await this.fillFeedBackArray(this.data.feedback)
        await this.fillThemeHistory(this.data.dissertation_titles)
        await this.fillTeacherHistory(this.data.supervisors)
        await this.fillProgressTable(this.data.semester_progress)
        await this.fillCommonInfo(this.data.dissertation_titles)
        this.renderChildComponents = true
      }
      catch (e) {
        console.log(e)
      }
    }
  },

  async beforeCreate(){
    this.$store.dispatch("updateUserId", localStorage.getItem("studentID"))

  },

  async beforeMount() {
    await this.commonRequest()
    await this.getSpecializationAndYearOfStudy()





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

.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;

  color:#6BDB6B;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FFC009
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FF3333;
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