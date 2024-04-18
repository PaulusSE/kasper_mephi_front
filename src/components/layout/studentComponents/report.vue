<script>
import headerOfStudent from "@/components/layout/studentComponents/headerOfStudent.vue";


export default {
  name: "report",
  components: {headerOfStudent},
  props: ["stateOfStudentPage"]
}
</script>

<template>
<div class="mainPage">
  <header-of-student
      @btnDissertationClicked="$emit('btnDissertationClicked')"
      @btnScientificWorkClicked="$emit('btnScientificWorkClicked')"
      @btnTeachingLoadClicked="$emit('btnTeachingLoadClicked')"
      @btnReportingClicked="$emit('btnReportingClicked')"
      :state-of-student-page = stateOfStudentPage
  ></header-of-student>



</div>
</template>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.disabledText {
  color: grey !important;
}

.hightlightActualSemesterColumn {
  background-color: mediumseagreen;
  color:black !important;
  font-weight: 400 !important;
}


@media (min-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 1rem !important;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    padding: 0.3rem;
    margin: 0 !important;
    color:white !important;
  }



  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 60% !important;
    margin:auto;
    border: 0 !important;
    margin-top:10px;
    margin-bottom:10px;
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

  div input {
    border-width: 0.15em !important;
    height: 2.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1.2rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1rem;
    background-color: white;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:1rem;

  }

  .mainPage {
    width: 70%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto 1%;
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 1rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

}

@media (max-width: 800px) {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 0.9rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }



  .myCheckBox{
    zoom: 0.45;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    margin-top:10px;
    margin-bottom:10px;
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

  div input {
    border-width: 0.15em !important;
    height: 2.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:1rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 1rem;
    background-color: white;

  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    margin-right: 1rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.8rem;

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
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.8rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

  .noFeedBack{
    text-align: left;
    margin-left: 5%;
    font-size: 0.8rem
  }

  .feedback {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    font-size: 0.8rem !important;
    resize: none !important;
    background-color: white !important;
    font-weight: 350;
  }
}

@media (pointer: coarse) and (max-width: 400px)  {
  .checkboxBlock{
    padding-top: 0.8%;
    padding-left: 0.8%;
    padding-bottom: 2%;
  }

  .loggining {
    font-size: 0.8rem !important;
    padding: 0.3rem;
    background-color: #0055bb !important;
    font-weight: 300 !important;
    border-radius: 0.7em !important;
    margin: 0 !important;
    color:white !important;
  }

  .myCheckBox{
    zoom: 0.5;
    accent-color: white;
    width: 50% !important;
    margin:auto;
    border: 0 !important;
    margin-top:5px;
    margin-bottom:5px;
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
    width: 90% !important;
    margin: auto;

  }

  div input {
    border-width: 0.15em !important;
    height: 1.5rem !important;
    border-radius: 0.7em !important;
    width: 100% !important;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;

  }

  .rightLine {
    border-right:  solid 0.12em #DEDEDE !important;
  }


  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 0.9rem;
    text-align: center;
  }

  .textTable{
    color:#7C7F86;
    font-weight: 400;
    font-size:0.8rem;
    text-align: center;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-top: 5%;
    margin-right: 5%;
    background-color: white;
    font-size: 0.7rem;
  }

  .editBtn2 {
    color:#0055BB;
    border: 0;
    background-color: white;
    font-size: 0.7rem;
  }

  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 600;
    font-size:0.6rem;

  }

  .mainPage {
    width: 90%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto 1%;
    padding: 0 0 0.5%;
  }


  .image-upload>input {
    display: none;
  }


  .text {
    font-family: "Raleway", sans-serif;
    color: #7c7f86;
    font-size: 0.6rem;
    font-weight: 450;
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

  .inputWidth {
    width: 100%;
  }

}



</style>