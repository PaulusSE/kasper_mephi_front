<template>

  <error-for-table-plan
  :show = this.showDataErrorForTablePlan
  ></error-for-table-plan>


  <div class="mainPage">
    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="roundBlock">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" >
          <p class="headingSemester">Доступ аспирантов</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editCommonTable" @click="buttonEditCommonTable" class="editBtn mt-3">Редактировать</button>
          <div v-else class="d-flex">
            <button class="editBtn mt-3 me-2" @click="buttonCancelChangeCommonTable">Отменить</button>
            <button class="editBtn mt-3 " @click="buttonSaveCommonTable">Сохранить</button>
          </div>
        </nav>

      </div>

      <div class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 28%; text-align: center">
              ФИО
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Год
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Группа

            </div>

            <div class="rightLine textMiniTable" style="width: 26%; text-align: center">
              Статус
            </div>

            <div class="textMiniTable ps-3" style="width: 10%; text-align: center">
              <input :disabled='!editCommonTable' type="checkbox" @click="selectAllCheckbox" v-model="stateOfMainCheckBox" class="me-3">
            </div>
          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfStudents.length}" v-for="(element,index) in arrayOfStudents">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 28%; text-align: center">
              <router-link style="text-decoration: none" to="/user">{{element["full_name"]}}</router-link>

            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{element["years"]}} курс
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{ element["group_name"] }}

            </div>

            <div class="rightLine textMiniTable" style="width: 26%; text-align: center">

              <div  style="height: 100%; width: 100%">
                <select  :disabled="!editCommonTable"   class="textMiniTable inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="element['state']">
                  <option value="studying">Обучается</option>
                  <option value="academic"> В академическом отпуске</option>
                  <option value="graduated">Выпустился</option>
                  <option value="expelled">Отчислился</option>
                </select>
              </div>

            </div>

            <div class="textMiniTable ps-3" style="width: 10%; text-align: center">
              <input :disabled='!editCommonTable' type="checkbox" v-model="element['can_edit']" class="me-3">
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="roundBlock">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" >
          <p class="headingSemester">Научные руководители</p>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfTeachers.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              ФИО
            </div>

          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfTeachers.length}" v-for="(element,index) in arrayOfTeachers">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index}}
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              <router-link style="text-decoration: none" to="/user2">{{element["full_name"]}}</router-link>

            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="roundBlock">


        <div class="d-flex justify-content-between" style="margin-left: 2.5%">
          <nav class="mt-3" >
            <p class="headingSemester">Редактирование списка актуальных групп</p>
          </nav>
          <nav class="text-end" style="margin-right: 2.5%">
            <button v-if="!editTableWithGroups" @click="buttonEditGroups" class="editBtn mt-3">Редактировать</button>
            <div v-else>
              <button class="editBtn mt-3 me-2" @click="buttonAddGroup">Добавить</button>
              <button class="editBtn mt-3 me-2" @click="buttonCancelChangeGroups">Отменить</button>
              <button class="editBtn mt-3 " @click="buttonSaveGroup">Сохранить</button>
            </div>
          </nav>
        </div>



      <div v-if="!editTableWithGroups" class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfGroups.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class=" textMiniTable" style="width: 90%; text-align: center">
              Группа
            </div>






          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfGroups.length}" v-for="(element,index) in arrayOfGroups">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              <input v-if="editTableWithGroups" type="text" class="inputBox" v-model="arrayOfGroups[index]">
              <p v-else>{{element}}</p>
            </div>

          </div>
        </div>

      </div>

      <div v-else class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              Группа
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">

            </div>



          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfGroups.length}" v-for="(element,index) in arrayOfGroups">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              <input v-if="editTableWithGroups" type="text" class="inputBox" v-model="arrayOfGroups[index]">
              <p v-else>{{element}}</p>
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">
              <button v-if="editTableWithGroups" class="btnAddDeleteFiles mt-2" @click="deleteGroup(index)">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
              <button v-else class="btnAddDeleteFiles mt-2">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="roundBlock">


      <div class="d-flex justify-content-between" style="margin-left: 2.5%">
        <nav class="mt-3" >
          <p class="headingSemester">Редактирование актуального плана обучения</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editTableYears" @click="buttonEditTableYears" class="editBtn mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn mt-3 me-2" @click="buttonAddYear">Добавить</button>
            <button class="editBtn mt-3 " @click="buttonSaveYear">Сохранить</button>
          </div>
        </nav>
      </div>

      <div v-if="!editTableYears" class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              План (лет)
            </div>




          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfPlan.length}" v-for="(element,index) in arrayOfPlan">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              <input v-if="editTableYears" type="text" class="inputBox" v-model="arrayOfPlan[index]">
              <p v-else>{{element}}</p>
            </div>

          </div>
        </div>

      </div>

      <div v-else class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              План (лет)
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">

            </div>



          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfPlan.length}" v-for="(element,index) in arrayOfPlan">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              <input v-if="editTableYears" type="text" class="inputBox" v-model="arrayOfPlan[index]">
              <p v-else>{{element}}</p>
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">
              <button v-if="editTableWithGroups" class="btnAddDeleteFiles mt-2" @click="buttonDeleteYear(index)">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
              <button v-else class="btnAddDeleteFiles mt-2">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>




  </div>


