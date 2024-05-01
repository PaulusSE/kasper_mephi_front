<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import axios from "axios";
import utf8 from "utf8";
import reportTab from "@/components/layout/studentComponents/report-tab.vue";

export default {
  name: "report",
  data() {
    return {

      arrayOfExams:[],
      deleteExamsIds: [],
      userType: '',
      attestationMarks: [],
      supervisorMarks: [],
      arrayOfComment1: [],
      arrayOfComment2: [],

    }
  },
  components: {headerOfStudent,
  "reportTab" : reportTab
  },
  props: ["stateOfStudentPage", "actualSemester", "waitForCheck", "actualSemester"],
  methods : {

    addExam(){
      let newExam = {
        exam_type: '',
        mark: '',
        set_at: '',
        semester: '',
      }
      this.arrayOfExams = this.arrayOfExams.concat(newExam)
    },
    deleteExam(index){

      // this.deleteExamsIds.push(this.arrayOfExams[index].exam_id)
      this.arrayOfExams.splice(index,1)
    },


    async getMarks(){
      if (this.userType === 'student'){
        try {
          const response = await axios.get(this.IP +"/students/marks/" + localStorage.getItem("access_token"))
          this.data = response.data
          console.log(response)
        }
        catch (e) {
          this.showWrongAnswerString = true;
        }
      }

      else {
        try {
          const response = await axios.put(this.IP +"/supervisors/student/marks/" + localStorage.getItem("access_token"),
              {
                "student_id" : localStorage.getItem("studentID"),
              },
          )
          this.data = response.data
        }
        catch (e) {
          this.showWrongAnswerString = true;
        }
      }
      this.fillMarks(this.data)

    },

    fillMarks(data) {
      this.attestationMarks = data.attestation_marks === undefined ? [] : data.attestation_marks;
      this.supervisorMarks = data.supervisor_marks === undefined ? [] : data.supervisor_marks

      this.arrayOfExams = new Array(this.actualSemester)

      for (var i = 0; i < this.actualSemester; i++){
        this.arrayOfExams[i] = new Array()
      }

      try{
        for (var i = 0; i<data.exams.length; i++){
          var exam = data.exams[i]
          this.arrayOfExams[exam.semester - 1].push(exam)
        }
      }
      catch (e) {
        console.log(e)
      }

      this.attestationMarks.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.arrayOfExams.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.supervisorMarks.sort((a, b) => a.semester > b.semester ? 1 : -1);

      console.log(this.attestationMarks)
      console.log(this.arrayOfExams)
      console.log(this.supervisorMarks)
    },

    async getComments(){
      if (this.userType === 'student'){
        try {
          const response = await axios.get(this.IP +"/students/report/comments/" + localStorage.getItem("access_token"),
          )
          this.data = response.data

        }
        catch (e) {
          console.log(e)
        }
      }
      else {
        try {
          const response = await axios.put(this.IP +"/supervisors/report/comments/" + localStorage.getItem("access_token"),
              {
                "student_id": localStorage.getItem("studentID"),
              }
          )
          this.data = response.data
        }
        catch (e) {
          console.log(e)
        }
      }

      try{
        this.fillComments1(this.data.dissertation_comments)
      }
      catch (e){
        console.log(e)
      }

      try{
        this.fillComments2(this.data.dissertation_plans)
      }
      catch (e){
        console.log(e)
      }
    },

    fillComments1(data){
      var semesterObjectArray = new Array()
      for (var i = 0; i < this.actualSemester; i++){
        semesterObjectArray.push({
          semester: i + 1
        })
      }

      if (data === undefined)
        data = new Array()


      for (var i = 0; i < data.length; i++){
        if (data[i] === undefined)
          return
        var semester = data[i].semester
        semesterObjectArray = semesterObjectArray.filter(function(obj) {
          return obj.semester !== semester
        })
      }

      for (var i = 0; i < semesterObjectArray.length; i++){
        data.push({
          semester:semesterObjectArray[i].semester,
          commentary: '',
        })
      }
      data.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.arrayOfComment1 = data

    },
    fillComments2(data){
      var semesterObjectArray = new Array()
      for (var i = 0; i < this.actualSemester; i++){
        semesterObjectArray.push({
          semester: i + 1
        })
      }

      if (data === undefined)
        data = new Array()


      for (var i = 0; i < data.length; i++){
        if (data[i] === undefined)
          return
        var semester = data[i].semester
        semesterObjectArray = semesterObjectArray.filter(function(obj) {
          return obj.semester !== semester
        })
      }

      for (var i = 0; i < semesterObjectArray.length; i++){
        data.push({
          semester:semesterObjectArray[i].semester,
          plan_text: '',
        })
      }

      data.sort((a, b) => a.semester > b.semester ? 1 : -1);
      this.arrayOfComment2 = data
    }


  },
  async beforeMount() {
    this.userType = localStorage.getItem("userType");
    await this.getComments()
    await this.getMarks()





  }
}
</script>

