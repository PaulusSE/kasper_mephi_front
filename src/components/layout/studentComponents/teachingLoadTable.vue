<template>



  <div class="roundBlock">
    <div class="d-flex justify-content-between" >

      <p class="headingSemester ">{{id + 1}} семестр</p>

      <div v-if="buttonIsOpened">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>

      </div>
      <div v-else>
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>

    </div>


    <div class="roundBlock" v-if="buttonIsOpened">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Аудиторная нагрузка</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">
          <button v-if="!smallTableEditing1" @click="buttonSmallTableClicked1" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd1')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange1" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveAuditWork" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
          </div>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div v-if="!smallTableEditing1">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: classroomWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 33%; text-align: center;">
              Дисциплина
            </div>

            <div class="rightLine textMiniTable" style="width: 11.1%; text-align: center">
              Группы
            </div>


            <div class="rightLine textMiniTable" style="width: 20.2%; text-align: center">
              Основной<br>преподователь

            </div>

            <div class="rightLine textMiniTable" style="width: 17.3%; text-align: center">
              Тип занятий
            </div>

            <div class="textMiniTable ps-3" style="width: 17.3%; text-align: center">
              Часы
            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== classroomWork.length-1}" v-for="(element,index) in classroomWork">
            <div class="rightLine textMiniTable ps-3" style="width: 33.0%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{element.subject_name}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 11.1%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{element.group_name}}</div>
              </div>

            </div>


            <div class="rightLine textMiniTable" style="width: 20.2%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">
                  {{element.main_teacher }}</div>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 17.3%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">
                  {{this.loadTypeMap[element.load_type]}}</div>
              </div>
            </div>

            <div class="textMiniTable" style="width: 17.3%; text-align: center">
              <div class="pe-3">
                <div >
                  <div class="textWithCarry inputBox ps-3">{{element.hours}}</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: classroomWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 31%; text-align: center;">
              Дисциплина
            </div>

            <div class="rightLine textMiniTable" style="width: 12.1%; text-align: center">
              Группы
            </div>


            <div class="rightLine textMiniTable" style="width: 20.7%; text-align: center">
              Основной<br>преподователь

            </div>

            <div class="rightLine textMiniTable" style="width: 16.4%; text-align: center">
              Тип занятий
            </div>

            <div class="textMiniTable ps-3 rightLine" style="width: 15.8%; text-align: center">
              Часы
            </div>

            <div class="textMiniTable ps-3" style="width: 4%; text-align: center">

            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== classroomWork.length-1}" v-for="(element,index) in classroomWork">
            <div class="rightLine textMiniTable ps-3" style="width: 31.0%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" style="overflow-y:auto" v-model="element.subject_name"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12.1%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="element.group_name"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 20.7%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="element.main_teacher"></textarea>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 16.4%; text-align: center">

              <div style="height: 100%">
                <select class="textWithCarry inputBox" style="-webkit-appearance: none;word-break: break-all;height: calc(100%)" :value="this.loadTypeMap[element.load_type]" v-model="element.load_type">
                  <option style="word-break: break-all" value="laboratory">лабораторная</option>
                  <option style="word-break: break-all" value="lecture">лекция</option>
                  <option style="word-break: break-all" value="practice">семинар</option>
                  <option style="word-break: break-all" value="exam">прием зачетов и экзаменов</option>
                </select>
              </div>

            </div>
            <div class="textMiniTable ps-3 rightLine" style="width: 15.8%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="element.hours"></textarea>
              </div>
            </div>

            <div class="textMiniTable ps pt-2" style="width: 4%; text-align: center">
              <button class="btnAddDeleteFiles" @click="deleteClassroomWork(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Индивидуальная работа со студентами</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">
          <button v-if="!smallTableEditing2" @click="buttonSmallTableClicked2" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd2')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange2" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveIndividualWork" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
          </div>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div v-if="!smallTableEditing2">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: individualWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 33%; text-align: center;">
              Тип
            </div>

            <div class="rightLine textMiniTable" style="width: 33%; text-align: center">
              Количество студентов
            </div>


            <div class="textMiniTable" style="width: 33%; text-align: center">
              Комментарий (опционально)

            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== individualWork.length-1}" v-for="(work,index) in this.individualWork">
            <div class="rightLine textMiniTable ps-3" style="width: 33.0%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.load_type}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 33%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.students_amount}}</div>
              </div>

            </div>


            <div class="textMiniTable pe-3" style="width: 33%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ps-3">
                  {{work.comment }}</div>
              </div>
            </div>
          </div>
        </div>

        <div v-else>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: individualWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 32%; text-align: center;">
              Тип
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              Количество студентов
            </div>


            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              Комментарий (опционально)

            </div>
            <div class="textMiniTable ps-3" style="width: 4%; text-align: center">

            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== individualWork.length-1}" v-for="(work,index) in individualWork">
            <div class="rightLine textMiniTable ps-3" style="width: 32%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" style="overflow-y:auto" v-model="work.load_type"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="work.students_amount"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="work.comment"></textarea>
              </div>

            </div>


            <div class="textMiniTable ps-2 pt-2" style="width: 4%; text-align: center">
              <button class="btnAddDeleteFiles" @click="deleteIndividualWork(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Прочая нагрузка</p>
        </nav>
        <nav class="text-end" style="margin-right: 2.5%" v-if="!(this.actualSemester === id+1)&&canEdit&&!waitForCheck||(this.actualSemester === id+1)&&!canEdit&&!waitForCheck||(this.actualSemester === id+1)&&canEdit&&!waitForCheck">
          <button v-if="!smallTableEditing3" @click="buttonSmallTableClicked3" class="editBtn2 mt-3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Редактировать</button>
          <div v-else>
            <button class="editBtn2 mt-3 me-2" @click="this.$emit('buttonSmallTableAdd3')" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Добавить</button>
            <button class="editBtn2 mt-3 me-2" @click="cancelChange3" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Отменить</button>
            <button class="editBtn2 mt-3 " @click="saveOtherWork" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">Сохранить</button>
          </div>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div v-if="!smallTableEditing3">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: otherWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 33%; text-align: center;">
              Наименование
              нагрузки
            </div>

            <div class="rightLine textMiniTable" style="width: 33%; text-align: center">
              Объем (в любых ед. измерения)
            </div>


            <div class="textMiniTable" style="width: 33%; text-align: center">
              Комментарий (опционально)

            </div>



          </div>

          <div class="d-flex" :class="{ underline: index !== otherWork.length-1}" v-for="(work,index) in this.otherWork">
            <div class="rightLine textMiniTable ps-3" style="width: 33%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.name}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 33%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.volume}}</div>
              </div>

            </div>


            <div class="textMiniTable" style="width:33%; text-align: center">
              <div class="me-2">
                <div class="textWithCarry inputBox ps-2">
                  {{work.comment }}</div>
              </div>
            </div>


          </div>
        </div>

        <div v-else>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: otherWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 32%; text-align: center;">
              Наименование
              нагрузки
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              Объем (в любых ед. измерения)
            </div>


            <div class=" textMiniTable rightLine" style="width: 32%; text-align: center">
              Комментарий (опционально)

            </div>

            <div class=" textMiniTable" style="width: 4%; text-align: center">


            </div>


          </div>

          <div class="d-flex" :class="{ underline: index !== otherWork.length-1}" v-for="(work,index) in otherWork">
            <div class="rightLine textMiniTable ps-3" style="width: 32%; text-align: center">

              <div>
                <textarea class="textWithCarry inputBox " rows="4" style="overflow-y:auto" v-model="work.name"></textarea>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="work.volume"></textarea>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 32%; text-align: center">
              <div>
                <textarea class="textWithCarry inputBox " rows="4" v-model="work.comment"></textarea>
              </div>
            </div>



            <div class="textMiniTable ps pt-2" style="width: 4%; text-align: center">
              <button class="btnAddDeleteFiles" @click="deleteAdditionalWork(index)" :disabled="waitForCheck" :class="{disabledText : waitForCheck}">
                <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>




  </div>






