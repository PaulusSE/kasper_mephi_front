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

        if (data[i].classroom_load.load_id !== undefined){
          var class_load = data[i].classroom_load
          this.array_classroom_load[semester - 1].push(class_load)
        }
        if (data[i].individual_students_load.load_id !== undefined){
          var individual_load = data[i].individual_students_load
          this.array_individual_students_load[semester-1].push(individual_load)
        }
        if (data[i].additional_load.load_id !== undefined){
          var add_load = data[i].additional_load
          this.array_additional_load[semester-1].push(add_load)
        }
      }


    },
    async loadTeachingLoad() {
      try {
        const response = await axios.put(this.IP +'/supervisors/student/load/' + localStorage.getItem("access_token"),
            {
              'student_id' : localStorage.getItem('studentID')
            }
        )
        this.data = await response.data;
        this.fillDataForTables(this.data)
        this.workStatus = this.data.approval_status

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
  },
  async beforeMount() {
    if (store.getters.getType === "student"){
      this.$router.push('/wrongAccess')
    }
    await this.loadTeachingLoad()
    await this.getActualSemester()
    await this.fillDataForTables(data)

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