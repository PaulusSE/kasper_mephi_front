<template>

  <work-send-to-check-notification
      :show = "showEditError"
      @makeEditErrorNotification = callEditError
  >
  </work-send-to-check-notification>


  <div class="mainPage">
    <header-of-student
        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage
    ></header-of-student>



    <tab-of-articles v-for="(n, index) in this.actualSemester"
    :id = index
                     :articles = this.arrayOfArticles[index]
                     :reports = this.arrayOfReports[index]
                     :projects = this.arrayOfProjects[index]

    :waitForCheck = this.waitForCheck
                     @updatePage="(n) => cancelChange(n)"
    @buttonSmallTableAdd1=buttonSmallTableAdd1(index)
    @buttonSmallTableAdd2=buttonSmallTableAdd2(index)
    @buttonSmallTableAdd3=buttonSmallTableAdd3(index)
    @saveArticles = saveArticles()
    @saveProjects = saveProjects()
    @saveReports = saveReports()

    @makeCopy="(n) => makeCopy(n)"
    @makeEditErrorNotification = callEditError
    @deleteArticle="(n) => deleteArticle(index, n)"
    @deleteReport="(n) => deleteReport(index, n)"
    @deleteProject="(n) => deleteProject(index, n)"
    ></tab-of-articles>

<!--    <div class="text-end pb-2" style="margin-right: 2.5%">-->
<!--      <button v-if="!waitForCheck" type="button" class="loggining btn btn-primary btn-lg my-1" @click="sendToCheck()">Отправить на проверку</button>-->
<!--      <button v-else type="button" class="loggining btn btn-primary btn-lg my-1" @click="cancelCheck()">Отменить проверку</button>-->
<!--    </div>-->

  </div>



</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import tabOfArticles from "@/components/layout/studentComponents/tabOfArticles.vue";
import store from "@/store/index.js";
import axios from "axios";
import workSendToCheckNotification
  from "@/components/layout/notifications/studentNotifications/workSendToCheckNotification.vue";