<template>
<div class="mainPage">
  <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnReportingClicked="$emit('btnReportingClicked')"
      @btnProfileClicked="$emit('btnProfileClicked')"
      :state-of-student-page = stateOfStudentPage
  ></header-of-student>

  <report-tab
      v-for="(number, index) in actualSemester"
      :id=number
  :comment1 = this.arrayOfComment1[index]
  :comment2 = this.arrayOfComment2[index]
  :array-of-exams = this.arrayOfExams[index]
      :user-type = this.userType
      :wait-for-check = waitForCheck
      :actual-semester = actualSemester

  ></report-tab>

  <div class="roundBlock" >
    <div class="d-flex justify-content-between">
      <nav class="mt-3" style="margin-left: 2.5%">
        <p class="mainText">Аттестация</p>
      </nav>
    </div>


    <div class="d-flex justify-content-between">
      <nav class="mt-3" style="margin-left: 2.5%">
        <p class="mainText">Аттестационная оценка</p>
      </nav>
    </div>
    <div class="roundBlock p-0 mt-2">
      <div>
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: attestationMarks.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 20%; text-align: center;">
            Семестр
          </div>


          <div class="textMiniTable" style="width: 78%; text-align: center">
            Оценка
          </div>


        </div>

        <div class="d-flex " :class="{ underline: index !== attestationMarks.length-1}" v-for="(marks,index) in attestationMarks">

          <div class="rightLine textMiniTable" style="width: 20%; text-align: center">

            {{marks.semester}}
          </div>
          <div class=" textMiniTable" style="width: 78%; text-align: center">
            <div>
              <div class="textWithCarry inputBox ">{{marks.mark}}</div>
            </div>
          </div>


        </div>

      </div>
    </div>

    <div class="d-flex justify-content-between">
      <nav class="mt-3" style="margin-left: 2.5%">
        <p class="mainText">Оценка научного руководителя</p>
      </nav>
    </div>
    <div class="roundBlock p-0 mt-2">
      <div>
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: supervisorMarks.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 20%; text-align: center;">
            Семестр
          </div>


          <div class="textMiniTable" style="width: 78%; text-align: center">
            Оценка
          </div>


        </div>

        <div class="d-flex " :class="{ underline: index !== supervisorMarks.length-1}" v-for="(marks,index) in supervisorMarks">

          <div class="textMiniTable rightLine" style="width: 20%; text-align: center">

            {{marks.semester}}
          </div>
          <div class="textMiniTable" style="width: 78%; text-align: center">
            <div>
              <div class="textWithCarry inputBox ">{{marks.mark}}</div>
            </div>
          </div>


        </div>

      </div>
    </div>



  </div>


</div>
</template>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}



.btnAddDeleteFiles {
  border:0 !important;
  background:white !important;
}

.downloadFile{
  border: none;
  background-color: white;
  color: #0b5ed7;


}

@media (min-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:1.3rem;

  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 42px;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 3rem;
  }


  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:1.1rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;

  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.95rem;
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
    padding: 0 !important;
    margin-bottom: 2%;
  }


  .underline {
    border-bottom: solid 0.12em #DEDEDE;


  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 1.1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }





  .trashLogo{
    width:32px !important;
    height: 32px !important;
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
    font-size: 1.3rem;
    text-align: center;
  }


  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1rem;
    background-color: white;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
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
    padding: 0 0 0.5%;
  }


  .inputWidth {
    width: 100%;
  }

}

@media (max-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:1.1rem;

  }

  .semestrImgActive{
    width: 50px;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 42px;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 2rem;
  }


  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.9rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.8rem;
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
    padding: 0 !important;
    margin-bottom: 2%;
  }


  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.9rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

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
    font-size: 1.1rem;
    text-align: center;
  }


  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 1rem;
    background-color: white;

  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
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
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }



  .inputWidth {
    width: 100%;
  }


}

@media (pointer: coarse) and (max-width: 400px)  {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .headingSemester {

    margin-top:0.5%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:0.7rem;

  }

  .semestrImgActive{
    width: 30px;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 42px;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 1rem;
  }


  .trashLogo{
    width:15px !important;
    height: 15px !important;

  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.5rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-top: 0.2rem;
    padding-right: 0.1rem;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }

  .textCheckBox {
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
    font-size: 0.5rem !important;
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
    padding: 0 !important;
    margin-bottom: 2%;
  }


  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.7rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }


  .trashLogo{
    width:25px !important;
    height: 25px !important;
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
    font-size: 0.9rem;
    text-align: center;
  }


  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 5%;
    background-color: white;
    font-size: 0.7rem;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.7rem;
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
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }



  .inputWidth {
    width: 100%;
  }

}



</style>