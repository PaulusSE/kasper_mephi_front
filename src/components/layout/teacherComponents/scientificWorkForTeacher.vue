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
          <option  class="textResult2" value="empty">Пусто</option>
          <option  class="textResult2" value="on review">Ожидает проверки</option>
        </select>
      </div>
    </div>

    <tab-of-articles-for-teacher v-for="(n, index) in this.actualSemester"
                     :id = index
                     :articles = this.arrayOfArticles[index]
                     :reports = this.arrayOfReports[index]
                     :projects = this.arrayOfProjects[index]
    ></tab-of-articles-for-teacher>
  </div>

</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import tabOfArticlesForTeacher from "@/components/layout/teacherComponents/tabOfArticlesForTeacher.vue";
import axios from "axios";
import store from "@/store/index.js";
export default {
  name: "scientificWorkForTeacher",
  data() {
    return {
      arrayOfArticles: [],
      arrayOfReports : [
      ],
      arrayOfProjects:[
      ],
      actualSemester: 1,
      workStatus : '',
    }
  },
  props : ['stateOfPage'],
  components : {
    "headerOfStudent" : headerOfStudent,
    "tabOfArticlesForTeacher" : tabOfArticlesForTeacher,
  },
  methods : {
    async loadScientificWorks() {
      try {
        const response = await axios.put(this.IP +'/supervisors/student/works/' + localStorage.getItem("access_token"),
            {
              "student_id" : localStorage.getItem("student_id")
            }
        )
        this.data = await response.data;
        await this.fillDataForTables(this.data)
        this.workStatus = this.data.works_status


      }
      catch (e) {
        console.log(e)
      }
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


  },


  async beforeMount() {
    if (store.getters.getType === "student"){
      this.$router.push('/wrongAccess')
    }
    await this.getActualSemester()
    await this.loadScientificWorks()
    var data = [
      {
        "accepted_at": "2024-03-17T13:10:11.346Z",
        "conference": {
          "conference_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "conference_name": "string",
          "location": "string",
          "report_name": "string",
          "reported_at": "2024-03-17T13:10:11.346Z",
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
          "end_at": "2024-03-17T13:10:11.346Z",
          "grantee": "string",
          "project_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
          "project_name": "string",
          "start_at": "2024-03-17T13:10:11.346Z"
        },
        "semester": 1,
        "student_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "updated_at": "2024-03-17T13:10:11.346Z",
        "works_id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "works_status": "todo"
      }
    ]
    await this.fillDataForTables(data)

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

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;

  }



  .mainText{
    color:#7C7F86;
    font-size:1.3rem;
    text-align: center;
    font-weight: 400;





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
}

@media (max-width: 800px) {

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;

  }


  .mainText{
    color:#7C7F86;
    font-size:1.1rem;
    text-align: center;
    font-weight: 400;
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


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;

  }



  .mainText{
    color:#7C7F86;
    font-size:0.8rem;
    text-align: center;
    font-weight: 400;
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
    font-size:0.6rem;
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