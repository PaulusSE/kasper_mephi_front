<template>

  <error-for-table-plan
  :show = this.showDataErrorForTablePlan
  ></error-for-table-plan>

  <save-parameters
      :show = showSaveTableNotification
      :result-of-sending = resultOfSavingTables
  >
  </save-parameters>


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
        <nav class="mt-3 d-flex" >
          <p class="headingSemester">Обучающиеся и находящиеся в академическом отпуске аспиранты</p>
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
              Актуальный семестр
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
              <router-link style="text-decoration: none" to="/user" @click="pushStudentIDToStorage(index, 1)" >{{element["full_name"]}}</router-link>

            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{element.actual_semester}} курс
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{ element["group_name"] }}

            </div>

            <div class="rightLine textMiniTable" style="width: 26%; text-align: center">

              <div  style="height: 100%; width: 100%">
                <select  :disabled="!editCommonTable"   class="textMiniTable inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="element.studying_status">
                  <option value="studying">Обучается</option>
                  <option value="academic"> В академическом отпуске</option>
                  <option value="graduated">Выпустился</option>
                  <option value="expelled">Отчислился</option>
                </select>
              </div>

            </div>

            <div class="textMiniTable ps-3" style="width: 10%; text-align: center">
              <input :disabled='!editCommonTable' type="checkbox" @change="checkIfAllSelected" v-model="element.can_edit" class="me-3">
            </div>
          </div>
        </div>

      </div>

      <button v-if="showGraduatedAndExpelledStudents" class="editBtn ms-2" @click="changeShowAllApsState">Скрыть весь список</button>
      <button v-else class="editBtn ms-2" @click="changeShowAllApsState">Показать выпустившихся и исключенных аспирантов</button>


      <div class="d-flex justify-content-between" v-if="showGraduatedAndExpelledStudents">
        <nav class="mt-3" >
          <p class="headingSemester">Выпустившиеся и отчисленные аспиранты</p>
        </nav>

      </div>

      <div class="roundBlock p-0 mt-2" v-if="showGraduatedAndExpelledStudents">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents2.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 28%; text-align: center">
              ФИО
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Актуальный семестр
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Группа

            </div>

            <div class="textMiniTable" style="width: 23%; text-align: center">
              Статус
            </div>

          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfStudents2.length}" v-for="(element,index) in arrayOfStudents2">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 28%; text-align: center">
              <router-link style="text-decoration: none" to="/user" @click="pushStudentIDToStorage(index, 2)" >{{element["full_name"]}}</router-link>

            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{element.actual_semester}} курс
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              {{ element["group_name"] }}

            </div>

            <div class="textMiniTable me-3" style="width: 23%; text-align: center">

              <div  style="height: 100%; width: 100%" class="ps-3">
                <select  :disabled="!editCommonTable"   class="textMiniTable inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="element.studying_status">
                  <option value="studying">Обучается</option>
                  <option value="academic"> В академическом отпуске</option>
                  <option value="graduated">Выпустился</option>
                  <option value="expelled">Отчислился</option>
                </select>
              </div>
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
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editTeachers" @click="buttonEditTeachers" class="editBtn mt-3">Редактировать</button>
          <div v-else class="d-flex">
            <button class="editBtn mt-3 me-2" @click="buttonCancelEditTeachers">Отменить</button>
            <button class="editBtn mt-3 " @click="buttonSaveTeachers">Сохранить</button>
          </div>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfTeachers.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="textMiniTable rightLine" style="width: 48%; text-align: center">
              ФИО
            </div>

            <div class="textMiniTable" style="width: 38%; text-align: center">
              Статус
            </div>

          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfTeachers.length}" v-for="(element,index) in arrayOfTeachers">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="textMiniTable rightLine" style="width: 48%; text-align: center">
              <router-link style="text-decoration: none" to="/user2" @click="pushTeacherIDToStorage(index)" >{{element["full_name"]}}</router-link>
            </div>

            <div class="textMiniTable" style="width: 38%; text-align: center">
              <div  style="height: 100%; width: 100%">
                <select  :disabled="!editTeachers"   class="textMiniTable inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="element.archived">
                  <option value=false>Работает</option>
                  <option value=true> Уволен</option>

                </select>
              </div>
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
            <div v-else class="d-flex gap-1">
              <button class="editBtn mt-3 me-2" @click="buttonAddGroup">Добавить</button>
              <button class="editBtn mt-3 me-2" @click="buttonCancelChangeGroups">Отменить</button>
              <button class="editBtn mt-3 " @click="buttonSaveGroup">Сохранить</button>
            </div>
          </nav>
        </div>


      <div v-if="!editTableWithGroups">
        <div class="roundBlock p-0 mt-2">
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

              <div class="textMiniTable"  style="width: 90%; text-align: center">
                <p >{{element.name}}</p>
              </div>


            </div>
          </div>

        </div>
      </div>
      <div v-else>
        <div class="roundBlock p-0 mt-2">
          <div>
            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfGroups.length !== 0}">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                №
              </div>

              <div class=" textMiniTable rightLine" style="width: 80%; text-align: center">
                Группа
              </div>

              <div class=" textMiniTable" style="width: 10%; text-align: center">

              </div>


            </div>

            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfGroups.length}" v-for="(element,index) in arrayOfGroups">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                {{index + 1}}
              </div>

              <div class="textMiniTable rightLine"  style="width: 80%; text-align: center">
                <input type="text" class="inputBox" v-model="element.name" :disabled="element.group_id !== undefined">

              </div>

              <div class="textMiniTable " style="width: 10%; text-align: center">
                <button class="btnAddDeleteFiles mt-2" @click="deleteGroup(index)">
                  <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
                </button>
              </div>

            </div>
          </div>

        </div>
      </div>

    </div>


    <div class="roundBlock">


      <div class="d-flex justify-content-between" style="margin-left: 2.5%">
        <nav class="mt-3" >
          <p class="headingSemester">Редактирование количество семестров обучения</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editTableYears" @click="buttonEditTableYears" class="editBtn mt-3">Редактировать</button>
          <div v-else class="d-flex gap-1">
            <button class="editBtn mt-3 me-2" @click="buttonAddYear">Добавить</button>
            <button class="editBtn mt-3 me-2" @click="buttonCancelYear">Отменить</button>
            <button class="editBtn mt-3 " @click="buttonSaveYear">Сохранить</button>
          </div>
        </nav>
      </div>

      <div v-if="!editTableYears" class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfPlan.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="textMiniTable" style="width: 90%; text-align: center">
              Количество семестров
            </div>


          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfPlan.length}" v-for="(element,index) in arrayOfPlan">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="textMiniTable me-3" style="width: 88%; text-align: center">
              <input type="text" class="inputBox ps-3" v-model="arrayOfPlan[index].amount" disabled>
            </div>

          </div>
        </div>

      </div>

      <div v-else class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfPlan.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              Количество семестров
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">

            </div>



          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfPlan.length}" v-for="(element,index) in arrayOfPlan">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 80%; text-align: center">
              <input v-if="editTableYears" type="text" class="inputBox" v-model="element.amount" :disabled="element.amount_id !== undefined">
              <p v-else>{{element.amount}}</p>
            </div>


            <div class="textMiniTable" style="width: 10%; text-align: center">
              <button class="btnAddDeleteFiles mt-2" @click="buttonDeleteYear(index)">
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
          <p class="headingSemester">Редактирование специальностей</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editTableSpecialization" @click="buttonEditSpecialization" class="editBtn mt-3">Редактировать</button>
          <div v-else class="d-flex gap-1">
            <button class="editBtn mt-3 me-2" @click="buttonAddSpec">Добавить</button>
            <button class="editBtn mt-3 " @click="buttonCancelSpec">Отменить</button>
            <button class="editBtn mt-3 " @click="buttonSaveSpec">Сохранить</button>
          </div>
        </nav>
      </div>

      <div v-if="!editTableSpecialization">
        <div class="roundBlock p-0 mt-2">
          <div>
            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfSpecialization.length !== 0}">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                №
              </div>

              <div class="textMiniTable" style="width: 90%; text-align: center">
                Название специальности
              </div>


            </div>

            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfSpecialization.length}" v-for="(element,index) in arrayOfSpecialization">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                {{index + 1}}
              </div>

              <div class="textMiniTable" style="width: 90%; text-align: center">
                <p>{{element.name}}</p>

              </div>

            </div>
          </div>

        </div>
      </div>
      <div v-else>
        <div class="roundBlock p-0 mt-2">
          <div>
            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfSpecialization.length !== 0}">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                №
              </div>

              <div class="textMiniTable rightLine" style="width: 83%; text-align: center">
                Название специальности
              </div>

              <div class="textMiniTable" style="width: 7%; text-align: center">

              </div>
            </div>

            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfSpecialization.length}" v-for="(element,index) in arrayOfSpecialization">
              <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
                {{index + 1}}
              </div>

              <div class="textMiniTable rightLine" style="width: 83%; text-align: center">

                <input type="text" class="inputBox" v-model="element.name" :disabled="element.specialization_id !== undefined" </input>
              </div>

              <div class="textMiniTable" style="width: 7%; text-align: center">
                <button class="btnAddDeleteFiles mt-2" @click="deleteSpec(index)">
                  <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
                </button>
              </div>





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
import saveParametersEditUsers from "@/components/layout/notifications/adminNotifications/saveParametersEditUsers.vue";

