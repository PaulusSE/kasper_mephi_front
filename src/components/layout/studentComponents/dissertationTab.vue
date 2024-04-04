<template>

  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <div class="d-flex gap-1">
        <p class="headingSemester">{{id}} семестр</p>
        <p v-if="actualSemester===id" class="headingSemester">(текущий)</p>
      </div>

      <div v-if="buttonIsOpened">
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
    <div v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">

        <nav class="checkboxBlock">
          <div class="d-flex gap-2">
            <p class="statusLine">Статус:</p>
            <p class="statusLine" :class="{textResult1: statusOfJob[this.status] === 'Сдано', textResult2:statusOfJob[this.status] === 'На доработку', textResult3 : statusOfJob[this.status] === 'Не сдано'}">{{statusOfJob[this.status]}}</p>
          </div>
        </nav>

      </div>


      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Пояснительная записка:</p>
        </div>

        <div v-if="this.explanationaryNoteFile === '' " class="mt-2 ms-3">
          <p class="loadTextState">Файл не выбран</p>
        </div>

        <div v-else class="ms-3 mt-2">
          <p class="loadTextState">

            <button class="downloadFile" @click="downloadFile"><p style="word-break: break-word">{{this.explanationaryNoteFilename}}</p></button>

          </p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">


          <div class="image-upload" v-if="this.id === this.actualSemester">
            <label for="file-input2">
              <img class='imgSize2' src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input2" type="file" accept="application/pdf"  @input="inputExplanatoryFile" :disabled="waitForCheck" :class="{disabledText : waitForCheck}"/>
          </div>
        </div>
      </div>

      <div class="text-end" v-if="this.id === this.actualSemester">
        <button class="sendFilesBtn" @click="sendFiles($event)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}" >
          <div class="d-flex justify-content-around">
            <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
            <p class="loadText">
              Отправить
            </p>
          </div>
        </button>
      </div>

      <div class="roundBlock mt-2">
        <div class="d-flex justify-content-between mt-1 mb-1">
          <nav class="checkboxBlock">
            <p class="mainText">Комментарий научного руководителя</p>
          </nav>
        </div>

        <div>

          <p v-if="feedback === ''" class="mainText noFeedBack">Рецензия отсутствует</p>

          <p v-else class="">
            <textarea disabled v-model="this.feedback" rows=5 class="form-control feedback" aria-label="With textarea"></textarea>
          </p>
        </div>
      </div>


    </div>
  </div>


</template>

<script>
import axios from "axios";
import utf8 from "utf8"

export default {
  name: "dissertationTab",
  data()  {
    return {
      buttonIsOpened : false,
      tittlePageFile : '',
      explanationaryNoteFile : '',
      tittlePageID : '',
      explanationaryNoteFilename : '',
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      },
    }
  },
  props : ['id','status', 'feedback', 'stateOfSending', 'actualSemester', 'waitForCheck'],
  methods : {
    buttonClicked() {
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },
    deleteExplanatoryNote() {
      this.explanationaryNoteFile = ''
      this.explanationaryNoteFilename = ''


    },
    downloadFile(){


      const blob = new Blob([this.explanationaryNoteFile]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.explanationaryNoteFilename;
      link.click()



    },

    deleteTitlePage(){
      this.tittlePageFile = ''
      this.tittlePageID = ''
      //todo
    },
    async inputTitlePage(){
      if ( event.target.files[0].type === 'application/pdf' ) {
        this.tittlePageFile = event.target.files[0]
      }
    },
    inputExplanatoryFile(){


      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.explanationaryNoteFilename = event.target.files[0].name
      if ( event.target.files[0].type === 'application/pdf' ) {
        this.explanationaryNoteFile = event.target.files[0]
      }
    },

    async sendFiles(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      // if (this.tittlePageFile.length === 0 && this.explanationaryNoteFile.length === 0)
      //   return

      if (this.explanationaryNoteFile.length === 0)
        return

      const obj = {
        'semester': this.id
      };
      const json = JSON.stringify(obj);
      let formData = new FormData();
      formData.append('upload', this.explanationaryNoteFile);
      formData.append('semester', this.id);

      var resultStatus = ''
      try {
        const response = await axios.post(this.IP +"/students/dissertation/file/" + localStorage.getItem("access_token"),formData,
            {
              headers : {
                "Content-Type": "multipart/form-data"
              }
            }
        )
        resultStatus = response.status

      }
      catch (e) {
        this.showWrongAnswerString = true;
      }


      this.$emit("makeNotification", resultStatus)

    },

    async getFiles() {

      try {
        const response = await axios.put(this.IP +"/students/dissertation/file/" + localStorage.getItem("access_token"),
            {
              "semester" : this.id
            },
            {
              responseType: 'blob',
            }
        )
        if (response.status === 200) {
          this.explanationaryNoteFilename = utf8.decode(response.headers["content-disposition"])
          this.explanationaryNoteFile = response.data
        }


      }
      catch (e) {
        this.showWrongAnswerString = true;
      }


    }
  },
  beforeMount() {
    this.getFiles()


  },
  mounted() {
  }

}
</script>

