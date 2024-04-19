<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
import axios from "axios";
import utf8 from "utf8";


export default {
  name: "report",
  data() {
    return {
      editComment1 : false,
      editComment2 : false,
      editExams : false,
      comment1: '',
      comment2: '',
      presentationFile : '',
      presentationFilename : '',
      arrayOfExams:[{
        name:"english",
        mark : "90 A",
        date : "15.05.2023"
      }],
      deleteExamsIds: [],
      userType: '',

    }
  },
  components: {headerOfStudent},
  props: ["stateOfStudentPage"],
  methods : {
    comment1Clicked(){
      this.editComment1 = !this.editComment1
    },
    comment2Clicked(){
      this.editComment2 = !this.editComment2
    },
    editExamsClicked(){
      this.editExams = !this.editExams
    },

    saveExams(){
      this.editExams = !this.editExams
    },

    addExam(){
      let newExam = {
        name: '',
        mark: '',
        date: '',
      }
      this.arrayOfExams = this.arrayOfExams.concat(newExam)
    },
    deleteExam(index){
      console.log(index)
      // this.deleteExamsIds.push(this.arrayOfExams[index].exam_id)
      this.arrayOfExams.splice(index,1)
    },

    saveComment1(){
      this.editComment1 = !this.editComment1
    },
    saveComment2(){
      this.editComment2 = !this.editComment2
    },
    async downloadFile(){
      await this.getFiles()
      const blob = new Blob([this.presentationFile]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.presentationFilename;
      link.click()
    },
    async getFiles() {

      try {
        const response = await axios.put(this.IP +"" + localStorage.getItem("access_token"),
            {
              "semester" : 2
            },
            {
              responseType: 'blob',
            }
        )
        if (response.status === 200) {
          this.presentationFilename = utf8.decode(response.headers["content-disposition"])
          this.presentationFile = response.data
        }


      }
      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

  },
  beforeMount() {
    this.userType = localStorage.getItem("userType");

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

  <div class="roundBlock">
    <div class="d-flex justify-content-between mt-1">
      <nav class="checkboxBlock">
        <p class="mainText mt-0">Комментарий к текущей диссертации</p>
      </nav>
      <div v-if="userType === 'student'">
        <nav v-if="!editComment1">
          <button class="editBtn" @click="comment1Clicked" >Редактировать</button>
        </nav>
        <nav v-else>
          <button class="editBtn" @click="saveComment1" >Сохранить</button>
        </nav>
      </div>

    </div>
    <div>


      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <div>
            <textarea  v-model="comment1" :disabled="!editComment1" rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
          </div>
        </nav>
      </div>



    </div>


  </div>

  <div class="roundBlock">
    <div class="d-flex justify-content-between mt-1">
      <nav class="checkboxBlock">
        <p class="mainText mt-0">План работы на следующей семестр</p>
      </nav>
      <div v-if="userType === 'student'">
        <nav v-if="!editComment2">
          <button class="editBtn" @click="comment2Clicked" >Редактировать</button>
        </nav>
        <nav v-else>
          <button class="editBtn" @click="saveComment2" >Сохранить</button>
        </nav>
      </div>

    </div>
    <div>

      <div class="container-fluid justify-content-between d-flex mb-3">
        <nav class="inputWidth">
          <div>
            <textarea  v-model="comment2" :disabled="!editComment2" rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
          </div>
        </nav>
      </div>
    </div>
  </div>

  <div class="roundBlock">
    <div class="d-flex justify-content-between mt-1">
      <nav class="checkboxBlock">
        <p class="mainText mt-0">Презентация</p>
      </nav>
    </div>

    <div class="roundBlock">
      <div class="ms-2 mt-2 mb-2">
        <div>
          <p class="textMainPage mt-0">Скачать презентацию</p>
        </div>

        <div>
          <button class="downloadFile" @click="downloadFile"><p style="word-break: break-word">File.pptx</p></button>
        </div>
      </div>


    </div>



  </div>

  <div class="roundBlock" >
    <div class="d-flex justify-content-between">
      <nav class="mt-3" style="margin-left: 2.5%">
        <p class="mainText">Кандидатские экзамены</p>
      </nav>
      <div v-if="userType === 'student'">
        <nav class="text-end" style="margin-right: 2.5%" >
          <button v-if="!editExams" @click="editExamsClicked" class="editBtn2 mt-3">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="addExam">Добавить</button>
            <button class="editBtn2 mt-3 " @click="saveExams" >Сохранить</button>
          </div>
        </nav>
      </div>

    </div>
    <div class="roundBlock p-0 mt-2">

      <div v-if="!editExams">
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfExams.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 10%; text-align: center;">
            №
          </div>

          <div class="rightLine textMiniTable" style="width: 40%; text-align: center">
            Специальность
          </div>


          <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
            Оценка
          </div>

          <div class="textMiniTable" style="width: 24%; text-align: center">
            Дата
          </div>

        </div>

        <div class="d-flex " :class="{ underline: index !== arrayOfExams.length-1}" v-for="(exam,index) in arrayOfExams">

          <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

            {{index + 1}}
          </div>
          <div class="rightLine textMiniTable" style="width: 40%; text-align: center">
            <div>
              <div class="textWithCarry inputBox ">{{exam.name}}</div>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
            <div>
              <div class="textWithCarry inputBox ">{{exam.mark}}</div>
            </div>
          </div>


          <div class="textMiniTable" style="width: 24%; text-align: center">
            <div class="me-2">
              <div class="textWithCarry inputBox ps-2">{{exam.date}}</div>
            </div>

          </div>

        </div>

      </div>

      <div v-if="editExams">

        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfExams.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 10%; text-align: center;">
            №
          </div>

          <div class="rightLine textMiniTable" style="width: 40%; text-align: center">
            Специальность
          </div>


          <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
            Оценка

          </div>

          <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
            Дата

          </div>


          <div class="textMiniTable" style="width: 10%; text-align: center">

          </div>

        </div>

        <div class="d-flex " :class="{ underline: index !== arrayOfExams.length-1}" v-for="(exam,index) in arrayOfExams">
          <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

            {{index + 1}}
          </div>

          <div class="rightLine textMiniTable" style="width: 40%; text-align: center">
            <div>
              <textarea class="textWithCarry inputBox" v-model="exam.name" rows="3"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
            <div>
              <textarea class="textWithCarry inputBox" rows="3" v-model="exam.date"></textarea>
            </div>
          </div>



          <div class="rightLine textMiniTable" style="width: 20%; text-align: center">

            <div>
              <textarea class="textWithCarry inputBox" rows="3" v-model="exam.date"></textarea>
            </div>
          </div>



          <div class="textMiniTable" style="width: 10%; text-align: center; padding-right: 0" >
            <button class="btnAddDeleteFiles mt-2" @click="deleteExam(index)">
              <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
            </button>
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