export default {
  name: "editUser",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
    "errorForTablePlan" : errorNotificationForTablePlan,
    "saveParameters" : saveParametersEditUsers
  },
  data(){
    return {
      arrayOfStudentsCopy : [],
      arrayOfStudents : [],

      arrayOfStudentsCopy2 : [],
      arrayOfStudents2 : [],

      arrayOfTeachers : [],
      arrayOfTeachersCopy : [],
      stateOfStudents: true,
      stateOfTeachers: true,
      stateOfMainCheckBox : false,
      arrayOfGroups: [],
      arrayOfGroupsCopy:[],
      editTableWithGroups : false,
      editCommonTable : false,
      editCommonTable2 : false,
      editTableSpecialization: false,
      editTeachers : false,
      arrayOfPlan : [],
      arrayOfSpecialization : [],
      arrayOfSpecializationCopy : [],
      arrayOfPlanCopy: [],
      editTableYears : false,
      showDataErrorForTablePlan : false,
      statusMap: {
        "studying" : "Обучается",
        "academic" : "В академическом отпуске",
        "expelled" : "Отчислился",
        "graduated" : "Выпустился",
      },
      teacherStatusMap: {
        false : "Работает",
        true : "Уволен"
      },
      showSaveTableNotification : false,
      resultOfSavingTables : false,
      deleteSpecIds :[],
      deleteGroupIds: [],
      deletePlanIds: [],

      showGraduatedAndExpelledStudents: false,
    }
  },
  methods : {

    setState(index, string){
      this.arrayOfStudents[index][state] = string
    },

    changeShowAllApsState() {
this.showGraduatedAndExpelledStudents = !this.showGraduatedAndExpelledStudents  
    },

    buttonEditTeachers(){
      this.editTeachers = true
      this.arrayOfTeachersCopy = JSON.parse(JSON.stringify(this.arrayOfTeachers));
    },
    buttonCancelEditTeachers(){
      this.editTeachers = false
      this.arrayOfTeachers = JSON.parse(JSON.stringify(this.arrayOfTeachersCopy));
    },
    async buttonSaveTeachers(){
      this.editTeachers = false
      
      
      if (this.arrayOfTeachers === this.arrayOfTeachersCopy)
        return

      for (var teacher of this.arrayOfTeachers)
        teacher.archived = teacher.archived === 'true'  

      try {
        const response = await axios.put(this.IP +"/administrator/supervisor/" + localStorage.getItem("access_token"), {
          "ids" : this.arrayOfTeachers
            }
        )

      }
      catch (e) {
        console.log(e)
      }


      await this.getTeachers()
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

    },
    selectAllCheckbox(){
    for (var i = 0; i < this.arrayOfStudents.length; i++)
      this.arrayOfStudents[i].can_edit = !this.stateOfMainCheckBox
    },

    checkIfAllSelected(){
      this.stateOfMainCheckBox = true
      for (var student of this.arrayOfStudents){
        if (!student.can_edit){
          this.stateOfMainCheckBox = false
          return
        }
      }
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
          this.arrayOfTeachers.push(this.data.supervisor)
          this.arrayOfStudents.push(this.data.student)
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

    async buttonSaveGroup(){


     if (this.deleteGroupIds.length !== 0){

       try {
         const response = await axios.put(this.IP +"/administrator/enum/groups/" + localStorage.getItem("access_token"),
             {
               "ids" : this.deleteGroupIds
             }
         )

       }
       catch (e) {
         console.log(e)
         this.callSaveTableError()
       }
     }

      var tempData = new Array()

      for (var i = 0; i < this.arrayOfGroups.length; i++){
        if (this.arrayOfGroups[i].group_id === undefined)
          tempData.push(this.arrayOfGroups[i])
      }

      if (tempData.length === 0)
      {
        this.editTableWithGroups = false
        return
      }

      try {
        const response = await axios.post(this.IP +"/administrator/enum/groups/" + localStorage.getItem("access_token"),
            {
              "groups" : tempData
            }
        )

      }
      catch (e) {
        console.log(e)
        this.callSaveTableError()
      }

      this.editTableWithGroups = false

      await this.getGroups()
    },
    buttonAddGroup(){
      this.arrayOfGroups.push({
        name : ''
      })
    },

    buttonEditSpecialization(){
      this.arrayOfSpecializationCopy = this.arrayOfSpecialization.slice(0)
      this.editTableSpecialization = !this.editTableSpecialization
    },

    buttonCancelSpec(){
      this.arrayOfSpecialization = this.arrayOfSpecializationCopy.slice(0)
      this.editTableSpecialization = !this.editTableSpecialization
    },

    async buttonSaveSpec(){

      if (this.deleteSpecIds.length !== 0){
        try {
          const response = await axios.put(this.IP +"/administrator/enum/specializations/" + localStorage.getItem("access_token"),
              {
                "ids" : this.deleteSpecIds
              }
          )

        }
        catch (e) {
          this.callSaveTableError()
          console.log(e)
        }
      }

      var tempData = new Array()


      for (var i = 0; i < this.arrayOfSpecialization.length; i++){
        if (this.arrayOfSpecialization[i].specialization_id === undefined)
          tempData.push(this.arrayOfSpecialization[i])
      }

      if (tempData.length === 0){
        this.editTableSpecialization= false
        return
      }


      try {
        const response = await axios.post(this.IP +"/administrator/enum/specializations/" + localStorage.getItem("access_token"),
            {
            "specs" : tempData
            }
        )

      }
      catch (e) {
        console.log(e)
        this.callSaveTableError()
      }

      await this.getSpecializations()
      this.editTableSpecialization= false
    },
    buttonAddSpec(){
      this.arrayOfSpecialization.push({
        name : ''
      })
    },

    deleteSpec(index){
      this.deleteSpecIds.push(this.arrayOfSpecialization[index].specialization_id)
      this.arrayOfSpecialization.splice(index, 1)

    },

    deleteGroup(index){
      this.deleteGroupIds.push(this.arrayOfGroups[index].group_id)
      this.arrayOfGroups.splice(index, 1)
    },
    buttonEditCommonTable() {
      this.arrayOfStudentsCopy = JSON.parse(JSON.stringify(this.arrayOfStudents));
      this.editCommonTable = true
    },

    buttonEditCommonTable2() {
      this.arrayOfStudentsCopy2 = JSON.parse(JSON.stringify(this.arrayOfStudents2));
      this.editCommonTable2 = true
    },

    buttonCancelChangeCommonTable(){
      this.arrayOfStudents = JSON.parse(JSON.stringify(this.arrayOfStudentsCopy));
      this.editCommonTable = false
    },

    buttonCancelChangeCommonTable2(){
      this.arrayOfStudents2 = JSON.parse(JSON.stringify(this.arrayOfStudentsCopy2));
      this.editCommonTable2 = false
    },

    async buttonSaveCommonTable(){



      try {
        const response = await axios.post(this.IP +"/administrator/student/status/" + localStorage.getItem("access_token"),{
          "students" : this.arrayOfStudents.concat(this.arrayOfStudents2)
            }
        )

      }
      catch (e) {
        console.log(e)
        this.callSaveTableError()
      }

      this.editCommonTable = false
      await this.getStudents()

    },

    buttonEditTableYears() {
      this.editTableYears = true
      this.arrayOfPlanCopy = this.arrayOfPlan.slice(0)
    },

    buttonAddYear(){
      this.arrayOfPlan.push({
        "amount" : '',
      })
    },

    buttonCancelYear(){
      this.arrayOfPlan = this.arrayOfPlanCopy.slice(0)
      this.editTableYears = !this.editTableYears
    },

    callEditTablePlanError() {
      this.showDataErrorForTablePlan = true
      setTimeout(() => {
        this.showDataErrorForTablePlan = false
      }, 5000);
    },

    async buttonSaveYear(){


      if (this.deletePlanIds.length !== 0) {
        try {
          const response = await axios.put(this.IP +"/administrator/enum/amounts/" + localStorage.getItem("access_token"),{
                "ids" : this.deletePlanIds
              }
          )

          if (response.status === 200) {
            this.deleteSpecIds.length = 0
          }

        }
        catch (e) {
          this.callSaveTableError()
          console.log(e)
        }
      }


      for (var i = 0; i < this.arrayOfPlan.length; i++){

        if (!/^\d+$/.test(this.arrayOfPlan[i].amount)){
          this.arrayOfPlan = this.arrayOfPlanCopy.slice(0)
          this.callEditTablePlanError()
          return
        }
      }


      var tempData = new Array()


      for (var i = 0; i < this.arrayOfPlan.length; i++){
        if (this.arrayOfPlan[i].amount_id === undefined)
          tempData.push(this.arrayOfPlan[i])
      }

      if (tempData.length === 0){
        this.editTableYears= false
        return
      }

      for (var element of tempData){
        element.amount = parseInt(element.amount)
      }

      try {
        const response = await axios.post(this.IP +"/administrator/enum/amounts/" + localStorage.getItem("access_token"),
            {
              "amounts" : tempData
            }
        )

      }
      catch (e) {
        console.log(e)
        this.callSaveTableError()
      }

      await this.getSemesters()
      this.editTableYears = false
    },
    buttonDeleteYear(index){

      this.deletePlanIds.push(this.arrayOfPlan[index].amount_id)
      this.arrayOfPlan.splice(index, 1)



    },

    callSaveTableError(result){
        this.resultOfSavingTables = result
        this.showSaveTableNotification = true
        setTimeout(() => {
          this.showSaveTableNotification = false
        }, 5000);
    }
,
    pushStudentIDToStorage(index, key){

      if (key === 1){
        localStorage.setItem("studentID", this.arrayOfStudents[index].student_id)
        this.$store.dispatch("updateUserId", this.arrayOfStudents[index].student_id)
      }

      if (key === 2) {
        localStorage.setItem("studentID", this.arrayOfStudents2[index].student_id)
        this.$store.dispatch("updateUserId", this.arrayOfStudents2[index].student_id)
      }


    },
    pushTeacherIDToStorage(index){
    localStorage.setItem("teacherID", this.arrayOfTeachers[index].supervisor_id)
    },

    async getSpecializations(){
      try {
        const response = await axios.get(this.IP +"/administrator/enum/specializations/" + localStorage.getItem("access_token"),
        )

        this.data = response.data
        this.arrayOfSpecialization = this.data


      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

    async getGroups(){
      try {
        const response = await axios.get(this.IP +"/administrator/enum/groups/" + localStorage.getItem("access_token"),
        )

        this.data = response.data
        this.arrayOfGroups = this.data

      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },
    async getTeachers(){
      try {
        const response = await axios.get(this.IP +"/administrator/supervisors/list/" + localStorage.getItem("access_token"),
        )

        this.data = response.data
        this.arrayOfTeachers = this.data


      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

    async getStudents(){
      try {
        const response = await axios.get(this.IP +"/administrator/students/list/" + localStorage.getItem("access_token"),
        )

        this.data = response.data


      }
      catch (e) {
        this.showWrongAnswerString = true;
        console.log(e)
      }

      this.sortStudents(this.data)

      this.stateOfMainCheckBox = true

      for (var student of this.arrayOfStudents){
        if (student.can_edit === undefined)
          this.stateOfMainCheckBox = false
      }

    },

    async getSemesters(){
      try {
        const response = await axios.get(this.IP +"/administrator/enum/amounts/" + localStorage.getItem("access_token"))

        this.data = response.data

        this.arrayOfPlan = this.data

      }
      catch (e) {
        this.showWrongAnswerString = true;
        console.log(e)
      }
    },

    sortStudents(data){

      const weights = {
        "studying" : 0,
        "academic" : 1,
        "graduated" : 2,
        "expelled" : 3,
      }

      this.arrayOfStudents = data
      this.arrayOfStudents.sort((a, b) => weights[a.studying_status] === weights[b.studying_status] && a.actual_semester < b.actual_semester ? 1 : -1);
      this.arrayOfStudents.sort((a, b) => weights[a.studying_status] > weights[b.studying_status] ? 1 : -1);

      this.arrayOfStudents2 = JSON.parse(JSON.stringify(this.arrayOfStudents));

      this.arrayOfStudents = this.arrayOfStudents.filter(item => !(item.studying_status === 'expelled' || item.studying_status === 'graduated'))
      this.arrayOfStudents2 = this.arrayOfStudents2.filter(item => !(item.studying_status === 'studying' || item.studying_status === 'academic'))

    }



  },
  async beforeMount() {
    try{
      await this.getSpecializations()
    }
    catch (e){
      console.log(e)
    }

    try{
      await this.getGroups()
    }
    catch (e){
      console.log(e)
    }

    try{
      await this.getTeachers()
    }
    catch (e){
      console.log(e)
    }

    try{
      await this.getStudents()
    }
    catch (e){
      console.log(e)
    }

    try{
      await this.getSemesters()
    }
    catch (e){
      console.log(e)
    }


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