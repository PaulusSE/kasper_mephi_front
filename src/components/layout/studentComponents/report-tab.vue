<script>
import axios from "axios";
import utf8 from "utf8";

export default {
  name: "report-tab",
  data() {
    return {
      editComments : false,
      editExams : false,

      presentationFile : '',
      presentationFilename : 'пока нет',
      windowOpened : false,

      examTypeMap : {
        1: "Английский",
        2: "Философия",
        3: "Специальность"
      }
    }
  },
  props: ["arrayOfExams", "attestationMarks", "supervisorMarks", "id", "comment1", "comment2", "userType", "waitForCheck", "actualSemester", "canEdit"],
  methods : {
    buttonClicked(){
      this.windowOpened = !this.windowOpened
    },

    async saveComments(){
      this.editComments = !this.editComments

      try {
        const response = await axios.post(this.IP +"/students/report/comments/" + localStorage.getItem("access_token"),
            {
              "dissertation_comment" : this.comment1,
              "dissertation_plan" : this.comment2,
              "semester" : this.id
            },
        )
        this.data = response.data
      }
      catch (e) {
        console.log(e)
      }
    },
    commentClicked(){
      this.editComments = !this.editComments
    },
    editExamsClicked(){
      this.editExams = !this.editExams
    },

    saveExams(){
      this.editExams = !this.editExams
      this.$emit('saveExams')
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
              "semester" : this.id
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
  async beforeMount() {
    // await this.getFiles()

  }
}
</script>

<template>

  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <div class="d-flex gap-1 m-1">
        <p class="headingSemester" >{{id}} семестр</p>
      </div>

      <div v-if="windowOpened">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img  src="../../../../static/figures/arrowleft.png" class="imgSize">
        </button>

      </div>
      <div v-else>
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img  src="../../../../static/figures/arrowdown.png" class="imgSize">
        </button>
      </div>
    </div>

    <div v-if="windowOpened">

      <div class="roundBlock">
        <div class="d-flex justify-content-end m-2">
          <div v-if="userType === 'student' && !waitForCheck && (actualSemester === id || canEdit)" class="d-flex">
            <nav v-if="!editComments">
              <button class="editBtn2" @click="commentClicked" >Редактировать</button>
            </nav>
            <nav v-else>
              <button class="editBtn2" @click="saveComments" >Сохранить</button>
            </nav>
          </div>
        </div>
        <div class="roundBlock">

          <div class="d-flex justify-content-between mt-1">
            <nav class="checkboxBlock">
              <p class="mainText mt-0">Комментарий к текущей диссертации</p>
            </nav>
          </div>

          <div>


            <div class="container-fluid justify-content-between d-flex mb-3">
              <nav class="inputWidth">
                <div>
                  <textarea  v-model="comment1.commentary" :disabled="!editComments" rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
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
            <!--      <div v-if="userType === 'student'">-->
            <!--        <nav v-if="!editComment2">-->
            <!--          <button class="editBtn" @click="comment2Clicked" >Редактировать</button>-->
            <!--        </nav>-->
            <!--        <nav v-else>-->
            <!--          <button class="editBtn" @click="saveComment2" >Сохранить</button>-->
            <!--        </nav>-->
            <!--      </div>-->

          </div>
          <div>

            <div class="container-fluid justify-content-between d-flex mb-3">
              <nav class="inputWidth">
                <div>
                  <textarea  v-model="comment2.plan_text" :disabled="!editComments" rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
                </div>
              </nav>
            </div>
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
          <div class="m-2">

            <div>
              <p class="textMainPage mt-0">Скачать презентацию</p>
            </div>

            <div>
              <button class="downloadFile" @click="downloadFile"><p style="word-break: break-word">{{this.presentationFilename}}</p></button>
            </div>
          </div>


        </div>



      </div>

      <div class="roundBlock" >
        <div class="d-flex justify-content-between">
          <nav class="mt-3" style="margin-left: 2.5%">
            <p class="mainText">Кандидатские экзамены</p>
          </nav>
          <div v-if="userType === 'student' && !waitForCheck && (actualSemester === id || canEdit)" >
            <nav class="text-end" style="margin-right: 2.5%" >
              <button v-if="!editExams" @click="editExamsClicked" class="editBtn2 mt-3">Редактировать</button>
              <div v-else class="d-flex">
                <button class="editBtn2 mt-3 me-2" @click="this.$emit('addExam')">Добавить</button>
                <button class="editBtn2 mt-3 " @click="saveExams()" >Сохранить</button>
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

              <div class="rightLine textMiniTable" style="width: 45%; text-align: center">
                Экзамен
              </div>


              <div class="textMiniTable" style="width: 45%; text-align: center">
                Оценка
              </div>




            </div>

            <div class="d-flex " :class="{ underline: index !== arrayOfExams.length-1}" v-for="(exam,index) in arrayOfExams">

              <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

                {{index + 1}}
              </div>
              <div class="rightLine textMiniTable" style="width: 45%; text-align: center">
                <div>
                  <div class="textWithCarry inputBox ">{{this.examTypeMap[exam.exam_type]}}</div>
                </div>
              </div>

              <div class="textMiniTable ps-2" style="width: 42%; text-align: center">
                <div>
                  <div class="textWithCarry inputBox me-2">{{exam.mark}}</div>
                </div>
              </div>


            </div>

          </div>

          <div v-if="editExams">

            <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfExams.length !== 0}">
              <div class="rightLine textMiniTable" style="width: 10%; text-align: center;">
                №
              </div>

              <div class="rightLine textMiniTable" style="width: 50%; text-align: center">
                Экзамен
              </div>


              <div class="rightLine textMiniTable" style="width: 30%; text-align: center">
                Оценка

              </div>


              <div class="textMiniTable" style="width: 10%; text-align: center">

              </div>

            </div>

            <div class="d-flex " :class="{ underline: index !== arrayOfExams.length-1}" v-for="(exam,index) in arrayOfExams">
              <div class="rightLine textMiniTable" style="width: 10%; text-align: center">

                {{index + 1}}
              </div>

              <div class="rightLine textMiniTable" style="width: 50%; text-align: center">
                <div style="height: 100%; width: 100%">
                  <select class="textWithCarry inputBox" style="overflow: auto;width: 100%; word-break: break-all ;-webkit-appearance: none;height: calc(100%);" v-model="exam.exam_type">
                    <option value="1">Английский</option>
                    <option value="2">Философия</option>
                    <option value="3">Специальность</option>
                  </select>
                </div>
              </div>

              <div class="rightLine textMiniTable" style="width: 30%; text-align: center">
                <div>
                  <textarea class="textWithCarry inputBox" rows="3" v-model="exam.mark"></textarea>
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