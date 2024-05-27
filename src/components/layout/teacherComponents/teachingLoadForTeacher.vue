<template>

  <div class="mainPage">

<header-of-student
    @btnDissertationClicked="$emit('btnDissertationClicked')"
    @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
    @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
    @btnProfileClicked="$emit('btnProfileClicked')"
    @btnReportingClicked="$emit('btnReportingClicked')"
    @updateStatusAllTeachersComponents = "$emit('updateStatusAllTeachersComponents')"
    :state-of-student-page = this.stateOfPage
    :work-status = this.workStatus
    :actual-semester = this.actualSemester
    :supervisor-mark = this.supervisorMark

></header-of-student>



<teaching-load-table-for-teacher v-for="(n, index) in this.actualSemester"
                                 :id = index
                                 :classroom-work="array_classroom_load[index]"
                                 :individual-work="array_individual_students_load[index]"
                                 :other-work="array_additional_load[index]"
                                 :actualSemester = this.actualSemester
                                 :buttonIsOpened = this.buttonTabArrayState[index]
                                  @changeTabState = changeTabState(index)
></teaching-load-table-for-teacher>

<!--    <div class="roundBlock">-->
<!--      <div class="d-flex justify-content-between">-->
<!--        <nav class="checkboxBlock">-->
<!--          <p class="mainText">Комментарий аспиранта к педагогичкской нагрузке</p>-->
<!--        </nav>-->
<!--      </div>-->

<!--      <div>-->
<!--        <textarea  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>-->
<!--      </div>-->
<!--    </div>-->

<!--    <div class="roundBlock">-->
<!--      <div class="d-flex justify-content-between">-->
<!--        <nav class="checkboxBlock">-->
<!--          <p class="mainText">Предыдущий комментарий научного руководителя</p>-->
<!--        </nav>-->
<!--      </div>-->

<!--      <div>-->
<!--        <textarea   disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>-->
<!--      </div>-->
<!--    </div>-->




  </div>
</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import teachingLoadTableForTeacher from "@/components/layout/teacherComponents/teachingLoadTableForTeacher.vue";
import axios from "axios";
import store from "@/store/index.js";
export default {
  name: "teachingLoadForTeacher",
  props : ['stateOfPage', "actualSemester", "workStatus", "supervisorMark"],
  components : {
    "headerOfStudent" : headerOfStudent,
    "teachingLoadTableForTeacher" : teachingLoadTableForTeacher
  },
  data() {
    return {
      array_classroom_load:[],
      array_individual_students_load: [],
      array_additional_load: [],

      buttonTabArrayState: [],

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

        try {
          for (var j = 0; j < data[i].classroom_loads.length; j++){
            var class_load = data[i].classroom_loads[j]
            console.log(this.array_classroom_load[0])
            this.array_classroom_load[semester - 1].push(class_load)
          }
        }
        catch (e) {
          console.log(e)
        }

        try {
          for (var j = 0; j < data[i].individual_students_loads.length; j++){
            var individual_load = data[i].individual_students_loads[j]
            this.array_individual_students_load[semester-1].push(individual_load)
          }
        }
        catch (e) {
          console.log(e)
        }

        try {
          for (var j = 0; j < data[i].additional_loads.length; j++){
            var add_load = data[i].additional_loads[j]
            this.array_additional_load[semester-1].push(add_load)
          }
        }
        catch (e) {
          console.log(e)
        }
      }
      this.buttonTabArrayState = Array.from({ length: this.actualSemester }, (val, index) => false);
    },

    changeTabState(id){
    
    var currentState = this.buttonTabArrayState[id]
    this.buttonTabArrayState = Array.from({ length: this.actualSemester }, (val, index) => false);

    this.buttonTabArrayState[id] = !currentState
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

      await this.fillDataForTables(this.data)

    },

  },
  async beforeMount() {
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


  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

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