import tabOfArticlesForTeacher from "@/components/layout/teacherComponents/tabOfArticlesForTeacher.vue";
export default {
  name: "scientificWork",
  components: {
    tabOfArticlesForTeacher,
    "headerOfStudent" : headerOfStudent,
    "tabOfArticles" : tabOfArticles,
    "workSendToCheckNotification" : workSendToCheckNotification
  },
  props: ["stateOfStudentPage", "educationTime"],
  data() {
    return {
      isTableEditing: false,
      arrayOfArticles: [],
      arrayOfArticlesCopy: [],
      arrayOfReports : [],
      arrayOfReportsCopy : [],
      arrayOfProjects:[],
      arrayOfProjectsCopy:[],
      showEditError: false,
      waitForCheck : false,
      actualSemester: 1,
    }

  },


  methods : {


    async fillDataForTables(data){
      this.arrayOfArticles = new Array(this.actualSemester)
      this.arrayOfReports = new Array(this.actualSemester)
      this.arrayOfProjects = new Array(this.actualSemester)

      for (var i = 0; i < this.actualSemester; i++){
        this.arrayOfArticles[i] = new Array()
        this.arrayOfReports[i] = new Array()
        this.arrayOfProjects[i] = new Array()
      }

      for (var i = 0; i<data.length; i++){
        var semester = data[i].semester
        if (data[i].publication.publication_id !== undefined){
          var article = data[i].publication
          this.arrayOfArticles[semester - 1].push(article)
        }
        if (data[i].conference.conference_id !== undefined){
          var report = data[i].conference
          this.arrayOfReports[semester-1].push(report)
        }
        if (data[i].research_project.project_id !== undefined){
          var project = data[i].research_project
          this.arrayOfProjects[semester-1].push(project)
        }
      }
    },


    buttonSmallTableAdd1(n){
      let newArticle = {
        name: '',
        status: '',
        wac: '',
        rinc: '',
        scopus: '',
        wos: '',
        impact : '',
        output_data : '',
        volume : '',
        co_authors : ''
      }
      this.arrayOfArticles[n] = this.arrayOfArticles[n].concat(newArticle)
    },
    buttonSmallTableAdd2(n){
      let newReport = {
        conference_name: '',
        location: '',
        report_name: '',
        reported_at: '',
        rinc: '',
        'wos' : '',
        'wac': '',
        'scopus':'',
        co_authors: '',
        semester : n + 1,
        numberOfSemesters : ''
      }
      this.arrayOfReports[n] = this.arrayOfReports[n].concat(newReport)
    },
    buttonSmallTableAdd3(n){
      let newReport = {
        project_name: '',
        start_at: '',
        end_at: '',
        add_info: '',
        grantee: '',
      }
      this.arrayOfProjects[n] = this.arrayOfProjects[n].concat(newReport)
    },

    cancelChange(n){
      if (n === 1){
        this.arrayOfArticles.length = 0
        for (var i = 0; i < this.arrayOfArticlesCopy.length; i++)
          this.arrayOfArticles[i] = this.arrayOfArticlesCopy[i].slice();
      }
     if (n === 2){
       this.arrayOfReports.length = 0
       for (var i = 0; i < this.arrayOfReportsCopy.length; i++)
         this.arrayOfReports[i] = this.arrayOfReportsCopy[i].slice();
     }
     if (n === 3){
       this.arrayOfProjects.length = 0
       for (var i = 0; i < this.arrayOfProjectsCopy.length; i++)
         this.arrayOfProjects[i] = this.arrayOfProjectsCopy[i].slice();
     }
    },

    callEditError() {
      this.showEditError = true
      setTimeout(() => {
        this.showEditError = false
      }, 5000);
    },

    async sendToCheck() {
      this.waitForCheck = !this.waitForCheck
    },

    async cancelCheck() {
      this.waitForCheck = !this.waitForCheck
    },

    async saveArticles(){
      if (JSON.stringify(this.arrayOfArticles) === JSON.stringify(this.arrayOfArticlesCopy)) {
        return
      }


      this.makeCopy()
      var saveData = new Array()

      for (var i = 0; i < this.arrayOfArticles.length; i++){
        for (var j = 0; j < this.arrayOfArticles[i].length; j++){
          saveData.push(
              {
                name: this.arrayOfArticles[i][j].name,
                work_type: this.arrayOfArticles[i][j].work_type,
                impact: parseFloat(this.arrayOfArticles[i][j].impact),
                output_data: this.arrayOfArticles[i][j].output_data,
                volume: parseInt(this.arrayOfArticles[i][j].volume),
                co_authors: this.arrayOfArticles[i][j].co_authors,
                work_id: this.arrayOfArticles[i][j].work_id,
                semester : this.arrayOfArticles[i][j].semester
              }
          )
        }
      }
      try {
        const response = await axios.post(this.IP +'/students/scientific_works/' + localStorage.getItem("access_token"),
            {"works" : saveData}
        )

        this.data = response.data;

        if (this.arrayDeleteWorkId.length === 0){
          this.fillArrayOfArticles(this.data, this.numberOfSemesters)
          return
        }
      }
      catch (e) {
        console.log(e)
      }

    },

    async saveProjects() {},

    async saveReports() {

    },

    makeCopy(n){
      if (n === 1) {
        this.arrayOfArticlesCopy.length = 0
        this.arrayOfArticlesCopy = JSON.parse(JSON.stringify(this.arrayOfArticles));
      }
      if (n === 2) {
        this.arrayOfReportsCopy.length = 0
        this.arrayOfReportsCopy = JSON.parse(JSON.stringify(this.arrayOfReports));
      }
      if (n === 3) {
        this.arrayOfProjectsCopy.length = 0
        this.arrayOfProjectsCopy = JSON.parse(JSON.stringify(this.arrayOfProjects));
      }


    },

    deleteArticle(index,n){
      var tempData = this.arrayOfArticles[index]
      tempData.splice(n,1)
    },
    deleteReport(index,n){

      var tempData = this.arrayOfReports[index]
      tempData.splice(n,1)
    },
    deleteProject(index,n){
      console.log('deleteti')
      var tempData = this.arrayOfProjects[index]
      tempData.splice(n,1)
    },





    async loadScientificWorks() {
      try {
        const response = await axios.get(this.IP +'/students/works/' + localStorage.getItem("access_token"))
        this.data = await response.data;
        await this.fillDataForTables(this.data)

      }
      catch (e) {
        console.log(e)
      }
    }

  },
  async beforeMount() {

    await this.loadScientificWorks()
    var data = [
      {
        "accepted_at": "2024-03-30T15:26:05.545Z",
        "conference": {
          "conference_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "conference_name": "string",
          "location": "string",
          "report_name": "string",
          "reported_at": "2024-03-30T15:26:05.545Z",
          "rinc": true,
          "scopus": true,
          "status": "registered",
          "wac": true,
          "wos": true
        },
        "publication": {
          "co_authors": "string",
          "impact": 0,
          "name": "string",
          "output_data": "string",
          "publication_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "rinc": true,
          "scopus": true,
          "status": "to print",
          "volume": 0,
          "wac": true,
          "wos": true
        },
        "research_project": {
          "add_info": "string",
          "end_at": "2024-03-30T15:26:05.545Z",
          "grantee": "string",
          "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "project_name": "string",
          "start_at": "2024-03-30T15:26:05.545Z"
        },
        "semester": 1,
        "student_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "updated_at": "2024-03-30T15:26:05.545Z",
        "works_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "works_status": "todo"
      }
    ]
    await this.fillDataForTables(data)
    console.log(this.arrayOfArticles)
    console.log(this.arrayOfReports)



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

@media (min-width: 800px) {
  .bigBox{
    width: 22%;
  }

  .smallBox{
    width: 10.85%;

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




  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:17px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 400;
    text-align: center;
    border-radius: 0 !important;
    color:#000000;
    background-color: white;
    outline: none !important;


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

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }



  .mainText{
    color:#7C7F86;
    font-weight: 300;
    font-size:30px;
    text-align: center;





  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

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
    padding: 0 0 1.5%;
  }
}

@media (max-width: 800px) {
  .bigBox{
    width: 22%;
  }

  .smallBox{
    width: 10.85%;

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




  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:17px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 400;
    text-align: center;
    border-radius: 0 !important;
    color:#000000;
    background-color: white;
    outline: none !important;


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

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }



  .mainText{
    color:#7C7F86;
    font-weight: 300;
    font-size:30px;
    text-align: center;





  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

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
}

@media (pointer: coarse) and (max-width: 400px) {
  .bigBox{
    width: 22%;
  }

  .smallBox{
    width: 10.85%;

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




  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:17px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 400;
    text-align: center;
    border-radius: 0 !important;
    color:#000000;
    background-color: white;
    outline: none !important;


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

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }



  .mainText{
    color:#7C7F86;
    font-weight: 300;
    font-size:30px;
    text-align: center;





  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

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
}

</style>