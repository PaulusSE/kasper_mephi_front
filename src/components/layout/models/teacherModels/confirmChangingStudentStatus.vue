<script>
import axios from "axios";

export default {
  name: "confirmChaningStudentStatus",
  data() {
    return {
      dissertationText : '',
      scientificWorkText: '',
      teachingLoadText: '',
      status:'',
      mark:'',
      dissertationWorkChecked : false,
      scientificWorkChecked : false,
      teachingLoadChecked : false,
    }
    },
  props : ["show", "actualSemester", "currentMark"],
  methods : {
    async changeStatus() {

      if (!this.dissertationWorkChecked || !this.scientificWorkChecked || !this.teachingLoadChecked || this.status === '' || this.mark === ''){
        this.$emit("callChangeError")
        return
      }
      this.$emit("closeWindow")


      try {
        const response = await axios.post(this.IP +"/supervisors/student/review/" + localStorage.getItem("access_token"),
            {
              "student_id" : localStorage.getItem("studentID"),
              "status" : this.status
            }
        )
      }
      catch (e) {
        console.log(e)
      }


      try {
        const response = await axios.post(this.IP +"/supervisors/student/feedback/" + localStorage.getItem("access_token"),
            {
              "feedback" : {
                "mark" : this.mark,
                "semester" : this.actualSemester,
                "feedback" :  'Диссертация: ' +  this.dissertationText + '\n' + 'Научная работа: ' +this.scientificWorkText + '\n' + 'Педагогическая нагрузка: ' + this.teachingLoadText
              },
              "student_id" : localStorage.getItem("studentID"),
            }
        )
      }
      catch (e) {
        console.log(e)
      }

      this.updateStatusAllTeachersComponents()

    },
    cancel(){
      this.$emit("closeWindow")
    },

    updateStatusAllTeachersComponents() {
      this.$emit("updateStatusAllTeachersComponents");
    }

  },
  beforeMount() {
    this.mark = this.currentMark
  }
}

</script>


<template>

  <div class="confirmBlock" v-if="show">
    <div class="confirmBlockContent">
      <slot>

        <div class="mainText d-flex m-2">
            Подтверждение изменения статуса аспиранта
        </div>
        <div class="roundBlock">


          <div class="roundBlock mt-2">
            <div>
              <p class="mainText text-start">Диссертация</p>
            </div>
            <div class="roundBlock mt-3" >
              <div class="d-flex gap-2 mb-3 mt-2">
                <div>
                  <p class="textMiniTable text-start">Оценка (макс 100)</p>
                </div>
                <div>
                  <input type="number" v-model="mark" class="textInput" min="0" max="100">
                </div>
              </div>

              <div class="d-flex gap-2">
                <div>
                  <p class="textMiniTable text-start">Статус</p>
                </div>
                <div>
                  <select class="form-select mySelectedField" id="inputGroupSelect02" v-model="status" :class="{textResult1: status === 'Принято', textResult2: status === 'На доработку', textResult3: status === 'Не сдано'}">
                    <option  class="textResult">Выбрать статус</option>
                    <option  class="textResult1" value="approved" >Принято</option>
                    <option  class="textResult2" value="todo"  >На доработку</option>
                    <option  class="textResult3" value="failed" >Не сдано</option>
                  </select>
                </div>
              </div>

              <div>
                <label class="textMiniTable inputBox text-start" >
                  <input type="checkbox" class="me-1 myCheckBox" v-model="dissertationWorkChecked" />Диссертация просмотрена</label>
              </div>

            </div>
            <div>
              <p class="textMiniTable text-start">Комментарий к отчету</p>
              <textarea v-model="dissertationText"  rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
            </div>
          </div>

          <div class="roundBlock mt-2">
            <div>
              <p class="mainText text-start">Научная работа</p>
            </div>

            <div>
              <label class="textMiniTable inputBox text-start" >
                <input type="checkbox" class="me-1 myCheckBox" v-model="scientificWorkChecked" />Научная работа просмотрена</label>
            </div>

            <div>
              <p class="textMiniTable text-start">Комментарий к научной работе</p>
              <textarea v-model="scientificWorkText"  rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
            </div>
          </div>

          <div class="roundBlock mt-2">
            <div>
              <p class="mainText text-start">Педагогическая нагрузка</p>
            </div>

            <div>
              <label class="textMiniTable inputBox text-start" >
                <input type="checkbox" class="me-1 myCheckBox"  v-model="teachingLoadChecked" />Педагогическая нагрузка просмотрена</label>
            </div>

            <div>
              <p class="textMiniTable text-start">Комментарий к научной работе</p>
              <textarea v-model="teachingLoadText"  rows=7 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
            </div>
          </div>

          <div class="d-flex justify-content-between mt-2 pt-2 pb-2 mb-2">
            <nav  class="text-center ms-2">
              <button type="button" class="loggining btn btn-primary btn-lg my-1 text-center" @click="changeStatus">Подтвердить</button>
            </nav>
            <nav  class="text-center me-2">
              <button type="button" class="loggining btn btn-primary btn-lg my-1 text-center" @click="cancel">Отмена</button>
            </nav>
          </div>
        </div>


      </slot>
    </div>
  </div>

</template>

<style scoped>
* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.confirmBlock {
  top : 0;
  bottom : 0;
  right: 0;
  left: 0;
  background: rgb(0,0,0, 0.5);
  position: fixed;
  display: flex;
  padding-top: 0;
  z-index: 2 !important;
}

.textInput {
  font-size: 1rem;
  border-top-left-radius: 10px !important;
  border-top-right-radius: 10px !important;
  border-bottom-left-radius: 10px !important;
  border-bottom-right-radius: 10px !important;
  font-weight: 400;
  border-width: 2px 2px 2px 2px !important;
  border-color: #7c7f86 !important;
  height: 2rem !important;
  padding-left:0.5rem;
}


.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#6BDB6B !important;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color: #FF8000 !important
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color:#FF3333 !important;
}

.myCheckBox {
  zoom:1.3
}



@media (min-width: 800px) {

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-all;

  }

  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 70%;
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

  .loggining {
    font-size: 1.2rem !important;

    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding:0.5rem;
    margin: 0 !important;
    color:white !important;
  }

}

@media (max-width: 800px) {



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

  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 80%;
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

  .loggining {
    font-size: 1.1rem !important;
    padding:0.25rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }


}

@media (pointer: coarse) and (max-width: 400px) {

  .confirmBlockContent {
    margin: auto;
    background : white;
    border-radius : 12px;
    min-height: 50px;
    padding: 0.5rem;
    width: 90%;
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

  .loggining {
    font-size: 0.8rem !important;
    padding:0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }


}


</style>