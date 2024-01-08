<template>


  <div class="mainPage">

  <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnProfileClicked="$emit('btnProfileClicked')"
      :state-of-student-page = this.stateOfPage
  ></header-of-student>

    <div>
      <div class="roundBlock">
        <div class="d-flex justify-content-between">
          <nav class="checkboxBlock">
            <p class="mainText">Общая информация</p>
          </nav>
          <nav>
            <button v-if="!commonInfo" class="editBtn pt-1 ps-0" @click="buttonClickedCommonInfo">Редактировать</button>
            <button v-else class="editBtn pt-1 ps-1" @click="saveCommonInfo">Сохранить</button>
          </nav>




        </div>
        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Тема</label>
            <input type="text" class="textInput" :disabled="!commonInfo"  v-model="theme">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">ФИО преподователя</label>
            <input type="text" class="textInput" disabled  v-model="teacherFullName">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Номер приказа об утверждении</label>
            <input type="text" class="textInput" :disabled="!commonInfo"  v-model="numberOfOrderOfStatement">
          </nav>
        </div>

        <div class="container-fluid justify-content-between d-flex mb-3">
          <nav class="inputWidth">
            <label class="text">Дата приказа об утверждении</label>
            <input type="date" class="textInput" :disabled="!commonInfo" v-model="dateOfOrderOfStatement">
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
          <div class="col-1 textTable rightLine">
            1
          </div>
          <div class="col-1 textTable rightLine">
            2
          </div>
          <div class="col-1 textTable rightLine">
            3
          </div>
          <div class="col-1 textTable rightLine">
            4
          </div>
          <div class="col-1 textTable rightLine">
            5
          </div>
          <div class="col-1 textTable rightLine">
            6
          </div>
          <div class="col-1 textTable rightLine">
            7
          </div>
          <div class="col-1 textTable">
            8
          </div>

        </div>



        <div class="d-flex" :class="{underline:index !== 10}" v-for="(value,key, index) in array">
          <div class="col-4 textTable rightLine">
            {{key}}
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id1 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id2 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id3 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id4 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id5 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id6 disabled>
          </div>
          <div class="col-1 textTable myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=value.id7 disabled>
          </div>
          <div class="col-1 textTable myInput">
            <input type="checkbox" class="myCheckBox" v-model=value.id8 disabled>
          </div>

        </div>
      </div>

    </div>

    <student-page-from-teacher-status-tab v-for="index in this.actualSemestr"
                                          :id = index
                                          :job-status = statusOfJob[this.statuses[index]]

    ></student-page-from-teacher-status-tab>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Рецензия</p>
        </nav>
        <nav>
          <button v-if="!editingReview" class="editBtn pt-1 ps-0" @click="buttonClicked">Редактировать</button>
          <button v-else class="editBtn pt-1 ps-1" @click="saveReview">Сохранить</button>
        </nav>
      </div>

      <div v-if="!editingReview">
        <p v-if="textOfReview === ''" class="textTable">Рецензия отсутствует</p>
        <p v-else style="font-size:20px; font-weight: 350">
          <textarea disabled v-model="textOfReview" rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
        </p>
      </div>
      <div v-else>
        <textarea v-model="textOfReview"  rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
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
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      },
    }

  },
  methods : {
    buttonClicked() {
      this.editingReview = !this.editingReview
    },
    async saveReview(){
      this.editingReview = !this.editingReview

      try {
        const response = await axios.post(this.IP +"/supervisor/students/feedback/" + localStorage.getItem("access_token"), {
              "studentID" : localStorage.getItem("studentId"),
              "feedback" : this.textOfReview
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
      console.log(localStorage.getItem("studentId"))
      try {
        const response = await axios.put(this.IP +"/supervisors/student/" + localStorage.getItem("access_token"), {
            "studentID" : localStorage.getItem("studentId")
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

    async getStudentCommonInfoForAdmin() {
      console.log("here")
      try {
        const response = await axios.put(this.IP +"/admin/students/dissertation/" + localStorage.getItem("access_token"), {
              "studentID" : localStorage.getItem("studentId")
            }
        )
        console.log(response)
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
    await this.getStudentCommonInfo()

    if(store.getters.getType === 'admin'){
      await this.getStudentCommonInfoForAdmin()
    }
    if (store.getters.getType === 'supervisor')
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

@media (min-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .myCheckBox{
    zoom: 0.5;
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
    margin-top: 15% !important;
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
    zoom: 1.2;
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
    margin-top: 15% !important;
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

@media (pointer: coarse) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }


  .myCheckBox{
    zoom: 1.2;
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
    margin-top: 15% !important;
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