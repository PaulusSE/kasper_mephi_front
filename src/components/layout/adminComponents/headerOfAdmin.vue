<template>
  <div class="btnBox">
    <div class="d-flex myContainer">
      <nav>
        <router-link to="#">
          <button class="btn " :class="{btn_active: stateOfAdminPage === 1, btn_disactive: stateOfAdminPage !==1}" @click="$emit('btnStudentTeacherButtonClicked')"><p style="word-break: break-all;">Пары</p>
          </button>
        </router-link>
      </nav>


      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 2, btn_disactive: stateOfAdminPage !==2}" @click="$emit('btnAddUsersButtonClicked')"><p style="word-break: break-all;">Добавление</p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 3, btn_disactive: stateOfAdminPage !==3}" @click="$emit('btnEditUsersButtonClicked')"><p style="word-break: break-all;">Пользователи<br></p>
          </button>
        </router-link>
      </nav>

      <nav>
        <router-link to="#">
          <button class="btn" :class="{btn_active: stateOfAdminPage === 4, btn_disactive: stateOfAdminPage !==4}" @click="$emit('btnReportButtonClicked')"><p style="word-break: break-all;">Отчеты</p>
          </button>
        </router-link>
      </nav>

    </div>
  </div>



</template>

<script>
export default {
  name: "headerOfAdmin",
  props: ["stateOfAdminPage"],
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