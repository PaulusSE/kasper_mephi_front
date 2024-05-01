<template>


  <div class="mainPage">

    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <div class="roundBlock">

<!--      <div class="mt-2">-->
<!--        <select class="form-select">-->
<!--          <option>-->
<!--            Год1-->
<!--          </option>-->
<!--          <option>-->
<!--            Год2-->
<!--          </option>-->
<!--          <option>-->
<!--            Год3-->
<!--          </option>-->
<!--        </select>-->
<!--      </div>-->

      <div class="d-flex justify-content-between">
        <nav class="mt-3" >
          <p class="headingSemester">Оценка за НИР</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%">
          <button v-if="!editMarks" @click="editMarksClicked" class="editBtn mt-3">Редактировать</button>
          <div v-else class="d-flex">
            <button class="editBtn mt-3 me-2" @click="cancelEditMarks">Отменить</button>
            <button class="editBtn mt-3 " @click="saveMarks">Сохранить</button>
          </div>
        </nav>

      </div>

      <div class="roundBlock p-0 mt-2">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 30%; text-align: center">
              ФИО
            </div>


            <div class="rightLine textMiniTable" style="width: 15%; text-align: center">
              Семестр
            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Группа

            </div>

            <div class="textMiniTable" style="width: 25%; text-align: center">
              Оценка
            </div>

          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfStudents.length}" v-for="(element,index) in arrayOfStudents">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 30%; text-align: center">
              <router-link style="text-decoration: none" to="/user" @click="pushStudentIDToStorage(index)" >{{element["full_name"]}}</router-link>

            </div>


            <div class="rightLine textMiniTable" style="width: 15%; text-align: center">
              {{element.actual_semester}}
            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              {{ element.group_name}}

            </div>

              <div class="textMiniTable" style="width: 24%; text-align: center">
                <div v-if="!editMarks">
                  {{ element.mark }}
                </div>
                <div v-else class="me-3">
                  <input type="text" class="inputBox ps-3" v-model="element.mark">
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
export default {
  name: "report",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
  },
  data(){
    return {
      arrayOfStudents: [],
      arrayOfStudentsCopy : [],
      editMarks : false,
    }
  },
  methods : {
    editMarksClicked(){
      this.editMarks = !this.editMarks
      this.arrayOfStudentsCopy = this.arrayOfStudents.slice(0)
    },
    async saveMarks(){
      this.editMarks = !this.editMarks

      for (var student of this.arrayOfStudents){
        student.semester = student.actual_semester
        student.mark = parseInt(student.mark)
      }

      try {
        const response = await axios.post(this.IP +"/administrator/student/attestation/marks/" + localStorage.getItem("access_token"),
            {
              "attestation_marks": this.arrayOfStudents,
                 }
        )

      }
      catch (e) {

        console.log(e)
      }

    },

    pushStudentIDToStorage(index){
      localStorage.setItem("studentID", this.arrayOfStudents[index].student_id)
      this.$store.dispatch("updateUserId", this.arrayOfStudents[index].student_id)
    },

    cancelEditMarks(){
      this.editMarks = false
      this.arrayOfStudents = this.arrayOfStudentsCopy.slice(0)
    },

    async getStudents(){
      try {
        const response = await axios.get(this.IP +"/administrator/students/list/" + localStorage.getItem("access_token"),
        )

        this.data = response.data
        console.log(this.data)
        this.arrayOfStudents = this.data

      }
      catch (e) {
        this.showWrongAnswerString = true;
        console.log(e)
      }

      try {
        await this.fillMarks()
      }
      catch (e){
        console.log(e)
      }


    },

    async fillMarks() {

      for (var i = 0; i < this.arrayOfStudents.length; i++){

        var studentID = this.arrayOfStudents[i].student_id

        try {
          const response = await axios.put(this.IP +"/supervisors/student/marks/" + localStorage.getItem("access_token"), {
            "student_id" : studentID
              }
          )

          this.data = response.data
          this.data.attestation_marks.sort((a, b) => a.semester < b.semester ? 1 : -1);
          this.arrayOfStudents[i].mark = this.data.attestation_marks[0].mark

        }
        catch (e) {
          console.log(e)
        }


      }

    },

  },
  async beforeMount() {
      await this.getStudents()

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