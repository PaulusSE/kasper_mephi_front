<template>
  <div class="mainPage">

    <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnProfileClicked="$emit('btnProfileClicked')"
      @btnReportingClicked="$emit('btnReportingClicked')"
      :state-of-student-page = this.stateOfPage
      :work-status = this.workStatus
  ></header-of-student>



    <tab-of-articles-for-teacher v-for="(n, index) in this.actualSemester"
                     :id = index
                     :articles = this.arrayOfArticles[index]
                     :reports = this.arrayOfReports[index]
                     :projects = this.arrayOfProjects[index]
                     :patents = this.arrayOfPatents[index]
    ></tab-of-articles-for-teacher>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Комментарий аспиранта к научной работе</p>
        </nav>
      </div>

      <div>
        <textarea  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
      </div>
    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Предыдущий комментарий научного руководителя</p>
        </nav>
      </div>

      <div>
        <textarea   disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
      </div>
    </div>

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
      arrayOfReports : [],
      arrayOfProjects:[],
      arrayOfPatents: [],


    }
  },
  props : ['stateOfPage', "actualSemester", "workStatus"],
  components : {
    "headerOfStudent" : headerOfStudent,
    "tabOfArticlesForTeacher" : tabOfArticlesForTeacher,
  },
  methods : {
    async loadScientificWorks() {

      try {
        const response = await axios.put(this.IP +'/supervisors/student/works/' + localStorage.getItem("access_token"),
            {
              "student_id" : localStorage.getItem("studentID")
            }
        )
        this.data = await response.data;



      }
      catch (e) {
        console.log(e)
      }

      await this.fillDataForTables(this.data)
    },



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
        for (var j = 0; j<data[i].publications.length; j++){
          if (data[i].publications[j].publication_id !== undefined){
            var article = data[i].publications[j]
            this.arrayOfArticles[semester - 1].push(article)
          }
        }

        for (var j = 0; j<data[i].conferences.length; j++){
          if (data[i].conferences[j].conference_id !== undefined){
            var conf = data[i].conferences[j]
            this.arrayOfReports[semester - 1].push(conf)

          }

        }

        for (var j = 0; j<data[i].research_projects.length; j++){
          if (data[i].research_projects[j].project_id !== undefined){
            var project = data[i].research_projects[j]
            this.arrayOfProjects[semester - 1].push(project)

          }
        }

        // for (var j = 0; j<data[i].patents.length; j++){
        //   if (data[i].patents[j].patent_id !== undefined){
        //     var patent = data[i].patents[j]
        //     this.arrayOfPatents[semester - 1].push(patent)
        //   }
        // }
      }


    },


  },


  async beforeMount() {
    await this.loadScientificWorks()


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

.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#6BDB6B !important;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color: #FF8000 !important
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FF3333 !important;
}

.textResult4 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color: #0000CC !important;
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
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }



  .mainText{
    color:#7C7F86;
    font-size:1.3rem;
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