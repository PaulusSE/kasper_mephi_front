<template>
  <link href="../../../../static/css/dissertation.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
  <link href="../../../../static/css/studentProfile.css" rel="stylesheet">
  <link href="../../../../static/css/dissertation.css" rel="stylesheet">



<page-header></page-header>

  <div class="mainPage">
    <div class="pt-4">
      <div class="roundBlock">
        <div class="d-flex justify-content-between" style="height:3.5em">
          <nav class="checkboxBlock">
            <p class="mainText">Общая информация</p>
          </nav>



        </div>
        <div>
          <ul>
            <p>Тема: <p class="text2">{{theme}}</p></p>
          </ul>
          <ul>
            <p>ФИО руководителя: <p class="text2">{{teacherFullName}}</p></p>
          </ul>
          <ul>
            <p>Номер приказа об утверждении: <p class="text2">{{numberOfOrderOfStatement}}</p></p>
          </ul>
          <ul>
            <p>Дата приказа об утверждении: <p class="text2">{{dateOfOrderOfStatement}}</p></p>
          </ul>
        </div>
      </div>
    </div>


    <div class="roundBlock">
      <div class="d-flex justify-content-between checkboxBlock">
        <p class="mainText" style="text-align: left">План подготовки рукописи диссертаций и автореферата</p>

      </div>

      <div class="myBox roundBlock p-0">
        <div class="d-flex underline" >
          <div class="rightLine col-6 mainText">
            Этап
          </div>
          <div class="col-6 mainText" >
            Семестр
          </div>
        </div>


        <div class="d-flex underline">
          <div class="col-6 mainText rightLine">

          </div>
          <div class="col-1 mainText rightLine">
            1
          </div>
          <div class="col-1 mainText rightLine">
            2
          </div>
          <div class="col-1 mainText rightLine">
            3
          </div>
          <div class="col-1 mainText rightLine">
            4
          </div>
          <div class="col-1 mainText rightLine">
            5
          </div>
          <div class="col-1 mainText">
            6
          </div>

        </div>



        <div class="d-flex" :class="{underline:index !== 10}" v-for="(element,index) in array">
          <div class="col-6 textTable rightLine">
            {{element.name}}
          </div>
          <div class="col-1 mainText myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=element.id11 disabled>
          </div>
          <div class="col-1 mainText myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=element.id12 disabled>
          </div>
          <div class="col-1 mainText myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=element.id13 disabled>
          </div>
          <div class="col-1 mainText myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=element.id14 disabled>
          </div>
          <div class="col-1 mainText myInput rightLine">
            <input type="checkbox" class="myCheckBox" v-model=element.id15 disabled>
          </div>
          <div class="col-1 mainText myInput">
            <input type="checkbox" class="myCheckBox" v-model=element.id16 disabled>
          </div>

        </div>
      </div>

    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between" style="height:4em">
        <nav class="checkboxBlock">
          <p class="mainText">Файлы</p>
        </nav>
        <nav class="checkboxBlock justify-content-start col-3">

          <div class="mySelectedField2 gap-3 d-flex">
            <p class="textResult" style="font-weight: 400;">Статус</p>
            <select class="form-select" id="inputGroupSelect02" v-model="stateOfWork" :class="{textResult1: stateOfWork === 'Проверено', textResult2: stateOfWork === 'На доработку', textResult3: stateOfWork === 'Не сдано'}">

              <option  class="textResult">Выбрать статус</option>
              <option  class="textResult1">Проверено</option>
              <option  class="textResult2">На доработку</option>
              <option  class="textResult3">Не сдано</option>
            </select>

          </div>

        </nav>

      </div>

      <div class="roundBlock" style="height: 5em">
        <ul>
          <p style="font-family: 'Raleway', 'sans-serif';">Титульный лист</p>
        </ul>
        <ul class="selectedFileMessage">
          Файлы не выбраны:
        </ul>
      </div>

      <div class="roundBlock" style="height: 5em">
        <ul>
          <p>Титульный лист</p>
        </ul>
        <ul class="selectedFileMessage" v-if="filesFinish.length === 0">
          Файлы не выбраны:
        </ul>
        <ul class="selectedFileMessage" v-else v-for="file in filesOrder">
          {{ file.name }} : {{ file.type }}
        </ul>
      </div>

    </div>

    <div class="roundBlock">
      <div class="d-flex justify-content-between">
        <nav class="checkboxBlock">
          <p class="mainText">Рецензия</p>
        </nav>
        <nav>
          <button v-if="!editingReview" class="editBtn pt-1 ps-0" @click="buttonClicked">Редактировать</button>
          <button v-else class="editBtn pt-1 ps-0" @click="buttonClicked">Сохранить</button>
        </nav>
      </div>

      <div v-if="!editingReview">
        <p v-if="textOfReview === ''" class="mainText" style="text-align: left; margin-left: 5%; font-size: 25px">Рецензия отсутствует</p>
        <p v-else style="font-size:20px; font-weight: 350">
          <textarea disabled v-model="textOfReview" rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none; background-color: white"></textarea>
        </p>
      </div>
      <div v-else>
        <textarea v-model="textOfReview"  rows=5 class="form-control" aria-label="With textarea" style="border-radius: 10px;font-size: 17px; resize: none;"></textarea>
      </div>
    </div>

  </div>



