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

      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: elements.length !== 0}">
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

          <div class="d-flex" :class="{ underline: index !== elements.length-1}" v-for="(element,index) in elements">
            <div class="rightLine textMiniTable ps-3" style="width: 33.0%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{element.subject}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 11.1%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{element.numberOfGroup}}</div>
              </div>

            </div>


            <div class="rightLine textMiniTable" style="width: 20.2%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">
                  {{element.mainTeacher }}</div>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 17.3%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">
                  {{element.typeOfClasses }}</div>
              </div>
            </div>

            <div class="textMiniTable" style="width: 17.3%; text-align: center">
              <div class="pe-3">
                <div >
                  <div class="textWithCarry inputBox ps-3">{{element.numberOfHours}}</div>
                </div>
              </div>
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

      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div>
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
                <div class="textWithCarry inputBox ">{{work.type}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 33%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.numberOfStudents}}</div>
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

      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">

      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Прочая нагрузка</p>
        </nav>
      </div>

      <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: otherWork.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 25%; text-align: center;">
              Наименование
              нагрузки
            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              Объем (в любых ед. измерения)
            </div>


            <div class="textMiniTable rightLine" style="width: 25%; text-align: center">
              Комментарий (опционально)

            </div>

            <div class="textMiniTable" style="width: 25%; text-align: center">
              Количество академических часов

            </div>

          </div>

          <div class="d-flex" :class="{ underline: index !== otherWork.length-1}" v-for="(work,index) in this.otherWork">
            <div class="rightLine textMiniTable ps-3" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.name}}</div>
              </div>

            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{work.volume}}</div>
              </div>

            </div>


            <div class="textMiniTable rightLine" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">
                  {{work.comment }}</div>
              </div>
            </div>

            <div class="textMiniTable pe-3" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ps-3 ">
                  {{work.numberOfHours }}</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>


  </div>


</template>

<script>
import axios from "axios";
import store from "@/store/index.js";

export default {
  name: "tabOfArticles",
  props: ["elements", "id"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing: false,
      deleteState: false,
      individualWork : [
        {
          type: "",
          numberOfStudents : '2',
          comment: 'вроде так',
        },
        {
          type: "",
          numberOfStudents : '5',
          comment: 'вроде так',
        }
      ],
      otherWork : [
        {
          name : "Работа",
          volume : "Много",
          comment : "Комментарий",
          numberOfHours : '40 в неделю',
        }
      ]
    }
  },
  methods : {
    buttonClicked(){

      if (this.buttonIsOpened === true)
        this.smallTableEditing = false
      this.buttonIsOpened = !this.buttonIsOpened
    },

  },

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


@media (min-width: 800px) {
  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
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
    margin-right: 3rem;
  }




  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-all;

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
    word-break: break-all;
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

@media (pointer: coarse) and (max-width: 400px) {
  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:0.8rem;
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
    font-size:0.6rem;
    text-align: center;
    word-break: break-all;
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


</style>