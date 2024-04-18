<template>

  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <div class="d-flex gap-1">
        <p class="headingSemester">{{id + 1}} семестр</p>
        <p v-if="actualSemester===id + 1" class="headingSemester">(текущий)</p>
      </div>

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



        <div class="roundBlock">
          <ul>
            <p class="loadText">Пояснительная записка</p>
          </ul>
          <ul class="selectedFileMessage" v-if="this.explanationaryNoteFilename === ''">
            Файлы отсутствуют
          </ul>
          <ul class="selectedFileMessage" v-else>
            <button class="downloadFile" @click="downloadFile"><p style="word-break: break-word">{{this.explanationaryNoteFilename}}</p></button>
          </ul>
        </div>



      <div class="roundBlock">
        <div class="d-flex justify-content-between">
          <nav class="checkboxBlock">
            <p class="mainText">Рецензия</p>
          </nav>
          <nav>
            <button v-if="!editingReview" class="editBtn pt-1 ps-0" @click="buttonEditReview">Редактировать</button>
            <button v-else class="editBtn pt-1 ps-1" @click="saveReview">Сохранить</button>
          </nav>
        </div>

        <div v-if="!editingReview">
          <p v-if="feedback.feedback === ''" class="textTable">Рецензия отсутствует</p>
          <p v-else style="font-size:20px; font-weight: 350">
            <textarea disabled v-model="feedback.feedback" rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
          </p>
        </div>
        <div v-else>
          <textarea v-model="feedback.feedback"  rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
        </div>
      </div>

    </div>




  </div>


</template>

<script>
import axios from "axios";
import utf8 from "utf8"


export default {
  name: "studentPageFromTeacherStatusTab",
  props : ["id", "actualSemester", "feedback", "status"],
  data()  {
    return {
      buttonIsOpened : false,
      explanationaryNoteFile : '',
      tittlePageID : '',
      explanationaryNoteFilename : '',
      editingReview : false,
      statusOfJob : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'passed' : 'Принято',
        'empty': ''
      },
    }
  },
  methods : {
    buttonClicked() {
      this.buttonIsOpened = !this.buttonIsOpened
    },
    async saveReview(){
      this.editingReview = !this.editingReview

      try {
        const response = await axios.post(this.IP +"/supervisor/students/feedback/" + localStorage.getItem("access_token"), {
              "student_id" : localStorage.getItem("studentID"),
              "feedback" : this.feedback.feedback
            }
        )

      }
      catch (e) {
        console.log(e)
      }

    },
    async getFiles() {


      try {
        const response = await axios.put(this.IP +"/supervisors/student/dissertation/file/" + localStorage.getItem("access_token"),
            {
              "semester" : this.id + 1,
              "student_id" : localStorage.getItem("studentID")
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
        console.log(e)
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
          const response = await axios.post(this.IP +"/supervisor/students/set_status/" + localStorage.getItem("access_token"),
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


    },
    buttonEditReview() {
      this.editingReview = !this.editingReview
    },
  },
  beforeMount() {

    this.getFiles()

  }
}
</script>

<style scoped>

.editBtn {
  color:#0055BB !important;
  border: 0 !important;
  margin-top: 15% !important;
  margin-right: 1.5rem !important;
  background-color: white;
}

@media (min-width: 800px) {
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
    font-size:1.2rem;
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
    font-size: 1rem;
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
}

@media (max-width: 800px) {
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
    font-size:1rem;
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
    font-size: 0.8rem;
    color:#6BDB6B;
  }

  .textResult2 {
    font-family: "Raleway", sans-serif;
    font-weight: 550;
    color:#FFC009;
    font-size: 0.8rem;
  }

  .textResult3 {
    font-family: "Raleway", sans-serif;
    font-weight: 550;
    color:#FF3333;
    font-size: 0.8rem;
  }



  .mainText{
    color:#7C7F86;
    font-weight: 300;
    font-size:1rem;
    text-align: center;
  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 0.9rem;
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
}

@media (pointer: coarse) and (max-width: 400px) {
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
    font-size:0.8rem;
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
    font-size: 0.7rem;
    color:#6BDB6B;
  }

  .textResult2 {
    font-family: "Raleway", sans-serif;
    font-weight: 550;
    color:#FFC009;
    font-size: 0.7rem;
  }

  .textResult3 {
    font-family: "Raleway", sans-serif;
    font-weight: 550;
    color:#FF3333;
    font-size: 0.7rem;
  }



  .mainText{
    color:#7C7F86;
    font-weight: 300;
    font-size:0.8rem;
    text-align: center;
  }

  .loadText {
    font-family: 'Raleway', 'sans-serif';
    font-size: 0.7rem;
    font-weight: 500;
  }

  .semestrButtonActive {
    border:0 !important;
    width: 3%;
    height: 100%;
    max-width: 1rem;
    margin-top: 0 !important;
    background-color: white;
    margin-right: 2rem;
  }
  .semestrImgActive {
    width: 35px;
  }
}


</style>