</template>

<script>
import axios from "axios";

export default {
  name: "tabOfArticles",
  props: ["classroomWork", "individualWork", "otherWork", "actualSemester", "id", "waitForCheck", "canEdit"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing1 : false,
      smallTableEditing2 : false,
      smallTableEditing3 : false,

      deleteClassroomWorksID : [],
      deleteIndividualWorkID : [],
      deleteAdditionalWorkID : [],

      loadTypeMap : {
        "practice" : "семинар",
        "lecture" : "лекция",
        "laboratory" : "лабораторная",
        "exam" : "прием зачетов и экзаменов",
      }

    }
  },
  methods : {
    buttonClicked(){
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },

    selectChanged(index) {
      console.log(this.classroomWork[index])
    },

    buttonSmallTableClicked1(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing1 = !this.smallTableEditing1
      this.$emit("makeCopy", 1)
    },
    buttonSmallTableClicked2(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing2 = !this.smallTableEditing2
      this.$emit("makeCopy", 2)
    },
    buttonSmallTableClicked3(){

      if (this.waitForCheck){
        this.$emit("makeEditErrorNotification")
        return
      }

      this.smallTableEditing3 = !this.smallTableEditing3
      this.$emit("makeCopy", 3)
    },

    cancelChange1(){
      this.$emit('updatePage', 1)
      this.smallTableEditing1 = !this.smallTableEditing1
    },
    cancelChange2(){
      this.$emit('updatePage', 2)
      this.smallTableEditing2 = !this.smallTableEditing2
    },
    cancelChange3(){
      this.$emit('updatePage', 3)
      this.smallTableEditing3 = !this.smallTableEditing3
    },

    async saveAuditWork() {
      this.smallTableEditing1 = !this.smallTableEditing1
      this.$emit('saveClassroomWork')

      try {
        const response = await axios.put(this.IP +'/students/load/classroom/' + localStorage.getItem("access_token"),
            {
              "ids" : this.deleteClassroomWorksID
            }
        )
      }
      catch (e) {
        console.log(e)
      }

    },
    async saveIndividualWork() {
      this.smallTableEditing2 = !this.smallTableEditing2
      this.$emit('saveIndividualWork')

      try {
        const response = await axios.put(this.IP + "/students/load/individual/" + localStorage.getItem("access_token"),
            {
              "ids" : this.deleteIndividualWorkID
            }
        )
      }
      catch (e) {
        console.log(e)
      }
    },
    async saveOtherWork() {
      this.smallTableEditing3 = !this.smallTableEditing3
      this.$emit('saveAdditionalWork')

      try {
        const response = await axios.put(this.IP + "/students/load/additional/" + localStorage.getItem("access_token"),
            {
              "ids" : this.deleteAdditionalWorkID
            }
        )
      }
      catch (e) {
        console.log(e)
      }


    },


    cancelChange(){
      this.smallTableEditing = !this.smallTableEditing
      this.$emit('buttonSmallTableCancel')

    },

    deleteClassroomWork(myIndex) {
      this.deleteClassroomWorksID.push(this.classroomWork[myIndex].load_id)
      this.$emit('deleteClassroomWork', myIndex)
    },
    deleteIndividualWork(myIndex){
      this.deleteIndividualWorkID.push(this.individualWork[myIndex].load_id)
      this.$emit('deleteIndividualWork', myIndex)
    },

    deleteAdditionalWork(myIndex){
      this.deleteAdditionalWorkID.push(this.otherWork[myIndex].load_id)
      this.$emit('deleteAdditionalWork', myIndex)
    },


  },
  beforeMount() {

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

@media (min-width: 800px) {
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
    width:35px !important;
    height: 35px !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }
}

@media (max-width: 800px) {
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

  .trashLogo{
    width:22px !important;
    height: 22px !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .headingSemester {

    margin-top:1%;
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


  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.5rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;

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


  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.5rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }

  .trashLogo{
    width:10px !important;
    height: 10px !important;
  }

  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .textWithCarry{
    border: 0 !important;
    resize: none;
    width: 100%;
    overflow-x:hidden;
    overflow-y:hidden;
  }
}


</style>