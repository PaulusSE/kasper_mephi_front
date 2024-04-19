<template >

  <work-send-to-check-notification
      :show = "showEditError"
  >
  </work-send-to-check-notification>

  <save-tables-notification
  :result-of-sending = this.resultOfSavingTables
  :show = this.showSavingTablesNotification
  >
  </save-tables-notification>

  <div class="mainPage">
    <header-of-student

        @btnDissertationClicked="$emit('btnDissertationClicked')"
        @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
        @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
        @btnReportingClicked="$emit('btnReportingClicked')"
        :work-status = workStatus
        :state-of-student-page = stateOfStudentPage

    ></header-of-student>


    <teaching-load-table v-for="(n, index) in this.actualSemester "
                         :id = index
                         v-if="isDataFetched"
                         :classroom-work="array_classroom_load[index]"
                         :individual-work="array_individual_students_load[index]"
                         :other-work="array_additional_load[index]"
                         :actualSemester = this.actualSemester
                         @updatePage="(n) => cancelChange(n)"
                         :waitForCheck = this.waitForCheck

                         @buttonSmallTableAdd1=buttonSmallTableAdd1(index)
                         @buttonSmallTableAdd2=buttonSmallTableAdd2(index)
                         @buttonSmallTableAdd3=buttonSmallTableAdd3(index)

                         @deleteClassroomWork="(n) => deleteClassroomWork(index, n)"
                         @deleteIndividualWork="(n) => deleteIndividualWork(index, n)"
                         @deleteAdditionalWork="(n) => deleteAdditionalWork(index, n)"

                         @saveClassroomWork = saveClassroomWork(index)
                         @saveIndividualWork = saveIndividualWork(index)
                         @saveAdditionalWork = saveAdditionalWork(index)

                         @makeCopy="(n) => makeCopy(n)"
                         @makeEditErrorNotification = callEditError
                         :canEdit=this.canEdit

    ></teaching-load-table>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Комментарий к педагогической нагрузке</p>
        </nav>
      </div>

      <div>
        <textarea v-model="dissertationText"  disabled rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
      </div>
    </div>

  </div>




</template>

<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import teachingLoadTable from "@/components/layout/studentComponents/teachingLoadTable.vue";
import store from "@/store/index.js";
import axios from "axios";
import workSendToCheckNotification
  from "@/components/layout/notifications/studentNotifications/workSendToCheckNotification.vue";
import teachingLoadTableForTeacher from "@/components/layout/teacherComponents/teachingLoadTableForTeacher.vue";
import tabOfArticles from "@/components/layout/studentComponents/tabOfArticles.vue";
import saveTablesNotifitcation
  from "@/components/layout/notifications/studentNotifications/saveTablesNotifitcation.vue";

