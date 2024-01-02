<template>



<page-header></page-header>

  <div class="mainPage">
    <div class="pt-4">
      <div class="roundBlock">
        <div class="d-flex justify-content-between">
          <nav class="checkboxBlock">
            <p class="mainText">Общая информация</p>
          </nav>



        </div>
        <div>
          <ul>
            <p>Тема: <p class="text2">{{theme}}</p></p>
          </ul>
          <ul>
            <p>ФИО руководителя: <p class="text2">{{teacherFullName}}</p></p>
          </ul>
          <ul>
            <p>Номер приказа об утверждении: <p class="text2">{{numberOfOrderOfStatement}}</p></p>
          </ul>
          <ul>
            <p>Дата приказа об утверждении: <p class="text2">{{dateOfOrderOfStatement}}</p></p>
          </ul>
        </div>
      </div>
    </div>


    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText">План подготовки рукописи диссертаций и автореферата</p>

      </div>

      <div class="myBox roundBlock p-0">
        <div class="d-flex underline" >
          <div class="rightLine col-6 textTable">
            Этап
          </div>
          <div class="col-6 textTable" >
            Семестр
          </div>
        </div>


        <div class="d-flex underline">
          <div class="col-6 textTable rightLine">

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
          <div class="col-1 textTable">
            6
          </div>

        </div>



        <div class="d-flex" :class="{underline:index !== 10}" v-for="(value,key, index) in array">
          <div class="col-6 textTable rightLine">
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
          <div class="col-1 textTable myInput">
            <input type="checkbox" class="myCheckBox" v-model=value.id6 disabled>
          </div>

        </div>
      </div>

    </div>

    <student-page-from-teacher-status-tab v-for="index in this.actualSemestr"
                                          :id = index
                                          :job-status = statusOfJob[this.statuses[index-1][0].status]

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
        <p v-if="textOfReview === ''" class="mainText" style="text-align: left; margin-left: 5%; font-size: 25px">Рецензия отсутствует</p>
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
export default {
  name: "studentPageFromTeacher",
  components : {
    "pageHeader" : header,
    'studentPageFromTeacherStatusTab' : studentPageFromTeacherStatusTab

  },
  data(){
    return {
      filesFinish : [],
      editingReview : false,
      arrayWithLinksToFiles : [
        {
          TitleList : "/link1",
          ExplanationaryNote : '/link2'
        },
        {
          TitleList : '',
          ExplanationaryNote : ''
        },
      ],
      array: {},
      stateOfWork: '',
      textOfReview: '',
      theme : "",
      teacherFullName: "",
      numberOfOrderOfStatement: "",
      dateOfOrderOfStatement: "",
      statuses : [],
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      }
    }

  },
  methods : {
    buttonClicked() {
      this.editingReview = !this.editingReview
    },
    async saveReview(){
      this.editingReview = !this.editingReview
      console.log(this.textOfReview)
      try {
        const response = await axios.post("http://localhost:8080/supervisor/students/feedback/" + localStorage.getItem("access_token"), {
              "studentID" : this.$store.getters.getuserId,
              "feedback" : this.textOfReview
            }
        )
        console.log(response)
      }
      catch (e) {
        console.log(e)
      }

    },
    async getStudentCommonInfo() {
      try {
        const response = await axios.put("http://localhost:8080/supervisors/student/" + localStorage.getItem("access_token"), {
            "studentID" : this.$store.getters.getuserId
            }
        )

        this.data = await response.data
        console.log(this.data)
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
        this.actualSemestr = this.data.commonInfo.actualSemestr
        this.fillArrayOfStatuses(response.data.statuses)
        console.log(response)

      }

      catch (e) {
        console.log(e)
      }
    },
    fillArrayOfStatuses(data) {
      this.statuses = Array(data.length)
      for (var i = 0; i < this.statuses.length; i++){
        this.statuses[i] = new Array()
      }
      for (var i = 0; i < data.length; i++){
        if (data[i].semester === 1) {
          this.statuses[0].push(data[i])
        }
        if (data[i].semester === 2) {
          this.statuses[1].push(data[i])
        }
        if (data[i].semester === 3) {
          this.statuses[2].push(data[i])
        }
        if (data[i].semester === 4) {
          this.statuses[3].push(data[i])
        }
      }
    },
  },

  async beforeMount() {
    if (store.getters.getType === "student"){
      this.$router.push('/wrongAccess')
    }
    await this.getStudentCommonInfo()

  },
  beforeUnmount() {
    this.$store.dispatch("updateUserId", '')
    localStorage.setItem('studentID', '')
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
  font-size:30px;
  text-align: center;
  font-weight: 400;





}

.textTable{
  color:#7C7F86;
  font-weight: 400;
  font-size:21px;
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

</style>