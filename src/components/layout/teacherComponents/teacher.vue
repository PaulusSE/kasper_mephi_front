<template>
  <link href="../../../../static/css/authorization.css" rel="stylesheet">
  <link href="../../../../static/css/bootstap.css" rel="stylesheet">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Raleway:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">


  <div class="mainPage">

    <div class="aspirantText">
      <p>Аспиранты</p>
    </div>

    <div v-for="student in arrayOfStudents">
      <tab-of-student
      :full-name = student.fullName
      :group = student.group
      :topic = student.topic
      :date-of-statement = student.dateOfStatement
      :number-of-order-of-statement = student.numberOfOrderOfStatement
      :id = student.id
      ></tab-of-student>

  </div>
  </div>



</template>

<script>
import tabOfStudent from "@/components/layout/studentComponents/tabOfStudent.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
export default {
  name: "teacher",
  components: {
    "tabOfStudent" : tabOfStudent
  },
  data(){
    return {
      arrayOfStudents : [
        {
          fullName : "Петров П.П", group: "Б20-504", link: "student123/", topic : "Разработка клиентской части системы деятельности аспирантов", numberOfOrderOfStatement : "123/435/123", dateOfStatement : "12-05-2021", id:1
        },
        {
          fullName : "Сидоров С.С", group: "Б15-555", link: "student124/", topic : "Разработка серверной части системы деятельности аспирантов", numberOfOrderOfStatement : "2641/33-7", dateOfStatement : "23-09-2022", id:2
        },
        {
          fullName : "Иванов И.И", group: "Б18-504", link: "student125/", topic : "topic3", numberOfOrderOfStatement : "2123/33-1", dateOfStatement : "13-11-2021", id:3
        },
        {
          fullName : "Петрова П.П", group: "Б20-504", link: "student126/", topic : "topic4", numberOfOrderOfStatement : "5471/33-3", dateOfStatement : "15-12-2022", id:4
        },
        {
          fullName : "Львов П.П", group: "Б20-504", link: "student127/", topic : "topic5", numberOfOrderOfStatement : "645/33-2", dateOfStatement : "12-03-2023", id:5
        },
      ]
    }
  },
  methods: {
    router() {
      return router
    },
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

.aspirantText {
  font-family: "Raleway", sans-serif !important;
  border: solid 0.12em #0055BB !important;
  border-radius: 12px;
  display:inline-block;
  margin-left: 2.5%;
  margin-bottom: 3%;
  color: #0055BB !important;
  font-weight: 500;
  font-size:22px;
  padding-bottom: 0.2%;
  padding-top: 0.2%;
  padding-right: 1%;
  padding-left: 1%;
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
  padding: 0 0 0.5%;
  padding-top: 1.5%;
}

</style>