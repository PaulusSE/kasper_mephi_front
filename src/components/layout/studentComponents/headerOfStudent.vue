<template>

  <confirm-sending-to-check

  :show=showModalConfirmSending
  @closeWindow = closeWindowStudent
  :actual-semester = this.actualSemester
  @updateAllStudentsComponents = "$emit('updateAllStudentsComponents')"

  >
  </confirm-sending-to-check>

  <confirm-changing-student-status

      :show = showModalChangingStudentStatus
      @closeWindow = closeWindowTeacher
      @callChangeError = callChangeError
      :actual-semester = this.actualSemester
      :current-mark = supervisorMark
      @updateStatusAllTeachersComponents = "$emit('updateStatusAllTeachersComponents')"

  >

  </confirm-changing-student-status>

  <notification-error
  :show = showNotificationChangeError
  :message = errorChangeMessage
  ></notification-error>


  <div class="btnBox">
    <div class="d-flex myContainer">
      <nav>
        <router-link to="#">
          <button class="btn " :class="{btn_active: stateOfStudentPage === 1, btn_disactive: stateOfStudentPage !==1}" @click="$emit('btnDissertationClicked')"><p style="word-break: break-all">Диссертация</p>
          </button>
        </router-link>
      </nav>


      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 2, btn_disactive: stateOfStudentPage !==2}" @click="$emit('btnScientificWorkClicked')"><p style="word-break: break-all">Научная работа</p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 3, btn_disactive: stateOfStudentPage !==3}" @click="$emit('btnTeachingLoadClicked')"><p style="word-break: break-all">Педагогическая нагрузка</p>
          </button>
        </router-link>
      </nav>

      <nav v-if="this.userType === 'admin' || this.userType === 'supervisor'">
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 4, btn_disactive: stateOfStudentPage !==4}" @click="$emit('btnProfileClicked')"><p style="word-break: break-all">Профиль</p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfStudentPage === 5, btn_disactive: stateOfStudentPage !==5}" @click="$emit('btnReportingClicked')"><p style="word-break: break-all">Отчетность</p>
          </button>
        </router-link>
      </nav>

    </div>



    <div>

      <div v-if="this.userType === 'student' && stateOfStudentPage!==5">
        <div v-if="!(workStatus === 'on review' || workStatus === 'approved')">
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="sendEverythingToCheck()">Отправить работу на проверку</button>
        </div>


        <div class="d-flex gap-2 justify-content-between">
          <div class="d-flex">
            <p class="mainText text-start">
              Статус отчета :
            </p>
            <p class="mainText text-start " :class="{textResult1 : workStatus === 'passed', textResult2 : workStatus === 'todo', textResult3 : workStatus === 'failed'}">
              {{this.statusMap[workStatus]}}

            </p>
          </div>
          <div class="d-flex">
            <p class="mainText text-start">
              Текущая оценка :
            </p>
            <p class="mainText text-start " >
              {{this.supervisorMark}}
            </p>
          </div>

        </div>

      </div>

      <div v-if="(this.userType === 'supervisor' || this.userType === 'admin') && (stateOfStudentPage !== 4 && stateOfStudentPage !== 5)">
        <div v-if="workStatus === 'on review' || workStatus === 'approved'  ">
          <button type="button" class="loggining btn btn-primary btn-lg my-1" @click="estimateStudentPage()">Поставить оценку и статус</button>
        </div>
        <div class="d-flex gap-2 justify-content-between">
          <div class="d-flex">
            <p class="mainText text-start">
              Статус отчета :
            </p>
            <p class="mainText text-start " :class="{textResult1 : workStatus === 'passed', textResult2 : workStatus === 'todo', textResult3 : workStatus === 'failed'}">
              {{this.statusMap[workStatus]}}
            </p>
          </div>
          <div class="d-flex">
            <p class="mainText text-start">
              Текущая оценка :
            </p>
            <p class="mainText text-start">
              {{this.supervisorMark}}
            </p>
          </div>

        </div>

      </div>



    </div>







  </div>

</template>

