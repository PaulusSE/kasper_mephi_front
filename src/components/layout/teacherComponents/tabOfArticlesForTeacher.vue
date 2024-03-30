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

    <div class="roundBlock" v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Публикация в изданиях</p>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing1">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: articles.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              Наименование<br>работы
            </div>


            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Статус
            </div>

            <div class="rightLine textMiniTable" style="width: 10.15%; text-align: center">
              Индексация
            </div>

            <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
              Импакт<br>-<br>фактор<br>издания
            </div>

            <div class="rightLine textMiniTable" style="width: 22.07%; text-align: center">
              Выходные<br>данные
            </div>

            <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
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
            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 10.15%;">
              <div class="textWithCarry inputBox ">{{article.status}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 10.15%;">

              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start checkboxFont" >
                  <input type="checkbox" class="ms-0"  v-model="article.wac" disabled style="word-break: break-word"/>ВАК</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" class="ms-0" v-model="article.rinc" disabled style="word-break: break-word"/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" v-model="article.scopus" disabled style="word-break: break-word"/>Scopus</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" v-model="article.wos" disabled style="word-break: break-word"/>WoS</label>
              </div>


            </div>


            <div class="rightLine textMiniTable" style="width: 8.21%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.impact}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 22.07%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{article.output_data}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 5.926%; text-align: center">
              <div>
                <div class="textWithCarry inputBox "> {{article.volume}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 12.26%; text-align: center; padding-right: 0" >
              <div class="pe-3">
                <div class="ps-3">
                  <div class="textWithCarry inputBox "> {{article.co_authors}}</div>
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
          <p class="headingSemester">Выступление на научных конференциях</p>
        </nav>

      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing2">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: reports.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              Наименование<br>доклада
            </div>


            <div class="rightLine textMiniTable" style="width: 11.15%; text-align: center">
              Статус

            </div>

            <div class="rightLine textMiniTable" style="width: 14.15%; text-align: center">
              Индексация

            </div>

            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              Название конференции
            </div>

            <div class="rightLine textMiniTable" style="width: 14.07%; text-align: center">
              Дата
            </div>

            <div class="textMiniTable" style="width: 10%; text-align: center">
              Место проведения
            </div>

          </div>

          <div class="d-flex " :class="{ underline: index !== reports.length-1}" v-for="(report,index) in reports">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 27.5%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.conference_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 11.15%;">
              <div>
                <div class="textWithCarry inputBox ">{{report.status}}</div>
              </div>
            </div>

            <div class="rightLine textMiniTable" style="width: 14.15%;">
              <div style="height: 100%">
                <label class="textCheckBox inputBox text-start checkboxFont" >
                  <input type="checkbox" v-model="report.wac" disabled/>ВАК</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" v-model="report.rinc" disabled/>РИНЦ</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" v-model="report.scopus" disabled/>Scopus</label>
                <label class="textCheckBox inputBox text-start checkboxFont">
                  <input type="checkbox" v-model="report.wos" disabled/>WoS</label>
              </div>
            </div>


            <div class="rightLine textMiniTable" style="width: 18%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.report_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 14.07%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{report.reported_at}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 10%; text-align: center">
              <div>
                <div class="textWithCarry inputBox "> {{report.location}}</div>
              </div>
            </div>
          </div>

        </div>



      </div>
    </div>

    <div class="roundBlock" v-if="buttonIsOpened">
      <div class="d-flex justify-content-between">
        <nav class="mt-3" style="margin-left: 2.5%">
          <p class="headingSemester">Участие в научно-исследовательских проектах</p>
        </nav>
      </div>
      <div class="roundBlock p-0 mt-2">

        <div v-if="!smallTableEditing3">
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: projects.length !== 0}">
            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              Наименование проекта (гранта)
            </div>


            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата начала

            </div>

            <div class="rightLine textMiniTable" style="width: 12%; text-align: center">
              Дата окончания
            </div>

            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              Дополнительная информация
            </div>

            <div class="textMiniTable" style="width: 20%; text-align: center">
              Грантодатель
            </div>


          </div>

          <div class="d-flex " :class="{ underline: index !== articles.length-1}" v-for="(project,index) in projects">

            <div class="rightLine textMiniTable" style="width: 3.87%; text-align: center">

              {{index + 1}}
            </div>
            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.project_name}}</div>
              </div>

            </div>
            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{formatDate(project.start_at)}}</div>
            </div>

            <div class="rightLine textMiniTable" style="width: 12%;">
              <div class="textWithCarry inputBox ">{{formatDate(project.end_at)}}</div>
            </div>


            <div class="rightLine textMiniTable" style="width: 25%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.add_info}}</div>
              </div>

            </div>
            <div class="textMiniTable" style="width: 20%; text-align: center">
              <div>
                <div class="textWithCarry inputBox ">{{project.grantee}}</div>
              </div>

            </div>

          </div>

        </div>



      </div>
    </div>


  </div>



</template>

<script>
export default {
  name: "tabOfArticles",
  props: ["articles","reports","projects" , "id"],
  data() {
    return {
      buttonIsOpened : false,
      smallTableEditing1 : false,
      smallTableEditing2 : false,
      smallTableEditing3 : false,
    }
  },
  methods : {
    buttonClicked(){
      if (this.buttonIsOpened === true)
        this.smallTableEditing = false

      this.buttonIsOpened = !this.buttonIsOpened
    },
    formatDate(date){
      return  date.slice(8,10) + '/' + date.slice(5,7) + '/' + date.slice(2,4)
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

  .checkboxFont {
    font-size:15px !important;
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

  .checkboxFont {
    font-size:13px !important;
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

@media (pointer: coarse) and (max-width: 400px){
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

  .checkboxFont {
    font-size:12px !important;
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