</template>

<script>
import headerOfAdmin from "@/components/layout/adminComponents/headerOfAdmin.vue";
import store from "@/store/index.js";
import axios from "axios";
import errorNotificationForTablePlan
  from "@/components/layout/notifications/adminNotifications/errorNotificationForTablePlan.vue";
export default {
  name: "editUser",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
    "errorForTablePlan" : errorNotificationForTablePlan,
  },
  data(){
    return {
      arrayOfStudentsCopy : [],
      arrayOfStudents : [
        {
          'full_name' : 'ФИО1',
          'group_name' : 'group1',
          'years' : 1,
          'state' : 'graduated',
          'can_edit' : false
        },
        {
          'full_name' : 'ФИО2',
          'group_name' : 'group2',
          'years' : 2,
          'state' : 'studying',
          'can_edit' : true
        },
      ],

      arrayOfTeachers : [
        {
          'full_name' : 'ФИО1'
        }
      ],
      stateOfStudents: true,
      stateOfTeachers: true,
      stateOfMainCheckBox : false,
      arrayOfGroups: [
          'Б20-504',
          'Б20-514',
          'Б19-514',
      ],
      arrayOfGroupsCopy:[],
      editTableWithGroups : false,
      editCommonTable : false,
      arrayOfPlan : [3,4],
      arrayOfPlanCopy: [],
      editTableYears : false,
      showDataErrorForTablePlan : false,
      statusMap: {
        "studying" : "Обучается",
        "academic" : "В академическом отпуске",
        "expelled" : "Отчислился",
        "graduated" : "Выпустился",
      }
    }
  },
  methods : {

    mapSelect(index){
      var currentState = this.arrayOfStudents[index]["state"]
      console.log(currentState)
      // this.arrayOfStudents[index]["state"] = "expelled"
    },

    setState(index, string){
      this.arrayOfStudents[index][state] = string
      console.log(string)
    },


    deleteStudent(index){

      this.arrayOfStudents.splice(index,1) /// Временно
    },
    deleteTeacher(index){

      this.arrayOfTeachers.splice(index,1) /// Временно
    },
    editStudentsButton(){
      this.stateOfStudents = !this.stateOfStudents
      this.arrayOfStudentsCopy = this.arrayOfStudents.slice(0)
    },
    saveStudents(){
      this.stateOfStudents = !this.stateOfStudents
      if (this.arrayOfStudentsCopy === this.arrayOfStudents)
        return
      /// saveStudents
    },
    cancelStudents(){
      this.stateOfStudents = !this.stateOfStudents
      this.arrayOfStudents = this.arrayOfStudentsCopy.slice(0)
    },
    editTeachersButton(){
      this.stateOfTeachers = !this.stateOfTeachers
      this.arrayOfTeachersCopy = this.arrayOfTeachers.slice(0)
    },
    saveTeachers(){
      this.stateOfTeachers = !this.stateOfTeachers
      if (this.arrayOfTeachersCopy === this.arrayOfTeachers)
        return
      /// todo save changes
    },
    selectAllCheckbox(){
    for (var i = 0; i < this.arrayOfStudents.length; i++)
      this.arrayOfStudents[i].editState = !this.stateOfMainCheckBox
    },

    cancelTeachers(){
      this.stateOfTeachers = !this.stateOfTeachers
      this.arrayOfTeachers = this.arrayOfTeachersCopy.slice(0)
    },
    async getAspsAndTeachers() {
      try {
        const response = await axios.get(this.IP +"/administrator/pairs/" + localStorage.getItem("access_token"),
        )

        this.data = response.data

        for (var i = 0; i < this.data.length; i++){
          this.arrayOfTeachers.push(this.data["supervisor"])
          this.arrayOfStudents.push(this.data["student"])
        }


      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

    buttonEditGroups(){
      this.arrayOfGroupsCopy = this.arrayOfGroups.slice(0)
      this.editTableWithGroups = !this.editTableWithGroups
    },
    buttonCancelChangeGroups(){
      this.arrayOfGroups = this.arrayOfGroupsCopy.slice(0)
      this.editTableWithGroups = false
    },

    buttonSaveGroup(){
      //todo saving
      this.editTableWithGroups = false
    },
    buttonAddGroup(){
      this.arrayOfGroups.push('')
    },

    deleteGroup(index){
      this.arrayOfGroups.splice(index, 1)
    },
    buttonEditCommonTable() {
      this.arrayOfStudentsCopy = JSON.parse(JSON.stringify(this.arrayOfStudents));
      this.editCommonTable = true
    },

    buttonCancelChangeCommonTable(){
      this.arrayOfStudents = JSON.parse(JSON.stringify(this.arrayOfStudentsCopy));
      this.editCommonTable = false
    },

    buttonSaveCommonTable(){
      //todo saving
      this.editCommonTable = false
    },

    buttonEditTableYears() {
      this.editTableYears = true
      this.arrayOfPlanCopy = this.arrayOfPlan.slice(0)
    },

    buttonAddYear(){
      this.arrayOfPlan.push('')
    },
    callEditTablePlanError() {
      this.showDataErrorForTablePlan = true
      setTimeout(() => {
        this.showDataErrorForTablePlan = false
      }, 5000);
    },

    buttonSaveYear(){
      for (var i = 0; i < this.arrayOfPlan.length; i++){
        if (!/^\d+$/.test(this.arrayOfPlan[i])){
          this.arrayOfPlan = this.arrayOfPlanCopy.slice(0)
          this.callEditTablePlanError()
          return
        }
      }
      //todo saving


      this.editTableYears = false
    },
    buttonDeleteYear(index){
      this.arrayOfPlan.splice(index, 1)
    },

    pushStudentIDToStorage(index){
      localStorage.setItem("studentID", this.arrayOfStudents[index].studentId)
      this.$store.dispatch("updateUserId", this.arrayOfStudents[index].studentId)
    },
    pushTeacherIDToStorage(index){
    localStorage.setItem("teacherID", this.arrayOfTeachers[index].teacherId)
      //todo мб стоит пихнуть id в store
    }
  },
  beforeMount() {

    this.getAspsAndTeachers()



  }

}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
}


.inputBox {
  border: 0 !important;
  font-weight: 400;
  text-align: center;
  border-radius: 0 !important;
  color:#000000;
  background-color: white;
  outline: none !important;
  width: 100%;
}

@media (min-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
  }

  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-all;

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

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
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
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .linkStyle {

    text-decoration: none;
    color:#0055BB !important;
  }
}

@media (max-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.9rem;
  }


  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.9rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
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

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
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
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .linkStyle {
    text-decoration: none;
    color:#0055BB;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
    font-size: 0.8rem;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.7rem !important;
  }
  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.6rem;
    text-align: center;
    word-break: break-all;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .trashLogo{
    width:15px !important;
    height: 15px !important;

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

  .headerText{
    margin-top: 0!important;
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 !important;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:0.6rem !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .linkStyle {
    padding-bottom: 0.75rem;
    text-decoration: none;

  }
}

</style>