<template>

  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <p class="headingSemester">{{id}} семестр</p>

      <div v-if="buttonIsOpened" class="semestrButtonActive">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>

      </div>
      <div v-else class="semestrButtonActive">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>
    </div>
    <div v-if="buttonIsOpened">

      <div class="roundBlock ">
        <div class="d-flex justify-content-between mt-3">
          <nav class="checkboxBlock justify-content-start col-3 ms-0">
            <div class="mySelectedField2 gap-3 d-flex">
              <p class="mainText">Статус</p>
              <select class="form-select mySelectedField" id="inputGroupSelect02" @input="updateState" v-model="status" :class="{textResult1: status === 'Принято', textResult2: status === 'На доработку', textResult3: status === 'Не сдано'}">
                <option  class="textResult">Выбрать статус</option>
                <option  class="textResult1">Принято</option>
                <option  class="textResult2">На доработку</option>
                <option  class="textResult3">Не сдано</option>
              </select>
            </div>
          </nav>


        </div>

<!--        <div class="roundBlock" style="height: 5em">-->
<!--          <ul class="pt-1">-->
<!--            <p style="font-family: 'Raleway', 'sans-serif';" class="loadText">Титульный лист</p>-->
<!--          </ul>-->
<!--          <ul class="selectedFileMessage" v-if="true">-->
<!--            Файлы отсутствуют-->
<!--          </ul>-->
<!--          <ul class="selectedFileMessage" v-else>-->
<!--            {{}}-->
<!--          </ul>-->
<!--        </div>-->

        <div class="roundBlock">
          <ul>
            <p class="loadText">Пояснительная записка</p>
          </ul>
          <ul class="selectedFileMessage" v-if="this.explanationaryNoteFilename === ''">
            Файлы отсутствуют
          </ul>
          <ul class="selectedFileMessage" v-else>
            <button class="downloadFile" @click="downloadFile">{{this.explanationaryNoteFilename}}</button>
          </ul>
        </div>

      </div>

    </div>


  </div>


</template>

<script>
import axios from "axios";

export default {
  name: "studentPageFromTeacherStatusTab",
  props : ["id", "jobStatus"],
  data()  {
    return {
      buttonIsOpened : false,
      status : '',
      explanationaryNoteFile : '',
      tittlePageID : '',
      explanationaryNoteFilename : '',
    }
  },
  methods : {
    buttonClicked() {
      this.buttonIsOpened = !this.buttonIsOpened
    },
    async getFiles() {

      try {
        const response = await axios.put("http://localhost:8080/supervisor/students/dissertation/" + localStorage.getItem("access_token"),
            {
              "semester" : this.id,
              "studentID" : localStorage.getItem("studentID")
            },
            {
              responseType: 'blob',
            }
        )
        if (response.status === 200) {
          this.explanationaryNoteFilename = response.headers["content-disposition"]
          this.explanationaryNoteFile = response.data
        }

      }
      catch (e) {

        this.showWrongAnswerString = true;
      }
    },
    downloadFile() {
      const blob = new Blob([this.explanationaryNoteFile]);
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.download = this.explanationaryNoteFilename;
      link.click()
    },
    async updateState() {
      setTimeout(async () => {

        try {
          const response = await axios.post("http://localhost:8080/supervisor/students/set_status/" + localStorage.getItem("access_token"),
              {
                "semester": this.id,
                "studentID": localStorage.getItem("studentID"),
                "status": this.status
              },
          )
        } catch (e) {
          console.log(e)
        }

      }, 100);


    }
  },
  beforeMount() {
    this.getFiles()
    this.status = this.jobStatus
  }
}
</script>

<style scoped>
.semestrButtonActive {
  border:0 !important;
  width: 3%;
  height: 100%;
  max-width: 42px;
  margin-top: 0 !important;
  background-color: white;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

}

.headingSemester {

  margin-top:1%;
  color: #7C7F86;
  font-family: "Raleway", sans-serif;
  font-weight: 400;
  font-size:22px;
}

.mySelectedField {
  width: 12rem !important;
  margin-bottom: 1rem;
}

.downloadFile{
  border: none;
  background-color: white;
  color: #0b5ed7;
}


.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;

  color:#6BDB6B;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FFC009
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FF3333;
}



.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:20px;
  text-align: center;
}

.loadText {
  font-family: 'Raleway', 'sans-serif';
  font-size: 22px;
  font-weight: 500;
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


</style>