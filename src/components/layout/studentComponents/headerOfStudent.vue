<template>


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

    </div>
  </div>

</template>

<script>
import {useStore} from "vuex";
import store from "@/store/index.js";

export default {
  name: "headerOfStudent",
  props: ["stateOfStudentPage"],
  data() {
    return {
      userType: localStorage.getItem("userType"),

    }
  },
  async beforeMount() {
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

@media (min-width: 1200px){
  .myContainer {
    width: 100%;
    padding-top: 0.7rem;
    padding-bottom: 1rem;
  }

  .btn_active {
    font-family: "Raleway", sans-serif !important;
    font-weight: 500 !important;
    font-size: 1.05rem !important;
    border: solid 0.12em #0055BB !important;
    border-radius: 11px !important;
    color: #0055BB !important;


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
    margin:auto;
  }

  div input {
    border-width: 0.15em !important;
    height: 60px !important;
    border-radius: 0.7em !important;
    width: 100% !important;
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
    margin:auto;
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
    margin:auto;
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
    margin:auto;
  }

  div input {
    border-width: 0.15em !important;

    border-radius: 0.7em !important;
    width: 100% !important;
  }
}


</style>