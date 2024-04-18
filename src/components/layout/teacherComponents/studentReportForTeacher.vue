<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";
export default {
  name: "studentReportForTeacher",
  components : {
    headerOfStudent,
  },
  props : ["stateOfPage",],
}
</script>

<template>

  <div class="mainPage">
<header-of-student
    @btnDissertationClicked="$emit('btnDissertationClicked')"
    @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
    @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
    @btnProfileClicked="$emit('btnProfileClicked')"
    @btnReportingClicked="$emit('btnReportingClicked')"
    :state-of-student-page = this.stateOfPage
>

</header-of-student>
  </div>

</template>

<style scoped>


* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.hightlightActualSemesterColumn {
  background-color: mediumseagreen;
  color:black !important;
  font-weight: 400 !important;
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

.textResult4 {
  font-family: "Raleway", sans-serif;
  font-weight: 550;
  color: #0000CC !important;
}

@media (min-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    width: 90%;
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
    font-size:1.3rem;
    text-align: center;
    font-weight: 400;


  }
  .textTable{
    color:#7C7F86;
    font-weight: 400 !important;
    font-size:1.2rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;

    margin-right: 1.5rem !important;
    background-color: white;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1.2rem;
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
    width: 70% !important;

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
}

@media (max-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }




  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    width: 90%;
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
    font-size:1.1rem;
    text-align: center;
    font-weight: 400;





  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;
    margin-right: 1.5rem !important;
    background-color: white;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1rem;
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
    width: 80% !important;

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
}

@media (pointer: coarse) and (max-width: 400px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }



  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
  }

  .myCheckBoxInActive{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    background-color:grey !important;
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
    width: 90%;
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
    font-size:0.8rem;
    text-align: center;
    font-weight: 400;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:0.7rem !important;
    text-align: center;
  }

  .editBtn {
    color:#0055BB !important;
    border: 0 !important;
    margin-right: 1.5rem !important;
    background-color: white;
    font-size: 0.6rem;
  }


  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.6rem;
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
    width: 90% !important;

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

  .textInput {
    font-size: 0.8rem;
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
}

.inputWidth {
  width: 100% !important;
}

.myInput{

  display: grid !important;
  place-items: center !important;
}

div input {
  border-width: 0.15em !important;
  height: 2.5rem !important;
  border-radius: 0.7em !important;
  width: 100% !important;
}

</style>