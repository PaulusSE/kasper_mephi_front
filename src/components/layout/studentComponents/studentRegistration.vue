<template>


  <div class="mainPage">
    <div class="headerText">
      <p>Регистрация</p>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">ФИО (полностью)</label>
        <input type="text" class="blockStyles" v-model="fullName" @input="inputEvent">
      </nav>
    </div>


    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Группа</label>
        <select class="form-select blockStyles" v-model="groupID" @change ="inputEvent">
          <option v-for="group in numberOfGroups" :value="group.group_id">{{group.name}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Актуальный семестр</label>
        <select class="form-select blockStyles" v-model="actualSemester" @input="inputEvent">
          <option v-for="number in 8" >{{number}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Специлазация</label>
        <select class="form-select blockStyles" v-model="specializationID" @input="inputEvent">
          <option v-for="spec in this.arrayOfSpecialization" :value="spec.specialization_id">{{spec.name}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Номер телефона</label>
        <input type="date" class="blockStyles" v-model="phoneNumber" @input="inputEvent" >
      </nav>
    </div>


    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Дата начала обучения</label>
        <input type="date" class="blockStyles" v-model="dateOfBeginning" @input="inputEvent" >
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Длительность обучения (лет)</label>
        <select class="form-select blockStyles" v-model="numberOfYears" @input="inputEvent">
          <option>3</option>
          <option>4</option>

        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Научный руководитель</label>
        <select class="form-select blockStyles" v-model="teacherID" @input="inputEvent">
        <option v-for="teacher in arrayOfTeachers" :value="teacher.supervisor_id">{{teacher.full_name}}</option>
        <option >Нет в списке</option>
        </select>
      </nav>
    </div>


    <div v-if="this.errorMessage !== ''" class = "wrongData">{{this.errorMessage}}</div>





    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%; text-align: center; padding-top: 2rem">
        <button class="registrateBtn" @click="registration" >Зарегистрироваться</button>
      </nav>
    </div>


  </div>


</template>

<script>
import header from "@/components/layout/header.vue"
import axios from "axios";

const EMAIL_REGEXP = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu;
const regularSymbolForPassword = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

export default {
  name: "studentRegistration",
  components: {
    "pageHeader": header,
  },
  data() {
    return {
      fullName: '',
      email: '',
      teacherID: '',
      errorMessage: '',
      phoneNumber: '',
      department: '',
      specializationID: '',
      dateOfBeginning:'',
      actualSemester:'',
      groupID: '',

      numberOfYears: '',
      arrayOfTeachers: [],
      arrayOfSpecialization : [],
      numberOfGroups : [],
    }
  },
  methods: {
    isEmailValid(value) {
      return EMAIL_REGEXP.test(value)},

    checkPassword(pass)
    {
      return regularSymbolForPassword.test(pass);
    },

    async registration() {


      if (this.fullName === ''){
        this.errorMessage = 'Поле ФИО не должно быть пустым'
        return;
      }



      if (this.numberOfGroup === ''){
        this.errorMessage = 'Поле номер группы не должно быть пустым'
        return;
      }

      if (this.actualSemester === ''){
        this.errorMessage = 'Поле актуальный семестр не должно быть пустым'
        return;
      }

      if (this.specializationID === ''){
        this.errorMessage = "Поле специализация не должо быть пустым"
        return
      }

      if (this.enrollmentOrder === ''){
        this.errorMessage = 'Поле приказ о зачислении не должно быть пустым'
        return;
      }

      if (this.dateOfBeginning === ''){
        this.errorMessage = 'Поле дата о зачислении не должно быть пустым'
        return;
      }

      if (this.numberOfYears === ''){
        this.errorMessage = 'Поле длительность обучения не должно быть пустым'
        return;
      }

      if (this.teacherID === ''){
        this.errorMessage = 'Поле научный руководитель не должно быть пустым'
        return;
      }
      if (await this.requestToRegister() === 200){
        localStorage.setItem('registered', 'true')
        this.redirectToMain()
      }

      this.errorMessage = 'Попробуйте еще раз'
    },
    async requestToRegister() {
      try {
        const response = await axios.post(this.IP +"/authorize/registration/student/" + localStorage.getItem('access_token'),
            {
              "full_name" : this.fullName,
              "group_number" : this.groupID,
              "specialization_id" : this.specializationID,
              "actual_semester" : parseInt(this.actualSemester),
              "start_date" : this.dateOfBeginning,
              "number_of_years" : parseInt(this.numberOfYears),
              "supervisor_id" : this.teacherID,
              "phone_number" : this.phoneNumber
            }
        )

        return response.status
      }

      catch (e) {
        console.log(e)
      }
      return 400
    },
    inputEvent() {
      this.errorMessage = ''
    },

    redirectToMain() {
      this.$router.push('/')
    },
    async getListOfTeachers() { //todo
      try {
        const response = await axios.get(this.IP +"/student/supervisors/list/" + localStorage.getItem('access_token'),
        )
        this.arrayOfTeachers = response.data

        }

      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

    async getListOfGroups(){
      try {
        const response = await axios.get(this.IP +"/student/enum/groups/" + localStorage.getItem('access_token'),
        )
        this.numberOfGroups = response.data

      }

      catch (e) {
        this.showWrongAnswerString = true;
      }
    },
    async getListOfSpecializations(){
      try {
        const response = await axios.get(this.IP +"/student/enum/specializations/" + localStorage.getItem('access_token'),
        )
        this.data = response.data
        this.arrayOfSpecialization = this.data


      }

      catch (e) {
        this.showWrongAnswerString = true;
      }
    },

    async checkAuth() {
      try {
        const response = await axios.get(this.IP +"/authorization/check/" + localStorage.getItem("access_token"))

        if (response.status === 200){
          this.$store.dispatch("updateUserType", response.data.userType)
          this.type = response.data.userType
        }
        else {
          this.$router.push('/auth')
        }

      } catch (e) {
        console.log(e)
        this.$router.push('/auth')
      }
    },
  },
  async beforeMount() {
    await this.getListOfTeachers()
    await this.getListOfGroups()
    await this.getListOfSpecializations()
  }
}
</script>

<style scoped>

@media (min-width: 800px) {
  .mainPage {
    width: 70%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto auto;
    padding-bottom: 1.5%;
  }

  .headerText{
    font-family: Raleway,serif;
    padding-top: 1%;
    margin-left: 2rem;
    font-size: 1.3rem;
    font-weight: 400;
  }

  .text {
    font-size: 1.1rem;
  }

  .wrongData{
    color: red;
    font-family: "Raleway", sans-serif;
    font-size: 1rem;
    text-align: center;
    font-weight: 500;
    padding-top: 2%;
  }
}

@media (max-width: 800px) {
  .mainPage {
    width: 80%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto auto;
    padding-bottom: 1.5%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .headerText{
    font-family: Raleway,serif;
    padding-top: 1%;
    margin-left: 2rem;
    font-size: 1.1rem;
    font-weight: 400;
  }

  .text {
    font-size: 0.9rem;
  }

  .wrongData{
    color: red;
    font-family: "Raleway", sans-serif;
    font-size: 0.9rem;
    text-align: center;
    font-weight: 500;
    padding-top: 2%;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .mainPage {
    width: 90%;

    background: rgba(255, 255, 255, 1);
    opacity: 1;
    border-top-left-radius: 25px;
    border-top-right-radius: 25px;
    border-bottom-left-radius: 25px;
    border-bottom-right-radius: 25px;
    box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.25);
    margin: 1.5% auto auto;
    padding-bottom: 1.5%;
    overflow-x: hidden;
    overflow-y: hidden;
  }

  .headerText{
    font-family: Raleway,serif;
    padding-top: 1%;
    margin-left: 2rem;
    font-size: 0.8rem;
    font-weight: 400;
  }

  .text {
    font-size: 0.7rem;
  }

  .wrongData{
    color: red;
    font-family: "Raleway", sans-serif;
    font-size: 0.7rem;
    text-align: center;
    font-weight: 500;
    padding-top: 2%;
  }
}




div div {
  margin-left: 0;
}



.registrateBtn{
  background-color: #0055BB !important;
  color: white !important;
  border-color: #0055BB !important;
  height: 3.2rem !important;
  border-radius: 8px !important;
  font-weight: 300 !important;
  font-size: 21px;
}

.blockStyles {
  height: 2.5rem;
  border-radius: 10px;
  border-color: #7C7F86;
  border-width: 2px 2px 2px 2px !important;
  padding: 0.375rem 2.25rem 0.375rem 0.75rem;
}




</style>