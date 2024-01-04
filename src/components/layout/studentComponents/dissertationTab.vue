<template>

  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <p class="headingSemester">{{id}} семестр</p>

      <div v-if="buttonIsOpened">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img  src="../../../../static/figures/arrowleft.png">
        </button>

      </div>
      <div v-else>
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img  src="../../../../static/figures/arrowdown.png">
        </button>
      </div>
    </div>
    <div v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">

        <nav class="checkboxBlock">
          <div class="d-flex gap-2">
            <p class="statusLine">Статус:</p>
            <p class="statusLine" :class="{textResult1:jobStatus === 'Сдано', textResult2:jobStatus === 'На доработку', textResult3 : jobStatus === 'Не сдано'}">{{jobStatus}}</p>
          </div>
        </nav>

      </div>



<!--      <div class="roundBlock m-auto mt-0">-->

<!--        <div class="ms-3 mt-2">-->
<!--          <p class="loadText">Титульный лист:</p>-->
<!--        </div>-->

<!--        <div v-if="this.tittlePageID === '' " class="ms-5 mt-2">-->
<!--          <p class="loadTextState">Файл не выбран</p>-->
<!--        </div>-->

<!--        <div v-else class="ms-5 mt-2">-->
<!--          <p class="loadTextState">Файл {{ this.tittlePageID}} загружен</p>-->
<!--        </div>-->

<!--        <div class="justify-content-end d-flex gap-1 image-upload">-->
<!--          <div class="image-upload">-->
<!--            <button class="btnAddDeleteFiles" :disabled = "this.id + 1 !== this.actualSemester" @click="deleteTitlePage">-->
<!--              <img v-if="(this.tittlePageID === '' || this.id + 1 !== this.actualSemester) && !(this.tittlePageFile.length !== 0)" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>-->
<!--              <img v-else src="../../../../static/figures/trashActive.png" alt="trashFilesLogo">-->
<!--            </button>-->
<!--          </div>-->

<!--          <div class="image-upload">-->
<!--            <label for="file-input1">-->
<!--              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>-->
<!--            </label>-->
<!--            <input id="file-input1" accept="application/pdf" type="file" :disabled = "this.id + 1 !== this.actualSemester" @input="inputTitlePage($event)"/>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->



      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Пояснительная записка:</p>
        </div>

        <div v-if="this.explanationaryNoteFile === '' " class="ms-5 mt-2">
          <p class="loadTextState">Файл не выбран</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">

            <button class="downloadFile" @click="downloadFile">{{this.explanationaryNoteFilename}}</button>

          </p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" :disabled = "(this.explanationaryNoteFile === '' || this.actualSemester !== this.id)" @click="deleteExplanatoryNote">
              <img class='imgSize1' v-if="this.explanationaryNoteFile === '' || this.actualSemester !== this.id" src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img class='imgSize1' v-else src="../../../../static/figures/trashActive.png" alt="trashFilesLogo">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input2">
              <img class='imgSize2' src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input2" type="file" accept="application/pdf" :disabled = "this.id !== this.actualSemester" @input="inputExplanatoryFile"/>
          </div>
        </div>
      </div>

      <div class="text-end">
        <button class="sendFilesBtn" @click="sendFiles($event)" :disabled="this.id !== this.actualSemester">
          <div class="d-flex justify-content-around">
            <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
            <p class="loadText">
              Отправить
            </p>
          </div>
        </button>

      </div>

    </div>
  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "dissertationTab",
  data()  {
    return {
      buttonIsOpened : false,
      tittlePageFile : '',
      explanationaryNoteFile : '',
      tittlePageID : '',
      explanationaryNoteFilename : '',
    }
  },
  props : ['id','jobStatus', 'ids', 'stateOfSending', 'actualSemester'],
  methods : {
    buttonClicked() {
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },
    deleteExplanatoryNote() {
      this.explanationaryNoteFile = ''
      this.explanationaryNoteFilename = ''


      //todo
    },
    downloadFile(){
      // var fileURL = window.URL.createObjectURL(new Blob([this.explanationaryNoteFile]));
      // var fURL = document.createElement('a');
      //
      // fURL.href = fileURL;
      // fURL.setAttribute('download', 'dissertation.pdf');
      // document.body.appendChild(fURL);
      // fURL.click();

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
      this.explanationaryNoteFilename = event.target.files[0].name
      if ( event.target.files[0].type === 'application/pdf' ) {
        this.explanationaryNoteFile = event.target.files[0]
      }
    },

    async sendFiles(){

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
      formData.append('semester', json);

      var resultStatus = ''
      try {
        const response = await axios.post("http://localhost:8080/students/dissertation/file/" + localStorage.getItem("access_token"),formData,
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
        const response = await axios.put("http://localhost:8080/students/dissertation/file/" + localStorage.getItem("access_token"),
            {
              "semester" : this.id
            },
            {
              responseType: 'blob',
            }
        )
        if (response.status === 200) {

          console.log(response)
          this.explanationaryNoteFilename = response.headers["content-disposition"]
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

</style>