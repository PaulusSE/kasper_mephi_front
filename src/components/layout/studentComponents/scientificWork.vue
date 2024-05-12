<template>

  <work-send-to-check-notification
      :show = "showEditError"
      @makeEditErrorNotification = callEditError
  >
  </work-send-to-check-notification>

  <save-tables-notification
  :result-of-sending = this.resultOfSavingTables
  :show = this.showSavingTablesNotification
  >
  </save-tables-notification>

  <warning
      :show=showWarningNotification
      :message = warningMessage
  >

  </warning>




  <div class="mainPage">
    <header-of-student
        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        @btnReportingClicked="$emit('btnReportingClicked')"
        @updateAllStudentsComponents = "$emit('updateAllStudentsComponents')"
        :state-of-student-page = stateOfStudentPage
        :work-status = workStatus
        :actual-semester = this.actualSemester
        :supervisor-mark = this.supervisorMark
    ></header-of-student>




    <tab-of-articles v-for="(n, index) in this.actualSemester"
                     v-if="isDataFetched"
    :id = index
                     :articles = this.arrayOfArticles[index]
                     :reports = this.arrayOfReports[index]
                     :projects = this.arrayOfProjects[index]
                     :patents = this.arrayOfPatents[index]
                     :actual-semester = this.actualSemester


    :waitForCheck = this.waitForCheck
                     @updatePage="(n) => cancelChange(n)"
    @buttonSmallTableAdd1=buttonSmallTableAdd1(index)
    @buttonSmallTableAdd2=buttonSmallTableAdd2(index)
    @buttonSmallTableAdd3=buttonSmallTableAdd3(index)
    @buttonSmallTableAdd4=buttonSmallTableAdd4(index)
    :canEdit = this.canEdit

    @saveArticles = saveArticles(index)
    @saveProjects = saveProjects(index)
    @saveReports = saveReports(index)
    @savePatents = savePatents(index)

    @makeCopy="(n) => makeCopy(n)"
    @makeEditErrorNotification = callEditError

    @deleteArticle="(n) => deleteArticle(index, n)"
    @deleteReport="(n) => deleteReport(index, n)"
    @deleteProject="(n) => deleteProject(index, n)"
    @deletePatent="(n) => deletePatent(index, n)"

    ></tab-of-articles>


<!--    <div class="roundBlock">-->
<!--      <div class="d-flex justify-content-between">-->
<!--        <nav class="checkboxBlock">-->
<!--          <p class="mainText">Комментарий к научной работе</p>-->
<!--        </nav>-->
<!--      </div>-->

<!--      <div>-->
<!--        <textarea v-model="dissertationText"  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>-->
<!--      </div>-->
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
import saveTablesNotifitcation
  from "@/components/layout/notifications/studentNotifications/saveTablesNotifitcation.vue";
import SaveTablesNotification from "@/components/layout/notifications/studentNotifications/saveTablesNotifitcation.vue";
import notificationWarning from "@/components/layout/notifications/studentNotifications/notificationWarning.vue";

