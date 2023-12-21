<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <div class="roundBlock">
    <div class="d-flex justify-content-between"  style="height: 3.5em;">

      <p class="headingSemester">{{id + 1}} семестр</p>

      <div v-if="buttonIsOpened" style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>

      </div>
      <div v-else style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>
    </div>
    <div v-if="buttonIsOpened">
      <div class="d-flex justify-content-between" style="height:4em">

        <nav class="checkboxBlock ms-4">
          <div class="mainText" style="font-size: 20px; display: inline"> Статус: </div> <p style="display: inline" class="stateOfFiles align">{{jobStatus}}</p>
        </nav>

      </div>



      <div class="roundBlock m-auto mt-0">

        <div class="ms-3 mt-2">
          <p class="loadText">Титульный лист:</p>
        </div>

        <div v-if="files['TitleList'] === '' " class="ms-5 mt-2">
          <p class="loadTextState">Файл не выбран</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ files["TitleList"]}} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteTitlePage">
              <img v-if="files['TitleList'] === '' " src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="../../../../static/figures/trashActive.png" alt="trashFilesLogo">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input1">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input1" type="file" @input="inputTitlePage"/>
          </div>
        </div>
      </div>



      <div class="roundBlock m-auto mt-4">

        <div class="ms-3 mt-2">
          <p class="loadText">Пояснительная записка:</p>
        </div>

        <div v-if="files['ExplanationaryNote'] === '' " class="ms-5 mt-2">
          <p class="loadTextState">Файл не выбран</p>
        </div>

        <div v-else class="ms-5 mt-2">
          <p class="loadTextState">Файл {{ files['explanatoryNote'] }} загружен</p>
        </div>

        <div class="justify-content-end d-flex gap-1 image-upload">
          <div class="image-upload">
            <button class="btnAddDeleteFiles" @click="deleteExplanatoryNote">
              <img v-if="files['ExplanationaryNote'] === '' " src="../../../../static/figures/trash.png" alt="deleteFilesLogo"/>
              <img v-else src="../../../../static/figures/trashActive.png" alt="trashFilesLogo">
            </button>
          </div>

          <div class="image-upload">
            <label for="file-input2">
              <img src="../../../../static/figures/addFile.png" alt="addFilesLogo"/>
            </label>
            <input id="file-input2" type="file" @input="inputExplanatoryFile"/>
          </div>
        </div>
      </div>

      <div style="text-align: right;">
        <button class="sendFilesBtn" @click="sendFiles" :disabled="!(files.explanatoryNote !== '' || files.titlePage !== '')">
          <div class="d-flex justify-content-around">
            <img src="../../../../static/figures/documentupload.png" alt="logo" class="imgUploadFile">
            <p style="font-size: 16px">
              Отправить
            </p>
          </div>
        </button>

      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: "dissertationTab",
  data()  {
    return {
      buttonIsOpened : false,
    }
  },
  props : ['id','jobStatus', 'files', 'stateOfSending'],
  methods : {
    buttonClicked() {
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },
    deleteExplanatoryNote() {

    },
    deleteTitlePage(){

    },
    inputTitlePage(){
      this.files["TitleList"] = '123'
      console.log(this.files)
      //todo сделать запрос отправки файл на сервер
    },
    inputExplanatoryFile(){

      this.explanatoryNote = event.target.files[0]
    },
    sendFiles(){
      this.$emit("makeNotification")

    },
  },
  beforeMount() {

  }
}
</script>

<style scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.headingSemester {

  margin-top:1%;
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size:22px;
}

.semestrButtonActive {
  border:0 !important;
  width: 3%;
  height: 100%;
  max-width: 42px;
  margin-top: 0 !important;
  background-color: white;
}


.trashLogo{
  width:35px !important;
  height: 35px !important;
}

.textMiniTable{
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 500;
  font-size:18px;
  text-align: center;

}

.textWithCarry{
  border: 0 !important;
  resize: none;
  width: 100%;
  overflow-x:hidden;
  overflow-y:hidden;
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
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

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
}

ul p{
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-weight: 900;
  font-size:22px;
  margin-left: 2%;

}

.loadText {
  font-family: 'Raleway', 'sans-serif';
  font-size: 22px;
  font-weight: 500;
}

.textWithCarry{
  border: 0 !important;
  resize: none;
  width: 100%;
  overflow-x: hidden;
  overflow-y:scroll;
  font-size: 25px;
  outline: none;
}

.ext{
  color: #000000;
  font-family: "Raleway", sans-serif;
  font-weight: 600;
  font-size:22px;
  margin-left: 2%;
}

.text2 {
  display: inline;
  font-weight: 400;
  margin-left:0.35%;
}

.text3 {
  display: inline;
  font-weight: 400;
  font-family: "Times New Roman", "Arial", "serif";
  font-size: 18px;
  height: 2.2em !important;
  border-radius: 0.3rem !important;
}

.selectedFileMessage {
  font-weight: 400;
  font-family: "Times New Roman", "Arial", "serif";
  font-size: 15px;
  margin-left:2%;
  color: #7C7F86;
}

.btnAddDeleteFiles {
  border:0;
  background:white;
}

.chosen_box{
  background-color: red;
}

.stateOfFiles{
  font-size: 20px;
  color:#FFC009;


}

.imgUploadFile {
  width: 30px;
  height: 30px;
}

.sendFilesBtn{
  margin-right: 2.5%;
  width: 16%;
  height: 2.2em;
  background-color: #0055BB;
  font-family: "Raleway", sans-serif;
  font-size:22px;
  padding: 5px;
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

</style>