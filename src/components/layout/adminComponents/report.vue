<template>


  <div class="mainPage">

    <header-of-admin
        @btnStudentTeacherButtonClicked="$emit('btnStudentTeacherButtonClicked')"
        @btnAddUsersButtonClicked="$emit('btnAddUsersButtonClicked')"
        @btnEditUsersButtonClicked="$emit('btnEditUsersButtonClicked')"
        @btnReportButtonClicked="$emit('btnReportButtonClicked')"
        :state-of-admin-page = stateOfAdminPage
    ></header-of-admin>

    <confirm-attestation
    :show = showConfirmAttestationWindow
    @waitDecision="(value) => attestate(value)"
    >

    </confirm-attestation>

    <div class="roundBlock">


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
                  <input  v-maska data-maska="#"  type="number" class="inputBox ps-3" v-model="element.mark" @input="checkLimitations(index)">
                </div>

              </div>

          </div>
        </div>
      </div>
      <div class="myBtn mt-2" >
          <button class="sendFilesBtn p-2" @click="showConfirmModal">
            <div class="d-flex justify-content-around">
              <p class="loadText">
                Провести аттестацию
              </p>
            </div>

          </button>
        </div>
    </div>

    <div class="roundBlock">


<div class="justify-content-between">
  <nav class="mt-3 mb-2" >
    <p class="headingSemester">Отчеты</p>
  </nav>

  <div>
    <div class="d-flex roundBlock gap-2 pb-1 pt-1">
      <nav class="">
      Генерация и скачивания отчета 1:
    </nav>
    <nav>
      <p class="loadTextState">
<button class="downloadFile" @click="downLoadReport1"><p style="word-break: break-word">Отчет 1</p></button>
</p>
    </nav>
    </div>

    <div class="d-flex roundBlock gap-2 pb-1 pt-1">
      <nav class="">
      Генерация и скачивания отчета 2:
    </nav>
    <nav>
      <p class="loadTextState">
<button class="downloadFile" @click="downLoadReport2"><p style="word-break: break-word">Отчет 2</p></button>
</p>
    </nav>
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
import utf8 from "utf8"
import confirmAttestation from "../models/adminModels/confirmAttestation.vue";


export default {
  name: "report",
  props : ["stateOfAdminPage"],
  components : {
    "headerOfAdmin": headerOfAdmin,
    "confirmAttestation" : confirmAttestation
  },
  data(){
    return {
      arrayOfStudents: [],
      arrayOfStudentsCopy : [],
      editMarks : false,

      reportFile1: '',
      reportFile2: '',

      showConfirmAttestationWindow : false,
      
    }
  },
  methods : {
    editMarksClicked(){
      this.editMarks = !this.editMarks
      this.arrayOfStudentsCopy = this.arrayOfStudents.slice(0)
    },

    showConfirmModal(){
      this.showConfirmAttestationWindow = true
    },

    async attestate(value){
      if (!value){
        this.showConfirmAttestationWindow = false
        return
      }

      this.showConfirmAttestationWindow = true

      try {
        const response = await axios.post(this.IP +"/administrator/student/new-semester/" + localStorage.getItem("access_token"),
      {
        "students" : this.arrayOfStudents
      })
        
      }
      catch (e) {
        console.log(e)
      }
      
    },

    
    async downLoadReport1(){

    
      try {
        const response = await axios.get(this.IP +"/administrator/generate/report-one/" + localStorage.getItem("access_token"))
        const response2 = await axios.get(this.IP +"/administrator/download/report-one/" + localStorage.getItem("access_token"), {
              responseType: 'blob',
            })
       
        if (response2.status === 200) {
          const blob = new Blob([response2.data]);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "Отчет1.xlsx";
          link.click()
        }
      }
      catch (e) {

        console.log(e)
      }
    },

    async downLoadReport2(){

try {
  const response = await axios.get(this.IP +"/administrator/generate/report-two/" + localStorage.getItem("access_token"))
  const response2 = await axios.get(this.IP +"/administrator/download/report-two/" + localStorage.getItem("access_token"), {
        responseType: 'blob',
      })
 
      if (response2.status === 200) {
          const blob = new Blob([response2.data]);
          const link = document.createElement('a');
          link.href = window.URL.createObjectURL(blob);
          link.download = "Отчет2.xlsx";
          link.click()
        }
}
catch (e) {

  console.log(e)
}
},


    checkLimitations(index){

      if (this.arrayOfStudents[index].mark > 5){
        this.arrayOfStudents[index].mark = 5
        return
      }
      if (this.arrayOfStudents[index].mark < 0){
        this.arrayOfStudents[index].mark = 0
        return
      }
      
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

      this.arrayOfStudents.sort((a, b) => a.actual_semester > b.actual_semester ? 1 : -1);
      this.arrayOfStudents = this.arrayOfStudents.filter(item => !(item.studying_status !== 'studying'))


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

input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
    /* display: none; <- Crashes Chrome on hover */
    -webkit-appearance: none;
    margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
}

.myBtn {
    margin-right: 2.5%;
    text-align: right;
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

.loadTextState{
    font-size: 0.8rem;
  }

.downloadFile{
    border: none;
    background-color: white;
    color: #0b5ed7;
  }

@media (min-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .loadTextState{
    font-size: 1rem !important;
  }

  .imgUploadFile {
    width: 30px;
    height: 30px;
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

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;

    padding: 0.5rem !important;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
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

  .imgUploadFile {
    width: 30px;
    height: 30px;
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

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:22px;
    padding: 5px;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
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

  .imgUploadFile {
    width: 20px;
    height: 20px;
  }

  .trashLogo{
    width:15px !important;
    height: 15px !important;

  }

  .sendFilesBtn{
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:0.6rem;
    padding: 5px;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
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