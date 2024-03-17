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
        <select class="form-select mainText" style="border-radius: 20px; width: 90%; margin-left: 5%" @change="changeStudentJobStatus" v-model="this.status">
          <option  class="textResult1" value="approved">Принято</option>
          <option  class="textResult2" value="todo">На доработку</option>
          <option  class="textResult3" value="failed">Не сдано</option>
          <option  class="textResult2" value="in progress">В процессе</option>
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

          <div class="d-flex" :class="{underline:index < Object.keys(this.arrayOfTopics).length}" v-for="(element,index) in arrayOfTopics">
            <div class="rightLine col-6 textTable">
              <p class="text">{{index}}</p>
            </div>
            <div class="col-6 textTable" >
              {{this.arrayOfTopics[index]}}
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

          <div class="d-flex" :class="{underline:index+1 < Object.keys(this.arrayOfTeachers).length}" v-for="(element,index) in arrayOfTeachers">
            <div class="rightLine col-6 textTable">
              <p class="text">{{element.teacher}}</p>
            </div>
            <div class="col-6 textTable" >
              {{element.period}}
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
            <input type="text" class="textInput" :disabled="!commonInfo"  v-model="numberOfOrderOfStatement">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Объект исследования</label>
            <input type="text" class="textInput" disabled  v-model="numberOfOrderOfStatement">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Приказ исследования</label>
            <input type="text" class="textInput" disabled v-model="dateOfOrderOfStatement">
          </nav>
        </div>

      </div>
    </div>


    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText">План подготовки рукописи диссертаций и автореферата</p>

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



        <div class="d-flex" :class="{underline:index !== 10}" v-for="(value,key, index) in array">
          <div class="col-4 textTable rightLine">
            {{key}}
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 1}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id1 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 2}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id2 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 3}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id3 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 4}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id4 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 5}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id5 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 6}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id6 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine" :class="{hightlightActualSemesterColumn : actualSemestr === 7}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id7 disabled>
          </div>
          <div class="col-1 textTable myInput" :class="{hightlightActualSemesterColumn : actualSemestr === 8}">
            <input type="checkbox" class="form-check-input myCheckBox"  v-model=value.id8 disabled>
          </div>

        </div>
      </div>

      <div class=" justify-content-between checkboxBlock">
        <p class="textTable">Процент выполнения диссертационного исследования {{this.progressOfDissertation}} %</p>

      </div>

    </div>

    <student-page-from-teacher-status-tab v-for="index in this.actualSemestr"
                                          :id = index
                                          :job-status = statusOfJob[this.statuses[index]]
                                          :actual-semester = this.actualSemestr
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
      filesFinish : [],
      editingReview : false,
      commonInfo : false,
      array: {},
      stateOfWork: '',
      textOfReview: '',
      theme : "",
      teacherFullName: "",
      numberOfOrderOfStatement: "",
      dateOfOrderOfStatement: "",
      actualSemestr : '',
      statuses : [],
      status: '',
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      },

      // todo
      progressOfDissertation : 55,
      yearOfStudy : "",

      showTopicHistory : false,
      showTeacherHistory : false,
      arrayOfTopics : {
        1: "Тема 1",
        2: "Тема 2",
        3: "Тема 3",
        4: "Тема 4",
        5: "Тема 5",
        6: "Тема 6",
      },
      arrayOfTeachers : [
        {
          teacher:'T1',
          period:"21.10.2022-15.02.2023"
        },
        {
          teacher:'T2',
          period:"15.02.2023-27.04.2024"
        },
      ]
    }

  },
  methods : {

    async changeStudentJobStatus(){
      try {
        const response = await axios.post(this.IP +"/supervisors/student/review/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentId"),
              "status" : this.status,

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
      this.commonInfo = !this.commonInfo
      var object = {"studentID" : this.$store.getters.getuserId,
        "enrollmentOrder" : this.numberOfOrderOfStatement,
        "startDate" : this.dateOfOrderOfStatement}

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

    async getStudentCommonInfo() {

      try {
        const response = await axios.put(this.IP +"/supervisors/student/" + localStorage.getItem("access_token"), {
            "studentID" : localStorage.getItem("studentID")
            }
        )

        this.data = await response.data

        this.theme = this.data.commonInfo.theme
        this.teacherFullName = this.data.commonInfo.teacherFullName
        this.jobStatus = this.data.commonInfo.jobStatus
        this.numberOfOrderOfStatement = this.data.commonInfo.numberOfOrderOfStatement
        this.textOfReview = this.data.commonInfo.feedback
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
        }
        for (var i = 0; i < keys.length; i++){
          this.array[myKeys[i]] = this.data.dissertationPlan[keys[i]]
        }

        this.dateOfOrderOfStatement = this.data.commonInfo.dateOfOrderOfStatement

        this.actualSemestr = this.data.commonInfo.actualSemestr

        this.fillArrayOfStatuses(response.data.statuses)


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

    async getStudentCommonInfoForAdmin() {

      try {
        const response = await axios.put(this.IP +"/admin/students/dissertation/" + localStorage.getItem("access_token"), {
              "studentID" : localStorage.getItem("studentID")
            }
        )

        this.data = await response.data
        this.theme = this.data.theme
        this.teacherFullName = this.data.commonInfo.teacherFullName
        this.jobStatus = this.data.commonInfo.jobStatus
        this.numberOfOrderOfStatement = this.data.commonInfo.numberOfOrderOfStatement
        this.textOfReview = this.data.commonInfo.feedback
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
        }
        for (var i = 0; i < keys.length; i++){
          this.array[myKeys[i]] = this.data.dissertationPlan[keys[i]]
        }

        const year = (objectDate.slice(0,4))
        const month = (objectDate.slice(5,7))
        const day = (objectDate.slice(8,10))

        this.dateOfOrderOfStatement = day + '.' + month + '.' + year
        console.log(typeof objectDate)
        console.log(new Date(objectDate))

        this.actualSemestr = this.data.commonInfo.actualSemestr
        this.fillArrayOfStatuses(response.data.statuses)
      }

      catch (e) {
        console.log(e)
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
    async checkAuth() {
      try {
        const response = await axios.get(this.IP +"/authorization/check/" + localStorage.getItem("access_token"))

        if (response.status === 200){
          this.$store.dispatch("updateUserType", response.data.userType)
          this.type = response.data.userType
        }
        else {
          this.$router.push('/auth')
        }

      } catch (e) {
        console.log(e)
        this.$router.push('/auth')
      }
    },
  },

  async beforeMount() {

    // this.checkAuth()
    //
    // if (store.getters.getType === "student"){
    //   this.$router.push('/wrongAccess')
    // }
    // if(await store.getters.getType === 'admin'){
    //   await this.getStudentCommonInfoForAdmin()
    // }
    // if (await store.getters.getType === 'supervisor')
    await this.getStudentCommonInfo()

  },

  beforeCreate() {
    this.$store.dispatch("updateUserId", localStorage.getItem("studentID"))

  }
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
    width: 50% !important;

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