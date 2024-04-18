<template>

  <div class="mainPage">

<header-of-student
    @btnDissertationClicked="$emit('btnDissertationClicked')"
    @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
    @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
    @btnProfileClicked="$emit('btnProfileClicked')"
    @btnReportingClicked="$emit('btnReportingClicked')"
    :state-of-student-page = this.stateOfPage
></header-of-student>



<teaching-load-table-for-teacher v-for="(n, index) in this.actualSemester"
                                 :id = index
                                 :classroom-work="array_classroom_load[index]"
                                 :individual-work="array_individual_students_load[index]"
                                 :other-work="array_additional_load[index]"
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
      array_classroom_load:[],
      array_individual_students_load: [],
      array_additional_load: [],
      actualSemester : '',
      workStatus : '',
    }
  },
  methods : {

    async fillDataForTables(data){

      this.array_classroom_load = new Array(this.actualSemester)
      this.array_individual_students_load = new Array(this.actualSemester)
      this.array_additional_load = new Array(this.actualSemester)

      for (var i = 0; i < this.actualSemester; i++){
        this.array_classroom_load[i] = new Array()
        this.array_individual_students_load[i] = new Array()
        this.array_additional_load[i] = new Array()
      }



      for (var i = 0; i<data.length; i++){
        var semester = data[i].semester

        for (var j = 0; j < data[i].classroom_loads.length; j++){
          var class_load = data[i].classroom_loads[j]
          console.log(this.array_classroom_load[0])
          this.array_classroom_load[semester - 1].push(class_load)
        }

        for (var j = 0; j < data[i].individual_students_loads.length; j++){
          var individual_load = data[i].individual_students_loads[j]
          this.array_individual_students_load[semester-1].push(individual_load)
        }

        for (var j = 0; j < data[i].additional_loads.length; j++){
          var add_load = data[i].additional_loads[j]
          this.array_additional_load[semester-1].push(add_load)
        }
      }
      console.log(this.array_additional_load)
      console.log(this.array_classroom_load)
      console.log(this.array_additional_load)

    },


    async loadTeachingLoad() {
      try {
        const response = await axios.put(this.IP +'/supervisors/student/load/' + localStorage.getItem("access_token"),
            {
              'student_id' : localStorage.getItem('studentID')
            }
        )
        this.data = await response.data;
        console.log(this.data)


      }
      catch (e) {
        console.log(e)
      }


      this.fillDataForTables(this.data)
      this.workStatus = this.data.approval_status

    },
    async getActualSemester(){

      try {
        const response = await axios.put(this.IP +"/supervisors/student/dissertation/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentID"),
            }
        )

        this.data = response.data


      }


      catch (e) {
        console.log(e)
      }
      this.actualSemester = this.data.student_status.actual_semester
    },
  },
  async beforeMount() {
    await this.getActualSemester()
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
    font-weight: 400;
    font-size:1.3rem;
    text-align: center;


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
    font-weight: 400;
    font-size:1.1rem;
    text-align: center;


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
    font-weight: 400;
    font-size:0.8rem;
    text-align: center;


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