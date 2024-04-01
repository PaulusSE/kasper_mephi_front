<template>

  <div class="mainPage">
    <div class="aspirantText">
      <p>Аспиранты</p>
    </div>
    <div v-for="student in arrayOfStudents">
      <tab-of-student
      :full-name = student.full_name
      :group = student.group_name
      :topic = student.topic
      :date-of-statement = student.dateOfStatement
      :number-of-order-of-statement = student.numberOfOrderOfStatement
      :student_id = student.student_id
      ></tab-of-student>

  </div>
  </div>



</template>

<script>
import tabOfStudent from "@/components/layout/studentComponents/tabOfStudent.vue";
import store from "@/store/index.js";
import router from "@/router/index.js";
import axios from "axios";
export default {
  name: "teacher",
  components: {
    "tabOfStudent" : tabOfStudent
  },
  data(){
    return {
      arrayOfStudents : [{}]
    }
  },
  methods: {
    router() {
      return router
    },
    async getStudents(){
      try {
        const response = await axios.get(this.IP +'/supervisors/student/list/' + localStorage.getItem("access_token"))
        this.arrayOfStudents = await response.data;

      }
      catch (e) {
        console.log(e)
      }
    }
  },
  async beforeMount() {
    // this.checkAuth()
    // if (store.getters.getType !== "supervisor"){
    //   this.$router.push('/wrongAccess')
    // }
    await this.getStudents()

    const object1 = {
      'a': 'somestring',
      b: 42,
      c: false,
    };


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

@media (min-width: 800px) {
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
    width: 50% !important;

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
}

@media (max-width: 800px) {
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
    width: 80% !important;

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
}

@media (pointer: coarse) and (max-width: 400px) {
  .aspirantText {
    font-family: "Raleway", sans-serif !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 12px;
    display:inline-block;
    margin-left: 2.5%;
    margin-bottom: 3%;
    color: #0055BB !important;
    font-weight: 500;
    font-size:0.8rem ;
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
    width: 90% !important;

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
}

</style>