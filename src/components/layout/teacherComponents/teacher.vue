<template>

  <div class="mainPage">
    <div class="mainText">
      <p>Аспиранты</p>
    </div>


    <div>

      <div class="roundBlock p-0 mt-2" v-if="arrayOfStudents.length !== 0">
        <div>
          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: arrayOfStudents.length !== 0}">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              №
            </div>

            <div class="rightLine textMiniTable" style="width: 50%; text-align: center">
              ФИО
            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Семестр
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              Длительность обучения (cеместров)
            </div>


            <div class="textMiniTable" style="width: 20%; text-align: center">
              Группа

            </div>

          </div>

          <div class="d-flex" style="vertical-align: baseline;" :class="{ underline: index+1 !== arrayOfStudents.length}" v-for="(element,index) in arrayOfStudents">
            <div class="rightLine textMiniTable ps-3" style="width: 10%; text-align: center;">
              {{index + 1}}
            </div>

            <div class="rightLine textMiniTable" style="width: 50%; text-align: center">
              <router-link style="text-decoration: none" to="/user" @click="pushUserIdToStore(index)" >{{element["full_name"]}}</router-link>

            </div>


            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              {{element.actual_semester}}
            </div>

            <div class="rightLine textMiniTable" style="width: 20%; text-align: center">
              {{element.years}}
            </div>


            <div class="textMiniTable" style="width: 20%; text-align: center">
              {{ element.group_name}}

            </div>

          </div>
        </div>

      </div>

      <div v-else class="text-center textMainPage">
        За вами нет закрепленных аспирантов
      </div>
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
      arrayOfStudents : [{}],
      fullName :"",
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

      this.arrayOfStudents.sort((a, b) => a.actual_semester > b.actual_semester ? 1 : -1);
      this.arrayOfStudents = this.arrayOfStudents.filter(item => !(item.studying_status !== 'studying'))

    },
    pushUserIdToStore(index) {
      this.$store.dispatch("updateUserId", this.arrayOfStudents[index].student_id)
      localStorage.setItem("studentID", this.arrayOfStudents[index].student_id)
      console.log()
    },


  },
  async beforeMount() {
    if (localStorage.getItem('registered') === 'false')
      this.$router.push('/profile')

    await this.getStudents()
  }
}
</script>

<style scoped>

* {
  margin:0;
  padding:0;
  box-sizing: border-box;
}

.rightLine {
  border-right:  solid 0.12em #DEDEDE !important;
}


.inputBox {
  border: 0 !important;
  font-weight: 400;
  text-align: center;
  border-radius: 0 !important;
  color:#000000;
  background-color: white;
  outline: none !important;
  width: 100%;
}

@media (min-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
  }

  .trashLogo{
    width:32px !important;
    height: 32px !important;
  }

  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:18px;
    text-align: center;
    word-break: break-word

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
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
    margin-left: 2.5%;
    padding-top: 1%;
    padding-bottom: 1%;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }


  .linkStyle {

    text-decoration: none;
    color:#0055BB !important;
  }
}

@media (max-width: 800px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.9rem;
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
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 1rem;
    color:#7C7F86;
    font-weight: 300;
    font-size: 1.2rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 1% 1%;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:23px !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .linkStyle {
    text-decoration: none;
    color:#0055BB;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .editBtnStudents{
    width: 95%;
    margin:auto;
    text-align:right;
    font-size: 0.8rem;
  }

  .editBtn {
    color:#0055BB;
    border: 0;
    margin-right: 1%;
    background-color: white;
    font-size: 0.7rem !important;
  }
  .textMiniTable{
    color: #7C7F86;
    font-family: "Raleway", sans-serif;
    font-weight: 500;
    font-size:0.6rem;
    text-align: center;
    word-break: break-word;
    padding-left:0.1rem;
    padding-right: 0.1rem;
  }

  .trashLogo{
    width:15px !important;
    height: 15px !important;

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
    padding: 0 0 1.5%;
  }

  .headerText{
    margin-top: 0!important;
    color:#7C7F86;
    font-weight: 300;
    font-size: 0.8rem;
    margin-left: 2.5% ;
    /*Отступ такой потому, что ширина roundBlock 95% 2.5% = (100 - 95)% / 2*/
  }

  .roundBlock {
    border: solid 0.12em #DEDEDE;
    border-radius: 20px;
    width: 95%;
    margin:auto;
    margin-bottom: 2% !important;
    padding: 0 !important;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 450;
    font-size:0.6rem !important;
    text-align: start;
  }

  .underline {
    border-bottom: solid 0.12em #DEDEDE;
    margin-left: 0;
  }
  .btnAddDeleteFiles {
    border:0 !important;
    background:white !important;
  }

  .trashLogo{
    width:25px !important;
    height: 25px !important;
  }

  .linkStyle {
    padding-bottom: 0.75rem;
    text-decoration: none;

  }
}



</style>