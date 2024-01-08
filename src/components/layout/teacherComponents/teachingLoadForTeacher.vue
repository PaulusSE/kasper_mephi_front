<template>

  <div class="mainPage">

<header-of-student
    @btnDissertationClicked="$emit('btnDissertationClicked')"
    @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
    @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
    @btnProfileClicked="$emit('btnProfileClicked')"
    :state-of-student-page = this.stateOfPage
></header-of-student>

    <teaching-load-table-for-teacher v-for="(elements,index) in arrayOfTeachingLoadByPeriod "
                         :id = index
                         :elements = elements
    ></teaching-load-table-for-teacher>




  </div>
</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import teachingLoadTableForTeacher from "@/components/layout/teacherComponents/teachingLoadTableForTeacher.vue";
import axios from "axios";
import store from "@/store/index.js";
export default {
  name: "teachingLoadForTeacher",
  props : ['stateOfPage'],
  components : {
    "headerOfStudent" : headerOfStudent,
    "teachingLoadTableForTeacher" : teachingLoadTableForTeacher
  },
  data() {
    return {
      arrayOfTeachingLoadByPeriod:[],
      numberOfSemesters : '',
    }
  },
  methods : {
    fillArrayOfTeachingLoad(data, numberOfSemesters) {

      this.arrayOfTeachingLoadByPeriod = Array(parseInt(numberOfSemesters))

      for (var i = 0; i < this.arrayOfTeachingLoadByPeriod.length; i++){
        this.arrayOfTeachingLoadByPeriod[i] = new Array()
      }

      for (var i = 0; i < data.length; i++){
        if (data[i].semester === 1) {
          this.arrayOfTeachingLoadByPeriod[0].push(data[i])
        }
        if (data[i].semester === 2) {
          this.arrayOfTeachingLoadByPeriod[1].push(data[i])
        }
        if (data[i].semester === 3) {
          this.arrayOfTeachingLoadByPeriod[2].push(data[i])
        }
        if (data[i].semester === 4) {
          this.arrayOfTeachingLoadByPeriod[3].push(data[i])
        }
        if (data[i].semester === 5) {
          this.arrayOfTeachingLoadByPeriod[4].push(data[i])
        }
        if (data[i].semester === 6) {
          this.arrayOfTeachingLoadByPeriod[5].push(data[i])
        }
        if (data[i].semester === 7) {
          this.arrayOfTeachingLoadByPeriod[6].push(data[i])
        }
        if (data[i].semester === 8) {
          this.arrayOfTeachingLoadByPeriod[7].push(data[i])
        }
      }
    },
    async loadTeachingLoad() {
      try {
        const response = await axios.put(this.IP +'/supervisor/students/teaching_load/' + localStorage.getItem("access_token"),
            {
              'studentID' : localStorage.getItem('studentID')
            }
        )
        this.data = await response.data;


      }
      catch (e) {
        console.log(e)
      }
      this.fillArrayOfTeachingLoad(this.data.array, this.data.years * 2)
      this.numberOfSemesters = this.data.years * 2
    }
  },
  async beforeMount() {
    if (store.getters.getType === "student"){
      this.$router.push('/wrongAccess')
    }
    await this.loadTeachingLoad()
  },

}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


@media (min-width: 800px){
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 450;
    text-align: center;
    border-radius: 0 !important;
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
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 450;
    text-align: center;
    border-radius: 0 !important;
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
}

@media (pointer: coarse) and (max-width: 400px) {
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

  }



  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .inputBox {
    border: 0 !important;
    font-weight: 450;
    text-align: center;
    border-radius: 0 !important;
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
}


</style>