export default {
  name: "scientificWork",
  components: {
    SaveTablesNotification,
    tabOfArticlesForTeacher,
    "headerOfStudent" : headerOfStudent,
    "tabOfArticles" : tabOfArticles,
    "workSendToCheckNotification" : workSendToCheckNotification,
    "saveTablesNotification" : saveTablesNotifitcation,
    "warning" : notificationWarning,
  },
  props: ["stateOfStudentPage", "educationTime", "actualSemester", "canEdit", "waitForCheck", "workStatus", "supervisorMark"],
  data() {
    return {
      isTableEditing: false,
      arrayOfArticles: [],
      arrayOfArticlesCopy: [],
      arrayOfReports : [],
      arrayOfReportsCopy : [],
      arrayOfProjects:[],
      arrayOfProjectsCopy:[],
      arrayOfPatents:[],
      arrayOfPatentsCopy:[],
      showEditError: false,

      isDataFetched : false,
      resultOfSavingTables : false,
      showSavingTablesNotification : false,
      works_ids: new Map(),
      workStatusMap : {
        "todo" : "Отправлено на доработку",
        "approved" : "Принято",
        "on review" : "Ожидает проверки",
        "in progress" : "В процессе выполнения",
        "empty" : "Пусто",
        "failed" : "Не сдано",
      },

      showWarningNotification : false,
      warningMessage: 'Поля * должны быть обязательно заполнены! Сохранены только полностью заполненные работы',

    }

  },


  methods : {

    async fillDataForTables(data){
      this.arrayOfArticles = new Array(this.actualSemester)
      this.arrayOfReports = new Array(this.actualSemester)
      this.arrayOfProjects = new Array(this.actualSemester)
      this.arrayOfPatents = new Array(this.actualSemester)

      for (var i = 0; i < this.actualSemester; i++){
        this.arrayOfArticles[i] = new Array()
        this.arrayOfReports[i] = new Array()
        this.arrayOfProjects[i] = new Array()
        this.arrayOfPatents[i] = new Array()
      }

      for (var i = 0; i<data.length; i++){
        var semester = data[i].semester

        try {
          for (var j = 0; j<data[i].publications.length; j++){
            if (data[i].publications[j].publication_id !== undefined){
              var article = data[i].publications[j]
              this.arrayOfArticles[semester - 1].push(article)
            }
          }
        }
        catch (e) {
          console.log(e)
        }

        try {
          for (var j = 0; j<data[i].conferences.length; j++){
            if (data[i].conferences[j].conference_id !== undefined){
              var conf = data[i].conferences[j]
              this.arrayOfReports[semester - 1].push(conf)
            }
          }
        }
        catch (e) {
          console.log(e)
        }

        try {
          for (var j = 0; j<data[i].research_projects.length; j++){
            if (data[i].research_projects[j].project_id !== undefined){
              var project = data[i].research_projects[j]
              this.arrayOfProjects[semester - 1].push(project)
            }
          }
        }
        catch (e) {
          console.log(e)
        }

        try {
          for (var j = 0; j<data[i].patents.length; j++){
            if (data[i].patents[j].patent_id !== undefined){
              var patent = data[i].patents[j]
              this.arrayOfPatents[semester - 1].push(patent)
            }
          }
        }
        catch (e) {
          console.log(e)
        }

        this.works_ids.set(semester, data[i].works_id)
      }


    },

    buttonSmallTableAdd1(n){
      let newArticle = {
        name: '',
        status: '',
        wac: false,
        rinc: false,
        scopus: false,
        wos: false,
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
        rinc: false,
        wos : false,
        wac: false,
        scopus: false,
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
    buttonSmallTableAdd4(n){
      let newReport = {
        patent_name: '',
        date: '',
        patent_type: '',
      }
      this.arrayOfPatents[n] = this.arrayOfPatents[n].concat(newReport)
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
      if (n === 4){
        this.arrayOfPatents.length = 0
        for (var i = 0; i < this.arrayOfPatentsCopy.length; i++)
          this.arrayOfPatents[i] = this.arrayOfPatentsCopy[i].slice();
      }
    },

    callEditError() {
      this.showEditError = true
      setTimeout(() => {
        this.showEditError = false
      }, 5000);
    },

    callWarningNotification() {
      this.showWarningNotification = true
      setTimeout(() => {
        this.showWarningNotification = false
      }, 5000);
    },

    callSaveTablesError(result) {
      this.resultOfSavingTables = result
      this.showSavingTablesNotification = true
      setTimeout(() => {
        this.showSavingTablesNotification = false
      }, 5000);
    },

    async sendToCheck() {

      try {
        const response = await axios.post(this.IP +'/students/works/review/' + localStorage.getItem("access_token"),
            {
              "semester" : this.actualSemester
            }
        )
        this.waitForCheck = true

      }
      catch (e) {
        console.log(e)
      }
    },

    async cancelCheck() {
      this.waitForCheck = !this.waitForCheck
    },

    async saveArticles(index){
      if (JSON.stringify(this.arrayOfArticles) === JSON.stringify(this.arrayOfArticlesCopy)) {
        return
      }

      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false

      this.makeCopy(1)

      var currentLength = this.arrayOfArticles[index].length
      this.arrayOfArticles[index] = this.arrayOfArticles[index].filter(item => !(item.name === '' || item.status === ''))
      if (this.arrayOfArticles[index].length !== currentLength){
        this.callWarningNotification()
      }

      if(this.arrayOfArticles.length === 0)
        return

      for (var i = 0; i < this.arrayOfArticles[index].length; i++){
        this.arrayOfArticles[index][i].impact = parseFloat(this.arrayOfArticles[index][i].impact)
        this.arrayOfArticles[index][i].volume = parseInt(this.arrayOfArticles[index][i].volume)
        this.arrayOfArticles[index][i].works_id = this.works_ids.get(index+1)
      }



      try {
        const response = await axios.post(this.IP +'/students/works/publications/' + localStorage.getItem("access_token"),
            {
              "publications" : this.arrayOfArticles[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200 || response.status === 202)
          this.callSaveTablesError(true)
      }
      catch (e) {
        console.log(e)
        this.callSaveTablesError(false)
      }

      await this.loadScientificWorks()
    },

    async saveProjects(index) {
      if (JSON.stringify(this.arrayOfProjects) === JSON.stringify(this.arrayOfProjectsCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false

      this.makeCopy(2)

      var currentLength = this.arrayOfReports[index].length
      this.arrayOfProjects[index] = this.arrayOfProjects[index].filter(item => !(item.report_name === '' || item.reported_at === '' || item.conference_name === '' || item.status === ''))
      if (this.arrayOfProjects[index].length !== currentLength){
        this.callWarningNotification()
      }



      if(this.arrayOfProjects.length === 0)
        return


      for (var i = 0; i < this.arrayOfProjects[index].length; i++){
        try {
          var tempDateStart = new Date(this.arrayOfProjects[index][i].start_at)
          var tempDateEnd = new Date(this.arrayOfProjects[index][i].end_at)
          this.arrayOfProjects[index][i].start_at = tempDateStart.toISOString()
          this.arrayOfProjects[index][i].end_at = tempDateEnd.toISOString()
          this.arrayOfProjects[index][i].works_id = this.works_ids.get(index+1)
        }
        catch (e) {
          console.log(e)
        }
      }



      try {
        const response = await axios.post(this.IP +'/students/works/projects/' + localStorage.getItem("access_token"),
            {
              "projects" : this.arrayOfProjects[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200 || response.status === 202)
          this.callSaveTablesError(true)
      }
      catch (e) {
        console.log(e)
        this.callSaveTablesError(false)
      }

      await this.loadScientificWorks()
    },

    async saveReports(index) {
      if (JSON.stringify(this.arrayOfReports) === JSON.stringify(this.arrayOfReportsCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false

      this.makeCopy(3)

      var currentLength = this.arrayOfReports[index].length

      this.arrayOfReports[index] = this.arrayOfReports[index].filter(item => !(item.conference_name === '' || item.report_name === '' || item.reported_at === '' || item.status === ''))
      if (this.arrayOfReports[index].length !== currentLength){
        this.callWarningNotification()
      }



      if(this.arrayOfReports.length === 0)
        return

      for (var i = 0; i < this.arrayOfReports[index].length; i++){

        try {
          var tempDate = new Date(this.arrayOfReports[index][i].reported_at)
          this.arrayOfReports[index][i].reported_at = tempDate.toISOString()
          this.arrayOfReports[index][i].works_id = this.works_ids.get(index+1)
        }
        catch (e){
          console.log(e)
        }


      }

      try {
        const response = await axios.post(this.IP +'/students/works/conferences/' + localStorage.getItem("access_token"),
            {
              "conferences" : this.arrayOfReports[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200 || response.status === 202)
          this.callSaveTablesError(true)
      }
      catch (e) {
        this.callSaveTablesError(false)
      }

      await this.loadScientificWorks()
    },

    async savePatents(index) {
      if (JSON.stringify(this.arrayOfPatents) === JSON.stringify(this.arrayOfPatentsCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false

      this.makeCopy(4)



      var currentLength = this.arrayOfPatents[index].length
      this.arrayOfPatents[index] = this.arrayOfPatents[index].filter(item => !(item.patent_name === '' || item.patent_type === ''))
      if (this.arrayOfPatents[index].length !== currentLength){
        this.callWarningNotification()
      }



      if(this.arrayOfPatents.length === 0)
        return

      for (var i = 0; i < this.arrayOfPatents[index].length; i++){

        try {
          this.arrayOfPatents[index][i].works_id = this.works_ids.get(index+1)
          var tempDate = new Date(this.arrayOfPatents[index][i].date)
          this.arrayOfPatents[index][i].date = tempDate.toISOString()
        }
        catch (e){
          console.log(e)
        }
      }

      try {
        const response = await axios.post(this.IP +'/students/works/patents/' + localStorage.getItem("access_token"),
            {
              "patents" : this.arrayOfPatents[index],
              "semester": index + 1,
            }
        )

        if (response.status === 200 || response.status === 202)
          this.callSaveTablesError(true)
      }
      catch (e) {
        this.callSaveTablesError(false)
      }

      await this.loadScientificWorks()
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
      if (n === 4) {
        this.arrayOfPatentsCopy.length = 0
        this.arrayOfPatentsCopy = JSON.parse(JSON.stringify(this.arrayOfPatents));
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

      var tempData = this.arrayOfProjects[index]
      tempData.splice(n,1)
    },
    deletePatent(index,n){

      var tempData = this.arrayOfPatents[index]
      tempData.splice(n,1)
    },

    async loadScientificWorks() {
      try {
        const response = await axios.get(this.IP +'/students/works/' + localStorage.getItem("access_token"))
        this.data = await response.data;

      }
      catch (e) {
        console.log(e)
      }
      await this.fillDataForTables(this.data)
    },



  },
  async beforeMount() {
    await this.loadScientificWorks()
    this.isDataFetched = true


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
    font-size:1.5rem;
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
    width: 70%;

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
    font-size:1.3rem;
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
    font-size:1.2rem;
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