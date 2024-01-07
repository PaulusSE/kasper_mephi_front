<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">



  <div class="roundBlock">
    <div class="d-flex justify-content-between nameLink" >

      <div v-if="!buttonIsOpened">
        <div class="textOfHeaders">{{fullName}} {{group}}</div>
      </div>

      <div v-else style="margin-top: 1%">
        <router-link style="text-decoration:none" to='user' @click="pushUserIdToStore">
          <p class="textOfHeaders">{{ fullName}} {{group}}</p>
        </router-link>
      </div>

      <div v-if="buttonIsOpened" style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click="buttonClicked">
          <img src="../../../../static/figures/arrowleft.png" class="semestrImgActive">
        </button>
      </div>

      <div v-else style="margin-right: 3%">
        <button class="my-2 semestrButtonActive" @click=buttonClicked>
          <img src="../../../../static/figures/arrowdown.png" class="semestrImgActive">
        </button>
      </div>
    </div>


    <div class="roundBlock" v-if="buttonIsOpened">
      <p class="mainText mb-2 ms-4" >Общая информация</p>
      <div v-if="buttonIsOpened" class="textInTheBox">
        <p>Тема: <p class="dataText">{{topic}}</p></p>
        <p>Номер приказа об утверждении: <p class="dataText">{{numberOfOrderOfStatement}}</p></p>
        <p>Дата приказа об утверждении: <p class="dataText">{{dateOfStatement}}</p></p>
      </div>
    </div>

  </div>


</template>

<script>


export default {
  name: "tabOfStudent",
  props: ["fullName", "group", "topic", "numberOfOrderOfStatement", "dateOfStatement", "student_id"],
  data() {
    return {
      buttonIsOpened : false
    }
  },
  methods: {
    buttonClicked() {
      this.buttonIsOpened = !this.buttonIsOpened
    },
    pushUserIdToStore() {
      this.$store.dispatch("updateUserId", this.student_id)
      localStorage.setItem("studentID", this.student_id)
    }
  },

}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
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

  .textOfHeaders {
    margin-top: 7%;
    text-decoration: none !important;
    font-size: 25px;
  }

  .nameLink {
    padding-left: 2.5% !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 400 !important;

  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;

  }


  .mainText {
    color: #7C7F86;
    font-weight: 100;
    font-size: 30px;
  }


  .textInTheBox {

    color: black !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size:22px !important;
    margin-left: 2% !important;
  }

  .dataText{
    font-weight: 400 !important;
    display: inline;
  }





  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;
  }


}

@media (max-width: 800px) {

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

  }

  .textOfHeaders {
    margin-top: 7%;
    text-decoration: none !important;
    font-size: 1.2rem;
  }

  .nameLink {
    padding-left: 2.5% !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 400 !important;

  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
  }


  .mainText {
    color: #7C7F86;
    font-weight: 100;
    font-size: 1.2rem;
  }


  .textInTheBox {

    color: black !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size:1rem !important;
    margin-left: 2% !important;
  }

  .dataText{
    font-weight: 400 !important;
    display: inline;
  }





  ul p{
    color: #000000;
    font-family: "Raleway", sans-serif;
    font-weight: 900;
    font-size:22px;
    margin-left: 2%;
  }

}

@media (pointer: coarse) {

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

  }

  .textOfHeaders {
    margin-top: 7%;
    text-decoration: none !important;
    font-size: 0.8rem;
  }

  .nameLink {
    padding-left: 2.5% !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 400 !important;
  }


  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
  }


  .mainText {
    color: #7C7F86;
    font-weight: 100;
    font-size: 0.8rem;
  }


  .textInTheBox {

    color: black !important;
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size:0.6rem !important;
    margin-left: 2% !important;
  }

  .dataText{
    font-weight: 400 !important;
    display: inline;
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