<template>




  <div class="roundBlock">
    <div class="d-flex justify-content-between">

      <p class="headingSemester">{{id + 1}} семестр</p>

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

    <div class="roundBlock p-0 mt-2" v-if="buttonIsOpened">
      <div v-if="!deleteState">
        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: articles.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
            №
          </div>

          <div class="rightLine textMiniTable" style="width: 30.5%; text-align: center">
            Наименование<br>работы.
          </div>


          <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
            СТАТУС<br>(ВАК,<br>РИНЦ,<br>SCOPUS,<br>WoS)

          </div>

          <div class="rightLine textMiniTable" style="width: 9.21%; text-align: center">
            Импакт<br>-<br>фактор<br>издания
          </div>

          <div class="rightLine textMiniTable" style="width: 25.07%; text-align: center">
            Выходные<br>данные
          </div>

          <div class="rightLine textMiniTable" style="width: 6.926%; text-align: center">
            Объем<br>в стр
          </div>

          <div class="textMiniTable" style="width: 12.26%; text-align: center">
            Соавторы
          </div>

        </div>

        <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(article,index) in articles">
          <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

            {{index + 1}}
          </div>

          <div class="rightLine textMiniTable" style="width: 30.5%; text-align: center">
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.name" readonly></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.name"></textarea>
            </div>
          </div>


          <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.work_type" readonly></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.work_type"></textarea>
            </div>

          </div>

          <div class="rightLine textMiniTable" style="width: 9.21%; text-align: center">
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.impact" readonly></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.impact"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 25.07%; text-align: center">
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.output_data" readonly></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.output_data"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 6.926%; text-align: center">
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.volume" readonly></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.volume"></textarea>
            </div>
          </div>

          <div class="textMiniTable" style="width: 12.26%; text-align: center; padding-right: 0" >
            <div v-if="!smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.co_authors" readonly ></textarea>
            </div>

            <div v-if="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" rows=3 v-model="article.co_authors"></textarea>
            </div>
          </div>

        </div>
      </div>

      <div v-if="deleteState">

        <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: articles.length !== 0}">
          <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
            №
          </div>

          <div class="rightLine textMiniTable" style="width: 29.5%; text-align: center">
            Наименование<br>работы.
          </div>


          <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
            СТАТУС<br>(ВАК,<br>РИНЦ,<br>SCOPUS,<br>WoS)

          </div>

          <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
            Импакт<br>-<br>фактор<br>издания
          </div>

          <div class="rightLine textMiniTable" style="width: 24.07%; text-align: center">
            Выходные<br>данные
          </div>

          <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
            Объем<br>в стр
          </div>

          <div class="textMiniTable rightLine" style="width: 11.26%; text-align: center">
            Соавторы
          </div>

          <div class="textMiniTable" style="width: 7%; text-align: center">

          </div>

        </div>

        <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(article,index) in articles">
          <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

            {{index + 1}}
          </div>

          <div class="rightLine textMiniTable" style="width: 29.5%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.name" readonly></textarea>
            </div>

            <div v-else="smallTableEditing">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.name"></textarea>
            </div>
          </div>


          <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.work_type" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="article.work_type"></textarea>
            </div>

          </div>

          <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.impact" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="article.impact"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 24.07%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.output_data" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="article.output_data"></textarea>
            </div>
          </div>

          <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.volume" readonly></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="article.volume"></textarea>
            </div>
          </div>

          <div class="textMiniTable rightLine" style="width: 11.26%; text-align: center; padding-right: 0" >
            <div v-if="!smallTableEditing || deleteState">
              <textarea class="textWithCarry inputBox mt-1" v-model="article.co_authors" readonly ></textarea>
            </div>

            <div v-else>
              <textarea class="textWithCarry inputBox mt-1" v-model="article.co_authors"></textarea>
            </div>
          </div>

          <div class="textMiniTable" style="width: 7%; text-align: center; padding-right: 0" >
            <button class="btnAddDeleteFiles mt-2" @click="deleteArticle(index)">
              <img class="trashLogo" src="../../../../static/figures/trashActive.png" alt="trashLogo">
            </button>
          </div>

        </div>

      </div>

    </div>
  </div>


</template>

<script>
export default {
  name: "tabOfArticles",
  props: ["articles", "id"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing : false,
      deleteState: false,
    }
  },
  methods : {
    buttonClicked(){
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
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

@media (min-width: 800px){
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
    word-break: break-all;
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
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;
  }


}

@media (max-width: 800px){
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
    width:35px !important;
    height: 35px !important;
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
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }
}

@media (pointer: coarse){
  .headingSemester {

    margin-top:1%;
    margin-left: 1%;
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 400;
    font-size:0.8rem
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
    width:35px !important;
    height: 35px !important;
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
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;

  }
}


</style>