</template>

<script>
import header from "@/components/layout/header.vue";
import store from "@/store/index.js";
export default {
  name: "studentPageFromTeacher",
  components : {
    "pageHeader" : header
  },
  data(){
    return {
      filesFinish : [],
      editingReview : false,
      array: [
        {
          name: "Введение",
          id11:true,
          id12:false,
          id13:false,
          id14:true,
          id15:false,
          id16:false
        },
        {
          name: "Основная часть",
          id11:false,
          id12:false,
          id13:false,
          id14:true,
          id15:false,
          id16:false
        },
        {
          name: "Глава 1",
          id11:false,
          id12:false,
          id13:false,
          id14:true,
          id15:false,
          id16:false
        },
        {
          name: "Глава 2",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:true,
          id16:false
        },
        {
          name: "Глава 3",
          id11:false,
          id12:true,
          id13:false,
          id14:true,
          id15:false,
          id16:false
        },
        {
          name: "Глава 4",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:true,
          id16:false
        },
        {
          name: "Глава 5 (при необоходимости)",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Глава 6 (при необоходимости)",
          id11:false,
          id12:true,
          id13:false,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Заключение",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:false,
          id16:false
        },
        {
          name: "Список литературы",
          id11:false,
          id12:false,
          id13:false,
          id14:true,
          id15:false,
          id16:false
        },
        {
          name: "Автореферат",
          id11:false,
          id12:false,
          id13:true,
          id14:false,
          id15:false,
          id16:true
        },
      ],
      stateOfWork: '',
      stateOfPart1: '',
      stateOfPart2: '',
      textOfReview: '',
      theme : "Разработка клиентской части системы деятельности аспирантов",
      teacherFullName: "Тихомирова Анна Николаевна",
      numberOfOrderOfStatement: "123/435/123",
      dateOfOrderOfStatement: "12-05-2021"
    }

  },
  methods : {
    buttonClicked() {
      this.editingReview = !this.editingReview
    }
  },
  beforeMount() {
    if (store.getters.getType !== "teacher"){
      this.$router.push('/wrongAccess')
    }
  }
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}


.checkboxBlock{
  padding-top: 0.8%;
  padding-left: 0.8%;
  padding-bottom: 2%;
}

.mySelectedField {
  width: 19% !important;
  margin-left: 75.5% !important;
}

.mySelectedField2 {
  padding-left: 0 !important;
  width: 100% !important;
  font-size: 22px !important;
  font-weight: 500 !important;
}

.reviewInput {
  border: 0.2 !important;
  width: 100%;
  text-align: center !important;
  font-size:18px !important;
  height: 10rem;
}

.textResult1 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#6BDB6B;
}

.textResult2 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#FFC009
}

.textResult3 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  font-size:17px;
  color:#FF3333;
}


.myCheckBox{
  zoom: 2;
  accent-color: white;
  background-color: green;


}

.myInput{

  display: grid !important;
  place-items: center !important;
}

.roundBlock {
  border: solid 0.12em #DEDEDE;
  border-radius: 20px;
  width: 95%;
  margin:auto;
  margin-bottom: 2% !important;
  padding: 0 1% 1%;

}




.myBox {
  width: 80%;
  margin: auto;

}

.underline {
  border-bottom: solid 0.12em #DEDEDE;

}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
  font-size: 25px !important;
}

.btnAddDeleteFiles {
  border:0;
  background:white;
}


.mainText{
  color:#7C7F86;
  font-weight: 300;
  font-size:30px;
  text-align: center;





}

.textTable{
  color:#7C7F86;
  font-weight: 400;
  font-size:21px;
  text-align: center;
}

.editBtn {
  color:#0055BB !important;
  border: 0 !important;
  margin-top: 15% !important;
  margin-right: 1.5rem !important;
}


ul p{
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

.mainPage {
  width: 60%;

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

</style>