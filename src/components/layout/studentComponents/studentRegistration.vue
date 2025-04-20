<template>
  <!-- всплывающее сообщение -->
  <sending-files-notification
      v-if="stateOfSending"
      :result-of-sending="resultOfSending"
  />

  <div class="mainPage">
    <div class="headerText">
      <p>Регистрация</p>
    </div>

<!-- Email -->
      <div class="container-fluid d-flex mb-3">
        <nav style="width:100%">
          <label class="text m-0">Email</label>
          <input
            v-model="email"
            type="email"
            class="blockStyles"
            required
            @input="errorMessage = ''"
          />
        </nav>
      </div>
      <!-- Пароль -->
      <div class="container-fluid d-flex mb-3">
        <nav style="width:100%">
          <label class="text m-0">Пароль</label>
          <input
            v-model="password"
            type="password"
            :class="['blockStyles', {
              'invalid-input': password.length > 0 && password.length < 8
            }]"
            required
            @input="errorMessage = ''"
            placeholder="••••••••"
          />
          <!-- здесь подсказка -->
          <p :class="['hint', { 'invalid-text': password.length > 0 && password.length < 8 }]">
            Пароль должен быть минимум 8 символов
          </p>
        </nav>
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
          <option v-for="number in this.maxSemester" >{{number}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Специализация</label>
        <select class="form-select blockStyles" v-model="specializationID" @input="inputEvent">
          <option v-for="spec in this.arrayOfSpecialization" :value="spec.specialization_id">{{spec.name}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Номер телефона +7 (xxx) xxx-xx-xx</label>
        <input v-maska data-maska="+7 (###) ###-##-##" class="blockStyles" v-model="phoneNumber" @click="inputEvent">
      </nav>
    </div>


    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Дата начала обучения</label>
        <input type="date" class="blockStyles" min="2000-01-01" v-model="dateOfBeginning" @input="inputEvent" >
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Длительность обучения (количество семестров)</label>
        <select class="form-select blockStyles" v-model="semesterID" @click="inputEvent">
          <option v-for="element in numberOfSemesters" :value="element.amount" >{{element.amount}}</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Категория</label>
        <select class="form-select blockStyles" v-model="category" @click="inputEvent">
          <option value="Бюджетный">Бюджетный</option>
          <option value="Платный">Платный</option>
        </select>
      </nav>
    </div>

    <div class="container-fluid justify-content-between d-flex">
      <nav style="width: 100%;">
        <label class="text m-0">Научный руководитель</label>
        <select class="form-select blockStyles" v-model="teacherID" @input="inputEvent">
        <option v-for="teacher in arrayOfTeachers" :value="teacher.supervisor_id">{{teacher.full_name}}</option>

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
import header               from "@/components/layout/header.vue"
import axios                from "axios"
import SendingFilesNotification
       from "@/components/layout/notifications/studentNotifications/sendingRegNotification.vue"

const EMAIL_REGEXP           = /^(([^<>()[\].,;:\s@"]+(\.[^<>()[\].,;:\s@"]+)*)|(".+"))@(([^<>()[\].,;:\s@"]+\.)+[^<>()[\].,;:\s@"]{2,})$/iu
const PASSWORD_REGEXP        = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/

export default {
  name: "studentRegistration",
  components: { pageHeader: header, SendingFilesNotification },

  data () {
    return {
      /* поля формы */
      email: "", password: "", fullName: "", phoneNumber: "",
      groupID: "", specializationID: "", actualSemester: "",
      dateOfBeginning: "", semesterID: "", category: "", teacherID: "",

      /* выборки */
      numberOfGroups: [], arrayOfSpecialization: [], arrayOfTeachers: [],
      numberOfSemesters: [], maxSemester: "",

      /* UI */
      errorMessage   : "",
      stateOfSending : false,  // показать/скрыть уведомление
      resultOfSending: false   // true – успех / false – ошибка
    }
  },

  methods: {
    /* ---------------- validation helpers ---------------- */
    isEmailValid (v)     { return EMAIL_REGEXP.test(v) },
    isPasswordValid (v)  { return PASSWORD_REGEXP.test(v) },

    /* ---------------- основной submit ------------------- */
    async registration () {
      /* 1. валидация */
      if (!this.fullName)            return this.setErr("Поле ФИО не должно быть пустым")
      if (!this.groupID)             return this.setErr("Поле номер группы не должно быть пустым")
      if (!this.actualSemester)      return this.setErr("Поле актуальный семестр не должно быть пустым")
      if (!this.specializationID)    return this.setErr("Поле специализация не должно быть пустым")
      if (!this.phoneNumber)         return this.setErr("Поле номер телефона не должно быть пустым")
      if (!this.dateOfBeginning)     return this.setErr("Поле дата начала обучения не должно быть пустым")
      if (!this.category)            return this.setErr("Поле категория не должно быть пустым")
      if (!this.semesterID)          return this.setErr("Поле длительность обучения не должно быть пустым")
      if (!this.teacherID)           return this.setErr("Поле научный руководитель не должно быть пустым")
      if (!this.isEmailValid(this.email))
        return this.setErr("Некорректный email")
      if (!this.isPasswordValid(this.password))
        return this.setErr("Пароль слишком простой")

      /* 2. отправка */
      try {
        await axios.post(
          `${this.IP}/authorize/registration/student/${localStorage.getItem("access_token")}`,
          {
            email            : this.email,
            password         : this.password,
            full_name        : this.fullName,
            group_number     : this.groupID,
            specialization_id: this.specializationID,
            actual_semester  : +this.actualSemester,
            start_date       : this.dateOfBeginning,
            phone            : this.phoneNumber,
            number_of_years  : this.semesterID,
            supervisor_id    : this.teacherID,
            category         : this.category
          }
        )

        /* 3‑а. успех  */
        this.showToast(true)
        // даём увидеть тост и уводим на экран‑«заявка отправлена»
        setTimeout(() => this.$router.push({
          path : "/request-sent",
          query: { email: this.email }
        }), 2000)

      } catch (e) {
        /* 3‑б. ошибка */
        const msg = e.response?.data?.error || "Ошибка при регистрации, попробуйте ещё раз"
        this.setErr(msg)
        this.showToast(false)
      }
    },

    /* ---------------- util/helpers ---------------------- */
    setErr (msg) {
      this.errorMessage = msg
    },

    showToast (ok) {
      this.resultOfSending = ok
      this.stateOfSending  = true
      // авто‑закрытие: 5 сек для ошибки, 2 сек для успеха (redirect позже)
      setTimeout(() => { this.stateOfSending = false }, ok ? 2000 : 5000)
    },

    inputEvent () { this.errorMessage = "" },

    /* ---------------- получение справочных списков ------- */
    async getListOfTeachers () {
      try {
        const { data } = await axios.get(`${this.IP}/student/supervisors/list/${localStorage.getItem("access_token")}`)
        this.arrayOfTeachers = data
      } catch { /* игнорируем, выпадет валидация */ }
    },

    async getListOfGroups () {
      try {
        const { data } = await axios.get(`${this.IP}/student/enum/groups/${localStorage.getItem("access_token")}`)
        this.numberOfGroups = data
      } catch {}
    },

    async getListOfSpecializations () {
      try {
        const { data } = await axios.get(`${this.IP}/student/enum/specializations/${localStorage.getItem("access_token")}`)
        this.arrayOfSpecialization = data
      } catch {}
    },

    async getListOfSemesters () {
      try {
        const { data } = await axios.get(`${this.IP}/students/enum/amounts/${localStorage.getItem("access_token")}`)
        this.numberOfSemesters = data.sort((a, b) => a.amount - b.amount)
        this.maxSemester       = this.numberOfSemesters.at(-1)?.amount ?? 0
      } catch {}
    }
  },

  async beforeMount () {
    await Promise.all([
      this.getListOfTeachers(),
      this.getListOfGroups(),
      this.getListOfSpecializations(),
      this.getListOfSemesters()
    ])
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

.invalid-input {
  border-right: 2px solid red;
}
.hint {
  color: #6c757d;
  font-size: 0.9rem;
  margin-top: 0.25rem;
}
.invalid-text {
  color: red;
}



</style>