<script>
import {useStore} from "vuex";
import store from "@/store/index.js";
import confirmSendingToCheck from "@/components/layout/models/studentModels/confirmSendingToCheck.vue";
import confirmChangingStudentStatus from "@/components/layout/models/teacherModels/confirmChangingStudentStatus.vue";
import notificationError from "@/components/layout/notifications/studentNotifications/notificationError.vue";

export default {
  name: "headerOfStudent",
  props: ["stateOfStudentPage", "confirmChangingStudentStatus", "workStatus", "actualSemester", "supervisorMark"],
  data() {
    return {
      userType: localStorage.getItem("userType"),
      showModalConfirmSending: false,
      showModalChangingStudentStatus: false,
      showNotificationChangeError : false,
      errorChangeMessage : "Все разделе должны быть подтверждены, статус и оценка проставлены!",
      statusMap : {
        'todo': 'На доработку',
        'failed' : 'Не сдано',
        'approved' : 'Принято',
        'in progress': 'В процессе',
        'empty' : "Не заполнено",
        'on review': "Ожидает проверки"
      },

    }
  },
  components : {

    "confirmSendingToCheck": confirmSendingToCheck,
    "confirmChangingStudentStatus": confirmChangingStudentStatus,
    "notificationError" : notificationError
  },
  methods: {
    sendEverythingToCheck(){
      this.showModalConfirmSending = true
    },

    estimateStudentPage(){
      this.showModalChangingStudentStatus = true
    },


    closeWindowStudent(){
      this.showModalConfirmSending = false
    },
    closeWindowTeacher(){
      this.showModalChangingStudentStatus = false
    },
    callChangeError(){
      this.showNotificationChangeError = true
      setTimeout(() => {
        this.showNotificationChangeError = false
      }, 5000);
    }

  },
  async beforeMount() {
    this.userType = localStorage.getItem("userType")


  },
  async beforeCreate() {

  }
}
</script>

<style scoped>

*{
  padding: 0;
  margin: 0;
  box-sizing: border-box;
}


.textResult1 {
  font-weight: 550;
  color:#6BDB6B !important;

}

.textResult2 {
  font-weight: 550;
  color:#FFC009 !important
}

.textResult3 {
  font-weight: 550;
  color:#FF3333 !important;
}

@media (min-width: 1200px){
  .myContainer {
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 1rem;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.3rem;
    text-align: center;
  }


  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1.05rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;


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

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1.05rem !important;
    border: solid 0.10em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
  }

  nav {
    margin-right: 0.6rem;

  }

  .btnBox {
    width: 95%;
    margin: auto auto 1rem;
  }


}

@media (max-width: 1200px) {
  .myContainer {
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 1rem;
  }

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.7rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0.25rem;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.2rem;
    text-align: center;
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

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.7rem !important;
    border: solid 0.10em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0.25rem;

  }

  nav {
    margin-right: 0.6rem;

  }

  .btnBox {
    width: 95%;
    margin: auto auto 1rem;
  }

  div input {
    border-width: 0.15em !important;

    border-radius: 0.7em !important;
    width: 100% !important;
  }
}

@media (max-width: 700px) {
  .myContainer {
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 1rem;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1.1rem;
    text-align: center;
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

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.6rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0.25rem !important;


  }

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.6rem !important;
    border: solid 0.10em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0.25rem !important;

  }

  nav {
    margin-right: 0.3rem;
  }

  .btnBox {
    width: 95%;
    margin: auto auto 1rem;
  }

  div input {
    border-width: 0.15em !important;

    border-radius: 0.7em !important;
    width: 100% !important;
  }
}

@media (pointer: coarse) and (max-width: 400px) {
  .myContainer {
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 1rem;
  }

  .mainText{
    color:#7C7F86;
    font-weight: 400;
    font-size: 1rem;
    text-align: center;
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

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.5rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;
    padding: 0;


  }

  .btn_disactive {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 0.5rem !important;
    border: solid 0.10em #7C7F86 !important;
    border-radius: 11px !important;
    color: #7C7F86 !important;
    padding: 0;

  }

  nav {
    margin-right: 0.2rem;
  }

  .btnBox {
    width: 95%;
    margin: auto auto 1rem;

  }


  div input {
    border-width: 0.15em !important;

    border-radius: 0.7em !important;
    width: 100% !important;
  }
}


</style>