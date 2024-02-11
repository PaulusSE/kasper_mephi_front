<template>




  <div class="mainPage">
    <header-of-student
        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        :state-of-student-page = stateOfStudentPage
    ></header-of-student>



    <tab-of-articles v-for="(articles,index) in arrayOfArticles"
    :id = index
    :articles = this.arrayOfArticles[index]
    @updatePage=cancelChange()
    @buttonSmallTableAdd1=buttonSmallTableAdd1(index)
    @buttonSmallTableAdd2=buttonSmallTableAdd2(index)
    @buttonSmallTableAdd3=buttonSmallTableAdd3(index)
    @saveArticles = saveArticles()
    @saveProjects = saveProjects()
    @saveReports = saveReports()
    @makeCopy = makeCopy
    @deleteArticle="(n) => deleteArticle(index, n)"
    ></tab-of-articles>
  </div>


</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import tabOfArticles from "@/components/layout/studentComponents/tabOfArticles.vue";
import store from "@/store/index.js";
import axios from "axios";
export default {
  name: "scientificWork",
  components: {
    "headerOfStudent" : headerOfStudent,
    "tabOfArticles" : tabOfArticles
  },
  props: ["stateOfStudentPage", "educationTime"],
  data() {
    return {
      generalArrayOfArticles: [
        {id1:0, id2:1, id3:1, id4:0, id5:0, id6:0, id7:2},
        {id1:1, id2:0, id3:0, id4:0, id5:0, id6:0, id7:1},
        {id1:0, id2:2, id3:1, id4:1, id5:1, id6:0, id7:5},
        {id1:0, id2:0, id3:0, id4:1, id5:1, id6:1, id7:3},
        {id1:1, id2:0, id3:1, id4:0, id5:0, id6:1, id7:2},
        {id1:2, id2:0, id3:0, id4:0, id5:0, id6:1, id7:3},
      ],
      generalArrayOfArticlesCopy : [],
      isTableEditing: false,
      arrayOfArticlesCopy: [],
      arrayOfArticles: [
      ],
      arrayDeleteWorkId : [],
    }
  },


  methods : {
    editTable() {

      this.makeCopyGeneralArrays()
      this.isTableEditing = !this.isTableEditing;
    },

    makeCopyGeneralArrays(reverse = 1) {
      if (reverse){
        for (var i = 0; i < this.generalArrayOfArticles.length; i++) {
          this.generalArrayOfArticlesCopy[i] = Object.assign({}, this.generalArrayOfArticles[i]);
        }
      }
      else {
        this.generalArrayOfArticles.length = 0
        for (var i = 0; i < this.generalArrayOfArticlesCopy.length; i++) {
          this.generalArrayOfArticles[i] = Object.assign({}, this.generalArrayOfArticlesCopy[i]);
        }
      }

    },

    buttonSmallTableAdd1(n){
      let newArticle = {
        name: '',
        work_type: '',
        impact: '',
        output_data: '',
        volume: null,
        co_authors: '',
        semester : n + 1,
        numberOfSemesters : ''
      }
      this.arrayOfArticles[n] = this.arrayOfArticles[n].concat(newArticle)
    },
    buttonSmallTableAdd2(n){
      let newArticle = {
        name: '',
        work_type: '',
        impact: '',
        output_data: '',
        volume: null,
        co_authors: '',
        semester : n + 1,
        numberOfSemesters : ''
      }
      // this.arrayOfArticles[n] = this.arrayOfArticles[n].concat(newArticle)
    },
    buttonSmallTableAdd3(n){
      let newArticle = {
        name: '',
        work_type: '',
        impact: '',
        output_data: '',
        volume: null,
        co_authors: '',
        semester : n + 1,
        numberOfSemesters : ''
      }
      // this.arrayOfArticles[n] = this.arrayOfArticles[n].concat(newArticle)
    },

    cancelChange(){
      this.arrayOfArticles.length = 0

      for (var i = 0; i < this.arrayOfArticlesCopy.length; i++)
        this.arrayOfArticles[i] = this.arrayOfArticlesCopy[i].slice();

      this.arrayDeleteWorkId.length = 0

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
      console.log(saveData)
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




      try {
        const response = await axios.delete(this.IP +"/students/scientific_works/" + localStorage.getItem("access_token"),
            {data : {
          "ids" : this.arrayDeleteWorkId
          }
            }
        )
        this.data = response.data;
        this.fillArrayOfArticles(this.data, this.numberOfSemesters)
      }
      catch (e) {
        console.log(e)
      }

      this.arrayDeleteWorkId = []

    },

    async saveProjects() {},

    async saveReports() {

    },

    makeCopy(){
      this.arrayOfArticlesCopy.length = 0
      this.arrayOfArticlesCopy = JSON.parse(JSON.stringify(this.arrayOfArticles));

    },

    deleteArticle(index,n){


      var tempData = this.arrayOfArticles[index]
      this.arrayDeleteWorkId.push(tempData[n].work_id)
      tempData.splice(n,1)

    },

    cancelChangeHighTable() {
      this.makeCopyGeneralArrays(0)
      this.isTableEditing = !this.isTableEditing;
    },

    fillArrayOfArticles(data, numberOfSemesters){

      this.arrayOfArticles = Array(parseInt(numberOfSemesters))
      for (var i = 0; i < this.arrayOfArticles.length; i++){
        this.arrayOfArticles[i] = new Array()
      }

      for (var i = 0; i < data.length; i++){
        if (data[i].semester === 1) {
          this.arrayOfArticles[0].push(data[i])
        }
        if (data[i].semester === 2) {
          this.arrayOfArticles[1].push(data[i])
        }
        if (data[i].semester === 3) {
          this.arrayOfArticles[2].push(data[i])
        }
        if (data[i].semester === 4) {
          this.arrayOfArticles[3].push(data[i])
        }
        if (data[i].semester === 5) {
          this.arrayOfArticles[4].push(data[i])
        }
        if (data[i].semester === 6) {
          this.arrayOfArticles[5].push(data[i])
        }
        if (data[i].semester === 7) {
          this.arrayOfArticles[6].push(data[i])
        }
        if (data[i].semester === 8) {
          this.arrayOfArticles[7].push(data[i])
        }

      }
    },

    async loadScientificWorks() {
      try {
        const response = await axios.get(this.IP +'/students/scientific_works/' + localStorage.getItem("access_token"))
        this.data = await response.data;
        this.fillArrayOfArticles(this.data.works, this.data.years * 2)
        this.numberOfSemesters = this.data.years * 2

      }
      catch (e) {
        console.log(e)
      }
    }

  },
  async beforeMount() {
    if (store.getters.getType !== "student"){
      this.$router.push('/wrongAccess')
    }
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

@media (min-width: 800px) {
  .bigBox{
    width: 22%;
  }

  .smallBox{
    width: 10.85%;

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