export default {
  name: "teachingLoad",
  components: {
    tabOfArticles,
    teachingLoadTableForTeacher,
    workSendToCheckNotification,
    "headerOfStudent":headerOfStudent,
    "teachingLoadTable":teachingLoadTable,
    "saveTablesNotification" : saveTablesNotifitcation
  },
  props: ["stateOfStudentPage", 'educationTime', "actualSemester", "canEdit", "waitForCheck", "workStatus"],
  data() {
    return {
      array_classroom_load:[],
      array_classroom_loadCopy:[],
      array_individual_students_load: [],
      array_individual_students_loadCopy: [],
      array_additional_load: [],
      array_additional_loadCopy: [],
      showEditError: false,

      resultOfSavingTables : false,
      showSavingTablesNotification : false,
      loads_ids : new Map(),
      workStatusMap : {
        "todo" : "Отправлено на доработку",
        "approved" : "Принято",
        "on review" : "Ожидает проверки",
        "in progress" : "В процессе выполнения",
        "empty" : "Пусто",
        "failed" : "Не сдано",
      },
      isDataFetched : false,

    }
  },


  methods: {

    buttonSmallTableAdd1(n){
      let newLoad = {
        subject_name: '',
        main_teacher: '',
        load_type: '',
        hours: 0,
        group_name: '',
      }
      this.array_classroom_load[n] = this.array_classroom_load[n].concat(newLoad)
    },

    buttonSmallTableAdd2(n){
      let newLoad = {
        students_amount: '',
        load_type: '',
        comment: '',

      }
      this.array_individual_students_load[n] = this.array_individual_students_load[n].concat(newLoad)
    },

    buttonSmallTableAdd3(n){
      let newLoad = {
        name: '',
        volume: '',
        comment: '',
      }
      this.array_additional_load[n] = this.array_additional_load[n].concat(newLoad)
    },

    cancelChange(n){

      if (n === 1){
        this.array_classroom_load.length = 0
        for (var i = 0; i < this.array_classroom_loadCopy.length; i++)
          this.array_classroom_load[i] = this.array_classroom_loadCopy[i].slice();
      }
      if (n === 2){
        this.array_individual_students_load.length = 0
        for (var i = 0; i < this.array_individual_students_loadCopy.length; i++)
          this.array_individual_students_load[i] = this.array_individual_students_loadCopy[i].slice();
      }
      if (n === 3){
        this.array_additional_load.length = 0
        for (var i = 0; i < this.array_additional_loadCopy.length; i++)
          this.array_additional_load[i] = this.array_additional_loadCopy[i].slice();
      }

    },

    callEditError() {
      this.showEditError = true
      setTimeout(() => {
        this.showEditError = false
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
      this.workStatus = 'on review'

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

    makeCopy(n){
      if (n === 1){
        this.array_classroom_loadCopy.length = 0
        this.array_classroom_loadCopy = JSON.parse(JSON.stringify(this.array_classroom_load));
      }
      if (n === 2){
        this.array_individual_students_loadCopy.length = 0
        this.array_individual_students_loadCopy = JSON.parse(JSON.stringify(this.array_individual_students_load));
      }
      if (n === 3){
        this.array_additional_loadCopy.length = 0
        this.array_additional_loadCopy = JSON.parse(JSON.stringify(this.array_additional_load));
      }



    },

    deleteClassroomWork(index, n){
      var tempData = this.array_classroom_load[index]
      tempData.splice(n,1)
    },

    deleteIndividualWork(index, n){
      var tempData = this.array_individual_students_load[index]
      tempData.splice(n,1)
    },

    deleteAdditionalWork(index, n){
      var tempData = this.array_additional_load[index]
      tempData.splice(n,1)
    },

    async saveClassroomWork(index){
      if (JSON.stringify(this.array_classroom_load) === JSON.stringify(this.array_classroom_loadCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false

      this.makeCopy(1)

      for (var j = 0; j < this.array_classroom_load[index].length; j++){
        this.array_classroom_load[index][j].hours = parseInt(this.array_classroom_load[index][j].hours)
        this.array_classroom_load[index][j].t_load_id = this.loads_ids.get(index + 1)
      }


      try {
        const response = await axios.post(this.IP +'/students/load/classroom/' + localStorage.getItem("access_token"),
            {
              "loads" : this.array_classroom_load[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200)
          this.callSaveTablesError(true)
      }
      catch (e) {
        console.log(e)
        this.callSaveTablesError(false)
      }

      await this.loadTeachingLoad()
    },

    async saveIndividualWork(index){
      if (JSON.stringify(this.array_individual_students_load) === JSON.stringify(this.array_individual_students_loadCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false
      this.makeCopy(2)


      for (var j = 0; j < this.array_individual_students_load[index].length; j++){
        this.array_individual_students_load[index][j].students_amount = parseInt(this.array_individual_students_load[index][j].students_amount)
        this.array_individual_students_load[index][j].t_load_id = this.loads_ids.get(index + 1)
      }

      console.log(this.array_individual_students_load[index])

      try {
        const response = await axios.post(this.IP +'/students/load/individual/' + localStorage.getItem("access_token"),
            {
              "loads" : this.array_individual_students_load[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200)
          this.callSaveTablesError(true)
      }
      catch (e) {
        console.log(e)
        this.callSaveTablesError(false)
      }

      await this.loadTeachingLoad()
    },

    async saveAdditionalWork(index){
      if (JSON.stringify(this.array_additional_load) === JSON.stringify(this.array_additional_loadCopy)) {
        return
      }
      if (this.showSavingTablesNotification)
        this.showSavingTablesNotification = false
      this.makeCopy(3)

      for (var j = 0; j < this.array_additional_load[index].length; j++){
        this.array_additional_load[index][j].t_load_id = this.loads_ids.get(index + 1)
      }



      try {
        const response = await axios.post(this.IP +'/students/load/additional/' + localStorage.getItem("access_token"),
            {
              "loads" : this.array_additional_load[index],
              "semester": index + 1,
            }
        )
        if (response.status === 200)
          this.callSaveTablesError(true)
      }
      catch (e) {
        console.log(e)
        this.callSaveTablesError(false)
      }

      await this.loadTeachingLoad()
    },

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
        this.loads_ids.set(semester, data[i].t_load_id)
      }



    },

    async loadTeachingLoad() {
      try {
        const response = await axios.get(this.IP +'/students/load/' + localStorage.getItem("access_token"))
        this.data = await response.data;
        await this.fillDataForTables(this.data)
      }
      catch (e) {
        console.log(e)
      }
    },



  },
  async beforeMount() {
    await this.loadTeachingLoad()
    this.isDataFetched = true







  },
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.disabledText {
  color: grey !important;
}


@media (min-width: 800px) {
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

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
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

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
  .textTableUp{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:20px;
    text-align: center;

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