<style scoped>
@import 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css';
@import 'https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap';
@import 'https://fonts.googleapis.com/css2?family=Raleway:wght@100&display=swap';



* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.disabledText {
  color: grey !important;
}


@media (min-width: 800px){
  .headingSemester {
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 1rem;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 3rem;
  }

  .noFeedBack{
    text-align: left;
    margin-left: 5%;
    font-size: 1rem
  }

  .feedback {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    font-size: 1rem !important;
    resize: none !important;
    background-color: white !important;
    font-weight: 350;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: center;
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95% !important;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  ;

  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:1rem;
    margin-left: 2%;

  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 1rem;
    font-weight: 500;
  }


  .btnAddDeleteFiles {
    border:0;
    background:white;
  }



  .imgUploadFile {
    width: 1.9rem;
    height: 1.9rem;
  }

  .loadTextState{
    font-size: 1rem;
  }

  .sendFilesBtn{
    margin-right: 2.5%;
    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:1.4rem;
    padding: 0.5rem;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
    margin-bottom: 1%;
    margin-top: 1%;
  }

  .image-upload>input {
    display: none;
  }

  .statusLine {
    font-size: 1.2rem !important;
  }

  .downloadFile{
    border: none;
    background-color: white;
    color: #0b5ed7;

  }

  .textResult1 {
    font-weight: 550;
    color:#6BDB6B;

  }

  .textResult2 {
    font-weight: 550;
    color:#FFC009
  }

  .textResult3 {
    font-weight: 550;
    color:#FF3333;
  }

  .checkboxBlock {
    margin-left: 2.5%;
  }
  .imgSize1{
    width: 45px;
  }

  .imgSize2{
    width: 45px;
  }
}

@media (max-width: 800px){
  .headingSemester {
    color:#7C7F86;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 1rem;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 3rem;
  }

  .noFeedBack{
    text-align: left;
    margin-left: 5%;
    font-size: 0.8rem
  }

  .feedback {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    font-size: 0.8rem !important;
    resize: none !important;
    background-color: white !important;
    font-weight: 350;
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95% !important;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:0.8rem;
    margin-left: 2%;

  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 0.7rem;
    font-weight: 500;
  }


  .btnAddDeleteFiles {
    border:0;
    background:white;
  }



  .imgUploadFile {
    width: 1.7rem;
    height: 1.7rem;
  }

  .loadTextState{
    font-size: 0.8rem;
  }

  .sendFilesBtn{
    margin-right: 2.5%;

    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:1.4rem;
    padding: 0.5rem;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
    margin-bottom: 1%;
    margin-top: 1%;
  }

  .image-upload>input {
    display: none;
  }

  .statusLine {
    font-size: 1rem !important;
  }

  .downloadFile{
    border: none;
    background-color: white;
    color: #0b5ed7;

  }

  .textResult1 {
    font-weight: 550;
    color:#6BDB6B;

  }

  .textResult2 {
    font-weight: 550;
    color:#FFC009
  }

  .textResult3 {
    font-weight: 550;
    color:#FF3333;
  }

  .checkboxBlock {
    margin-left: 2.5%;
  }
  .imgSize1{
    width: 45px;
  }

  .imgSize2{
    width: 45px;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .headingSemester {
    color:#7C7F86;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
  }

  .imgSize{
    width: 40px !important;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 1rem;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 1.5rem;
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95% !important;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  ;

  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:0.8rem;
    margin-left: 2%;

  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 0.8rem;
    font-weight: 500;
  }


  .btnAddDeleteFiles {
    border:0;
    background:white;
  }


  .noFeedBack{
    text-align: left;
    margin-left: 5%;
    font-size: 0.6rem
  }

  .feedback {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    font-size: 0.6rem !important;
    resize: none !important;
    background-color: white !important;
    font-weight: 350;
  }



  .loadTextState{
    font-size: 0.8rem;
  }

  .sendFilesBtn{
    margin-right: 2.5%;

    background-color: #0055BB;
    font-family: "Raleway", sans-serif;
    font-size:1.4rem;
    padding: 0.25rem;
    border-radius: 10px;
    color:white;
    font-weight: 400;
    border: 0;
    margin-bottom: 1%;
    margin-top: 1%;
  }

  .image-upload>input {
    display: none;
  }

  .statusLine {
    font-size: 0.7rem !important;
  }

  .downloadFile{
    border: none;
    background-color: white;
    color: #0b5ed7;

  }

  .textResult1 {
    font-weight: 550;
    color:#6BDB6B;

  }

  .textResult2 {
    font-weight: 550;
    color:#FFC009
  }

  .textResult3 {
    font-weight: 550;
    color:#FF3333;
  }

  .checkboxBlock {
    margin-left: 2.5%;
  }
  .imgSize1{
    width: 30px;
  }

  .imgSize2{
    width: 30px;
  }
}

</style>